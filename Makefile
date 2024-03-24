PHONY: stop remove build up migrate connect build-force

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

up:
	docker compose up -d

connect:
	docker exec -it edgedb edgedb -P 5656 --tls-security insecure
