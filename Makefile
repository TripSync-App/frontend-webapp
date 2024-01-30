PHONY: stop remove build up

stop:
	docker stop frontend

remove:
	docker remove frontend

build:
	docker compose build --no-cache

up:
	docker compose up -d
