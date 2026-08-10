# ExchangeFinder

Look up **Telstra exchange** locations across Victoria (name, 4-alpha code, address, coordinates) and open them in Google Maps.

Exchange data is bundled as static JSON (`public/exchanges.json`) — no external API required.

## Usage

Type an exchange name (at least 3 characters). Results update as you type. Search is case-insensitive.

Live site: [Exchange Finder](https://tonymelek.github.io/ExchangeFinder/)

## Develop

```bash
npm install
npm run dev
```

Open the local URL Vite prints (with base path `/ExchangeFinder/`).

## Build & deploy (GitHub Pages)

Pushing to `master` runs [GitHub Actions](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to Pages.

One-time repo setup: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

Locally:

```bash
npm run build
npm run preview
```

The Vite `base` is `/ExchangeFinder/` for `https://tonymelek.github.io/ExchangeFinder/`.

## Feedback

Comments and suggestions: [info@meltek.com.au](mailto:info@meltek.com.au)

Built by [Meltek](https://meltek.com.au) · [Buy me a coffee](https://buymeacoffee.com/tonnabilv)

## License

GPL-3.0 — see [LICENSE](./LICENSE). © Meltek
