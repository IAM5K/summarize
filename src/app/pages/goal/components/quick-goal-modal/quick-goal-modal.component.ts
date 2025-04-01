import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-quick-goal-modal',
  templateUrl: './quick-goal-modal.component.html',
  styleUrls: ['./quick-goal-modal.component.scss'],
})
export class QuickGoalModalComponent implements OnInit {
  goalTitle: string = '';
  goalDescription: string = '';
  actionSteps: string[] = [];
  newActionStep: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  addActionStep() {
    if (this.newActionStep.trim()) {
      this.actionSteps.push(this.newActionStep.trim());
      this.newActionStep = '';
    }
  }

  removeActionStep(index: number) {
    this.actionSteps.splice(index, 1);
  }

  saveGoal() {
    const goalData = {
      title: this.goalTitle,
      description: this.goalDescription,
      actionSteps: this.actionSteps,
    };
    this.modalController.dismiss(goalData);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
