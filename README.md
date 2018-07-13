# Sample Chrome Extension

This extension displays chrome notifications whenever the api is called in sample_api/index.html.

This extension demonstrates how to inject content scripts into web page, get the api response and send it to chrome plugin.

## Prerequisites

- `serve` module installed globally
```
npm install -g serve
```

## How to run

1. Enable developer mode in chrome extensions page.
2. Load the sample_ext by clicking 'Load Upacked Plugin' button.
3. Run static server
```
$ cd sample_api
$ serve .
```
4. Go to `http://localhost:5000` in Google Chrome.
