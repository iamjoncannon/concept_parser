module.exports = {
  apps: [{
    name: 'graphing_Hegel',
    script: './main.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: process.env.addy,
      key: process.env.key,
      ref: 'origin/deploying',
      repo: 'https://github.com/iamjoncannon/concept_parser.git',
      path: '/home/ubuntu/concept_parser',
      'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
    }
  }
}