module.exports = {
  apps: [{
    name: "main",
    script: "index.js",
    merge_logs: true
  }],
  deploy: {
    // VMWARE local machine
    staging: {
      // SSH key path, default to $HOME/.ssh
      key: "$HOME/.ssh",
      // SSH user
      user: "dirchev",
      // SSH host
      host: ["quiz-app.loc"],
      // ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/master",
      // GIT remote
      repo: "git@github.com:dirchev/quiz-app-student-client.git",
      // path in the server
      path: "/home/dirchev/quiz-app-student-client",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      "post-setup": "ls -la",
      // post-deploy action
      "post-deploy": "npm install --production && npm run build:staging",
    },
  }
}
