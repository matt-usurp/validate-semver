.PHONY: default
default:
	#

# --
# -- Code Formatting
# --

.PHONY: \
	code \
	code.fix

code:
	npx eslint \
		--cache \
		--cache-location .eslintcache \
		--format codeframe \
			./src

code.fix:
	npx eslint \
		--cache \
		--cache-location .eslintcache \
		--fix \
		--format codeframe \
			./src

# --
# -- Testing
# --

.PHONY: \
	test \
	test.coverage.open \
	test.build

test:
	npx jest --verbose --colors

test.coverage.open:
	open build/coverage/index.html

# --
# -- Build
# --

build: \
	build.compile \
	build.compile.verify

build.compile:
	npx esbuild src/main.ts \
		--outfile=build/action.js \
		--platform=node \
		--tree-shaking=true \
		--bundle

build.compile.verify:
	test -f build/action.js
