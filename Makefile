install:
	npm install
	bower install

develop:
	gulp develop

test:
	npm test

publish:
	npm publish

setup-staging:
	ansible-playbook cm/setup.yml -i cm/staging
deploy-staging:
	ansible-playbook cm/deploy.yml -i cm/staging

.PHONY: test
