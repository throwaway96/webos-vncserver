cmake_minimum_required(VERSION 3.14)
project (webos-vncserver C)

add_subdirectory(prebuilt)
add_subdirectory(tv-native-apis)

add_executable(vramvnc src/vramvnc.c src/uinput.c)
target_link_libraries(vramvnc im vncserver pthread z png jpeg ssl crypto gm)

# ------

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/service)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/service)
configure_file("${CMAKE_SOURCE_DIR}/services.json" "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/services.json" COPYONLY)
configure_file("$ENV{PKG_CONFIG_SYSROOT_DIR}/usr/lib/libjpeg.so.62.2.0" "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/libjpeg.so.62" COPYONLY)

find_package(PkgConfig REQUIRED)
include(FindPkgConfig)

pkg_check_modules(PBNJSON REQUIRED pbnjson_c)
pkg_check_modules(GLIB2 REQUIRED glib-2.0)
pkg_check_modules(LS2 REQUIRED luna-service2)
pkg_check_modules(PMLOG REQUIRED PmLogLib)

include_directories(${PBNJSON_INCLUDE_DIRS})
include_directories(${GLIB2_INCLUDE_DIRS})
include_directories(${LS2_INCLUDE_DIRS})
include_directories(${PMLOG_INCLUDE_DIRS})

set(CMAKE_INSTALL_RPATH $ORIGIN)
add_executable(webos-vncserver
    src/main.c
    src/service.c
    src/server.c
    src/uinput.c
    src/log.c
)
target_link_libraries(webos-vncserver im vncserver pthread z png jpeg ssl crypto dl ${LS2_LDFLAGS} ${PBNJSON_LDFLAGS} ${GLIB2_LDFLAGS} ${PMLOG_LDFLAGS})

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
