# JWT TOKEN
1. 로그인시 
--> 최초로그인시 :  
 accessToken, refreshToken 발급
 cookie에 jwt라는 이름으로 refreshToken 저장
 userDB에 refreshToken Array 저장

--> 이후 로그인시 : 
기존 accessToken, refreshToken, db, cookie 초기화 후 재발급



2. client에서 권한 인증 필요할 시
-- header.Authorization = Bearer accessToken 보냄


3. backend middleware.verifyToken에서  accessToken 검증
--> 토큰없음->401 unauthorized error====>끝 에러페이지로

--> 유효하지 않은 토큰 --> 403 error


4. axios res.interceptor
-- 403 error시 handleRefreshToken으로

--> cookie에 jwt 없을경우 401 unauthorized error====>끝 에러페이지로

jwt있는 경우--> refresh토큰으로 사용자 인증 후
일치하면

사용한 refresh토큰 제거 후 신규 refreshToken 저장 & accessToken 재발급(client단에 전송)


refreshToken 만료 전까지는 로그인유지 가능




=========내일할거
--role 배열로 만들기 && protectedRoute 수정 verifyRoles Usermodel 
--보내는 유저 정보 수정 