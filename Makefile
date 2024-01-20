PHONY: stop remove build up

stop:
	docker stop frontend_webapp

remove:
	docker remove frontend_webapp

build:
	docker compose build --no-cache

up:
	docker compose up -d
