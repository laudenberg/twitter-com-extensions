Some Chrome extensions for twitter.com
===

### Features

To disable any feature, simply remove its file's reference from `manifest.json`.

- `new-tweets-click.js`
  - When clicking on "23 new tweets" the window will scroll to the first new tweet.
- `display-ragefaces-inline.js`
  - Looks for ragefac.es-links in displayed tweets every 2 seconds and adds their thumb inline.
  - Also unshortens any shortener-URLs (will be refactored).

### Installation and Upgrading

- `cd` into the extension's root and run `make`.
- If `make` cannot find `google-chrome` put the Chrome executable into your `$PATH`.
- Point your browser to `packed/twitter-com-extensions.crx` inside the extension's root.

