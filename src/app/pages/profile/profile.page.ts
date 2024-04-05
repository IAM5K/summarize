import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { AccordionInfo } from "src/app/models/class/static/profile/accordion-info.model";
import { AccordionItem, AlertRadioOptions } from "src/app/models/interface/masterData.model";
import { ProfileData, Project } from "src/app/models/interface/profile.interface";
import { AlertService } from "src/app/services/alert/alert.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { SeoService } from "src/app/services/seo/seo.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
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
  subjects: string = "";
  updateDisabled: boolean = true;
  public alertButtons = [
    {
      text: "Submit",
      role: "confirm",
      handler: (value: object) => {
        this.addExamDetail(value);
      },
    },
  ];
  public alertInputs: AlertRadioOptions[] = [
    {
      name: "option",
      type: "radio",
      label: "Option 1",
      value: "option 1",
      id: "1",
    },
  ];
  public projectButtons = [
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

  constructor(
    private seoService: SeoService,
    private alertService: AlertService,
    private profileService: ProfileService,
    private alertController: AlertController,
  ) {}

  async ngOnInit() {
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.userProfile = this.profileService.getUserProfile();
    this.profileData = await this.profileService.getProfileData();
    if (this.profileData.educationDetails) {
      this.populateProfileData(this.profileData);
    }
    this.getProjects();
    this.getExams();
  }

  onSubmit() {
    // console.log('Education Phase:', this.educationPhase);
    // console.log('Subjects:', this.subjects);
  }

  populateProfileData(data: any) {
    // console.log(data);
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
      // console.log(res);
      this.projects = res;
    });
  }
  addEducationalDetail() {
    // console.log('Education Phase:', this.educationPhase);
    // console.log('Subjects:', this.subjects);
    const data = {
      educationDetails: {
        educationPhase: this.educationPhase,
        subjects: this.subjects,
      },
    };
    this.profileService.addEducationalDetail(data);
  }

  async getExams() {
    await this.profileService.getExams().subscribe((res: any) => {
      // console.log(res);
      this.examAspirations = res;
    });
  }
  addExamDetail(value: object) {
    const data = {
      name: Object.values(value)[0].toString(),
      isActive: true,
    };
    console.log("Exam:", data);
    console.log("Exam:", value);
    // this.profileService.addExams(data);
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
    // console.log('Project:', data);
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

  async presentAlertWithOptions() {
    const alert = await this.alertController.create({
      header: "Select Option",
      inputs: [
        {
          name: "option",
          type: "radio",
          label: "Option 1",
          value: "option1",
        },
        {
          name: "option",
          type: "radio",
          label: "Option 2",
          value: "option2",
        },
        {
          name: "option",
          type: "radio",
          label: "Option 3",
          value: "option3",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancelled");
          },
        },
        {
          text: "OK",
          handler: (data) => {
            console.log("Selected option:", data.option);
            // Handle selected option
          },
        },
      ],
    });

    await alert.present();
  }
  async presentEmailVerificationAlert() {
    const alert = await this.alertController.create({
      header: "Verify Email",
      message:
        "Verifying your email makes your account more secure and helps in easy account recovery.",
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
        message =
          "Verifying your email makes your account more secure and helps in easy account recovery.";
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
}
