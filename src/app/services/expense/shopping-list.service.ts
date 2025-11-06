import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, of, switchMap, map, combineLatest, catchError } from "rxjs";
import firebase from "firebase/compat/app"; // Needed for ServerValue.TIMESTAMP if you use it

// Define interfaces for better type safety
export interface ShoppingList {
  name: string;
  owner: string;
  members: { [key: string]: boolean };
  // items?: { [key: string]: ShoppingItem }; // Items are now fetched separately
  key?: string; // Firebase key is added by snapshotChanges
}

export interface ShoppingItem {
  name: string;
  quantity: number;
  purchased: boolean;
  key?: string; // Firebase key is added by snapshotChanges
}

export interface UserProfile {
  email: string;
  name?: string;
  // potentially other user properties
}

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  private currentUserUid: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, // Inject AngularFireDatabase
  ) {
    // // Get the current user's UID as soon as the service is created
    // this.afAuth.authState.subscribe(
    //   (user) => {
    //     this.currentUserUid = user ? user.uid : null;
    //     // Optional: Ensure user profile exists in /users on login/signup
    //     if (user) {
    //       this.db
    //         .object(`/users/${user.uid}`)
    //         .valueChanges()
    //         .subscribe((profile: any) => {
    //           if (!profile) {
    //             this.db
    //               .object(`/users/${user.uid}`)
    //               .set({
    //                 email: user.email,
    //                 name: user.displayName || user.email, // Use display name if available
    //               })
    //               .catch((err) => console.error("Error creating user profile:", err)); // Add error handling
    //           }
    //         });
    //     }
    //   },
    //   (error) => {
    //     console.error("Error in authState subscription:", error); // Handle auth state errors
    //   },
    // );
  }

  /**
   * Gets all shopping lists that the current user is a member of.
   * Uses a query to filter lists by the current user's UID in the members node.
   */
  getUsersLists(): Observable<ShoppingList[]> {
    // Wait for the user UID to be available before querying
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) {
          console.log("User not logged in, returning empty lists.");
          return of([]); // Return empty array observable if not logged in
        }
        this.currentUserUid = user.uid; // Ensure UID is set if not already

        // Query lists where the current user's UID exists in the members sub-node and is true
        // This requires a .indexOn rule in your Firebase Security Rules for "members/<uid>"
        // Example Rule: ".indexOn": ["members/YOUR_UID_PLACEHOLDER"] - Firebase console helps generate this
        return this.db
          .list<ShoppingList>("/shopping/lists", (ref) => ref.orderByChild(`members/${user.uid}`).equalTo(true))
          .snapshotChanges()
          .pipe(
            // snapshotChanges provides key and value, map them into your object
            map((changes) => changes.map((c) => ({ key: c.payload.key as string, ...(c.payload.val() as any) }))),
            catchError((err) => {
              console.error("Error getting user lists from Firebase:", err);
              throw err; // Re-throw the error to be caught by the component
            }),
          );
      }),
      catchError((err) => {
        console.error("Error in getUsersLists switchMap:", err);
        return of([]); // Return empty array on error in the authState switchMap part
      }),
    );
  }

  /**
   * Creates a new shopping list with the current user as the owner and first member.
   */
  createList(listName: string): Promise<firebase.database.Reference> {
    if (!this.currentUserUid || !listName || listName.trim() === "") {
      console.error("createList called with missing UID or empty name");
      return Promise.reject("User not logged in or list name empty.");
    }
    const trimmedListName = listName.trim();
    const newList: ShoppingList = {
      name: trimmedListName,
      owner: this.currentUserUid,
      members: {
        [this.currentUserUid]: true, // Add creator as the first member
      },
      // items node is not needed in the initial structure if you add items later
      // items: {}
    };
    // push() adds a new object to a list and returns a Promise of the new Reference
    return this.db
      .list("/shopping/lists")
      .push(newList)
      .catch((err) => {
        console.error("Error pushing new list to Firebase:", err);
        throw err; // Re-throw the error
      });
  }

  /**
   * Gets the items for a specific shopping list.
   */
  getListItems(listId: string): Observable<ShoppingItem[]> {
    if (!listId) {
      console.log("getListItems called with empty listId");
      return of([]); // Return empty array observable if listId is empty
    }
    // Using snapshotChanges to get key along with value
    return this.db
      .list<ShoppingItem>(`/shopping/lists/${listId}/items`)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          // Map changes to objects including the key
          changes.map((c) => ({ key: c.payload.key as string, ...(c.payload.val() as any) })),
        ),
        catchError((err) => {
          console.error(`Error getting items for list ${listId}:`, err);
          throw err; // Re-throw the error
        }),
      );
  }

  /**
   * Gets the members (UIDs) for a specific shopping list.
   * To get user details (email/name), you'd need to fetch from the /users node separately.
   */
  getListMemberUids(listId: string): Observable<string[]> {
    if (!listId) {
      console.log("getListMemberUids called with empty listId");
      return of([]);
    }
    // Use valueChanges to get the map directly, then extract keys
    return this.db
      .object<{ [uid: string]: boolean }>(`/shopping/lists/${listId}/members`)
      .valueChanges()
      .pipe(
        map((membersMap) => (membersMap ? Object.keys(membersMap) : [])),
        catchError((err) => {
          console.error(`Error getting member UIDs for list ${listId}:`, err);
          throw err; // Re-throw the error
        }),
      );
  }

  /**
   * Fetches user profiles for a list of UIDs.
   * This is needed to display member names/emails in the component.
   * @param uids Array of user UIDs
   * @returns Observable mapping UIDs to UserProfile
   */
  getUsersByUids(uids: string[]): Observable<{ [uid: string]: UserProfile }> {
    if (!uids || uids.length === 0) {
      console.log("getUsersByUids called with empty or null UIDs array");
      return of({});
    }
    // Create an array of observables, one for each user profile fetch
    const userObservables = uids.map((uid) =>
      this.db
        .object<UserProfile>(`/users/${uid}`)
        .valueChanges()
        .pipe(
          // Map the result to an object where the key is the UID
          map((profile) => ({ [uid]: profile || { email: "N/A", name: "Unknown User" } })), // Handle potential null profile data
          catchError((err) => {
            console.error(`Error getting user profile for UID ${uid}:`, err);
            // Return an observable that emits a placeholder for this UID's error
            return of({ [uid]: { email: "Error", name: "Error Loading" } });
          }),
        ),
    );

    // Use combineLatest to wait for all user profile observables to emit
    return combineLatest(userObservables).pipe(
      // Reduce the array of { uid: profile } objects into a single { uid1: profile1, uid2: profile2, ... } object
      map((results) => results.reduce((acc, curr) => ({ ...acc, ...curr }), {})),
      catchError((err) => {
        console.error("Error in getUsersByUids combineLatest:", err);
        throw err; // Re-throw the error
      }),
    );
  }

  /**
   * Adds a new item to a specific shopping list.
   */
  addItemToList(listId: string, name: string, quantity: number): Promise<void> {
    if (!this.currentUserUid || !listId || !name || name.trim() === "") {
      console.error("addItemToList called with missing UID, list ID, or empty name");
      return Promise.reject("User not logged in, list ID missing, or item name empty.");
    }
    const trimmedName = name.trim();
    const newItem: ShoppingItem = { name: trimmedName, quantity: quantity || 1, purchased: false };
    // push returns a Promise of the new Reference, we return a void promise
    return this.db
      .list(`/shopping/lists/${listId}/items`)
      .push(newItem)
      .then(() => {})
      .catch((err) => {
        console.error(`Error adding item to list ${listId}:`, err);
        throw err; // Re-throw the error
      });
  }

  /**
   * Updates the purchased status of an item.
   */
  updateItemPurchasedStatus(listId: string, itemId: string, purchased: boolean): Promise<void> {
    if (!this.currentUserUid || !listId || !itemId) {
      console.error("updateItemPurchasedStatus called with missing UID, list ID, or item ID");
      return Promise.reject("User not logged in, list or item ID missing.");
    }
    // set returns a Promise<void>
    return this.db
      .object(`/shopping/lists/${listId}/items/${itemId}/purchased`)
      .set(purchased)
      .catch((err) => {
        console.error(`Error updating item ${itemId} in list ${listId}:`, err);
        throw err; // Re-throw the error
      });
  }

  /**
   * Deletes an item from a list.
   */
  deleteItemFromList(listId: string, itemId: string): Promise<void> {
    if (!this.currentUserUid || !listId || !itemId) {
      console.error("deleteItemFromList called with missing UID, list ID, or item ID");
      return Promise.reject("User not logged in, list or item ID missing.");
    }
    // remove returns a Promise<void>
    return this.db
      .object(`/shopping/lists/${listId}/items/${itemId}`)
      .remove()
      .catch((err) => {
        console.error(`Error deleting item ${itemId} from list ${listId}:`, err);
        throw err; // Re-throw the error
      });
  }

  /**
   * Invites a user to a list by email.
   * Simplified client-side version. Needs Firebase Security Rules to prevent abuse.
   * A robust implementation would use Firebase Cloud Functions to look up users securely
   * and handle invitations (e.g., creating an invitation node).
   * This version attempts to find the user by email and add them directly to members.
   */
  async inviteMemberToList(listId: string, invitedEmail: string): Promise<void> {
    if (!this.currentUserUid || !listId || !invitedEmail || invitedEmail.trim() === "") {
      console.error("inviteMemberToList called with missing UID, list ID, or empty email");
      return Promise.reject("User not logged in, list ID missing, or email empty.");
    }

    const trimmedEmail = invitedEmail.trim();

    try {
      // --- SIMPLIFIED CLIENT-SIDE MEMBER ADDITION ---
      // Look up the user by email in the /users node
      const usersRef = this.db.list<UserProfile>("/users", (ref) => ref.orderByChild("email").equalTo(trimmedEmail));

      // Get the snapshot changes and convert to a promise to get a single result
      // We use take(1) to automatically unsubscribe after the first emission
      const snapshot = await usersRef
        .snapshotChanges()
        .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key as string, ...(c.payload.val() as any) }))))
        .toPromise();

      const invitedUser = snapshot?.[0]; // Get the first user found

      if (invitedUser && invitedUser.key) {
        const invitedUserId = invitedUser.key;
        // Add the user's UID to the list's members node with value true
        // Security rules should ensure only list owner/members can do this
        return this.db
          .object(`/shopping/lists/${listId}/members/${invitedUserId}`)
          .set(true)
          .catch((err) => {
            console.error(`Error adding member ${invitedUserId} to list ${listId}:`, err);
            throw err; // Re-throw the error
          });
      } else {
        // User not found in your /users node with that email
        // In a real app with invitations, you'd add to an /invitations node here.
        // For this simplified version, we indicate failure.
        console.log(`User with email ${trimmedEmail} not found in /users node.`);
        return Promise.reject("User with that email address was not found.");
      }
    } catch (error: any) {
      console.error("Error inviting member:", error);
      // Provide a more generic message for the user unless the error is specific and safe to show
      const userMessage = error.message ? `Failed to invite member: ${error.message}` : "Failed to invite member.";
      return Promise.reject(userMessage);
    }
  }

  /**
   * Removes a member from a list.
   * Requires security rules to ensure only authorized users (e.g., owner) can do this.
   */
  removeMemberFromList(listId: string, memberUid: string): Promise<void> {
    if (!this.currentUserUid || !listId || !memberUid) {
      console.error("removeMemberFromList called with missing UID, list ID, or member UID");
      return Promise.reject("User not logged in, list ID or member UID missing.");
    }
    // Add check to prevent removing self if that's desired UX, but security rules are primary defense.
    if (this.currentUserUid === memberUid) {
      return Promise.reject("Cannot remove yourself from the list.");
    }
    // remove returns a Promise<void>
    return this.db
      .object(`/shopping/lists/${listId}/members/${memberUid}`)
      .remove()
      .catch((err) => {
        console.error(`Error removing member ${memberUid} from list ${listId}:`, err);
        throw err; // Re-throw the error
      });
  }

  // Optional: Method to get the list owner's UID (may not be needed if list object already has owner)
  getListOwner(listId: string): Observable<string | null> {
    if (!listId) {
      return of(null);
    }
    return this.db
      .object<string>(`/shopping/lists/${listId}/owner`)
      .valueChanges()
      .pipe(
        catchError((err) => {
          console.error(`Error getting owner for list ${listId}:`, err);
          return of(null); // Return null on error
        }),
      );
  }

  async deleteList(listId: string): Promise<void> {
    if (!listId) {
      throw new Error("List ID is required to delete a list.");
    }

    try {
      await this.db.object(`/shopping/lists/${listId}`).remove();
    } catch (error) {
      console.error("Error deleting list:", error);
      throw error;
    }
  }
}
