import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-quick-goal-modal",
  templateUrl: "./quick-goal-modal.component.html",
  styleUrls: ["./quick-goal-modal.component.scss"],
})
export class QuickGoalModalComponent implements OnInit {
  goalTitle: string = "";
  goalDescription: string = "";
  actionSteps: string[] = [];
  newActionStep: string = "";

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  addActionStep() {
    const step = this.newActionStep.trim();
    if (step) {
      this.actionSteps.push(step);
      this.newActionStep = '';
    }
  }

  removeActionStep(index: number) {
    if (index > -1 && index < this.actionSteps.length) {
      this.actionSteps.splice(index, 1);
    }
  }

  saveGoal() {
    if (!this.goalTitle.trim()) return;
    const goalData = {
      title: this.goalTitle.trim(),
      description: this.goalDescription.trim(),
      actionSteps: [...this.actionSteps],
    };
    this.modalController.dismiss(goalData);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
