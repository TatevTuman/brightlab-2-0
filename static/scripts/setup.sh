#!/bin/bash

###################################################
# Bash Shell script to setup gatsby-site postgres user and grant him create db rights
###################################################
NODE_ENV=$1

read_var() {
  local ENV_FILE=.env.development

  if [ "$NODE_ENV" == "production" ]; then
    ENV_FILE=.env.production
  fi

  local VAR=$(grep $1 "$ENV_FILE" | xargs)
  IFS="=" read -ra VAR <<<"$VAR"
  echo ${VAR[1]}
}

echo $env

DB_NAME=$(read_var DB_NAME)
DB_USERNAME=$(read_var DB_USERNAME)
DB_PASSWORD=$(read_var DB_PASSWORD)

createuser --createdb --login "$DB_USERNAME"
psql -U postgres -c "ALTER USER ${DB_USERNAME} WITH ENCRYPTED PASSWORD '${DB_PASSWORD}'"
createdb --owner="$DB_USERNAME" "$DB_NAME"

exit 0
