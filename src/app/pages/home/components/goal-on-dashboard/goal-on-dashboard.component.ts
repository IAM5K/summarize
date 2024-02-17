import { Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoalData } from 'src/app/models/interface/goals.interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { GoalService } from 'src/app/services/goal/goal.service';

@Component({
  selector: 'app-goal-on-dashboard',
  templateUrl: './goal-on-dashboard.component.html',
  styleUrls: ['./goal-on-dashboard.component.scss'],
})
export class GoalOnDashboardComponent implements OnInit {
  dailyGoals: GoalData[];
  priorityGoals: GoalData[];
  alertButtons = ['Close'];
  goalForm: FormGroup;
  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private goalService: GoalService
  ) {
    this.goalForm = this.fb.group({
      updatedAt: [serverTimestamp()],
    });
  }

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

  updateDailyTask(checked: boolean, item: GoalData) {
    item.progress = checked ? 100 : 0;
    item.updatedAt = this.goalForm.value.updatedAt
    console.log(item);
    this.goalService.updateDailyGoal(item, item.idField);
  }

  updatePriorityTask(checked: boolean, item: GoalData) {
    item.progress = checked ? 100 : 0;
    item.updatedAt = this.goalForm.value.updatedAt
    console.log(item);
    this.goalService.updateGoal(item, item.idField);
  }
}
