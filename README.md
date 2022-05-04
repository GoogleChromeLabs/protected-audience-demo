# FLEDGE demo (!!! WORK-IN-PROGRESS !!!)

This demo implements [FLEDGE API](https://developer.chrome.com/blog/fledge-api/)

## Development

### Setup repository

- `git clone https://github.com/googlechromelabs/fledge-demo`
- `cd fledge-demo`
- `npm install`

### Setup Firebase

- Setup [Firebase tools](https://github.com/firebase/firebase-tools)

### Start emulator

```
firebase emulator:start
```

> Note: HTTPS issues needs to be solved before local development can be fully utilized

### Deploy code

```
firebase deploy
```

## Hostnames

### Production

- Main - https://fledge-demo.web.app/
- Advertiser - https://fledge-demo-advertiser.web.app/
- Publisher- https://fledge-demo-publisher.web.app/
- DSP - https://fledge-demo-dsp.web.app/
- SSP - https://fledge-demo-ssp.web.app/

### Local


- Main - https://localhost:8080
- Advertiser - https://localhost:8085
- Publisher - https://localhost:8086
- DSP - https://localhost:8087
- SSP - https://localhost:8088

## Tasks

- [] Setup HTTPS local development
- [] Setup DSP/SSP trusted servers
- [] Update placeholder signals
- [] Update placeholder ads
- [] Add component auctions
