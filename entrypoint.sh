#!/bin/bash
# entrypoint.sh

# Запускаем скрипт инициализации
node /usr/src/app/init-sqlite.js

# Запускаем основное приложение
exec node /usr/src/app/src/app.js