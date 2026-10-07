// Residency countdown for the free Scriptable app.
// Dates use midnight in the device's current timezone, like the website.
const WEBSITE_URL = "https://devness-portfolio.github.io/Dr-Mimi-Ijaz-Residency-Countdown-Calendar/";
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


// Vector geometry from assets/bunny.svg, drawn locally: no downloads or extra files.
function doctorBunny() {
  const canvas = new DrawContext();
  canvas.size = new Size(180, 203);
  canvas.opaque = false;
  canvas.respectScreenScale = true;
  const shapes = [
    ["#e8d9e7","none",1.0,[["E",24.0,179.0,132.0,18.0]]],
    ["#fff9ee","#886a76",2.5,[["M",49.0,70.0],["C",25.0,9.0,49.0,-6.0,65.0,14.0],["L",77.0,65.0],["M",102.0,64.0],["L",117.0,15.0],["C",132.0,-8.0,153.0,10.0,130.0,72.0]]],
    ["none","#efbfd0",9.0,[["M",53.0,53.0],["C",41.0,19.0,50.0,12.0,57.0,24.0],["L",67.0,56.0],["M",113.0,55.0],["L",124.0,24.0],["C",132.0,10.0,141.0,20.0,128.0,57.0]]],
    ["#fff9ee","#886a76",2.5,[["M",54.0,124.0],["C",29.0,130.0,23.0,158.0,40.0,161.0],["L",51.0,150.0],["M",125.0,126.0],["C",150.0,121.0,162.0,106.0,169.0,117.0],["C",177.0,134.0,151.0,151.0,133.0,151.0]]],
    ["#fff9ee","#886a76",2.5,[["M",58.0,175.0],["L",54.0,185.0],["Q",59.0,195.0,76.0,187.0],["L",80.0,174.0],["M",104.0,174.0],["L",107.0,187.0],["Q",125.0,195.0,130.0,185.0],["L",124.0,173.0]]],
    ["#fff","#886a76",2.5,[["M",57.0,116.0],["Q",40.0,132.0,46.0,178.0],["Q",91.0,190.0,135.0,178.0],["Q",139.0,136.0,123.0,115.0]]],
    ["#e1dcec","#886a76",2.5,[["M",72.0,118.0],["L",89.0,142.0],["L",107.0,119.0]]],
    ["none","#d8c9d4",2.5,[["M",65.0,120.0],["L",61.0,140.0],["L",75.0,143.0],["L",67.0,151.0],["L",88.0,177.0],["M",114.0,120.0],["L",121.0,140.0],["L",107.0,145.0],["L",115.0,152.0],["L",97.0,178.0],["M",91.0,146.0],["L",91.0,180.0]]],
    ["#fff9ee","#886a76",2.5,[["M",42.0,89.0],["C",42.0,59.0,63.0,51.0,89.0,55.0],["C",118.0,49.0,143.0,63.0,140.0,91.0],["C",141.0,116.0,120.0,128.0,91.0,129.0],["C",61.0,129.0,41.0,115.0,42.0,89.0],["Z"]]],
    ["none","#87768d",2.5,[["M",72.0,119.0],["L",72.0,141.0],["Q",73.0,154.0,83.0,154.0],["Q",94.0,154.0,94.0,142.0],["L",94.0,129.0],["M",118.0,122.0],["L",118.0,151.0]]],
    ["#dbc8e4","#886a76",2.5,[["E",112.0,149.0,12.0,12.0]]],
    ["none","#655460",4.0,[["M",65.0,88.0],["L",65.0,93.0],["M",115.0,88.0],["L",115.0,93.0]]],
    ["none","#886a76",2.0,[["M",85.0,99.0],["Q",90.0,104.0,95.0,99.0],["M",90.0,104.0],["L",90.0,109.0],["M",90.0,109.0],["Q",85.0,113.0,81.0,108.0],["M",90.0,109.0],["Q",95.0,113.0,99.0,108.0]]],
    ["#f3c0cf","none",1.0,[["E",49.0,97.0,20.0,12.0]]],
    ["#f3c0cf","none",1.0,[["E",113.0,97.0,20.0,12.0]]],
    ["#cf92aa","none",1.0,[["M",128.0,67.0],["C",113.0,57.0,127.0,49.0,132.0,57.0],["C",140.0,49.0,150.0,61.0,128.0,67.0]]],
    ["#dfba77","none",1.0,[["M",20.0,83.0],["L",23.0,91.0],["L",31.0,94.0],["L",23.0,97.0],["L",20.0,105.0],["L",17.0,97.0],["L",9.0,94.0],["L",17.0,91.0],["Z"]]],
  ];
  for (const [fill, stroke, width, commands] of shapes) {
    const path = new Path();
    for (const [command, ...v] of commands) {
      switch (command) {
        case "M": path.move(new Point(v[0], v[1])); break;
        case "L": path.addLine(new Point(v[0], v[1])); break;
        case "C": path.addCurve(new Point(v[4], v[5]), new Point(v[0], v[1]), new Point(v[2], v[3])); break;
        case "Q": path.addQuadCurve(new Point(v[2], v[3]), new Point(v[0], v[1])); break;
        case "E": path.addEllipse(new Rect(...v)); break;
        case "Z": path.closeSubpath(); break;
      }
    }
    if (fill !== "none") {
      canvas.setFillColor(new Color(fill.replace("#", "")));
      canvas.addPath(path);
      canvas.fillPath();
    }
    if (stroke !== "none") {
      canvas.setStrokeColor(new Color(stroke.replace("#", "")));
      canvas.setLineWidth(width);
      canvas.addPath(path);
      canvas.strokePath();
    }
  }
  return canvas.getImage();
}

