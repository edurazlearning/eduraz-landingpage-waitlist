# EduraZ — Waitlist landing

A single-page waitlist landing for **EduraZ**, an AI-powered learning platform. Visitors can read the value proposition, then join the waitlist without leaving the page.

## What’s included

- **Hero** — Headline, short pitch, primary CTA
- **Why EduraZ** — Three benefit cards (roadmap, exercises, progress)
- **Waitlist form** — Name, email, skill interest, learning challenge (submissions go to Formspark)
- **About** — Short tagline
- **Footer** — Logo, links, social (X, LinkedIn, Instagram), copyright

## Tech

- Plain **HTML**, **CSS**, **JS** (no build step)
- Fonts: [DM Sans](https://fonts.google.com/specimen/DM+Sans), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- Form backend: [Formspark](https://formspark.io) — submissions are sent via `fetch` (JSON), no redirect

## Run locally

1. Clone the repo.
2. Open `index.html` in a browser, or serve the folder (e.g. `npx serve .` or your editor’s Live Server).

No install or build required.

## Form setup (Formspark)

Waitlist submissions are sent to Formspark. The endpoint is set in `main.js`:

```js
var FORM_ENDPOINT = 'https://submit-form.com/0GZ7bh6uj';
```

To use your own form:

1. Create a form at [formspark.io](https://formspark.io).
2. Replace the endpoint in `main.js` with your form’s URL (`https://submit-form.com/your-form-id`).
3. Formspark receives JSON with: `email`, `name`, `excited_skill`, `learning_challenge`.

## Project structure

```
eduraz-landingpage-waitlist/
├── index.html    # Markup
├── styles.css    # Layout, typography, components
├── main.js       # Scroll reveal, header state, ripple, form submit
├── .gitignore
└── README.md
```

## License

MIT (or your choice).
