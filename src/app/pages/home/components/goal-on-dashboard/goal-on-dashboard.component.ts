import { Component, OnInit } from '@angular/core';
import { AchievementsService } from 'src/app/services/achievements/achievements.service';
import { GoalService } from 'src/app/services/goal/goal.service';

@Component({
  selector: 'app-goal-on-dashboard',
  templateUrl: './goal-on-dashboard.component.html',
  styleUrls: ['./goal-on-dashboard.component.scss'],
})
export class GoalOnDashboardComponent implements OnInit {
  dailyGoals: any;

  constructor(
    private goalService: GoalService,
    private achievementService: AchievementsService
  ) {}

  ngOnInit() {
    this.getGoal();
    this.getAchievement();
  }

  async getAchievement() {
    await this.achievementService.getAchievement(4).subscribe((res) => {
      console.log(res);
    });
  }

  async getGoal() {
    await this.goalService.getGoal().subscribe((res: any) => {
      console.log(res);
      this.dailyGoals = res;
    });
  }
}
