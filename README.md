# Protected Audience demo

## Introduction

This demo shows the simple usage of the [Protected Audience API](https://developer.chrome.com/blog/fledge-api/). In this demo, there are 4 actors involved in the process: advertiser, publisher, DSP, and SSP. Each actors interact with one another to render a retargeted ads to the user.

## Local development

### Setup HTTPS

To run the Protected Audience demo locally, the resources from DSP/SSP must be served over HTTPS. Unfortunately, Firebase emulator [does not support HTTPS localhost](https://github.com/firebase/firebase-tools/issues/1908). Therefore, we will setup a reverse proxy with `nginx` to serve DSP/SSP resources over HTTPS.

#### Generate the certs with [`mkcert`]()

1. Install `mkcert` by following the [instructions for your operating system](https://github.com/FiloSottile/mkcert#installation).
1. Run `mkcert -install`.
1. Create a folder to store the certificates in. In this example, we will use `mkdir ~/certs`.
1. Navigate to the certificate folder: `cd ~/certs`.
1. Run `mkcert localhost`.

> For an in-depth explanation of this section, please see the ["How to use HTTPS for local development"](https://web.dev/how-to-use-local-https/) article.

#### Setup reverse proxy with [nginx](https://www.nginx.com/)

1. Install `nginx` ([Mac](https://www.google.com/search?q=install+nginx+mac), [Linux](https://www.google.com/search?q=install+nginx+linux), [Windows](https://www.google.com/search?q=install+nginx+windows)).
1. Find the `nginx` configuration file location based on your operating system (If you used `homebrew` on Mac, it is under `/Users/[USER-NAME]/homebrew/etc/nginx/nginx.conf`).
1. If you don't have an existing configurations set up in `nginx`, erase the existing content in `nginx.conf` and copy-paste the following block into the config. Replace `[USER-NAME]` with the path that your certificate is stored in:

```nginx
http {
  # DSP proxy
  server {
    listen  4437 ssl;
    ssl_certificate  /Users/[USER-NAME]/certs/localhost.pem;
    ssl_certificate_key /Users/[USER-NAME]/certs/localhost-key.pem;

    location / {
      proxy_set_header        Host $host;
      proxy_set_header        X-Real-IP $remote_addr;
      proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header        X-Forwarded-Proto $scheme;

      proxy_pass          http://localhost:3007/;
      proxy_read_timeout  90;
    }
  }

  # SSP proxy
  server {
    listen  4438 ssl;
    ssl_certificate  /Users/[USER-NAME]/certs/localhost.pem;
    ssl_certificate_key /Users/[USER-NAME]/certs/localhost-key.pem;

    location / {
      proxy_set_header        Host $host;
      proxy_set_header        X-Real-IP $remote_addr;
      proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header        X-Forwarded-Proto $scheme;

      proxy_pass          http://localhost:3008;
      proxy_read_timeout  90;
    }
  }
}
```

4. Stop the `nginx` server with `nginx -s stop`
5. Restart the `nginx` server with `nginx`

The above `nginx` configuration proxies `https://localhost:4437` to `http://localhost:3007` (DSP server) and `https://localhost:4438` to `http://localhost:3008` (SSP server).

### Setup Firebase

- Setup [Firebase tools](https://github.com/firebase/firebase-tools)

### Setup repository

- `git clone https://github.com/googlechromelabs/protected-audience-demo`
- `cd protected-audience-demo`
- `npm install`

### Start emulator

```
npm run dev
```

And visit `http://localhost:3000` for the main page

### Deploy code

```
npm run deploy
```

## Key files

- Buyer's interest group logic - [`/sites/dsp/join-ad-interest-group.js`](https://github.com/GoogleChromeLabs/protected-audience-demo/blob/main/sites/dsp/join-ad-interest-group.js) - DSP resource that adds an interest group for the user.
- Buyer's bidding logic - [`/sites/dsp/bid.js`](https://github.com/GoogleChromeLabs/protected-audience-demo/blob/main/sites/dsp/bid.js) - DSP resource that contains the bidding logic for the auction.
- Seller's auction logic - [`/sites/ssp/run-auction.js`](https://github.com/GoogleChromeLabs/protected-audience-demo/blob/main/sites/ssp/run-auction.js) - SSP resource that executes the in-browser auction.
- Seller's decision logic - [`/sites/ssp/decision-logic.js`](https://github.com/GoogleChromeLabs/protected-audience-demo/blob/main/sites/ssp/decision-logic.js) - SSP resource that decides the winner among the bidders.

## Hostnames

### Production

- Main - https://protected-audience-demo.web.app/
- Advertiser - https://protected-audience-demo-advertiser.web.app/
- Publisher- https://protected-audience-demo-publisher.web.app/
- DSP - https://protected-audience-demo-dsp.web.app/
- SSP - https://protected-audience-demo-ssp.web.app/

### Local

- Main - http://localhost:3000
- Advertiser - http://localhost:3005
- Publisher - http://localhost:3006
- DSP - https://localhost:4437 (via nginx reverse proxy from 8087 to 4437)
- SSP - https://localhost:4438 (via nginx reverse proxy from 8088 to 4438)