const now = new Date();
const state = calculateCountdown(now);
const family = config.widgetFamily || "large";
const small = family === "small";
const large = family === "large" || family === "extraLarge";
const widget = new ListWidget();
const backdrop = new LinearGradient();
backdrop.colors = [new Color("fff8f3"), new Color("f8e5ef"), new Color("eee7f4")];
backdrop.locations = [0, 0.5, 1];
backdrop.startPoint = new Point(0, 0);
backdrop.endPoint = new Point(1, 1);
widget.backgroundGradient = backdrop;
widget.setPadding(8, 8, 8, 8);
widget.url = WEBSITE_URL;

const card = widget.addStack();
card.layoutVertically();
card.setPadding(large ? 12 : 6, 10, large ? 12 : 6, 10);
card.backgroundColor = new Color("fffdfa");
card.cornerRadius = 20;
card.borderWidth = 1;
card.borderColor = new Color("ffffff");

function text(parent, value, size, color = COLORS.ink, serif = false) {
  const label = parent.addText(String(value));
  label.font = serif ? new Font("Georgia", size) : Font.mediumRoundedSystemFont(size);
  label.textColor = color;
  label.lineLimit = 1;
  label.minimumScaleFactor = 0.7;
  return label;
}
function centered(parent, value, size, color = COLORS.ink, serif = false) {
  const row = parent.addStack();
  row.addSpacer();
  const label = text(row, value, size, color, serif);
  label.centerAlignText();
  row.addSpacer();
  return label;
}
function bunny(parent, height) {
  const image = parent.addImage(doctorBunny());
  image.imageSize = new Size(height * 180 / 203, height);
  image.applyFittingContentMode();
}
function progressBar(parent, value) {
  const drawing = new DrawContext();
  drawing.size = new Size(280, 5);
  drawing.opaque = false;
  drawing.respectScreenScale = true;
  const track = new Path();
  track.addRoundedRect(new Rect(0, 0, 280, 5), 2.5, 2.5);
  drawing.setFillColor(COLORS.track);
  drawing.addPath(track);
  drawing.fillPath();
  if (value > 0) {
    const fill = new Path();
    fill.addRoundedRect(new Rect(0, 0, 280 * Math.min(1, value), 5), 2.5, 2.5);
    drawing.setFillColor(new Color("dda0b9"));
    drawing.addPath(fill);
    drawing.fillPath();
  }
  const image = parent.addImage(drawing.getImage());
  // Conservative widths fit the smallest supported phone widgets.
  image.imageSize = new Size(small ? 100 : large ? 220 : 240, 5);
  image.centerAlignImage();
}
function liveTimer(parent) {
  const row = parent.addStack();
  row.addSpacer();
  const timer = row.addDate(END);
  timer.applyTimerStyle();
  timer.font = Font.regularMonospacedSystemFont(small ? 11 : 12);
  timer.textColor = COLORS.ink;
  timer.lineLimit = 1;
  timer.minimumScaleFactor = 0.6;
  row.addSpacer();
}

