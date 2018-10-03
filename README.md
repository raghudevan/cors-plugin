# Introduction / Why this project exists
* I recently moved to Firefox from Chrome as my default browser for development
* Found that there was no equivalent of [Allow-Control-Allow-Origin:*](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) for Firefox and so this project exists
* This add-on is quite similar to [vitvad's Access-Control-Allow-Origin](https://github.com/vitvad/Access-Control-Allow-Origin) chrome plugin and infact borrows heavily from their source code viz. `background.js`

# Using the addon
* The addon is available for free use over at https://addons.mozilla.org/en-US/firefox/addon/cors-plugin/

# Found a bug?
* Please file a [new issue](https://github.com/raghudevan/cors-plugin/issues/new) with as many details as you can provide for someone other than yourself to try and identify/reproduce it. 
* I won't make any promises on how and when i'll get to it if ever. If you're a developer, feel free to raise a PR :)

# Development

## Pre-requisites

* node version 8.9.3
* yarn version 1.6.0

## Getting started

1. Install dependencies

```
yarn install
```

2. Start the development server

```
yarn start
```

> This will open host the webapp on `localhost:3000`; 
> while we can test the basic html/js functionalities, to actually test the plugin, we'll have to build
> the code and load it as a temporary add-on on the Firefox browser

![debug-add-on-localhost](docs/debug-add-on-localhost.png?raw=true "Add-on on localhost")

3. Build the code

```
yarn build
```

4. Load as temporary add-on

* navigate to `about:debugging#addons` on your Firefox browser

![debugging-add-ons](docs/debugging-add-ons.png?raw=true "Debugging Add-ons on Firefox")

* After selecting `Load Temporary Add-on`, you should see a file selector. Navigate to the build folder and select `manifest.json`

![select-manifest-json](docs/select-manifest-json.png?raw=true "Load Temporary Add-on")

* This should load the add-on to your add-on bar. Click on debug to start debugging the add-on

![debug-add-on](docs/debug-add-on.png?raw=true "Debug Add-on")

# License
* MIT/X11 License
