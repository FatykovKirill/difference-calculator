install: 
	npm ci
publish:
	npm publish --dry-run
link:
	npm link
help: 
	gendiff -h
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8