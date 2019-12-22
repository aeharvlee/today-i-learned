# 3분 핸즈 온: MySQL 쿼리 성능 개선 

> 대상 독자: MySQL 디비 성능을 개선하고 싶은데 아직 관련 경험이 전무한 개발자 혹은 엔지니어

핸즈 온을 진행하는 필자의 환경:

* **OS:** MacOS 10.15.2
* **MySQL:** Ver 8.0.18
* **MySQL Workbench**

OS 관계 없이 MySQL과 Workbench만 있으면 된다. Workbench가 아닌 다른 툴을 사용해도 좋다.



## 1. 개요

5만 개의 데이터를 다루는 연산을 수행합니다. INSERT, SELECT에 대해 다룰 것이며 어떻게 성능을 올릴 수 있을지 고민하면서 직접 실습해보자.

### 1.1 MySQL Workbench 설정

Preference > MySQL Session

* DBMS connection read timeout interval (in seconds): 30 > 300
* DBMS connection timeout interval (in seconds): 60 > 600

으로 각각 변경해주었다.

많은 데이터를 다루다 보면 요청이 다 처리되지 못한채 커넥션이 끊길 수 있기 때문이다. 따라서 기본(Default)설정보다 더 많은 값을 할당해준다.



### 1.2 Create Schema

이번 핸즈 온에 사용할 스키마를 생성해줍니다. 필자의 경우 `test_schema`라는 이름으로 생성해주었다.



## 2. 실습

https://gist.github.com/aeharvlee/ac075359456480601ade6efe8f973551

직접 코드를 한 단위씩 실행하면서 처리되는 시간을 살펴보자.

```mysql
# Step1: Create test_schema
use test_schema;

# Step2: Create table
CREATE TABLE calendars(
	id INT AUTO_INCREMENT,
    fulldate DATE NOT NULL,
    day TINYINT NOT NULL,
    month TINYINT NOT NULL,
    quarter TINYINT NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY(id)
);

# Step3: Create Procedure
DELIMITER $$
CREATE PROCEDURE InsertCalendar(dt DATE)
BEGIN
	INSERT INTO calendars(
		fulldate,
        day,
        month,
        quarter,
        year
	) VALUES (
		dt,
        EXTRACT(DAY FROM dt),
        EXTRACT(MONTH FROM dt),
        EXTRACT(QUARTER FROM dt),
        EXTRACT(YEAR FROM dt)
	);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE LoadCalendarsWithAutoCommit(
	startDate DATE,
    day INT
)
BEGIN
	DECLARE counter INT DEFAULT 1;
    DECLARE dt DATE DEFAULT startDate;
    
    WHILE counter <= day DO
		CALL InsertCalendar(dt);
        SET counter = counter + 1;
        SET dt = DATE_ADD(dt, INTERVAL 1 day);
	END WHILE;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE LoadCalendarsWithoutAutoCommit(
	startDate DATE,
    day INT
)
BEGIN
	DECLARE counter INT DEFAULT 1;
    DECLARE dt DATE DEFAULT startDate;
    
    START TRANSACTION;
    WHILE counter <= day DO
		CALL InsertCalendar(dt);
        SET counter = counter + 1;
        SET dt = DATE_ADD(dt, INTERVAL 1 day);
	END WHILE;
    COMMIT;
END$$
DELIMITER ;

# Step4: Let's benchmark about insert
# Step4-1: With auto commit
SET autocommit = 1;
CALL LoadCalendarsWithAutoCommit('1001-01-01', 50000);

# Step4-2: Without auto commit
SET autocommit = 0;
CALL LoadCalendarsWithAutoCommit('1001-01-01', 50000);

# Step5: Let's benchmark about select
# Step5-1: Default option
SET autocommit = 1;
SELECT * FROM Calendars;
# Step5-2: Use read only option
START TRANSACTION READ ONLY;
SELECT * FROM Calendars;
COMMIT;
```



## 3. 결론

**INSERT (UPDATE, DELETE의 경우에도 해당 될 것임.)**

* 디폴트 옵션(autocommit = 1)으로 5만 개의 데이터를 삽입할 때 걸리는 시간: 약 19초

* autocommit 옵션을 끄고 트랜잭션과 커밋으로 나누어 처리했을 때 시간: 약 2초

**적용: 많은 양의 데이터를 다룰 때는 반드시 트랜잭션과 커밋을 나누어 처리할 것.**



**SELECT**

* START TRANSACTION READ ONLY로 처리했을 경우, 성능 개선은 거의 없다.
* 그러나 읽기 트랜잭션 중 쓰기 트랜잭션을 방지한다는 면에서 필요할 때가 분명 있을 것이다.

**적용: 읽기 목적에 따라 트랜잭션을 적절히 사용해줄 것. 크게 성능 향상은 없다.**

