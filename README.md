# Dr. Mimi Ijaz’s Residency Countdown

A small love letter disguised as a countdown: pastel colors, an interactive doctor bunny, and an automatic celebration. No dependencies, build step, external requests, or tracking.

## Preview

Screenshot placeholder: add a screenshot of the deployed site here.

## Run locally

Open `index.html` directly, or run `python3 -m http.server 8000` in this directory and visit `http://localhost:8000`.

## Files

- `index.html` — countdown and celebration markup
- `css/styles.css` — responsive styling and reduced-motion support
- `js/countdown.js` — date configuration, calculations, rendering, confetti
- `js/doctor-bunny.js` — shared native/web animation and tap routine
- `assets/bunny.svg` — original lightweight doctor bunny illustration
- `AGENTS.md` — project guidelines

## Dates and behavior

The two constants at the top of `js/countdown.js` configure July 1, 2022 through July 1, 2027, both at **midnight in the visitor’s local timezone**. Each visitor celebrates at their local midnight; this is intentionally not one simultaneous worldwide instant. JavaScript date constructors use zero-based month 6 for July.

The large number is remaining milliseconds divided by 24 hours, rounded up. The detail uses whole calendar months added to the current local date (clamped to the last day of the destination month), followed by weeks, days, hours, minutes, and seconds from the remaining elapsed duration. Weeks are seven 24-hour days; daylight-saving changes can affect the elapsed remainder. Values update every second and on returning to the tab. All values stay nonnegative.

Progress is elapsed time divided by the entire residency duration, clamped to 0–100%. The displayed percentage rounds down to one decimal place so it never says 100% before completion.

At the first update on or after completion, including a fresh page load, the countdown is replaced by the celebration, personal message, and Arabic-first Quranic verse. Confetti is restricted to the top of the card, away from the verse, and disabled for reduced-motion preferences. No deployment is needed on completion day.

For development, temporarily set `RESIDENCY_END` to a near-future or past date, then reload. Restore `new Date(2027, 6, 1, 0, 0, 0)` before publishing.

## Doctor bunny

Click, tap, or keyboard-activate the bunny to play the next activity and show a new encouragement message. Activities cycle through jumping, waving, heartbeat check, notes, reading, eating, tea, stretching, napping, and celebration. Each runs for 5.5 seconds; leaving it alone resumes automatic rotation with 8.5-second resting pauses. Rapid taps replace the current activity without stacking timers. Completion keeps the congratulatory message, while taps still explore the activities.

Reduced Motion shows changing still poses. Animation pauses while the page is hidden or the native app is inactive. The original SVG remains a fallback if canvas is unavailable. The same script is bundled into both native apps; its initialization guard prevents duplicate companions when native injection and the page both load it.

## Deploy with GitHub Pages

1. Create a GitHub repository and upload these files with `index.html` at its root.
2. Open the repository’s **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select **main** and **/ (root)**, then click **Save**.
5. Wait for deployment, then open the site link shown on the Pages screen.

All asset paths are relative, so repository subpaths work. No custom build workflow is required.
