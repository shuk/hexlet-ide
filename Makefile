test:
	npm test

setup-staging:
	ansible-playbook cm/setup.yml -i cm/staging
deploy-staging:
	ansible-playbook cm/deploy.yml -i cm/staging

.PHONY: test
