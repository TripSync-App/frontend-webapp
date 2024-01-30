PHONY: stop remove build up

stop:
	docker stop frontend-webapp

remove:
	docker remove frontend-webapp

build:
	docker compose build --no-cache

up:
	docker compose up -d
