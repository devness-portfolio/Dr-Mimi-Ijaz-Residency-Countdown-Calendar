AGENTS.md

Project Overview

This repository contains a small static web application celebrating the completion of Dr. Mimi Ijaz’s residency.

Residency timeline:

* Start: July 1, 2022
* Completion: July 1, 2027

The application counts down to the completion date, displays progress through residency, and automatically transforms into a celebration page when residency is complete.

This is intentionally a small personal project.

Keep it simple.

⸻

Primary Goal

Build and maintain a polished, cute, reliable countdown website that can be hosted entirely on GitHub Pages with essentially zero ongoing maintenance.

Prioritize:

1. Visual polish
2. Correct countdown behavior
3. Mobile experience
4. Simplicity
5. Maintainability
6. GitHub Pages compatibility

Do not introduce complexity that does not directly improve the user experience.

⸻

Source of Truth

When implementing the initial application, follow the project handoff/specification provided by the user.

This AGENTS.md defines ongoing engineering rules and constraints.

If there is a conflict:

1. Explicit user instructions win.
2. The project handoff/specification wins.
3. This AGENTS.md applies next.
4. Existing implementation conventions apply after that.

Do not silently override explicit requirements.

⸻

Technology

Prefer:

* HTML5
* CSS3
* Vanilla JavaScript
* SVG
* Lightweight static image assets

Avoid frameworks unless explicitly requested.

Do NOT introduce React, Vue, Angular, Next.js, backend frameworks, databases, or other infrastructure simply because they are familiar.

The preferred architecture is a static site that GitHub Pages can serve directly.

No build step should be required unless there is a compelling reason.

⸻

Architecture Philosophy

Prefer:

* Simple over sophisticated
* Static over dynamic
* Native browser APIs over dependencies
* Small functions over unnecessary classes
* Readable code over clever code
* CSS/SVG over large graphics libraries
* Relative paths over deployment-specific absolute paths
* Visual polish over architectural complexity

Avoid speculative extensibility.

Do not build infrastructure for hypothetical future features.

This is a countdown website, not a SaaS platform.

⸻

Important Dates

Production dates are:

Residency Start:
July 1, 2022 at 12:00 AM
Residency Completion:
July 1, 2027 at 12:00 AM

Store these values in one clearly identifiable configuration location.

Do not duplicate hardcoded dates throughout the application.

Use explicit date construction.

Avoid ambiguous parsing such as:

new Date("07/01/2027")

Use the same timezone strategy consistently for the start date, completion date, countdown, and progress calculation.

Document the chosen timezone behavior.

⸻

Countdown Requirements

The primary countdown must prominently show:

X days left

Also provide a detailed live breakdown containing:

* Months
* Weeks
* Days
* Hours
* Minutes
* Seconds

The countdown must update automatically.

The primary total-days-remaining calculation should be straightforward and reliable.

Do not allow any countdown value to become negative.

When the completion target is reached, immediately display celebration mode.

Loading the website after the completion date must also immediately display celebration mode.

Do not require a page deployment or manual configuration change on July 1, 2027.

⸻

Residency Progress

Calculate residency progress using:

July 1, 2022 → July 1, 2027

Progress should:

* Be 0% at the residency start.
* Be 100% at completion.
* Never be below 0%.
* Never exceed 100%.
* Be calculated dynamically.
* Use the same timezone assumptions as the countdown.

The progress bar is secondary to the primary countdown.

Do not make the page resemble an analytics dashboard.

⸻

Visual Style

The design should combine:

Kawaii

* Soft pastel colors
* Pink
* Lavender
* Cream
* Rounded shapes
* Soft shadows
* Clouds
* Stars
* Hearts
* Sparkles
* Bear and/or bunny characters

Medical / Residency

Potential elements include:

* White coat
* Stethoscope
* Medical bag
* Bandage
* Clipboard
* Heartbeat motif
* Doctor bear/bunny
* Graduation imagery

The result should feel:

* Cute
* Warm
* Romantic
* Personal
* Encouraging
* Celebratory

