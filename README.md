# Tiwari Green Solar website

Static product showcase for Tiwari Green Solar, hosted on GitHub Pages, with a browser-based admin at `/admin/`.

- **Site:** Next.js 15 static export (`output: "export"`), plain CSS.
- **Content:** JSON files in `content/` (products, categories, home page rows, business details).
- **Admin:** [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (self-hosted copy in `public/admin/`). Each save commits to this repo, and GitHub Actions rebuilds and republishes the site in about 2 minutes.
- **Enquiries:** sent as a pre-filled WhatsApp message (no server needed).

## Using the admin

1. Create a GitHub fine-grained personal access token: GitHub → Settings → Developer settings → Fine-grained tokens.
   Give it access to this repository only, with **Contents: Read and write**.
2. Open `https://<user>.github.io/<repo>/admin/` and choose **Sign In Using Access Token**. Paste the token.
3. Edit **Products**, or **Website → Home page** to choose which rows appear and the order of products in each.
4. Save. The live site updates after the next build (watch the Actions tab).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in out/
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. In the repo, set
Settings → Pages → Source to **GitHub Actions** once.

## Where things are

| Path | What |
| --- | --- |
| `app/(site)` | Pages: home, category, product, search, about, contact |
| `content/` | All site content, edited through the admin |
| `public/admin/config.yml` | Admin fields and collections |
| `public/uploads/` | Photos uploaded through the admin |

## Demo content

The products, prices and photos currently in `content/products/` come from UTL Solar (upsinverter.com) and are placeholders.
Replace them, or confirm dealer permission, before promoting the site. Turn off the notice bar in Admin → Website → Business details.
