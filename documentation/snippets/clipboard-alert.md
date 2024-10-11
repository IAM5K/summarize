```ts
  // Function to show alert with copy token button
  async showTokenAlert(token: string) {
    const alert = document.createElement("ion-alert");
    alert.header = "Push Token";
    alert.message = "Token: " + token;
    alert.buttons = [
      {
        text: "Copy Token",
        handler: () => {
          this.copyToClipboard(token);
        },
      },
      {
        text: "Close",
        role: "cancel",
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  // Function to copy token to clipboard
  async copyToClipboard(token: string) {
    await Clipboard.write({
      string: token,
    });
    alert("Token copied to clipboard");
  }
```
