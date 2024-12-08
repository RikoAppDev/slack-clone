# Slack Clone (slack-clone)

this is  slack 2.0

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


## Local Development SSL Setup
1. Install mkcert
    ### Using Chocolatey (Recommended)
    Open PowerShell as Administrator and run:
    ```bash
    choco install mkcert
    ```

    ### Using Scoop
    ```bash
    scoop bucket add extras
    scoop install mkcert
    ```

2. Create a `certs` directory in the frontend project root
    ```bash
    # Create a certificates directory in your project root
    mkdir certs
    cd certs
    ```
3. Generate certificates using:
   ```bash
   mkcert -install
   mkcert -key-file ./certs/key.pem -cert-file ./certs/cert.pem localhost 127.0.0.1 ::1

    ```
## Directry Structure
```
  frontend/
  ├── certs/
  │   ├── key.pem
  │   └── cert.pem
  ├── quasar.config.js
  └── ... (other project files)
```
