cmake_minimum_required(VERSION 3.14)
project (webos-vncserver C)

add_subdirectory(prebuilt)
add_subdirectory(tv-native-apis)

add_executable(vramvnc src/vramvnc.c src/uinput.c)
target_link_libraries(vramvnc im vncserver pthread z png jpeg ssl crypto gm)

set(CMAKE_INSTALL_RPATH $ORIGIN)
add_executable(webos-vncserver src/webos-vncserver.c src/uinput.c)
target_link_libraries(webos-vncserver im vncserver pthread z png jpeg ssl crypto dl)

set_target_properties(webos-vncserver PROPERTIES
    BUILD_RPATH_USE_ORIGIN ON
    INSTALL_RPATH "$ORIGIN:$ORIGIN/lib"
    BUILD_RPATH "$ORIGIN:$ORIGIN/lib"
)

add_library(capture_gm SHARED
    src/capture_gm.c
)
target_link_libraries(capture_gm gm)

add_library(capture_halgal SHARED
    src/capture_halgal.c
)
target_link_libraries(capture_halgal halgal)
