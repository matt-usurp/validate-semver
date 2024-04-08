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
  test.watch \
	test.coverage.open

test:
	npx vitest run -c vitest.config.mts --coverage

test.watch:
	npx vitest watch -c vitest.config.mts

test.coverage.open:
	open build/coverage/index.html

# --
# -- Build
# --

build: \
	build.compile \
	build.compile.verify

build.compile:
	npx esbuild \
    src/main.ts \
		--bundle \
		--platform=node \
		--target=node16 \
		--format=cjs \
		--tree-shaking=true \
		--outfile=build/action.js

build.compile.verify:
	test -f build/action.js
