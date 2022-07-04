# client 추가 수정사항
- 재고 초과해서 주문 못하게
- 주소 없으면 결제못하게
- 카트담고 다른상품 이동시 사이즈선택 그대로 남아있음
- mypage


# 프로젝트 사이즈 더 커지면 SPRING에서 하던거처럼 DAO SERVICE CONTROLLER 더 세분화 해서 나눠야겠다

-SERVICE단에서 DAO묶어 트랜잭션처리 하고싶다.....


# 문제점1
- 규모가 커지면서 Controller가 여러 model(table)의 Backend 처리를 하고있다.

-spring에서 처리하듯 controller -> DAO, SERVICE로 세분화하여

DAO -> 단일model(table)의 db access만 control

SERVICE -> client요구에 맞는 여러 DAO묶어 transaction처리 후 전송하는 시스템이 필요할듯

client - server - router - service -< dao 구조로 짜야할듯


- 동적인 변화가 크지 않은 쇼핑몰은 SSR 형식으로 짜는게 유리할듯
---> 기존 스프링&jsp와 차이점은?

# 문제점2
- next.js의 pages components 구조 따와서 만들었는데
- 기존 component폴더는 공통 component만 모으고
- Container를 만들어 page와 해당 페이지에서만 사용하는 component를 묶어 관리하는 게 더 편할 거 같다


# 쇼핑몰처럼 정적 page가 많은경우 ssr로 만드는 게 좋을듯
# static page들은 server에서 만들어 보내자


# 문제점3 몽고db 읽기 일관성유지 어떻게하나... 트랜잭션처리가 제일 문제네...
review 등록 후 페이지이동 -> getReview

addReview, getReviews 한 트랜잭션으로 처리해야한다. 방법은?

# 문제점4 소켓 액션 따로 모아서 전역 관리 필요 

# 문제점5 스키마(model) 내부 객체들도 따로 관리해야할 필요성
- order 내부의 orer Item 별도 객체로 관리 필요
                            
# mongodb
$unwind :sql-join


# admin add 시 slice앞에추가하기
[추가, ...prev] 이런식으로



