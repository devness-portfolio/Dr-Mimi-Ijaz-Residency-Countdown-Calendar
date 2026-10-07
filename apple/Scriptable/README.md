# Add the residency countdown widget without publishing an app

This widget runs inside the existing **Scriptable** app. You do not need Xcode, a developer account, or your own App Store app. The person adding the widget does need Scriptable installed on their iPhone. The countdown script is just a file you can share.

## Set it up on iPhone

1. Install [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) from the App Store.
2. Send `Residency Countdown.js` to the iPhone (AirDrop, Messages, email, or a shared file).
3. Open the file on the iPhone, tap **Share**, and choose **Scriptable**. In Scriptable, save or import it with the name `Residency Countdown` and tap Run once.
4. Touch and hold an empty area on the Home Screen and tap **Edit** / **Add Widget**.
5. Find **Scriptable**, choose a small, medium, or large widget, and add it.
6. Touch and hold the added widget, choose **Edit Widget**, and select `Residency Countdown` as its script.

The script uses the phone's local timezone and the website's July 1, 2022 to July 1, 2027 dates. Tapping the widget opens the full countdown website. Running the script inside Scriptable also opens the website in an in-app browser. There, each bunny tap plays the next activity and changes the encouragement; automatic rotation resumes when left alone. The interactive website requires a network connection and the updated website to be deployed. Scriptable widgets refresh under iOS's schedule, so the number can update a little after midnight. The separate native timer shows total hours, minutes, and seconds remaining. Scriptable uses the system timer presentation, so its formatting and visible update cadence are controlled by the operating system. The day count and percentage update when the script refreshes.

The Home Screen widget itself remains a static rendering: Scriptable does not expose browser-style animation or an in-place bunny click handler in `ListWidget`. Its countdown drawing still works offline. See [Scriptable’s widget documentation](https://docs.scriptable.app/listwidget/).

## Show that iPhone widget on the Mac

Apple can show an iPhone app's widgets on a Mac. The iPhone needs iOS 17 or later; sign both devices into the **same Apple Account** and keep them nearby or on the same Wi-Fi network.

On the Mac, open **System Settings → Desktop & Dock → Widgets**, enable **Use iPhone widgets**, then Control-click the desktop and choose **Edit Widgets**. Find Scriptable's `Residency Countdown` widget and add it. It is the iPhone widget mirrored to the Mac, so you do not install a separate Mac app.

## Celebration mode

On or after July 1, 2027, the widget changes to `YOU DID IT!`, the congratulations, and Alhamdulillah. Medium and large widgets also show the Arabic verse, translation, and citation.

## Website-inspired theme

Replace the contents of your existing `Residency Countdown` script in Scriptable with the updated JavaScript file and run it once. Keep the same script selected in your widgets. The widget now uses the website’s cream card, pink/lavender background, Georgia countdown numbers, pastel detail tiles, and progress bar.

The medium and large countdown widgets include the doctor bunny from `assets/bunny.svg`, translated into local drawing commands inside the script. No image downloads, companion files, or network connection are needed to render it. Small widgets prioritize the day count, live timer, and progress. Celebration layouts retain the personal messages, with an Arabic-first verse panel on medium and large widgets.

For pastel colors on the Mac, choose **System Settings → Desktop & Dock → Widgets → Widget style → Full-color**. Automatic or monochrome styles can mute the colors.

## Live timer and large widget breakdown

The large widget includes two rows of pink, lavender, and cream tiles for months / weeks / days / hours / minutes / seconds, with an “as of” time. Months use calendar arithmetic with month-end clamping, matching the website. These are component values, not six independent totals. Custom text cannot tick every second in Scriptable widgets. This snapshot requests a refresh after 15 minutes (or the next day-count transition, if sooner); the operating system may delay it.

All countdown sizes retain a separate native timer using `WidgetDate.applyTimerStyle()` with the actual completion date. It shows total hours, minutes, and seconds independently of script refreshes. Mirrored widgets on macOS may update less frequently. At completion, the system must refresh the script to show the celebration; until then a native timer can start counting upward. Tap the widget for the full website, including its live six-unit countdown and animated celebration.

## Validation

The JavaScript was syntax-checked and exercised with Scriptable API mocks across small, medium, and large countdown and celebration states. This checks script execution, text, native timer dates, and refresh scheduling; it does not substitute for a visual check in Scriptable on an iPhone or a mirrored Mac widget.

The tap-through update was checked with 50 mocked widget/in-app runs across five size configurations and five dates. These verify that only in-app runs open the browser and that widget countdown, celebration, native timer, artwork execution, and refresh scheduling remain intact. Actual iPhone browser presentation remains to be checked.
