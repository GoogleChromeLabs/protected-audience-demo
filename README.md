# FLEDGE demo (local environment)

This FLEDGE API demo is set up to run on your local computer.
[FLEDGE API Doc](https://developer.chrome.com/blog/fledge-api/)

## Installation

### Setup certificates for HTTPS

See "[How to use HTTPS for local development](https://web.dev/how-to-use-local-https/)" to learn more about the topic.

1. Install `mkcert`

```
brew install mkcert
brew install nss # if you use Firefox
mkcert -install
```

2. Setup `localhost`

```
mkcert -install
```

### Setup repository

- `git clone https://github.com/googlechromelabs/fledge-demo-local`
- `cd fledge-demo-local`
- `npm install`

### Run the demo

Run the dev server:

- `CERT_PATH=[ADD YOUR CERT PATH] npm run dev`

Visit the demo README page:

- Visit [https://localhost:3000](https://localhost:3000)

## URL mappings

[Different ports are considered a different origin](https://web.dev/same-site-same-origin/), and the following is the port mapping to each entity:

- Advertiser - https://localhost:3001
- Publisher - https://localhost:3002
- DSP One - https://localhost:3003
- DSP Two - https://localhost:3004
- SSP - https://localhost:3005
- README page - https://localhost:3000

## Demo scenario

The below scenario is to demonstrate how the signals are passed, but it is not meant to represent how an would be chosen in the real world. 

In this demo, we will render an ad based on whether the page contains controversial content or not. If the page is controversial, then an ad that is allowed to be rendered on a controversial page will be chosen. The `isControversial` signal from the seller will be sent to the buyer's bid logic as an auction signbal, and the buyer will submit a bid based on the `isControversial` signal.  

Also, each ad will have a budget allocated in `remainingAdBudget` which will be available as a trusted buyer signal during bid time. If there is no budget remaining, the bid is 0.  

After the bids have been received by the seller's auction code, the ad quality value will be fetched as a trusted seller signal. If the `adQuality` value is below 0.8, then the ad score will be lowered.
