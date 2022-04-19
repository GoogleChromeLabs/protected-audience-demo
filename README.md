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
- `npm run install`

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
