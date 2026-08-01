# Google Search Console setup

The site is prepared for a Google Search Console URL-prefix property.

1. Open [Google Search Console](https://search.google.com/search-console/) and add `https://kareem-gameel.github.io/` as a **URL-prefix** property.
2. Select the **HTML tag** verification method described in [Google's ownership verification guide](https://support.google.com/webmasters/answer/9008080?hl=en).
3. Copy the complete `google-site-verification` meta tag supplied by Google.
4. Add that tag in `index.html` at the marked verification comment and publish the change.
5. Return to Search Console and select **Verify**.
6. Submit `https://kareem-gameel.github.io/sitemap.xml` under **Sitemaps**.
7. Use [URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en) on the homepage and each `/projects/` URL, then request indexing.

Do not add a placeholder verification token. Google must issue the token for the signed-in Search Console account.
