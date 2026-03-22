# Birthday-Pi

Birthday-Pi is a static web app that finds where your birthday appears inside the first 100,000 digits of pi, counts how many times it echoes, and reveals your Pi Sign with traits, compatibility, sacred number, and an oracle reading.

![Birthday-Pi App Screenshot](assets/screenshot.png)

## Features

- Month + day dropdown birthday input (converted internally to `MMDD`)
- Finds first occurrence index of your birthday key in pi digits
- Counts total non-overlapping occurrences in the first 100,000 digits
- Shows both 0-based and 1-based first-match position
- Generates a Pi Sign based on the anchor digit at first match
- Includes 10 custom signs with distinct oracle readings
- Handles no-match edge cases gracefully with deterministic fallback sign

## Tech stack

- Plain `HTML`, `CSS`, and `JavaScript`
- Static local data files:
  - `data/pi-100k.txt`
  - `data/pi-signs.json`
- No build step required

## Local development

From the project root, run any static server:

```bash
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080`

## Project structure

- `index.html` – App layout and semantic structure
- `styles.css` – Visual design, responsive layout, animations
- `app.js` – Dropdown logic, pi searching, sign mapping, rendering
- `data/pi-100k.txt` – First 100,000 pi digits (digit-only)
- `data/pi-signs.json` – Sign metadata and oracle readings
- `assets/screenshot.png` – README preview image
- `.nojekyll` – Ensures GitHub Pages serves static files directly

## GitHub Pages deployment

1. Push this project to GitHub (branch: `main`).
2. Open repository **Settings** → **Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` and `/ (root)`
4. Save and wait for GitHub Pages to publish.
5. Open the generated Pages URL and verify data loads correctly.

## Notes

- Birthday selection is calendar-valid by design (day list updates based on selected month).
- February allows 29 for leap-day birthdays.
- Occurrence counting is non-overlapping for deterministic results.
