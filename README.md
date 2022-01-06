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

# Compiling
To cross-compile for WebOS, you will need an NDK: https://github.com/webosbrew/meta-lg-webos-ndk

```sh
mkdir -p build && cd build && cmake .. && cmake --build . --target webos-vncserver --target capture_gm --target capture_halgal
```

This should have produced a `build/service/` directory. Copy it over to your TV and run `./webos-vncserver` as root!
