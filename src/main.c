#include <stdio.h>
#include "server.h"
#include "service.h"
#include "log.h"

static gboolean server_frame_handler(gpointer data) {
	server_t* server = (server_t*) data;
	return server->running && server_update(data) == 0;
}

int main (int argc, char** argv) {
	int ret;

	server_t server;
	server.running = false;

	settings_t settings;
	GMainLoop* loop = g_main_loop_new(NULL, FALSE);

	settings.width = 1920/4;
	settings.height = 1080/4;
	settings.password = "dupa.8";

	log_init();

	if ((ret = service_init(loop)) != 0) {
		WARN("service_init() failed: %d", ret);
	}

	server_start(&server, &settings);

	INFO("Adding timeout...");
	g_timeout_add(1000 / 30, server_frame_handler, (gpointer) &server);

	INFO("Starting main loop...");

	g_main_loop_run(loop);

	INFO("loop finished!");
    g_main_loop_unref(loop);

	server_stop(&server);
	return 0;
}
