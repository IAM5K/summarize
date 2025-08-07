import { Injectable } from "@angular/core";
import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";
import { AlertService } from "../alert/alert.service";
import { ToasterService } from "../toaster/toaster.service";
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from "@capacitor/push-notifications";
import { Clipboard } from "@capacitor/clipboard";
@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  constructor(private toaster: ToasterService) {
    this.requestPermission();
  }

  // Request permission to show notifications (checks the 'display' property)
  private async requestPermission() {
    const permissionStatus = await LocalNotifications.requestPermissions();
    if (permissionStatus.display !== "granted") {
      console.log("Notifications permission not granted");
    }
  }

  // Info: Schedule a notification for 9 PM
  schedule9PMNotification() {
    const today = new Date();
    const ninePM = new Date(today.setHours(21, 0, 0, 0)); // Set time to 9 PM today
    // If it's already past 9 PM today, schedule it for tomorrow
    if (ninePM.getTime() < Date.now()) {
      ninePM.setDate(ninePM.getDate() + 1); // Move to 9 PM the next day
    }
    this.scheduleSummaryNotification(ninePM);
  }

  async scheduleSummaryNotification(time?: Date) {
    // Request notification permissions if not already granted
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display === "granted") {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Time to Summarize!",
            body: "Please open the app and summarize your day.",
            id: 1,
            schedule: { at: time, repeats: true, every: "day" }, // Schedule for daily 9 PM
            sound: "default",
            channelId: "default-channel",
            smallIcon: "res://drawable/ic_launcher_round",
            largeIcon: "res://drawable/ic_launcher_round",
          },
        ],
      });
      // this.toaster.showToast("Notification scheduled for 9 PM daily", "success");
    } else {
      console.warn("Notification permission denied");
    }
  }
  // Schedule a local notification
  async scheduleInstantNotification(time?) {
    // Request permission if not already granted
    const permission = await LocalNotifications.requestPermissions();

    if (permission.display === "granted") {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Time to Summarize!",
            body: "Please open the app and summarize your day.",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 60 * 0.1) }, // 1 minute later
            sound: "default",
            channelId: "instant-channel",
            smallIcon: "res://drawable/ic_launcher_round",
            largeIcon: "res://drawable/ic_launcher_round",
          },
        ],
      });
    } else {
      console.log("Notification permission denied");
    }
  }
  // Cancel all scheduled notifications
  async cancelAllNotifications() {
    await LocalNotifications.cancel({ notifications: [] });
    this.toaster.showToast("All notifications canceled", "warning");
  }

  initiatePushNotification() {
    // Request permission to use push notifications
    PushNotifications.requestPermissions()
      .then((result) => {
        if (result.receive === "granted") {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          console.log("Push notification permission not granted");
        }
      })
      .catch((error) => {
        console.warn("Error requesting push notification permissions: ", error);
      });

    // Registration success (you can log token but not show it to user)
    PushNotifications.addListener("registration", (token: Token) => {
      console.log("Push registration success, token: " + token.value);
      // Send the token to your server for later use
      // this.saveTokenToServer(token.value); // Implement this function
    });

    // Registration error
    PushNotifications.addListener("registrationError", (error: any) => {
      console.error("Error on registration: " + JSON.stringify(error));
    });

    // Push notification received
    PushNotifications.addListener("pushNotificationReceived", (notification: PushNotificationSchema) => {
      console.log("Push received: " + JSON.stringify(notification));
      // this.showNotification(notification); // Implement your own display logic
    });

    // Push notification action performed
    PushNotifications.addListener("pushNotificationActionPerformed", (notification: ActionPerformed) => {
      console.log("Push action performed: " + JSON.stringify(notification));
    });
  }

  checkNotificationPreference() {
    const notificationPref = localStorage.getItem("notification-preference");

    let preference = {
      notification: true,
      reminder: true,
    };

    // Parse the existing preference from localStorage if available
    if (notificationPref) {
      preference = JSON.parse(notificationPref);
    }

    if (preference.notification === false) {
      console.log("Notifications disabled by user.");

      // Check if the user has opted out of reminders as well
      if (preference.reminder) {
        // Show reminder to user about benefits of notifications
        this.toaster.showToast("Notifications help you stay disciplined. Consider enabling them!", "light");
      }
    } else {
      // Enable notifications if they don't exist or are set to true
      localStorage.setItem("notification-preference", JSON.stringify({ ...preference, notification: true }));
      this.initiatePushNotification();
    }
  }
}
