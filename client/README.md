
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
