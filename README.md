#

A static site base on [dumi](https://d.umijs.org).

## Development

```bash
# install dependencies
$ pnpm install

# start dev server
$ pnpm start

# build docs
$ pnpm run build
```

## LICENSE

MIT

server {
listen 80;
server_name xiaozhi.shop;

    location /.well-known/acme-challenge/ {
        alias /var/www/challenges/;
        try_files $uri =404;
    }

    return 301 https://$server_name$request_uri;

}

server {
listen 443 ssl;
server_name xiaozhi.shop;
#root /home/xiaozhi;

    ssl_certificate /home/cert/xiaozhi.shop.crt;
    ssl_certificate_key /home/cert/xiaozhi.shop.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    #location / {
        #try_files $uri $uri/ /index.html;
    #}

    #location /api {
        #proxy_set_header X-Real-IP $remote_addr;
        #proxy_set_header Host $host:$server_port;
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_http_version 1.1;
        #proxy_pass http://127.0.0.1:8085;

#}

    location / {
        proxy_pass http://127.0.0.1:8082;
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        add_header X-Cache $upstream_cache_status;
        proxy_set_header X-Host $host:$server_port;
        proxy_set_header X-Scheme $scheme;
        proxy_connect_timeout 30s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 30s;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

}
