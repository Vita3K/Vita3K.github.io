# Vita3K Website

[Vita3K official website](https://vita3k.github.io/) made with Svelte.

The compatibility list is generated using the [Vita3K API](https://github.com/Vita3K/api).

---

## Requirements

Before building the website, make sure you have:

- [Node.js](https://nodejs.org/) 18 or newer
- npm (included with Node.js)

## Installation

Install dependencies:

```bash
# Install project dependencies
npm install
```

---

## Development

Start the development server with hot reload enabled:

```bash
# Start development server
npm run dev
```
Or you can build the website for production and preview it locally using the following commands manually:

```bash
# Build for production
npm run build

# Preview the latest production build
npm run preview
```

---

## Translations

The site's strings live in `translations/<locale>/website.json` and are translated on
[Crowdin](https://crowdin.com/project/vita3k). English is the source, so add and edit
strings in `translations/en/website.json` and leave the other languages to Crowdin.
