#!/bin/bash

###################################################
# Bash Shell script to setup gatsby-site postgres user and grant him create db rights
###################################################

SITE_NAME=gatsby_site
USER_NAME=gatsby_user
PASSWORD=GatsbySitePassword

psql -U postgres -c "CREATE ROLE $USER_NAME WITH CREATEDB LOGIN ENCRYPTED PASSWORD '$PASSWORD';"

if [ "$NODE_ENV" == "development" ] || [ "$NODE_ENV" == "" ]; then
  echo "Development setup..."
  psql -U postgres -c "CREATE DATABASE ${SITE_NAME}_development;"
  psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${SITE_NAME}_development TO $USER_NAME;"
else
  echo "Production setup..."
  psql -U postgres -c "CREATE DATABASE ${SITE_NAME}_production;"
  psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${SITE_NAME}_production TO $USER_NAME;"
fi

echo "Setup script is done!"

exit 0
