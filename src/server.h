#pragma once
#include <stdint.h>
#include <stdbool.h>
#include <rfb/rfb.h>
#include "settings.h"

typedef struct _capture_backend {
	char* name;
	int (*init)(uint32_t width, uint32_t height);
	int (*execute)(uint8_t* target, uint32_t size);
	int (*destroy)(void);
} capture_backend_t;

typedef struct {
	capture_backend_t capture;
	rfbScreenInfoPtr screen;
	int active_clients;
	settings_t* settings;
	bool running;
} server_t;

int server_start(server_t* server, settings_t* settings);
int server_stop(server_t* server);
int server_update(server_t* server);
