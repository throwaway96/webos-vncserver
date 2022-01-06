#include <stdio.h>
#include "server.h"
#include "service.h"
#include "log.h"

GMainLoop* loop;

void int_handler(int dummy) {
	INFO("SIGINT detected, stopping...");
	g_main_loop_quit(loop);
}

int main (int argc, char** argv) {
	int ret;

	server_t server;
	server.running = false;

	settings_t settings;
	loop = g_main_loop_new(NULL, FALSE);

	settings.framerate = 30;
	settings.width = 1920/4;
	settings.height = 1080/4;
	settings.password = strdup("password");

	log_init();

	INFO("Starting up service...");

	if ((ret = service_init(loop, &server, &settings)) != 0) {
		WARN("service_init() failed: %d", ret);
	}

	if (!getenv("LS_SERVICE_NAMES")) {
		INFO("Running via CLI - starting anyway");
		server_start(&server, &settings);
		server_bind_gmainloop(&server);
		signal(SIGINT, int_handler);
	}

	// INFO("Adding timeout...");
	// g_timeout_add(1000 / 30, server_frame_handler, (gpointer) &server);

	INFO("Starting main loop...");

	g_main_loop_run(loop);

	INFO("loop finished!");
    g_main_loop_unref(loop);

	if (server.running) {
		server_stop(&server);
	}

	return 0;
}
