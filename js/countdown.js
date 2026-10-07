/* Both milestones are midnight in the visitor's local timezone. Months are zero-based. */
const RESIDENCY_START = new Date(2022, 6, 1, 0, 0, 0);
const RESIDENCY_END = new Date(2027, 6, 1, 0, 0, 0);
const DAY = 86400000;

// Clamp month-end dates: January 31 + one month becomes February 28/29.
function addMonths(date, months) {
  const result = new Date(date);
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(date.getDate(), lastDay));
  return result;
}

function calculateCountdown(now, start = RESIDENCY_START, end = RESIDENCY_END) {
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
  return { complete: false, totalDays: Math.ceil(remaining / DAY), progress, months, weeks, days, hours, minutes, seconds: rest % 60 };
}

function startPage() {
  const countdown = document.getElementById('countdown');
  const celebration = document.getElementById('celebration');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let celebrated = false;
  let timer;
  const formatDate = date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  document.getElementById('start-label').textContent = formatDate(RESIDENCY_START);
  document.getElementById('end-label').textContent = formatDate(RESIDENCY_END);

  function confetti() {
    const container = document.getElementById('confetti');
    container.replaceChildren();
    if (motion.matches || !celebrated) return;
    const colors = ['#d6b6df', '#edb3c8', '#dac28e', '#b9d5cd'];
    for (let i = 0; i < 24; i++) {
      const piece = document.createElement('i');
      piece.style.left = `${i * 4.2}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${-(i % 9) * 0.6}s`;
      piece.style.animationDuration = `${4 + (i % 4)}s`;
      container.append(piece);
    }
  }

  function update() {
    const result = calculateCountdown(new Date());
    if (result.complete) {
      countdown.hidden = true;
      celebration.hidden = false;
      if (!celebrated) {
        celebrated = true;
        document.title = 'YOU DID IT! — Dr. Mimi Ijaz';
        confetti();
      }
      clearInterval(timer);
      return;
    }
    countdown.hidden = false;
    document.getElementById('total-days').textContent = result.totalDays;
    for (const unit of ['months', 'weeks', 'days', 'hours', 'minutes', 'seconds']) {
      document.getElementById(unit).textContent = String(result[unit]).padStart(2, '0');
    }
    const percent = Math.floor(result.progress * 10) / 10;
    document.getElementById('percentage').textContent = `${percent.toFixed(1)}% complete`;
    document.getElementById('progress').setAttribute('aria-valuenow', percent);
    document.getElementById('progress-fill').style.width = `${result.progress}%`;
  }
  timer = setInterval(update, 1000);
  update();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
  motion.addEventListener('change', confetti);
}
if (typeof document !== 'undefined') startPage();
if (typeof module !== 'undefined') module.exports = { calculateCountdown, addMonths, RESIDENCY_START, RESIDENCY_END };
