#!/bin/bash

yarn build-components
scp -r ./dist/* root@clients.belka.us:/var/www/html/idm/cdn/