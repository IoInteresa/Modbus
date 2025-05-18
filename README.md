### Client
```
npm run build

sudo cp -r ~/projects/Modbus/client/dist/. /var/www/modbus-client/

sudo chown -R www-data:www-data /var/www/modbus-client (optional)
```

### Nginx
```sudo nginx -t && sudo systemctl reload nginx```

### Poller
```pm2 start ecosystem.config.js```