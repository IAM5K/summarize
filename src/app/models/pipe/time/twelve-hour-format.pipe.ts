import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "twelveHourFormat",
})
export class TwelveHourFormatPipe implements PipeTransform {
  transform(value: string): string {
    // Extract the hours and minutes from the input value
    const [hours, minutes] = value.split(":").map(Number);

    // Determine if the time is AM or PM
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    let formattedHours = hours % 12 || 12;

    // Return the formatted time string
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  }
}
