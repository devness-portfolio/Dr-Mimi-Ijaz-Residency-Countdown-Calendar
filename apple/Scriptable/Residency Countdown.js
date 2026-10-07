// Residency countdown for the free Scriptable app.
// Dates use midnight in the device's current timezone, like the website.
const START = new Date(2022, 6, 1, 0, 0, 0);
const END = new Date(2027, 6, 1, 0, 0, 0);
const COLORS = {
  background: new Color("fff8f3"),
  ink: new Color("655063"),
  muted: new Color("806e7d"),
  pink: new Color("bd678d"),
  track: new Color("f0e8ef"),
};

const now = new Date();
const remaining = Math.max(0, END.getTime() - now.getTime());
const days = Math.ceil(remaining / 86400000);
const progress = Math.max(0, Math.min(1, (now - START) / (END - START)));
const complete = now >= END;

const widget = new ListWidget();
widget.backgroundColor = COLORS.background;
widget.setPadding(12, 16, 12, 16);
const small = config.widgetFamily === "small";
const large = config.widgetFamily === "large";
widget.url = "https://devness-portfolio.github.io/Dr-Mimi-Ijaz-Residency-Countdown-Calendar/";

const heading = widget.addStack();
heading.centerAlignContent();
const name = heading.addText("Dr. Mimi Ijaz");
name.font = Font.semiboldRoundedSystemFont(13);
name.textColor = COLORS.ink;
heading.addSpacer();
const sparkle = heading.addText("✦");
sparkle.font = Font.semiboldSystemFont(14);
sparkle.textColor = COLORS.pink;

widget.addSpacer(6);

if (complete) {
  const title = widget.addText("YOU DID IT!");
  title.font = Font.boldSystemFont(config.widgetFamily === "small" ? 24 : 30);
  title.textColor = COLORS.pink;
  title.minimumScaleFactor = 0.7;
  widget.addSpacer(5);
  const congratulations = widget.addText("Congratulations Meri Jaan!!");
  congratulations.font = Font.mediumRoundedSystemFont(14);
  congratulations.textColor = COLORS.ink;
  widget.addSpacer(4);
  const gratitude = widget.addText("Alhamdulillah");
  gratitude.font = Font.regularRoundedSystemFont(13);
  gratitude.textColor = COLORS.muted;
  if (config.widgetFamily !== "small") {
    widget.addSpacer(10);
    const verse = widget.addText("فَإِنَّ مَعَ الْعُسْرِ يُسْرًا");
    verse.font = Font.regularSystemFont(17);
    verse.centerAlignText();
    verse.textColor = COLORS.ink;
    widget.addSpacer(5);
    const translation = widget.addText("Verily, with hardship comes ease.\nQur'an 94:5 — Ash-Sharh");
    translation.font = Font.regularRoundedSystemFont(11);
    translation.textColor = COLORS.muted;
    translation.centerAlignText();
  }
} else {
  widget.addSpacer();
  // A horizontal medium layout fits desktop widgets without squeezing the timer.
  const body = widget.addStack();
  body.centerAlignContent();
  if (small || large) body.layoutVertically();
  const dayColumn = body.addStack();
  dayColumn.layoutVertically();
  const number = dayColumn.addText(days.toLocaleString());
  number.font = Font.regularRoundedSystemFont(large ? 72 : small ? 40 : 48);
  number.textColor = COLORS.pink;
  number.minimumScaleFactor = 0.6;
  number.lineLimit = 1;
  const label = dayColumn.addText("days left");
  label.font = Font.mediumRoundedSystemFont(12);
  label.textColor = COLORS.ink;

  body.addSpacer(small ? 5 : large ? 16 : 20);
  const detail = body.addStack();
  detail.layoutVertically();
  if (!small) {
    const caption = detail.addText("UNTIL YOUR NEXT CHAPTER");
    caption.font = Font.semiboldRoundedSystemFont(9);
    caption.textColor = COLORS.muted;
    caption.lineLimit = 1;
    caption.minimumScaleFactor = 0.7;
    detail.addSpacer(5);
  }
  // A native date element keeps time without rerunning the script each second.
  // Timer style uses total hours, minutes and seconds, not a custom day breakdown.
  const timer = detail.addDate(END);
  timer.applyTimerStyle();
  timer.font = Font.regularMonospacedSystemFont(small ? 16 : large ? 28 : 22);
  timer.textColor = COLORS.ink;
  timer.lineLimit = 1;
  timer.minimumScaleFactor = 0.6;
  if (!small) {
    detail.addSpacer(5);
    const date = detail.addText("July 1, 2027");
    date.font = Font.regularRoundedSystemFont(11);
    date.textColor = COLORS.muted;
  }
  widget.addSpacer();
  if (large) {
    const encouragement = widget.addText("One day closer, meri jaan.");
    encouragement.font = Font.regularRoundedSystemFont(14);
    encouragement.textColor = COLORS.ink;
    widget.addSpacer(12);
  }
  const percent = Math.floor(progress * 1000) / 10;
  const progressLabel = widget.addText(`${percent.toFixed(1)}% of residency complete`);
  progressLabel.font = Font.mediumRoundedSystemFont(9);
  progressLabel.textColor = COLORS.muted;
  progressLabel.lineLimit = 1;
  progressLabel.minimumScaleFactor = 0.7;
}

// Refresh when the rounded-up day count changes. The system controls the
// actual refresh budget, so updates can appear a little after this time.
if (!complete) {
  const nextChange = new Date(END.getTime() - Math.max(0, days - 1) * 86400000);
  widget.refreshAfterDate = nextChange > now ? nextChange : new Date(now.getTime() + 60 * 60 * 1000);
}

Script.setWidget(widget);
Script.complete();
