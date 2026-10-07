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

// Clamp month-end dates: January 31 + one month becomes February 28/29.
function addMonths(date, months) {
  const result = new Date(date);
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(date.getDate(), lastDay));
  return result;
}

function calculateCountdown(now, start = START, end = END) {
  const remaining = Math.max(0, end - now);
  const progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
  if (!remaining) return { complete: true, totalDays: 0, progress, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  let months = Math.max(0, (end.getFullYear() - now.getFullYear()) * 12 + end.getMonth() - now.getMonth());
  if (addMonths(now, months) > end) months--;
  let rest = Math.max(0, Math.floor((end - addMonths(now, months)) / 1000));
  const weeks = Math.floor(rest / 604800); rest %= 604800;
  const days = Math.floor(rest / 86400); rest %= 86400;
  const hours = Math.floor(rest / 3600); rest %= 3600;
  const minutes = Math.floor(rest / 60);
  return { complete: false, totalDays: Math.ceil(remaining / 86400000), progress, months, weeks, days, hours, minutes, seconds: rest % 60 };
}


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
  number.font = Font.regularRoundedSystemFont(large ? 48 : small ? 40 : 48);
  number.textColor = COLORS.pink;
  number.minimumScaleFactor = 0.6;
  number.lineLimit = 1;
  const label = dayColumn.addText("days left");
  label.font = Font.mediumRoundedSystemFont(12);
  label.textColor = COLORS.ink;

  body.addSpacer(small ? 5 : large ? 8 : 20);
  const detail = body.addStack();
  detail.layoutVertically();
  if (large) {
    const snapshot = calculateCountdown(now);
    const stamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const caption = detail.addText(`BREAKDOWN · AS OF ${stamp}`);
    caption.font = Font.mediumRoundedSystemFont(9);
    caption.textColor = COLORS.muted;
    detail.addSpacer(6);
    for (const units of [["months", "weeks", "days"], ["hours", "minutes", "seconds"]]) {
      const row = detail.addStack();
      for (let i = 0; i < units.length; i++) {
        if (i) row.addSpacer(12);
        const cell = row.addStack();
        cell.layoutVertically();
        cell.size = new Size(76, 0);
        const value = cell.addText(String(snapshot[units[i]]).padStart(2, "0"));
        value.font = Font.regularMonospacedSystemFont(22);
        value.textColor = COLORS.ink;
        value.lineLimit = 1;
        value.minimumScaleFactor = 0.6;
        const unit = cell.addText(units[i]);
        unit.font = Font.mediumRoundedSystemFont(10);
        unit.textColor = COLORS.muted;
      }
      detail.addSpacer(6);
    }
    const liveLabel = detail.addText("LIVE TIMER · TOTAL HOURS : MIN : SEC");
    liveLabel.font = Font.mediumRoundedSystemFont(9);
    liveLabel.textColor = COLORS.muted;
    detail.addSpacer(3);
  }
  if (!small && !large) {
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
  timer.font = Font.regularMonospacedSystemFont(small ? 16 : large ? 20 : 22);
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
    widget.addSpacer(6);
  }
  const percent = Math.floor(progress * 1000) / 10;
  const progressLabel = widget.addText(`${percent.toFixed(1)}% of residency complete`);
  progressLabel.font = Font.mediumRoundedSystemFont(9);
  progressLabel.textColor = COLORS.muted;
  progressLabel.lineLimit = 1;
  progressLabel.minimumScaleFactor = 0.7;
}

// Large widgets request a snapshot refresh after 15 minutes; the system
// controls actual timing. Native timer text updates independently.
if (!complete) {
  const nextChange = new Date(END.getTime() - Math.max(0, days - 1) * 86400000);
  widget.refreshAfterDate = large
    ? new Date(Math.min(nextChange.getTime(), now.getTime() + 15 * 60 * 1000))
    : nextChange;
}

Script.setWidget(widget);
Script.complete();
