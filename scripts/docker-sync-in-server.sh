#!/bin/sh

if [ "${SKIP_INIT}" != "true" ]; then
  if [ ! -f .init ]; then
      # wait for database
      sleep 8
      # migrate database
      if ! npx drizzle-kit migrate --config=server/infrastructure/database/configuration.js; then
        echo "Error: unable to migrate database schema !" >&2
        exit 1
      fi
      if [ "${SKIP_INIT_ADMIN}" != "true" ]; then
        # create an administrator account if one doesn’t already exist, using the supplied login and password when provided
        if ! node server/infrastructure/database/scripts/create-user.js --role admin --login "${INIT_ADMIN_LOGIN}" --password "${INIT_ADMIN_PASSWORD}"; then
          echo "Error: unable to create administrator !" >&2
          exit 1
        fi
      else
        echo "SKIP_INIT_ADMIN invoked"
      fi
      touch .init
      chmod -R 755 /app/data
  fi
else
  echo "SKIP_INIT invoked"
fi
exec node server/main.js