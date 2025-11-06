import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { AccordionInfo } from "src/app/models/class/static/profile/accordion-info.model";
import { AccordionItem, AlertRadioOptions } from "src/app/models/interface/masterData.model";
import { Project } from "src/app/models/interface/profile.interface";
import { AlertService } from "src/app/services/alert/alert.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { SeoService } from "src/app/services/seo/seo.service";
import { ToasterService } from "src/app/services/toaster/toaster.service";
import { RealTimeDataBaseService } from "src/app/shared/db/real-time-data-base.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.page.html",
    styleUrls: ["./profile.page.scss"],
    standalone: false
})
export class ProfilePage implements OnInit, AfterViewInit {
  constructor(
    private seoService: SeoService,
    private alertService: AlertService,
    private profileService: ProfileService,
    private alertController: AlertController,
    private rtdb: RealTimeDataBaseService,
    private toaster: ToasterService,
  ) {}
  pageTitle = "Profile";
  profileData: any;
  accordionInfo = AccordionInfo.accordionInfo;
  pageMetaTags = SeoTags.profilePageTags;
  userProfile: any;
  educationDetails: string[] = [];
  educationPhase: string = "";
  examAspirations: any = [];
  projects: Project[] = [];
  friendsGroup = [];
  groupInputs = [
    {
      placeholder: "Group Name",
      name: "groupName",
      type: "text",
    },
  ];
  memberInputs = [
    {
      placeholder: "Member Name",
      name: "memberName",
      type: "text",
    },
  ];
  groupButtons = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Add",
      role: "confirm",
      handler: (value: any) => {
        if (value.groupName) {
          this.addGroup(value.groupName);
        }
      },
    },
  ];

  memberButtons(group: any) {
    return [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Add",
        role: "confirm",
        handler: (value: any) => {
          if (value.memberName) {
            this.addMember(group, value.memberName);
          }
        },
      },
    ];
  }

  subjects: string = "";
  updateDisabled: boolean = true;
  examsList: any[];
  examOptions: AlertRadioOptions[] = [];
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
          this.addExamDetail(value);
        } else {
          this.toaster.showToast("Submitted without selection", "danger");
        }
      },
    },
  ];

  projectButtons = [
    {
      text: "Submit",
      role: "confirm",
      handler: (value: object) => {
        this.addProjectDetail(value);
      },
    },
  ];
  public projectInputs = [
    {
      placeholder: "Active project name",
    },
  ];

  async ngOnInit() {
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.userProfile = this.profileService.getUserProfile();
    this.profileData = await this.profileService.getProfileData();
    if (this.profileData.educationDetails) {
      this.populateProfileData(this.profileData);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    this.getProjects();
    await this.getExams();
    this.fetchExamList();
  }
  fetchExamList(): void {
    try {
      this.rtdb.getTargetExam().subscribe((data) => {
        this.examsList = data;
      });
    } catch (error) {
      console.log("Error fetching exam list:", error);
      this.toaster.showToast("Error fetching exam list", "danger");
    }
  }
  updateAddExamOptions(): void {
    // Clear existing options
    this.examOptions = [];

    // Create a Set of exam names from examAspirations for efficient lookups
    const aspirationNamesSet = new Set(this.examAspirations.map((aspiration) => aspiration.name));

    // Iterate over each exam in the examsList
    for (const exam of this.examsList) {
      // Check if the exam is not present in examAspirations
      if (!aspirationNamesSet.has(exam.examShortName)) {
        // Construct AlertRadioOptions object and add it to examOptions
        const option: AlertRadioOptions = {
          name: "option",
          type: "radio",
          label: exam.examShortName,
          value: exam,
          id: exam.examShortName, // Using examShortName as id for uniqueness
        };

        this.examOptions.push(option);
      }
    }
  }

  populateProfileData(data: any) {
    if (data.educationDetails) {
      this.educationPhase = data.educationDetails.educationPhase;
      this.subjects = data.educationDetails.subjects;
      this.updateDisabled = false;
    } else {
      this.updateDisabled = true;
    }
  }
  async getProjects() {
    await this.profileService.getProjects().subscribe((res: any) => {
      this.projects = res;
    });
  }
  addEducationalDetail() {
    const data = {
      educationDetails: {
        educationPhase: this.educationPhase,
        subjects: this.subjects,
      },
    };
    this.profileService.addEducationalDetail(data);
  }

  getExams() {
    this.profileService.getExams().subscribe((res: any) => {
      this.examAspirations = res;
      this.updateAddExamOptions();
    });
  }
  addExamDetail(value: any) {
    const data = {
      name: value.examShortName,
      isActive: true,
    };
    this.profileService.addExams(data);
    this.updateAddExamOptions();
  }
  updateExamStatus(item: any) {
    const data = {
      name: item.name,
      isActive: item.isActive,
    };
    this.profileService.updateExams(data, item.idField);
  }
  async deleteExam(item: any) {
    const response = await this.alertService.deleteAlert();
    if (response === "confirm") {
      this.profileService.deleteExams(item.idField);
    }
  }
  addProjectDetail(value: object) {
    const data = {
      name: Object.values(value)[0].toString(),
      isActive: true,
    };
    this.profileService.addProjects(data);
  }
  updateProjectStatus(item: Project) {
    const data = {
      name: item.name,
      isActive: item.isActive,
    };
    this.profileService.updateProjects(data, item.idField);
  }
  async deleteProject(item: Project) {
    const response = await this.alertService.deleteAlert();
    if (response === "confirm") {
      this.profileService.deleteProjects(item.idField);
    }
  }
  async showProjectInfo() {
    const alert = await this.alertController.create({
      header: "Projects List",
      message:
        "Here you can add, view and manage your projects. When a project is added it is considered as active, you can make it inactive by using the toggle and it will not be visible in Time section.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async showAccordionInfo(accordion: AccordionItem) {
    const alert = await this.alertController.create({
      header: accordion.alert,
      message: accordion.message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentEmailVerificationAlert() {
    const alert = await this.alertController.create({
      header: "Verify Email",
      message: "Verifying your email makes your account more secure and helps in easy account recovery.",
      buttons: [
        {
          text: "Close",
          role: "cancel",
          cssClass: "secondary",
        },
        // {
        //   text: "Cancel",
        //   role: "cancel",
        //   cssClass: "secondary",
        // },
        // {
        //   text: "OK",
        //   handler: () => {
        //     // Handle verification process here, if needed
        //   },
        // },
      ],
    });

    await alert.present();
  }
  async profileAlert(parameter: string) {
    let header = "";
    let message = "";
    let buttons = [];
    switch (parameter) {
      case "email":
        header = "Verify Email";
        message = "Verifying your email makes your account more secure and helps in easy account recovery.";
        buttons = [
          {
            text: "Close",
            role: "cancel",
            cssClass: "secondary",
          },
          // {
          //   text: "Cancel",
          //   role: "cancel",
          //   cssClass: "secondary",
          // },
          // {
          //   text: "OK",
          //   handler: () => {
          //     // Handle verification process here, if needed
          //   },
          // },
        ];
        break;
      case "name":
        header = "Add Name";
        message = "Having a name helps us to address you better.";
        buttons = [
          {
            text: "Close",
            role: "cancel",
            cssClass: "secondary",
          },
        ];
        break;
      case "phone":
        header = "Add Phone Number";
        message =
          "Adding your phone number can enhance your account security and provide additional account recovery options. If needed, It also allows us to communicate important updates and notifications with you more effectively.";
        buttons = [
          {
            text: "Close",
            role: "cancel",
            cssClass: "secondary",
          },
          // {
          //   text: "Cancel",
          //   role: "cancel",
          //   cssClass: "secondary",
          // },
          // {
          //   text: "OK",
          //   handler: () => {
          //     // Handle verification process here, if needed
          //   },
          // },
        ];
        break;
      default:
        break;
    }
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }

  addGroup(groupName: string) {
    const newGroup = {
      id: Date.now(),
      name: groupName,
      members: [],
    };
    this.friendsGroup.push(newGroup);
  }

  deleteGroup(group: any) {
    this.friendsGroup = this.friendsGroup.filter((g) => g.id !== group.id);
  }

  addMember(group: any, memberName: string) {
    const targetGroup = this.friendsGroup.find((g) => g.id === group.id);
    if (targetGroup) {
      targetGroup.members.push(memberName);
    }
  }

  removeMember(group: any, memberName: string) {
    const targetGroup = this.friendsGroup.find((g) => g.id === group.id);
    if (targetGroup) {
      targetGroup.members = targetGroup.members.filter((m) => m !== memberName);
    }
  }
}
