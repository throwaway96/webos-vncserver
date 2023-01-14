# webos-vncserver
An somewhat hacky VNC server for WebOS.

Requires root privileges.

# Usage

```
# ./webos-vncserver 640 360
```

You should then be able to connect via a VNC client of your choice, on port 5900.

Here it is, running on a "headless" TV motherboard, being accessed via a VNC mobile app.

![Demo](./img/demo.jpg?raw=true)

## Keybindings

- SUPER ("Windows") button is HOME
- Right mouse button is BACK
- Mouse scroll should properly be interpreted as scrollwheel

# Caveats
- This does not capture any hardware-accelerated video surfaces, only the UI layers.

# Building
## Service
To cross-compile for WebOS, you will [need an
toolchain](https://github.com/openlgtv/buildroot-nc4/releases/tag/webos-c592d84).

```sh
cmake -S . -B build && cmake --build build --target webos-vncserver --target capture_gm --target capture_halgal
```

This should have produced a `build/service/` directory. Copy it over to your TV and run `./webos-vncserver` as root!

## Frontend
Configuration frontend is based on web technologies - in order to build it you
will need NodeJS (18.x) and use:
```sh
npm install
npm run build
```

A convenience shortcut for native build here is provided as:

```sh
npm run build-native
```

Then, in order to package and deploy an app, use:

```sh
npm run package
npm run deploy
npm run launch
```
