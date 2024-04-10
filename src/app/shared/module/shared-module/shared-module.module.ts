// shared.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "../../components/header/header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule, // Import IonicModule if you're using Ionic components in the shared module
  ],
  exports: [HeaderComponent], // Export the component to make it available in other modules
})
export class SharedModule {}
