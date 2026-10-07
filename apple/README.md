# Residency Countdown for iPhone and Mac

A native SwiftUI companion with WidgetKit extensions. Requires **iOS 17+**, **macOS 14+**, and **Xcode 15+** (use an Xcode version supporting your device's OS). No third-party packages, server, accounts, or shared data container are needed.

## Open and install

1. Install full Xcode, launch it, and install the iOS platform support when prompted.
2. Open `ResidencyCountdown.xcodeproj`.
3. Select **ResidencyiOS** for iPhone/iPad or **ResidencymacOS** for Mac in the scheme menu.
4. In **Signing & Capabilities**, select your development team for the app and its matching Widget target. If necessary, replace the bundle identifiers with your own unique identifiers; keep the widget identifier prefixed by its app identifier.
5. Choose your Mac, an iPhone simulator, or your connected iPhone and run the app once.
6. Add **Residency Countdown** from the widget gallery:
   - iPhone Home Screen: touch and hold the background, choose Edit/Add Widget (or the plus button), then search for Residency Countdown.
   - iPhone Lock Screen: customize the Lock Screen and use Add Widgets. Circular, rectangular, and inline variants are included.
   - Mac: right-click the desktop, choose Edit Widgets, then find Residency Countdown.

The Xcode project includes four targets: a native app and widget extension for each platform. Both extensions are embedded in their matching apps. Shared schemes are checked in; no project generator is needed.

## Included

- Small, medium, and large widgets on both platforms.
- Three iPhone Lock Screen formats.
- Pastel pink, cream, and lavender styling, remaining days, and progress.
- Automatic celebration text at completion. Large widgets and the app also show the Arabic-first verse and translation.
- The Mac app bundles the full website: matching pastel cards, doctor bunny, live detailed countdown, and celebration screen, all available offline. Its resizable window uses the website’s phone and desktop layouts.
- The native iOS companion keeps its compact card and a link to the full website.
- Accessible progress labels and no Unicode emoji. The Mac app preserves the website’s reduced-motion support for celebration animations.

## Dates and updates

`Shared/Residency.swift` is the native date configuration: July 1, 2022 through July 1, 2027, at midnight in the device's current timezone. It matches the website's local-midnight behavior and rounded-up elapsed 24-hour days. The website retains its JavaScript configuration; if dates change, update both configurations.

WidgetKit does not run the website or its once-per-second JavaScript timer. The widget supplies future entries at the precise times its displayed whole-day count changes, including completion, and requests a daily reload. The system controls actual presentation and refresh timing, so exact-to-the-second celebration is not guaranteed. Opening the app requests fresh widget timelines after travel/timezone changes. The native iOS companion view refreshes each minute. The Mac app uses the website’s once-per-second countdown.

No network is needed for the app or widget countdown. The iOS companion’s website link opens the existing GitHub Pages URL in the browser. The Mac app loads the repository’s `index.html`, `css`, `js`, and `assets` from its app bundle through WKWebView, without fetching the hosted site. These files are referenced directly by the Mac target’s Copy Bundle Resources phase; rebuild the Mac app after website changes. The Mac view uses the dates in `js/countdown.js`; native widgets continue to use `Shared/Residency.swift`. The native app does not sync settings because there are no editable settings.

## Validation

Run the Foundation-only checks without full Xcode, from this directory:

```sh
swiftc -module-cache-path /tmp/mimi-swift-cache Shared/Residency.swift Tests/main.swift -o /tmp/mimi-countdown-tests
/tmp/mimi-countdown-tests
```

Checks cover start/completion, clamping, day transitions, timeline completion entries, and DST across four timezones.

With full Xcode installed:

```sh
xcodebuild -project ResidencyCountdown.xcodeproj -scheme ResidencymacOS -configuration Debug CODE_SIGNING_ALLOWED=NO build
xcodebuild -project ResidencyCountdown.xcodeproj -scheme ResidencyiOS -sdk iphonesimulator -configuration Debug CODE_SIGNING_ALLOWED=NO build
```

Before device delivery, preview all widget sizes, Lock Screen styles, light/dark/tinted appearances, larger text, and celebration mode. To preview completion, pass a future `Date` into `ResidencyEntry` or `Countdown` in an Xcode preview, keeping production milestones intact.

The countdown checks and an unsigned Debug build of the Mac app and widget extension pass with Xcode 26.3. The Mac bundle includes byte-for-byte copies of the website resources. iOS compilation, signing, and rendered widget previews remain unverified. App icons and App Store/TestFlight packaging are not included in this local-install project.
