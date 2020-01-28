# RESTful API with Gorilla Mux and MongoDB

## 1. 프로젝트 환경 설정

* Go 1.13.5
* MongoDB 4.2.1
* VScode (with Go extension)



### 1.1 디렉토리 생성 및 GOPATH 설정

```shell
mkdir ~/hands_on_RESTful_with_Go & cd ~/hands_on_RESTful_with_Go
export GOPATH=~/hands_on_RESTful_with_Go
```

별도의 GOPATH를 설정해주지 않으면 GOROOT를 프로젝트 루트 디렉토리로 사용하게 된다.



### 1.2 필요한 패키지들 다운로드

```shell
go get github.com/gorilla/mux
go get gopkg.in/mgo.v2
```



### 1.3 디렉토리 스트럭쳐 리뷰

```shell
hands_on_RESTful_with_Go$ tree -L 2
.
├── bin # Go extensions, you can download automatically with VScode
│   ├── fillstruct
│   ├── go-outline
│   ├── go-symbols
│   ├── gocode
│   ├── godoctor
│   ├── gomodifytags
│   ├── gopkgs
│   ├── goplay
│   ├── gorename
│   ├── gotests
│   ├── guru
│   └── impl
├── pkg
│   ├── darwin_amd64
│   ├── mod
│   └── sumdb
└── src
    ├── github.com
    ├── gopkg.in
    └── movieAPI.go
```



### 1.4 Working with the Mongo shell

```shell
$ mongo
> use appdb # 새로운 데이터베이스 appdb가 생성된다.
> db.movies.insertOne({_id: 5, name: 'Star Trek', year: 2009, directors: ['J.J. Abrams'], writers: ['Roberto Orci', 'Alex Kurtzman'], boxOffice: {budget:150000000, gross:257704099}}) # document를 삽입함으로써 콜렉션을 생성해준다.
```



## 2. 코딩

```go
package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// DB stores the database session information. Needs to be initialize once
type DB struct {
	session    *mgo.Session
	collection *mgo.Collection
}

type Movie struct {
	ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name      string        `json:"name" bson:"name"`
	Year      string        `json:"year" bson:"year"`
	Directors []string      `json:"directors" bson:"directors"`
	Writers   []string      `json:"writers" bson:"writers"`
	BoxOffice BoxOffice     `json:"boxOffice" bson:"boxOffice"`
}

type BoxOffice struct {
	Budget uint64 `json: "budget" bson:"budget"`
	Gross  uint64 `json: "gross" bson:"gross"`
}

// GetMovie fetches a movie with a given ID
func (db *DB) GetMovie(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	var movie Movie
	err := db.collection.Find(bson.M{"_id": bson.ObjectIdHex(vars["id"])}).One(&movie)
	if err != nil {
		w.Write([]byte(err.Error()))
	} else {
		w.Header().Set("Content-Type", "application/json")
		response, _ := json.Marshal(movie)
		w.Write(response)
	}
}

// PostMovie adds a new movie to our MongoDB collection
func (db *DB) PostMovie(w http.ResponseWriter, r *http.Request) {
	var movie Movie
	postBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(postBody, &movie)
	movie.ID = bson.NewObjectId()
	err := db.collection.Insert(movie)
	if err != nil {
		w.Write([]byte(err.Error()))
	} else {
		w.Header().Set("Content-Type", "application/json")
		response, _ := json.Marshal(movie)
		w.Write(response)
	}
}

func main() {
	session, err := mgo.Dial("127.0.0.1")
	if err != nil {
		panic(err)
	}
	c := session.DB("appdb").C("movies")
	db := &DB{session: session, collection: c}
	defer session.Close()

	// Create a new router
	r := mux.NewRouter()
	// Attach an path with handler
	r.HandleFunc("/v1/movies/{id:[a-zA-Z0-9]*}", db.GetMovie).Methods("GET")
	r.HandleFunc("/v1/movies", db.PostMovie).Methods("POST")
	srv := &http.Server{
		Handler: r,
		Addr:    "127.0.0.1:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}
```



## 3. 테스트 

Terminal #1

```shell
hands_on_RESTful_with_Go$ go run src/movieAPI.go
// server running...
```



Terminal #2

```shell
hands_on_RESTful_with_Go$ curl -X POST http://localhost:8000/v1/movies \
-H 'cahce-control: no-cache' \
-H 'content-type: application/json' \
-d '{"name": "The Dark Knight", "year": "2008", "directors": ["Crhistopher Nolan"], "writers": ["Jonathan Nolan", "Christopher Nolan"], "boxOffice": {"budget": 1850000000, "gross": 533316061}}'
{"id":"5e30c030addb204b1bcce1a9","name":"The Dark Knight","year":"2008","directors":["Crhistopher Nolan"],"writers":["Jonathan Nolan","Christopher Nolan"],"boxOffice":{"Budget":1850000000,"Gross":533316061}}%

hands_on_RESTful_with_Go curl -X GET "http://localhost:8000/v1/movies/5e30c030addb204b1bcce1a9" \
> -H 'cache-control: no-cache' \
{"id":"5e30c030addb204b1bcce1a9","name":"The Dark Knight","year":"2008","directors":["Crhistopher Nolan"],"writers":["Jonathan Nolan","Christopher Nolan"],"boxOffice":{"Budget":1850000000,"Gross":533316061}}%
```



REFERENCEs:

[BUILDING_RESTFUL_WEB_SERVICES_WITH_GO.pdf](https://www.dropbox.com/s/xzrigzcolpbk1se/BUILDING_RESTFUL_WEB_SERVICES_WITH_GO.pdf?dl=0)

[The Go Programming Language.pdf](https://www.dropbox.com/s/ha1vqq3lx7f5nsq/The%20Go%20Programming%20Language%20-%20Donovan%2C%20Alan%20A.%20A.%20%26%20Kernigha_6127.pdf?dl=0)