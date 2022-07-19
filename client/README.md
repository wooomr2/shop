
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

## 프로젝트 후기
## 문제점1
- controller가 여러 collection의 backend 처리를 하고있다.

- controller -> DAO, SERVICE로 세분화하여

  DAO : 단일collection의 db access만 control

  SERVICE : client요구에 맞는 여러 DAO를 묶어 transaction처리 후 전송하는 시스템이 필요

  dao >- service - router - server - client

## 문제점2 몽고db transaction 처리는 ?

## 문제점3
- next.js의 pages components 구조 따와서 만들었는데
- 기존 component폴더는 공통 component만 모으고
- Container를 만들어 page와 해당 페이지에서만 사용하는 component를 묶어 관리하는 게 더 효율적일 듯

## 문제점4 소켓 전역 관리 필요 

## 쇼핑몰처럼 정적 page가 많은경우 ssr로 만드는 게 좋을듯

## 보다 효율적인 Token 인증 시스템 없을까
- accessToken 만료 시 server에서 403 error --> axios interceptor에서 캐치 -> accessToken 재발급 요청 -> new AccessToken + 기존 요청 재전송하는 방식

- 만료 전 알아서 refreshToken 요청 하는 방식 없을까?





# AWS EC2(UBUNTU) 배포

- 보안 그룹 설정
HTTP(PORT 80 :NGNIX)
CUSTOM TCP(PORT 8000 : NODE SERVER)
CUSTOM TCP(PORT 27017 : MONGODB)
CUSTOM TCP(PORT 8800 : SOCKET SERVER)

- ssh -i [Keypair file] ubuntu@[PublicDNS]

- pem file permisson 변경 : chmod 600 ./shop_keypair.pem

## 접속 후
app -client -deploy
            -server_log
    -backend
    -socket

- sudo apt-get update
sudo apt i npm


*vi editor(vim)
sudo apt-get install vim
vi 명령어
입력모드 -i
입력모드 -a
왼쪽이동 -h
아래이동 -j
위로이동 -k
오른쪽  -l
한글자삭제 -x
한단어 삭제 -dw
한줄삭제 -dd
n번째 줄 삭제 -ndd
현재줄 복사 -yy
n번째 줄 복사 -nyy
붙여넣기 -p
undo - u
저장안하고 종료 :q!
저장 :w
저장후종료 :wq



노드
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

NGINX
sudo apt install nginx -y
<!-- sudo systemctl enable nginx -->
sudo service nginx start
sudo service nginx status

/etc/nginx/nginx.conf
/etc/nginx/conf.d/default.conf
수정

sudo vi nginx.conf
------------------------------------------------------------------------
/etc/nginx/nginx.conf 

