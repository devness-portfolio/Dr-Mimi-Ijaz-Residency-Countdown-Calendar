# Add the residency countdown widget without publishing an app

This widget runs inside the existing **Scriptable** app. You do not need Xcode, a developer account, or your own App Store app. The person adding the widget does need Scriptable installed on their iPhone. The countdown script is just a file you can share.

## Set it up on iPhone

1. Install [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) from the App Store.
2. Send `Residency Countdown.js` to the iPhone (AirDrop, Messages, email, or a shared file).
3. Open the file on the iPhone, tap **Share**, and choose **Scriptable**. In Scriptable, save or import it with the name `Residency Countdown` and tap Run once.
4. Touch and hold an empty area on the Home Screen and tap **Edit** / **Add Widget**.
5. Find **Scriptable**, choose a small, medium, or large widget, and add it.
6. Touch and hold the added widget, choose **Edit Widget**, and select `Residency Countdown` as its script.

The script uses the phone's local timezone and the website's July 1, 2022 to July 1, 2027 dates. Tapping the widget opens the full countdown website. Scriptable widgets refresh under iOS's schedule, so the number can update a little after midnight. The separate native timer shows total hours, minutes, and seconds remaining. Scriptable uses the system timer presentation, so its formatting and visible update cadence are controlled by the operating system. The day count and percentage update when the script refreshes.

## Show that iPhone widget on the Mac

Apple can show an iPhone app's widgets on a Mac. The iPhone needs iOS 17 or later; sign both devices into the **same Apple Account** and keep them nearby or on the same Wi-Fi network.

On the Mac, open **System Settings → Desktop & Dock → Widgets**, enable **Use iPhone widgets**, then Control-click the desktop and choose **Edit Widgets**. Find Scriptable's `Residency Countdown` widget and add it. It is the iPhone widget mirrored to the Mac, so you do not install a separate Mac app.

## Celebration mode

On or after July 1, 2027, the widget changes to `YOU DID IT!`, the congratulations, and Alhamdulillah. Medium and large widgets also show the Arabic verse, translation, and citation.

## Updated desktop layout and live timer

Replace the contents of your existing `Residency Countdown` script in Scriptable with the updated JavaScript file and run it once. Keep the same script selected in your widgets. The medium widget uses a compact two-column layout; small and large widgets stack the countdown vertically.

The timer uses `WidgetDate.applyTimerStyle()` with the actual completion date. It can update independently of script refreshes; it is not a custom months/weeks/days/seconds display. Mirrored iPhone widgets on macOS may update less frequently, so continuous second-by-second animation on the Mac is not guaranteed. At completion, the system must refresh the script to show the celebration; until then a native timer can start counting upward.

For pastel colors on the Mac, choose **System Settings → Desktop & Dock → Widgets → Widget style → Full-color**. Automatic or monochrome styles can mute the colors. Use the medium widget for the compact desktop layout.

## Large widget breakdown

The large Scriptable widget adds a two-row months / weeks / days / hours / minutes / seconds snapshot with an “as of” time. Months use calendar arithmetic with month-end clamping, matching the website; the remaining duration is split into weeks, days, hours, minutes, and seconds. These are component values, not six independent totals.

Custom text cannot tick every second in Scriptable widgets. This snapshot requests a refresh after 15 minutes (or the next day-count transition, if sooner); the operating system may delay it. A separate native timer to the actual completion date remains below the snapshot. Small and medium widgets keep their existing layout. Tap the widget to see the full six-unit countdown updating each second on the website.
