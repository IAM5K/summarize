import { Component, OnInit } from '@angular/core';
import { AchievementsService } from 'src/app/services/achievements/achievements.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { GoalService } from 'src/app/services/goal/goal.service';

@Component({
  selector: 'app-goal-on-dashboard',
  templateUrl: './goal-on-dashboard.component.html',
  styleUrls: ['./goal-on-dashboard.component.scss'],
})
export class GoalOnDashboardComponent implements OnInit {
  dailyGoals: any;
  constructor(
    private firebaseService: FirebaseService,
    private goalService: GoalService
  ) {}

  ngOnInit() {
    this.getGoal();
  }
  async getGoal() {
    await this.firebaseService.getUserProfile();
    await this.goalService.getGoal().subscribe((res: any) => {
      console.log(res);
      this.dailyGoals = res;
    });
  }

updateDailyTask(checked: boolean, item) {
  console.log(item);
  
  item.progress = checked ? 100 : 0;
  // Optionally, you might want to update the item in your backend or localStorage
}

  
}
