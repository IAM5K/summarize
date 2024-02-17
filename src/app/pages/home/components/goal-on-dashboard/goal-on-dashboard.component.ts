import { Component, OnInit } from '@angular/core';
import { GoalData } from 'src/app/models/interface/goals.interface';
import { AchievementsService } from 'src/app/services/achievements/achievements.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { GoalService } from 'src/app/services/goal/goal.service';

@Component({
  selector: 'app-goal-on-dashboard',
  templateUrl: './goal-on-dashboard.component.html',
  styleUrls: ['./goal-on-dashboard.component.scss'],
})
export class GoalOnDashboardComponent implements OnInit {
  dailyGoals: GoalData[];
  priorityGoals:GoalData[];
  alertButtons = ['Close'];
  constructor(
    private firebaseService: FirebaseService,
    private goalService: GoalService
  ) {}

  ngOnInit() {
    this.getGoal();
  }
  async getGoal() {
    await this.firebaseService.getUserProfile();
    this.goalService.getDailyGoal().subscribe((res: any) => {
      console.log(res);
      this.dailyGoals = res;
    });
    this.goalService.getPriorityGoal().subscribe((res: any) => {
      console.log(res);
      this.priorityGoals = res;
    });
  }

  updateDailyTask(checked: boolean, item) {
    // console.log(item);
    item.progress = checked ? 100 : 0;
    this.goalService.updateGoal(item, item.idField);
  }
}
