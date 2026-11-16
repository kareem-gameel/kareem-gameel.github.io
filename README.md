# Kareem M. Gameel research portfolio

Source for [kareem-gameel.github.io](https://kareem-gameel.github.io/), a static GitHub Pages portfolio covering first-principles modeling, scientific machine learning, electronic structure, publications, and research projects.

GitHub Pages deploys the `main` branch from the repository root. No build step or paid domain is required.

## Analytics

The private traffic dashboard is at https://kareem-gameel.goatcounter.com/.
Counts start when the integration is deployed; they cannot reconstruct past traffic.

To exclude your visits, open https://kareem-gameel.github.io/privacy/#exclude-analytics
in each browser or device and check that it says your visits are excluded. This
idempotent link saves a local browser preference before any analytics can load.
Reapply it after clearing site data and in each private-browsing session.
Local previews and the privacy page are never counted. No university-wide IP
exclusion is used, so colleagues sharing the network are not excluded.

The shared `assets/js/main.js` loads GoatCounter only on the public HTTPS host
and only when the exclusion is absent. It sends page paths without queries or
fragments, referring origins rather than full URLs, and no custom click events.
GoatCounter's default session deduplication means counts are not a raw count of
every reload or a precise count of individual people. Ad blockers can also
reduce reported traffic.

Run the exclusion checks with `node --test tests/analytics.test.cjs`.