if (!state.complete || small || large) {
  centered(card, "Dr. Mimi Ijaz’s", large ? 19 : 12, COLORS.ink, true);
  if (large) centered(card, "RESIDENCY COUNTDOWN", 9, COLORS.muted);
  card.addSpacer(4);
}

if (state.complete) {
  centered(card, "YOU DID IT!", large ? 30 : small ? 19 : 23, COLORS.pink, true);
  const congratulations = centered(card, "Congratulations Meri Jaan!!", large ? 15 : 11);
  congratulations.lineLimit = small ? 2 : 1;
  centered(card, "Alhamdulillah", large ? 13 : 10, COLORS.muted);
  if (large || small) {
    card.addSpacer(large ? 8 : 2);
    const art = card.addStack();
    art.addSpacer();
    bunny(art, large ? 84 : 26);
    art.addSpacer();
  }
  if (!small) {
    card.addSpacer(large ? 10 : 4);
    const verse = card.addStack();
    verse.layoutVertically();
    verse.backgroundColor = new Color("f7f2f8");
    verse.cornerRadius = 12;
    verse.setPadding(large ? 10 : 3, 5, large ? 10 : 3, 5);
    // Arabic text supplies its own RTL direction; keep it on a separate line.
    centered(verse, "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", large ? 23 : 17);
    centered(verse, "Verily, with hardship comes ease.", large ? 11 : 9);
    centered(verse, "Qur'an 94:5 — Ash-Sharh", large ? 9 : 8, COLORS.muted);
  }
  if (large) {
    card.addSpacer();
    centered(card, "So proud of you. Always.", 12, COLORS.pink, true);
  }
} else {
  const hero = card.addStack();
  hero.centerAlignContent();
  hero.addSpacer();
  const count = hero.addStack();
  count.layoutVertically();
  centered(count, state.totalDays.toLocaleString(), large ? 46 : small ? 32 : 34, COLORS.pink, true);
  centered(count, "days left", small ? 10 : 12);
  if (!small) {
    hero.addSpacer(14);
    bunny(hero, large ? 64 : 52);
  }
  hero.addSpacer();
  card.addSpacer(4);
  if (large) {
    const stamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    centered(card, `BREAKDOWN · AS OF ${stamp}`, 8, COLORS.muted);
    card.addSpacer(3);
    for (const units of [["months", "weeks", "days"], ["hours", "minutes", "seconds"]]) {
      const row = card.addStack();
      row.addSpacer();
      units.forEach((unit, index) => {
        if (index) row.addSpacer(5);
        const tile = row.addStack();
        tile.layoutVertically();
        tile.size = new Size(70, 38);
        tile.cornerRadius = 10;
        tile.borderWidth = 0.5;
        tile.borderColor = new Color(["eedfe7", "e7e0ef", "efe6d4"][index]);
        tile.backgroundColor = new Color(["fbf0f4", "f2eef8", "faf4e8"][index]);
        tile.addSpacer();
        centered(tile, String(state[unit]).padStart(2, "0"), 18);
        centered(tile, unit[0].toUpperCase() + unit.slice(1), 8, COLORS.muted);
        tile.addSpacer();
      });
      row.addSpacer();
      card.addSpacer(5);
    }
  }
  liveTimer(card);
  card.addSpacer(large ? 6 : 4);
  progressBar(card, state.progress / 100);
  card.addSpacer(3);
  centered(card, `${(Math.floor(state.progress * 10) / 10).toFixed(1)}% complete`, 9, COLORS.muted);
  if (large) {
    card.addSpacer();
    centered(card, "One day at a time, meri jaan.", 11, COLORS.pink, true);
  }
}

if (!state.complete) {
  const nextChange = new Date(END.getTime() - Math.max(0, state.totalDays - 1) * 86400000);
  widget.refreshAfterDate = large
    ? new Date(Math.min(nextChange.getTime(), now.getTime() + 15 * 60 * 1000))
    : nextChange;
}
// Home Screen widgets are snapshots. Open the full interactive bunny when run in-app.
Script.setWidget(widget);
if (config.runsInApp) await Safari.openInApp(WEBSITE_URL, true);
Script.complete();
