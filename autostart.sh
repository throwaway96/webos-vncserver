#!/bin/sh
timeout 5 luna-send -n 1 'luna://org.webosbrew.vncserver.service/start' '{"autostart": true}'
