import { Component, OnInit, OnDestroy } from "@angular/core";
import { AlertController, AccordionGroupCustomEvent, LoadingController } from "@ionic/angular";
import { Observable, Subscription, of } from "rxjs";
import { switchMap, catchError, map, tap, startWith } from "rxjs/operators";
import { AlertRadioOptions } from "src/app/models/interface/masterData.model";
import {
  ShoppingListService,
  ShoppingList,
  ShoppingItem,
  UserProfile,
} from "src/app/services/expense/shopping-list.service";
import { ToasterService } from "src/app/services/toaster/toaster.service";

interface AugmentedShoppingList extends ShoppingList {
  items?: ShoppingItem[];
  items$: Observable<ShoppingItem[]> | null;
  members$: Observable<{ uid: string; profile: UserProfile }[]> | null;
  showMembers?: boolean;
}

@Component({
    selector: "app-shopping-list",
    templateUrl: "./shopping-list.component.html",
    styleUrls: ["./shopping-list.component.scss"],
    standalone: false
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  userLists$: Observable<AugmentedShoppingList[]>;
  private listsSubscription: Subscription | null = null;

  expandedListId: string | null = null;
  showMembersForListId: string | null = null;

  newItemName = "";
  newItemQuantity = 1;
  invitedMemberEmail = "";

  newListTitle = "";
  creatingList = false;

  loadingLists = true;
  loadingItems: { [listId: string]: boolean } = {};
  loadingMembers: { [listId: string]: boolean } = {};

  errors: { [key: string]: any } = {};
  currentUserUid: string | null = null;

  addListOptions: AlertRadioOptions[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toaster: ToasterService,
  ) {
    this.shoppingListService["afAuth"].authState.subscribe(
      (user) => {
        this.currentUserUid = user ? user.uid : null;
      },
      (error) => console.error("Error getting auth state:", error),
    );

    this.userLists$ = this.shoppingListService.getUsersLists().pipe(
      tap(() => (this.loadingLists = false)),
      catchError((err) => {
        this.errors["lists"] = err;
        this.loadingLists = false;
        console.error("Error fetching user lists:", err);
        return of([]);
      }),
      startWith([]),
      map((lists) =>
        lists.map(
          (list) =>
            ({
              ...list,
              items$: null,
              members$: null,
              showMembers: false,
            }) as AugmentedShoppingList,
        ),
      ),
    );
  }

  alertButtons = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Submit",
      role: "confirm",
      handler: (value: object) => {
        if (value) {
          this.handleCreateList(value);
        } else {
          this.toaster.showToast("Submitted without selection", "danger");
        }
      },
    },
  ];

  public shoppingInputs = [
    {
      placeholder: "Item name",
    },
  ];

  ngOnInit() {}

  ngOnDestroy() {
    this.listsSubscription?.unsubscribe();
  }

  async handleCreateList(value: object) {
    const data = {
      name: Object.values(value)[0].toString().trim(),
    };
    console.log(data);
    if (!data.name) {
      this.presentAlert("Missing Title", "Please enter a title for the new list.");
      return;
    }

    this.creatingList = true;

    try {
      const newListRef = await this.shoppingListService.createList(data.name);
      this.newListTitle = "";
      if (newListRef.key) {
        this.expandedListId = newListRef.key;
      }
      this.refreshUserLists();
    } catch (error: any) {
      console.error("Error creating list:", error);
      this.errors["createList"] = error;
      this.presentAlert("Error", "Failed to create list.", error.message);
    } finally {
      this.creatingList = false;
    }
  }

  onAccordionToggle(event: CustomEvent<AccordionGroupCustomEvent["detail"]>) {
    const listId = Array.isArray(event.detail.value) ? null : event.detail.value;

    if (this.expandedListId && this.expandedListId !== listId) {
      this.clearListState(this.expandedListId);
    }

    this.expandedListId = listId;

    if (this.expandedListId) {
      const currentList = (this.userLists$ as any).value?.find(
        (l: AugmentedShoppingList) => l.key === this.expandedListId,
      );

      if (currentList) {
        this.loadListData(currentList);
      }
    } else {
      this.showMembersForListId = null;
    }
  }

  toggleMembers(listId: string) {
    this.showMembersForListId = this.showMembersForListId === listId ? null : listId;
  }

  async addNewItem(listId: string) {
    if (!listId || !this.newItemName.trim()) {
      this.presentAlert("Invalid Input", "Please select a list and enter an item name.");
      return;
    }

    try {
      await this.shoppingListService.addItemToList(listId, this.newItemName.trim(), this.newItemQuantity);
      this.newItemName = "";
      this.newItemQuantity = 1;
      this.refreshListItems(listId);
    } catch (error: any) {
      console.error("Error adding item:", error);
      this.presentAlert("Error", error.message || "Failed to add item.");
    }
  }

  async deleteItem(listId: string, itemId: string) {
    if (!listId || !itemId) {
      console.error("deleteItem called with missing listId or itemId");
      return;
    }

    const alert = await this.alertController.create({
      header: "Confirm Deletion",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          handler: async () => {
            try {
              await this.shoppingListService.deleteItemFromList(listId, itemId);
              this.refreshListItems(listId);
            } catch (error: any) {
              console.error("Error deleting item:", error);
              this.presentAlert("Error", error.message || "Failed to delete item.");
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteList(listId: string) {
    if (!listId) {
      console.error("deleteList called with missing listId");
      return;
    }

    const alert = await this.alertController.create({
      header: "Confirm Deletion",
      message: "Are you sure you want to delete this list?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          handler: async () => {
            try {
              await this.shoppingListService.deleteList(listId);
              this.refreshUserLists();
            } catch (error: any) {
              console.error("Error deleting list:", error);
              this.presentAlert("Error", error.message || "Failed to delete list.");
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async removeMember(listId: string, memberUid: string) {
    if (!listId || !memberUid) {
      console.error("removeMember called with missing listId or memberUid");
      return;
    }

    const alert = await this.alertController.create({
      header: "Confirm Removal",
      message: "Are you sure you want to remove this member?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Remove",
          handler: async () => {
            try {
              await this.shoppingListService.removeMemberFromList(listId, memberUid);
              this.refreshListItems(listId);
            } catch (error: any) {
              console.error("Error removing member:", error);
              this.presentAlert("Error", error.message || "Failed to remove member.");
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async updateItemStatus(listId: string, itemId: string, event: CustomEvent) {
    if (!listId || !itemId) {
      console.error("updateItemStatus called with missing listId or itemId");
      return;
    }

    const purchased = event.detail.checked;
    try {
      await this.shoppingListService.updateItemPurchasedStatus(listId, itemId, purchased);
    } catch (error: any) {
      console.error("Error updating item status:", error);
      this.presentAlert("Error", error.message || "Failed to update item status.");
    }
  }

  async inviteMember(listId: string) {
    if (!listId || !this.invitedMemberEmail.trim()) {
      this.presentAlert("Invalid Input", "Please enter a valid email address.");
      return;
    }

    const email = this.invitedMemberEmail.trim();
    if (!email.includes("@")) {
      this.presentAlert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      await this.shoppingListService.inviteMemberToList(listId, email);
      this.invitedMemberEmail = "";
      this.presentAlert("Success", "Member invited successfully.");
    } catch (error: any) {
      console.error("Error inviting member:", error);
      this.presentAlert("Error", error.message || "Failed to invite member.");
    }
  }

  private refreshUserLists() {
    this.userLists$ = this.shoppingListService.getUsersLists().pipe(
      tap((lists) => {
        console.log("Fetched user lists:", lists); // Debug log
        this.loadingLists = false;
      }),
      catchError((err) => {
        console.error("Error fetching user lists:", err); // Debug log
        this.errors["lists"] = err;
        this.loadingLists = false;
        return of([]);
      }),
      startWith([]),
      map((lists) =>
        lists.map((list) => {
          console.log("Mapping list:", list); // Debug log
          return {
            ...list,
            items$: null,
            members$: null,
            showMembers: false,
          } as AugmentedShoppingList;
        }),
      ),
    );
  }

  private refreshListItems(listId: string) {
    const currentList = (this.userLists$ as any).value?.find((l: AugmentedShoppingList) => l.key === listId);

    if (currentList) {
      console.log(`Refreshing items for listId: ${listId}`); // Debug log
      currentList.items$ = this.shoppingListService.getListItems(listId).pipe(
        map((itemsObj) => {
          if (!itemsObj) {
            console.warn(`No items found for listId: ${listId}`); // Debug log
            return [];
          }
          // Use Object.entries to transform the items object into an array of ShoppingItem objects
          const itemsArray: ShoppingItem[] = Object.entries(itemsObj).map(([key, value]) => ({
            key,
            ...(value as ShoppingItem),
          }));
          console.log(`Transformed items for listId ${listId}:`, itemsArray); // Debug log
          return itemsArray;
        }),
        tap((items) => {
          console.log(`Fetched and transformed items for listId ${listId}:`, items); // Debug log
          this.loadingItems[listId] = false;
        }),
        catchError((err) => {
          console.error(`Error fetching items for listId ${listId}:`, err); // Debug log
          this.errors["items-" + listId] = err;
          this.loadingItems[listId] = false;
          return of([]);
        }),
      );
    } else {
      console.warn(`No list found with listId: ${listId}`); // Debug log
    }
  }

  private clearListState(listId: string) {
    const list = (this.userLists$ as any).value?.find((l: AugmentedShoppingList) => l.key === listId);

    if (list) {
      list.items$ = null;
      list.members$ = null;
      list.showMembers = false;
    }
    delete this.errors["items-" + listId];
    delete this.errors["members-" + listId];
  }

  private loadListData(list: AugmentedShoppingList) {
    this.loadingItems[list.key!] = true;
    this.loadingMembers[list.key!] = true;

    list.items$ = this.shoppingListService.getListItems(list.key!).pipe(
      tap(() => (this.loadingItems[list.key!] = false)),
      catchError((err) => {
        this.errors["items-" + list.key!] = err;
        this.loadingItems[list.key!] = false;
        console.error(`Error fetching items for list ${list.key!}:`, err);
        return of([]);
      }),
    );

    list.members$ = this.shoppingListService.getListMemberUids(list.key!).pipe(
      switchMap((uids) =>
        uids.length
          ? this.shoppingListService
              .getUsersByUids(uids)
              .pipe(map((profiles) => uids.map((uid) => ({ uid, profile: profiles[uid] }))))
          : of([]),
      ),
      tap(() => (this.loadingMembers[list.key!] = false)),
      catchError((err) => {
        this.errors["members-" + list.key!] = err;
        this.loadingMembers[list.key!] = false;
        console.error(`Error fetching members for list ${list.key!}:`, err);
        return of([]);
      }),
    );
  }

  async presentAlert(header: string, message: string, subHeader?: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  isOwner(listOwnerUid: string | undefined): boolean {
    return this.currentUserUid === listOwnerUid;
  }
}
