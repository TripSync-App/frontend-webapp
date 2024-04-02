MONGO_USERNAME := $(shell docker-compose config | grep -oP "MONGO_INITDB_ROOT_USERNAME: \K([A-Za-z]*)" | awk '{print $2}')
MONGO_PASSWORD := $(shell docker-compose config | grep -oP "MONGO_INITDB_ROOT_PASSWORD: \K([A-Za-z]*)" | awk '{print $2}')
PHONY: stop remove build up migrate connect build-force pull

stop:
	docker stop frontend-webapp

remove:
	docker remove frontend-webapp

build:
	docker compose build 

build-force:
	docker compose build --no-cache


migrate:
	docker exec -it edgedb bash ./migrate.sh

pull:
	docker compose pull

up:
	docker compose up -d

connect:
	docker exec -it edgedb edgedb --dsn edgedb://edgedb:edgedb@localhost --tls-security insecure 

connect-mongo:
	docker exec -it tripsync-mongo mongosh mongodb://$(MONGO_USERNAME):$(MONGO_PASSWORD)@localhost
