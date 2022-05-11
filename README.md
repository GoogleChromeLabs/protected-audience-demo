# FLEDGE demo (!!! WORK-IN-PROGRESS !!!)

This demo implements [FLEDGE API](https://developer.chrome.com/blog/fledge-api/)

## Setup

### Setup HTTPS 

To run the FLEDGE demo locally, the resources from DSP/SSP must be served over HTTPS. Unfortunately, Firebase emulator [does not support HTTPS localhost](https://github.com/firebase/firebase-tools/issues/1908). [Using `ngrok`](https://stackoverflow.com/a/67640790) is not feasible since we need two secure tunnels (one for DSP and one for SSP) and `ngrok` only provides 1 tunnel for free. 

Therefore, we will setup a reverse proxy with `nginx` to serve DSP/SSP resources over HTTPS.

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
  events {}

  http {
    # HTTPS server
    server {
      listen  4437 ssl;
      ssl_certificate  /Users/[USER-NAME]/certs/localhost.pem;
      ssl_certificate_key /Users/[USER-NAME]/certs/localhost-key.pem;

      location / {
        proxy_set_header        Host $host;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        X-Forwarded-Proto $scheme;

        proxy_pass          http://localhost:8087/;
        proxy_read_timeout  90;
      }
    }

    server {
      listen  4438 ssl;
      ssl_certificate  /Users/[USER-NAME]/certs/localhost.pem;
      ssl_certificate_key /Users/[USER-NAME]/certs/localhost-key.pem;

      location / {
        proxy_set_header        Host $host;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        X-Forwarded-Proto $scheme;

        proxy_pass          http://localhost:8088;
        proxy_read_timeout  90;
      }
    }
  }
  ```
4. Stop the `nginx` server with `nginx -s stop`
5. Restart the `nginx` server with `nginx`

The above `nginx` configuration proxies `https://localhost:4437` to `http://localhost:8087` (DSP server) and `https://localhost:4438` to `http://localhost:8088` (SSP server). 

### Setup Firebase

- Setup [Firebase tools](https://github.com/firebase/firebase-tools)

### Setup repository

- `git clone https://github.com/googlechromelabs/fledge-demo`
- `cd fledge-demo`
- `npm install`

## Development

### Start emulator

```
npm run dev
```

And visit `http://localhost:8080` for the main page

### Deploy code

```
npm run deploy
```

## Hostnames

### Production

- Main - https://fledge-demo.web.app/
- Advertiser - https://fledge-demo-advertiser.web.app/
- Publisher- https://fledge-demo-publisher.web.app/
- DSP - https://fledge-demo-dsp.web.app/
- SSP - https://fledge-demo-ssp.web.app/

### Local

- Main - http://localhost:8080
- Advertiser - http://localhost:8085
- Publisher - http://localhost:8086
- DSP - https://localhost:4437
- SSP - https://localhost:4438

## Tasks

- [] Setup DSP/SSP trusted servers
- [] Update placeholder signals
- [] Update placeholder ads
- [] Add component auctions