user ubuntu;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    client_body_buffer_size 100k;
    client_header_buffer_size 1k;
    client_max_body_size 100k;
    large_client_header_buffers 2 1k;
    client_body_timeout 10;
    client_header_timeout 10;
    keepalive_timeout 5 5;
    send_timeout 10;
    server_tokens off;
    #gzip  on; on;

    include /etc/nginx/conf.d/*.conf;
}
-------------------------------------------------------------------------
/etc/nginx/conf.d
--> sudo touch default.conf
sudo vi default.conf

/etc/nginx/conf.d/default.conf

server {
    #listen       80;
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name  yourdomain.com;

    access_log /home/ubuntu/client/server_logs/host.access.log main;

    location / {
        root   /home/ubuntu/client/deploy;
        index  index.html index.htm;
        try_files $uri /index.html;
        add_header X-Frame-Options SAMEORIGIN;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubdomains;";
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    server_tokens off;

    location ~ /\.ht {
        deny  all;
    }

}
--------------------------------------------------------------------------

sudo sevice nginx restart
sudo service nginx status


------------------------------------------
client로 가서
npm i
npm run build


backend
cd home/ubuntu/server/
sudo apt i npm
npm i
npm start














3. Copy github repo to sever
cd ~
mkdir apps
cd apps
git clone [깃주소]

4. Install Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

5. Install and Configure PM2

sudo npm install pm2 -g
pm2 start /home/ubuntu/apps/yelp-app/server/server.js --name yelp-app


6. Deploy React Frontend
Navigate to the client directory in our App code and run npm run build


7. Install and Configure NGINX
sudo apt install nginx -y
sudo systemctl enable nginx

cd /etc/nginx/sites-available
sudo cp default sanjeev.xyz


server {
        listen 80;
        listen [::]:80;

         root /home/ubuntu/apps/yelp-app/client/build;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name sanjeev.xyz www.sanjeev.xyz;

        location / {
                try_files $uri /index.html;
        }

         location /api {
            proxy_pass http://localhost:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

}

sudo ln -s /etc/nginx/sites-available/sanjeev.xyz /etc/nginx/sites-enabled/
systemctl restart nginx


8. Configure Environment Variables
Create a file called .env in /home/ubuntu/. The file does not need to be named .env and it does not need to be stored in /home/ubuntu, these were just the name/location of my choosing. The only thing I recommend avoid doing is placing the file in the same directory as the app code as we want to make sure we don't accidentally check our environment variables into git and end up exposing our credentials.

Within the .env file paste all the required environment variables
set -o allexport; source /home/ubuntu/.env; set +o allexport
# printenv

9. Enable Firewall
sudo ufw status
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status



10. Enable SSL with Let's Encrypt
Nowadays almost all websites use HTTPS exclusively. Let's use Let's Encrypt to generate SSL certificates and also configure NGINX to use these certificates and redirect http traffic to HTTPS.

The step by step procedure is listed at: https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx.html

Install Certbot

sudo snap install --classic certbot
Prepare the Certbot command

sudo ln -s /snap/bin/certbot /usr/bin/certbot
Get and install certificates using interactive prompt

sudo certbot --nginx















---------------------------------------------------------------------------------------------------------------
# AWS EC2(UBUNTU) 배포

- 보안 그룹 설정
HTTP(PORT 80 :NGNIX)
CUSTOM TCP(PORT 8000 : NODE SERVER)
CUSTOM TCP(PORT 27017 : MONGODB)
CUSTOM TCP(PORT 8800 : SOCKET SERVER)

- ssh -i [Keypair file] ubuntu@[PublicDNS]

- pem file permisson 변경 : chmod 600 ./shop_keypair.pem

1. sudo apt update && sudo apt upgrade -y

mkdir apps
cd apps


2. git clone [깃주소]

3. 노드 설치 
- curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
- sudo apt-get install -y nodejs

-------------------------------
4. backend 폴더가서 npm install
5. npm start 로 확인
--------------------------------

6. pm2 설치
- sudo npm install pm2 -g

- pm2 start apps/shop/backend/server.js
- pm2 start apps/shop/backend/server.js --name [name입력]
- pm2 stop 0[id or name]
- pm2 status
- pm2 delete [id or name]

//startup Setting
- pm2 startup ---> startup Script command출력됨 -->

sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

- pm2 save

- sudo reboot

---------------------------------------------
7. client
- client폴더 이동 cd apps/shop/client
- npm install
- npm run build
- cd build
- build 내의 index.html가 필요

-------------------------------------------
8. nginx 설치
- sudo apt install nginx -y

- sudo systemctl status nginx

- sudo systemctl enable nginx

- /etc/nginx 폴더에서 ls (sites-available)
- cd sites-available (default파일 있음 default server block)
- cat default
------------------------------------------
9. 파일 수정
- file하나 만들자
- default 복사 : sudo cp default shop 아니면 default 자체를 수정하자
- sudo vi shop

server {
        listen 80;
        listen [::]:80;

        root /home/ubuntu/apps/shop/client/build;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name _ 13.52.254.187;

        location / {
                try_files $uri $uri/ /index.html;
                error_page 405 = $uri;
        }

         location /api {
            proxy_pass http://localhost:8000;
            //-------->http://localhost:8000/api로바꿔보자
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

          location /public {
            proxy_pass http://localhost:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /socket.io/ {
          proxy_pass http://localhost:8800/socket.io/;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "Upgrade";
          proxy_set_header Host $host;
        }

}

11. Enable the new site
- sudo ln -s /etc/nginx/sites-available/shop /etc/nginx/sites-enabled/
- sudo systemctl restart nginx
- systemctl status nginx.service
-------------------------------------------------------------------------

12. ENV 관리

* 개별 env 설정
- export TEST="hello" 세팅 끝
- printenv
- printenv | grep -i test
- unset TEST

* env 폴더 최상단에서 관리하자
* env 파일 생성으로 한번에 적용
- vi .env
- env변수들 붙여넣기
- set -o allexport; source /home/ubuntu/.env; set +o allexport
- printenv로 확인
- ls -la
-.profile 에서 env변수 reboot시 바로 적용
- vi .profile
- set -o allexport; source /home/ubuntu/.env; set +o allexport 


13. 권한 해결
vi /etc/nginx/nginx.conf 명령어를 통해 vi 편집기로 다음과 같이 user를 변경해주는 것으로 해결하였다.

/etc/nginx/nginx.conf

#user www-data;
user root;
sudo systemctl restart nginx


14. Enable Firewall
sudo ufw status
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status


-에러 확인
cat /var/log/nginx/error.log






[1]   Done                    MONGO_URI=mongodb+srv://mongo:db12345@cluster.icwey.mongodb.net/shop?retryWrites=true
[2]-  Done                    REACT_APP_KAKAO_AUTH_URL=https://kauth.kakao.com/oauth/authorize?client_id=aa5cadd3788f85adabab37ee2afd113d
[3]+  Done                    redirect_uri=http://localhost:3000/kakao/callback

설정 왜 안됩니까





- 405 not allowed error
----> error_page 405 = $uri

- 소켓에러 잡아야함!
- env설정 안되는것들 수동설정하고 
- pw초기화 등 localhost <-- 다 수정해야함 




location /socket.io/ {
    proxy_pass http://localhost:8800/socket.io/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
}



################# pro






collection페이지
main.7462a239.js:2 TypeError: Cannot read properties of undefined (reading 'map')