It should NOT resemble a hospital portal or generic medical website.

⸻

No Emoji

This is a strict design requirement.

Do NOT use Unicode emoji in the rendered website.

This includes:

* Headings
* Text
* Buttons
* Labels
* Decorative elements
* Celebration messages
* Footer content

Do not use emoji as shortcuts for visual design.

Use:

* SVG
* CSS
* Actual artwork
* Icons
* Shapes
* Animations

instead.

For example:

YOU DID IT!

is correct.

Do not append celebration or heart emoji.

Before considering the project complete, inspect user-visible content for accidental emoji.

⸻

Artwork

Prefer lightweight custom visual elements.

SVG and CSS are preferred when appropriate.

Cute doctor bear/bunny artwork is encouraged.

Avoid unnecessarily large raster assets.

Optimize image files before committing them.

Artwork should complement the countdown rather than overpower it.

⸻

Celebration Mode

Once the residency completion date is reached, replace the normal countdown experience with a celebration experience.

Primary text:

YOU DID IT!
Congratulations Meri Jaan!!
Alhamdulillah

Include tasteful animated confetti.

Confetti must use actual graphics/CSS/JavaScript/canvas rather than Unicode emoji.

The celebration may also include:

* Graphical hearts
* Stars
* Sparkles
* Celebrating kawaii characters
* Gentle entrance animations

Keep animations tasteful.

Do not make the page visually chaotic.

⸻

Quranic Verse

Celebration mode must include the Arabic verse first:

فَإِنَّ مَعَ الْعُسْرِ يُسْرًا

Then the English translation:

Verily, with hardship comes ease.

Then:

Qur'an 94:5 — Ash-Sharh

The Arabic must:

* Render right-to-left.
* Use lang="ar".
* Use dir="rtl".
* Be centered.
* Use an Arabic-capable font.
* Be comfortably readable.

Treat the verse respectfully.

Do not allow confetti, animation, artwork, or other decorations to interfere with readability.

Do not add emoji around it.

⸻

Responsive Design

Mobile-first.

The application should look excellent on phones.

Also verify:

* Small mobile
* Typical phone viewport
* Tablet
* Desktop/laptop

Avoid:

* Horizontal scrolling
* Tiny countdown text
* Overflowing cards
* Overflowing Arabic text
* Artwork covering content

Countdown cards may wrap naturally on smaller screens.

⸻

Accessibility

Use reasonable accessibility practices without over-engineering.

Include:

* Semantic HTML
* Logical heading hierarchy
* Adequate text contrast
* Appropriate image alt text
* aria-hidden for purely decorative elements when appropriate
* Correct Arabic direction/language markup
* Keyboard accessibility for any interactive controls

Support:

@media (prefers-reduced-motion: reduce)

Users requesting reduced motion should still receive the full experience without intensive animation.

⸻

GitHub Pages

Everything must remain compatible with static GitHub Pages hosting.

Do not require:

* Server-side code
* Databases
* Environment servers
* Docker
* Runtime secrets
* APIs
* Authentication

Be careful with asset paths.

Prefer relative paths that work when the application is hosted under a GitHub Pages repository path.

Do not assume the site is always hosted at the domain root.

⸻

Dependencies

Avoid dependencies unless they clearly provide enough value to justify themselves.

Before adding a dependency, ask:

Can this reasonably be implemented using browser-native HTML, CSS, JavaScript, SVG, or canvas?

If yes, prefer the native implementation.

Do not install a library just for:

* Confetti
* Simple animation
* Date formatting
* Basic icons
* DOM manipulation

unless there is a compelling technical reason.

⸻

Privacy

Do not introduce:

* Analytics
* Tracking
* Cookies
* Advertising
* User accounts
* Authentication
* Forms collecting personal information
* External databases

No external service should be necessary for the application to function.

⸻

Performance

Keep the application lightweight.

Avoid:

* Large libraries
* Large animation frameworks
* Huge images
* Excessive web fonts
* Unnecessary network requests

Optimize assets where practical.

The site should load quickly even on mobile.

⸻

