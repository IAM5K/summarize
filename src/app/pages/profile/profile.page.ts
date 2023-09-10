import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  pageTitle = "Profile"
  pageMetaTags=[
    {
      name:'description',
      content:"Summarize all your expenses here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expenses in better way. Soon we will also give finance tips that will help you better."
    },
    {
      name:'keyword',
      content:'Summarize, Summarize, arise, arize, money management, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis'
    },
    {
      name:'author',
      content:'Sandeep Kumar'
    }
  ];
  userProfile: any;
  educationDetails:string[]=[];
  educationPhase: string="";
  subjects: string="";
  updateDisabled: boolean=true;

  constructor(
    private seoService: SeoService,
    private profileService: ProfileService
  ) {}
  
  ngOnInit() {
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.userProfile = this.profileService.getUserProfile();
    const apiData = {
      // educationPhase: 'Intermediate',
      // subjects: 'PCM',
      educationPhase: '',
      subjects: ''
    };

    // Check if data is available from the API
    if (apiData && apiData.educationPhase && apiData.subjects) {
      // Data is available, populate the form
      this.educationPhase = apiData.educationPhase;
      this.subjects = apiData.subjects;
      this.updateDisabled = false; 
    }
    else{
      this.updateDisabled = true; 
    }
  }

  onSubmit() {
    console.log('Education Phase:', this.educationPhase);
    console.log('Subjects:', this.subjects);
  }

  addEducationalDetail(){
    console.log('Education Phase:', this.educationPhase);
    console.log('Subjects:', this.subjects);
    const data={
      educationDetails:{
      educationPhase: this.educationPhase,
      subjects: this.subjects}
    }
    this.profileService.addEducationalDetail(data)
  }
}
