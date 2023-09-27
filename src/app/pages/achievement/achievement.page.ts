import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AchievementsService } from 'src/app/services/achievements/achievements.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage implements OnInit {

  pageTitle = "Achievement";
  pageMetaTags = [
    {
      name: 'description',
      content: "Summarize all your achievements here. Summarize will help you to list them immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expenses in better way."
    },
    {
      name: 'keyword',
      content: 'summarize-ng, Summarize, arise, arize, achievement managemnet, achievements, achievement analysis,summarize-ng, summarize-ng, digital dairy, motivation from Achievement'
    },
    {
      name: 'author',
      content: 'Sandeep Kumar'
    }
  ];
  Achievements: any = [];
  achievementsCount: number = 0;
  getCount: number = 0;
  currentTime = (new Date().getHours()+":"+ new Date().getMinutes())
  achievementTypes = [
    { title: "Adventure", value: "Adventure" },
    { title: "Bussiness", value: "Bussiness" },
    { title: "Career", value: "Career" },
    { title: "Enjoyment", value: "Enjoyment" },
    { title: "Family", value: "Family" },
    { title: "Finances", value: "Finances" },
    { title: "Friends", value: "Friends" },
    { title: "Health", value: "Health" },
    { title: "Intellectual", value: "Intellectual" },
    { title: "Lifestyle", value: "Lifestyle" },
    { title: "Personal Growth", value: "Personal Growth" },
    { title: "Physical Environment", value: "Physical Environment" },
    { title: "Recreation", value: "Recreation" },
    { title: "Relationships", value: "Relationships" },
    { title: "Self-Development.", value: "Self-Development." },
    { title: "Spiritual Growth", value: "Spiritual Growth" },
    { title: "Volunteering", value: "Volunteering" },
    { title: "Well-being", value: "Well-being" },
    { title: "Miscellaneous", value: "miscellaneous" },
  ]
  constructor(
    private fb: FormBuilder,
    private seoService: SeoService,
    private achievementService: AchievementsService,
    private datePipe: DatePipe
  ) { }
  dateToday: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  achievementForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    workingSince: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    achievedOn: [this.dateToday, [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    title: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    endTime: [this.currentTime, [Validators.pattern('^[0-9:]*$')]],
    type: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 :/.,-]*$')]],
    description: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    updatedAt: [serverTimestamp()]
  })
  ngOnInit() {
    this.getAchievement();
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
  }

  async getAchievement() {
    this.getCount = 5;
    await this.achievementService.getAchievement(this.getCount).subscribe(res => {
      this.Achievements = res;
      this.achievementsCount = this.Achievements.length
    })

  }
  async getAllAchievement() {
    this.getCount = 0;
    await this.achievementService.getAchievement(this.getCount).subscribe(res => {
      this.Achievements = res
      this.achievementsCount = this.Achievements.length
    })

  }
  addAchievement() {
    this.achievementService.addAchievement(this.achievementForm.value)
  }

  deleteAchievement(idField: string) {
    this.achievementService.deleteAchievement(idField)
  }

}
