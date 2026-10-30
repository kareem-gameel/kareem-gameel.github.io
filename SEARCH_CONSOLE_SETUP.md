# Search visibility and Search Console

## Setup completed on October 30, 2026

- The URL-prefix property `https://kareem-gameel.github.io/` is verified using Google's HTML tag. Keep the `google-site-verification` meta tag in `index.html` when updating the site.
- The sitemap is submitted at `https://kareem-gameel.github.io/sitemap.xml` and is also listed in `robots.txt`.
- Google's live URL test confirmed that the sitemap is available to Google. The Sitemaps report still showed "Couldn't fetch" after resubmission; check that it changes to "Success" before treating sitemap processing as complete.
- GitHub, LinkedIn, ORCID, and ResearchGate now link to the root portfolio URL. Google Scholar already had the correct homepage link.
- The homepage connects the publishing and formal names through visible text and structured data. The LinkedIn URL is corrected, and the delta-learning and Hamiltonian project pages link to their public code.
- The legacy `/website/` homepage redirects to the root site and declares the root canonical URL.

## Indexing requests

An accepted request puts a URL in Google's crawl queue; it does not mean the page is indexed or guarantee a ranking.

| URL path | Request status on October 30, 2026 |
| --- | --- |
| `/` | Accepted |
| `/projects/transferable-delta-learning/` | Accepted |
| `/projects/interfacial-capacitance/` | Accepted |
| `/projects/co-adsorption/` | Accepted |
| `/projects/hamiltonian-representation/` | Accepted |
| `/projects/gnn-compression/` | Accepted |

## Follow-up checks

1. Open the [Search Console property](https://search.google.com/search-console?resource_id=https%3A%2F%2Fkareem-gameel.github.io%2F) using the account that verified ownership.
2. Check **Sitemaps** and **Pages**. For an unexpected exclusion, inspect the affected URL and review Google's selected canonical, fetch status, and indexing permission.
3. Once Performance data is available, review queries for `Kareem M. Gameel`, `Kareem Gameel`, `Kareem Abdel-Hafez`, and `Kareem Mahmoud Gameel`. Compare impressions, clicks, and average position over comparable periods; no ranking baseline was available when the property was created.
4. Review relevant research queries, including delta learning, electronic structure learning, interfacial capacitance, and graph neural network compression. Expand project content only when there is useful new research, code, or evidence to share.

Do not repeatedly submit unchanged URLs. Google notes that repeated requests do not improve queue priority, and crawling can take days to weeks. See [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) and the [Sitemaps report guide](https://support.google.com/webmasters/answer/7451001).
