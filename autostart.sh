#!/bin/sh
command='luna-send -n 1 luna://org.webosbrew.vncserver.service/start {"autostart":true}'
timeout -t 5 $command || [ $? -eq 143 ] || timeout 5 $command
