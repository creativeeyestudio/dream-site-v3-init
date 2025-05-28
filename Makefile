include .env
DEV_TAG=dev-$(shell date +%Y%m%d%H%M)
PROD_TAG ?= v1.0.0

up:
	docker-compose up -d

down:
	docker-compose down

init-front-dev:
	bash scripts/init-front-dev.sh

build-dev:
	bash scripts/build-dev.sh $(DEV_TAG)

build-prod:
	bash scripts/build-prod.sh $(PROD_TAG)