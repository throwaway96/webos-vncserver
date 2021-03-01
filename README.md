# webos-vncserver
An extremely hacky VNC server for WebOS - Works by reading directly from the GPU's framebuffer.

Requires root privileges.

# Usage

```
# ./vramvnc 0x3acae000
```
Where `0x3acae000` is the address of your framebuffer in physical memory.

You should then be able to connect via a VNC client of your choice, on port 5900.


# Finding your framebuffer address

The smart method would be to read the docs and/or drivers for your GPU. If that sounds too much
like hard work, you can dump the entire physical address space via `/dev/mem`, and
then scan through it with GIMP's raw image data import mode until you see recognisable
images.


# Compiling

To cross-compile for WebOS, you will need an NDK: https://github.com/webosbrew/meta-lg-webos-ndk

First, cross-compile [LibVNCServer](https://github.com/LibVNC/libvncserver) as a static library.

You may need to edit `src/CMakeLists.txt` to update the path to point to wherever your
compiled `libvncserver.a` library is (I am a CMake noob, idk the correct way of doing this).

Then, it should just be a matter of:

```bash
cd ./src/
cmake .
make
```

You should have produced a `vramvnc` binary. Copy it over to your TV and run it as root!