Code Quality

Keep JavaScript functions focused.

Separate countdown calculations from DOM manipulation where practical.

Use descriptive names.

Prefer straightforward code.

Comments should explain WHY something non-obvious exists rather than narrating obvious syntax.

Avoid:

* Premature abstractions
* Deep class hierarchies
* Dependency injection
* State-management frameworks
* Excessive utility layers
* Unnecessary design patterns

Do not refactor working simple code into a more complicated architecture without a concrete benefit.

⸻

Testing Expectations

Do not create a massive testing infrastructure for this project.

Before declaring work complete, verify the important behaviors.

Test:

1. Production dates are correct.
2. Countdown renders.
3. Countdown ticks.
4. Total days remaining is correct.
5. Detailed countdown behaves correctly.
6. Values never become negative.
7. Progress calculation is correct.
8. Progress remains between 0% and 100%.
9. A temporary near-future completion date counts down correctly.
10. A temporary past completion date activates celebration mode.
11. Production dates are restored afterward.
12. Celebration mode works on direct page load.
13. Arabic renders RTL correctly.
14. Mobile layout works.
15. Desktop layout works.
16. Reduced-motion behavior works.
17. GitHub Pages asset paths work.
18. No Unicode emoji appear in the rendered site.

Do not claim a test was performed unless it actually was.

⸻

Changes to Existing Code

When modifying existing code:

1. Read the relevant files first.
2. Understand the existing implementation.
3. Make the smallest reasonable change.
4. Preserve working behavior unrelated to the request.
5. Avoid broad refactors unless necessary.
6. Test the affected behavior afterward.

Do not rewrite the entire project to solve a small problem.

⸻

Decision Making

The user intentionally wants this project to require very little supervision.

Make reasonable implementation decisions independently.

Do NOT repeatedly stop to ask about:

* Minor spacing
* Exact shades of pastel colors
* Small typography decisions
* File organization
* Animation durations
* Routine responsive behavior
* Minor CSS implementation details
* Normal JavaScript implementation choices

Use good judgment and continue.

Ask the user only when:

* A requirement is genuinely ambiguous and materially affects the result.
* Required information is missing and cannot reasonably be inferred.
* A requested change conflicts with another explicit requirement.
* A significant architectural deviation appears necessary.
* An action could destroy or overwrite meaningful user work.

⸻

Scope Control

Do not spontaneously add unrelated features.

Unless explicitly requested, do not add:

* Login
* Admin panel
* CMS
* Guestbook
* Photo uploads
* Email notifications
* Push notifications
* Sharing system
* Social-media integrations
* Database
* API
* Backend
* Analytics
* Complex settings
* Theme switcher

Focus on making the countdown experience excellent.

⸻

Definition of Done

A change is complete when:

* The requested behavior works.
* Existing relevant behavior still works.
* The site remains GitHub Pages compatible.
* Mobile behavior has been considered.
* No unnecessary complexity was introduced.
* No accidental emoji were introduced.
* Production date configuration remains correct.
* Any temporary test configuration has been restored.
* Documentation is updated if behavior or configuration changed.

For the initial implementation, also validate the full project handoff acceptance criteria.

⸻

Final Review

Before finishing a substantial implementation session:

1. Review the diff.
2. Remove debugging code.
3. Remove unused files.
4. Remove unused CSS and JavaScript where reasonably obvious.
5. Verify the production dates are July 1, 2022 and July 1, 2027.
6. Verify GitHub Pages-compatible paths.
7. Check for accidental emoji.
8. Verify countdown mode.
9. Verify celebration mode.
10. Verify responsive behavior.
11. Verify reduced-motion behavior.
12. Update README if necessary.

Then provide the user with a concise summary of:

* What changed
* Important decisions
* Verification actually performed
* Any known limitations
* Any action still required from the user

Never claim work is complete or tested when the available evidence does not support that claim.

⸻

Guiding Principle

This project should remain small enough that another developer can open the repository, understand it within a few minutes, and safely modify it.

Do not over-engineer a love letter disguised as a countdown timer.