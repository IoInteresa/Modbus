module.exports = {
  apps: [
    {
      name: "client",
      script: "npm",
      args: "run preview",
      cwd: "./client",
      interpreter: "none",
      post_update: ["npm install", "npm run build"],
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      out_file: "./logs/client.out.log",
      error_file: "./logs/client.err.log",
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    },
    {
      name: "api",
      script: "src/index.js",
      cwd: "./api",
      interpreter: "node",
      post_update: ["npm install"],
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      out_file: "./logs/api.out.log",
      error_file: "./logs/api.err.log",
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    },
    {
      name: "poller",
      script: "src/index.js",
      cwd: "./poller",
      interpreter: "node",
      post_update: ["npm install"],
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      out_file: "./logs/poller.out.log",
      error_file: "./logs/poller.err.log",
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    },
  ],
};
