install:
	npm install
	bower install # ?

develop:
	gulp develop

test:
	npm test

publish:
	npm publish

docker_build:
	docker build -t hexlet/hexlet-ide .

docker_bash:
	docker run -it hexlet-ide /bin/bash

docker_run:
	docker run -p 9000:9000 hexlet-ide

.PHONY: test publish develop install
