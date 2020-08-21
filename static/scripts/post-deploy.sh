#!/bin/bash

###################################################
# Bash Shell script to post-deploy gatsby-site
###################################################

/root/.yarn/bin/yarn
NODE_ENV=production /root/.yarn/bin/yarn sequelize db:migrate
/root/.yarn/bin/yarn pm2 reload ecosystem.config.js --env production
/root/.yarn/bin/yarn build

echo "post-deploy script is done!"

exit 0
