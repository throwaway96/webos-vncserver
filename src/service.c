#include <stdint.h>

#include "service.h"
#include "log.h"

#define SERVICE_NAME "org.webosbrew.vncserver.service"

bool method_start(LSHandle *sh, LSMessage *message, void *data) {
	return false;
}

bool method_stop(LSHandle *sh, LSMessage *message, void *data) {
	return false;
}

LSMethod service_methods[] = {
    {"start", method_start},
    {"stop", method_stop},
};

int service_init(GMainLoop* loop) {
    static LSError lserror;
    static LSHandle *handle = NULL;
    bool ret = FALSE;

    LSErrorInit(&lserror);

    ret = LSRegister(SERVICE_NAME, &handle, &lserror);
    if (ret == FALSE) {
		WARN("Unable to register service: %s", lserror.message);
        LSErrorFree(&lserror);
        return -1;
    }

    // sh = LSMessageGetConnection(message);

    LSRegisterCategory(handle, "/", service_methods, NULL, NULL, &lserror);
    LSGmainAttach(handle, loop, &lserror);

	return 0;
}
