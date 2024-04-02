import { NgModule } from "@angular/core";
import { TwelveHourFormatPipe } from "./twelve-hour-format.pipe";

@NgModule({
  declarations: [TwelveHourFormatPipe],
  exports: [TwelveHourFormatPipe],
})
export class TwelveHourFormatPipeModule {}
