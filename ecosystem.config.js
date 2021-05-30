module.exports = {
  deploy: {
    production: {
      user: "ubuntu",
      host: "3.21.127.106",
      ref: "origin/master",
      repo: "git@gitlab.com:michael523/homecooks.git",
      path: "/home/ubuntu/apps/home_cooks_frontend",
      "post-deploy": "yarn; yarn build",
    },
  },
}
