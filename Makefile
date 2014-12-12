install:
	npm install
	./node_modules/bower/bin/bower install # ?

develop:
	gulp bower-copy
	gulp develop

test:
	npm test

publish:
	npm publish

docker_build:
	docker build -t hexlet/hexlet-ide:$(TAG) .

docker_bash:
	docker run -p 9000:9000 -it hexlet/hexlet-ide /bin/bash

docker_run:
	docker run -p 9000:9000 hexlet/hexlet-ide

.PHONY: test publish develop install
