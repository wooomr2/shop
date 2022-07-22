
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

## SSR로 만드는 게 좋을듯
- 스프링 프로젝트와 다르게 csr로 만들어 봤지만 쇼핑몰처럼 정적 page가 많은경우 SSR이 효율적일 듯

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

-------------------------------------------------------------------------
# AWS EC2(UBUNTU) 배포

- 보안 그룹 설정
HTTP(PORT 80 :NGNIX)
HTTPS(PORT 443 :NGNIX)
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
   socket npm install
5. npm start 로 확인
--------------------------------

6. pm2 설치
- sudo npm install pm2 -g

- pm2 start apps/shop/socket/index.js
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
- sudo systemctl restart nginx
- sudo systemctl stop nginx

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
       return 301 https://$host$request_uri;
}

도메인 구입 & cerbot 적용 후 아래 server-> 
 listen 443 ssl default_server;
 listen [::]443 ssl default_server;


server {
        listen 80;
        listen [::]:80;

        root /home/ubuntu/apps/shop/client/build;

        index index.html;

        server_name _ 13.52.254.187;

        location / {
                try_files $uri /index.html;
                error_page 405 = $uri;
        }

         location /api {
            proxy_pass http://localhost:8000;
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

        location /socket.io {
          proxy_pass http://localhost:8800/socket.io;
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

- 에러 확인
cat /var/log/nginx/error.log


14. Enable Firewall
sudo ufw status
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status


15. https lets encrypt with cerbot
- sudo snap install core; sudo snap refresh core
- sudo apt remove certbot
- sudo snap install --classic certbot

Prepare the Certbot command
- sudo ln -s /snap/bin/certbot /usr/bin/certbot
Get and install certificates using interactive prompt
- sudo certbot --nginx