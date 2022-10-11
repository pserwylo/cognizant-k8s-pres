# C7t K8s App

## Installation instructions

* [Linux](#linux) ([Nginx](#nginx) / [Apache2](#apache2))
* [Windows](#windows) ([IIS](#iis) / [Nginx](#nginx) / [Apache2](#apache2))

### Linux

#### Nginx

```
$ sudo apt get install nginx
```

Add the following to `/etc/nginx/sites-available/c7t-k8s-app.conf`:

```
server {
    listen 80;
    server_name c7t-k8s-app.com;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3000;
    }
}
```

#### Apache2

```
$ sudo apt get install apache2
```

Add the following to `/etc/apache2/sites-available/c7t-k8s-app.conf`:

```
<VirtualHost c7t-k8s-app.com:80>
    ProxyPass / http://localhost:3000
</VirtualHost>
```

## Windows

### IIS
