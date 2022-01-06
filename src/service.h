#pragma once
#include <luna-service2/lunaservice.h>
#include "server.h"
#include "settings.h"

int service_init(GMainLoop* loop, server_t* server, settings_t* settings);
