import { Component, OnInit } from '@angular/core';
import {
  ProfileData,
  Project,
} from 'src/app/models/interface/profile.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  pageTitle = 'Profile';
  profileData: ProfileData;
  pageMetaTags = [
    {
      name: 'description',
      content:
        'Summarize all your expenses here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expenses in better way. Soon we will also give finance tips that will help you better.',
    },
    {
      name: 'keyword',
      content:
        'Summarize, Summarize, arise, arize, money management, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis',
    },
    {
      name: 'author',
      content: 'Sandeep Kumar',
    },
  ];
  userProfile: any;
  educationDetails: string[] = [];
  educationPhase: string = '';
  projects: Project[] = [];
  friendsGroup = [];
  subjects: string = '';
  updateDisabled: boolean = true;
  public alertButtons = [
    {
      text: 'Submit',
      role: 'confirm',
      handler: (value: object) => {
        this.addProjectDetail(value);
      },
    },
  ];
  public alertInputs = [
    {
      placeholder: 'Active project name',
    },
  ];

  constructor(
    private seoService: SeoService,
    private alertService: AlertService,
    private profileService: ProfileService
  ) {}

  async ngOnInit() {
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.userProfile = this.profileService.getUserProfile();
    this.profileData = await this.profileService.getProfileData();
    if (this.profileData.educationDetails) {
      this.populateProfileData(this.profileData);
    }
    this.getProjects();
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
  async deleteProject(item:Project){
    const response = await this.alertService.deleteAlert();
    if (response === "confirm") {
      this.profileService.deleteProjects(item.idField);
    }
    
  }
}
