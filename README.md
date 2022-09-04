# home-dashboard-mqtt

## Installation

```npm
npm i
```

If you want to use SSL, create a `cert` folder in the root. Put a `key.pem` and a `cert.pem` in this folder. You can generate a self-signed certificate with the following command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

If you intend to expose the dashboard to the internet, it is recommended to use a reverse proxy like nginx or apache. Additionally, you could use a tool like [certbot](https://certbot.eff.org/) to generate a certificate for your domain.

## Development

Once you have installed the node modules, you can start the development server with the following command:

```npm
npm run dev
```
