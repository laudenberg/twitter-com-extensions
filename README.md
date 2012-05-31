# Hipster Twitter

## Some Chrome extensions for twitter.com

### Features

- When clicking on "23 new tweets" the window will scroll to the first new tweet.
- Switches *@screenname* with *Full Name* where applicable for better user identification. Before and after:
![Names old](https://raw.github.com/laudenberg/twitter-com-extensions/master/names-old.png)
![Names new](https://raw.github.com/laudenberg/twitter-com-extensions/master/names-new.png)
- Replaces ragefac.es-links by their thumb inline. Before and after:
![Names old](https://raw.github.com/laudenberg/twitter-com-extensions/master/ragefaces-old.png)
![Names new](https://raw.github.com/laudenberg/twitter-com-extensions/master/ragefaces-new.png)
- Unshortens any shortened URLs. Before and after:
![Names old](https://raw.github.com/laudenberg/twitter-com-extensions/master/unshorten-old.png)
![Names new](https://raw.github.com/laudenberg/twitter-com-extensions/master/unshorten-new.png)

Any feature can be disabled in the extension's options. 

### Installation and Upgrading

- `cd` into the extension's root and run `make`.
- If `make` cannot find `google-chrome` put the Chrome executable into your `$PATH`.
- Point your browser to `packed/twitter-com-extensions.crx` inside the extension's root.

### Strategy

To be able to change the contents of tweets, the extension looks every two seconds whether new tweets arrived at the DOM and then operates on them. For the worst case it may happen, that tweets appear standard for the first two seconds until they change. We are looking into measures to intercept events like Ajax Requests to better respond to changes. We are glad about every good advice!

