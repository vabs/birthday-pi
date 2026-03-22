const MONTHS = [
  { value: "01", name: "January", days: 31 },
  { value: "02", name: "February", days: 29 },
  { value: "03", name: "March", days: 31 },
  { value: "04", name: "April", days: 30 },
  { value: "05", name: "May", days: 31 },
  { value: "06", name: "June", days: 30 },
  { value: "07", name: "July", days: 31 },
  { value: "08", name: "August", days: 31 },
  { value: "09", name: "September", days: 30 },
  { value: "10", name: "October", days: 31 },
  { value: "11", name: "November", days: 30 },
  { value: "12", name: "December", days: 31 },
];

let piDigits = "";
let signs = {};

const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");
const form = document.getElementById("birthday-form");
const errorNode = document.getElementById("form-error");
const resultsNode = document.getElementById("results");

init().catch((error) => {
  errorNode.textContent = "Unable to load pi data right now. Please refresh and try again.";
  console.error(error);
});

async function init() {
  setupMonthSelect();
  setupDaySelect(monthSelect.value);

  const [piResponse, signsResponse] = await Promise.all([
    fetch("./data/pi-100k.txt"),
    fetch("./data/pi-signs.json"),
  ]);

  if (!piResponse.ok || !signsResponse.ok) {
    throw new Error("Data fetch failed.");
  }

  piDigits = (await piResponse.text()).replace(/\D/g, "").slice(0, 100000);
  signs = await signsResponse.json();

  if (piDigits.length !== 100000) {
    throw new Error("pi file is missing required digits.");
  }

  form.addEventListener("submit", onSubmit);
  monthSelect.addEventListener("change", onMonthChange);
}

function setupMonthSelect() {
  monthSelect.innerHTML = MONTHS.map(
    (month) => `<option value="${month.value}">${month.name}</option>`
  ).join("");
}

function setupDaySelect(monthValue, selectedDay = null) {
  const month = MONTHS.find((item) => item.value === monthValue);
  const days = month ? month.days : 31;
  const selected = selectedDay && Number(selectedDay) <= days ? selectedDay : "01";

  const options = [];
  for (let day = 1; day <= days; day += 1) {
    const dayValue = String(day).padStart(2, "0");
    const isSelected = dayValue === selected ? " selected" : "";
    options.push(`<option value="${dayValue}"${isSelected}>${day}</option>`);
  }
  daySelect.innerHTML = options.join("");
}

function onMonthChange() {
  setupDaySelect(monthSelect.value, daySelect.value);
}

function onSubmit(event) {
  event.preventDefault();
  errorNode.textContent = "";
  resultsNode.classList.remove("initial");

  const month = monthSelect.value;
  const day = daySelect.value;

  if (!month || !day) {
    errorNode.textContent = "Choose both month and day.";
    return;
  }

  const key = `${month}${day}`;
  const firstIndex = piDigits.indexOf(key);
  const totalMatches = countOccurrences(piDigits, key);

  if (firstIndex === -1) {
    const fallbackDigit = deterministicDigit(key);
    const fallbackSign = signs[String(fallbackDigit)];
    resultsNode.innerHTML = renderNotFound(key, fallbackSign, fallbackDigit);
    return;
  }

  const anchorDigit = Number(piDigits[firstIndex]);
  const sign = signs[String(anchorDigit)];

  resultsNode.innerHTML = renderFound({
    key,
    firstIndex,
    totalMatches,
    anchorDigit,
    sign,
  });
}

function countOccurrences(haystack, needle) {
  let count = 0;
  let index = 0;

  while (index < haystack.length) {
    const matchIndex = haystack.indexOf(needle, index);
    if (matchIndex === -1) {
      break;
    }
    count += 1;
    index = matchIndex + needle.length;
  }

  return count;
}

function deterministicDigit(key) {
  let hash = 0;
  for (const char of key) {
    hash = (hash * 31 + Number(char)) % 10;
  }
  return hash;
}

function renderFound({ key, firstIndex, totalMatches, anchorDigit, sign }) {
  return `
    <div class="result-shell">
      <span class="pill">Birthday Key: ${key}</span>
      <h2>Your Birthday in Pi</h2>
      <div class="metrics">
        <div class="metric">
          <p>First appears at (0-based)</p>
          <b>${firstIndex.toLocaleString()}</b>
        </div>
        <div class="metric">
          <p>First appears at (1-based)</p>
          <b>${(firstIndex + 1).toLocaleString()}</b>
        </div>
        <div class="metric">
          <p>Total echoes in first 100,000 digits</p>
          <b>${totalMatches.toLocaleString()}</b>
        </div>
        <div class="metric">
          <p>Anchor digit</p>
          <b>${anchorDigit}</b>
        </div>
      </div>
      ${renderSign(sign, anchorDigit)}
    </div>
  `;
}

function renderNotFound(key, sign, anchorDigit) {
  return `
    <div class="result-shell">
      <span class="pill">Birthday Key: ${key}</span>
      <h2>Your Birthday in Pi</h2>
      <p>
        We couldn't find this birthday key in the first 100,000 digits we searched. Infinity is patient
        though, and your story still has a sign.
      </p>
      <div class="metrics">
        <div class="metric">
          <p>Total echoes in first 100,000 digits</p>
          <b>0</b>
        </div>
        <div class="metric">
          <p>Anchor digit (fallback)</p>
          <b>${anchorDigit}</b>
        </div>
      </div>
      ${renderSign(sign, anchorDigit)}
    </div>
  `;
}

function renderSign(sign, digit) {
  if (!sign) {
    return "<p>Pi sign data unavailable.</p>";
  }

  const traitMarkup = sign.traits
    .map((trait) => `<span class="trait">${escapeHtml(trait)}</span>`)
    .join("");
  const compatibleMarkup = sign.compatible.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return `
    <span class="pill">Pi Sign ${digit}</span>
    <h3 class="sign-name">${escapeHtml(sign.name)}</h3>
    <p><strong>Sacred Number:</strong> ${escapeHtml(String(sign.sacredNumber))}</p>
    <div class="traits">${traitMarkup}</div>
    <p class="oracle">${escapeHtml(sign.oracle)}</p>
    <p><strong>Compatible signs</strong></p>
    <ul>${compatibleMarkup}</ul>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
