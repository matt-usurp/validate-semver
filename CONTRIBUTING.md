# Contributing

1. Follow [semantic versioning specification](https://semver.org/) for guidance and provide links where possible to backup changes or requested features.
2. Make changes backwards compatible at all times unless proposing breaking changes and a major version increase. Try keep this to discussions or issues before making drastic changes in pull-requests.
3. Write easily digestible pull-requests with the title following [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
4. Keep code coverage and tests updated with changes.

## Development

This project uses `node` and supplies a `.nvmrc` file, please ensure your local environment has the correct node version.
Once prepared you can run `npm install` (or `npm i`) to install dependencies.
All changes should happen outside of the `src/main.ts` file as this is the integration point with GitHub actions.
You can test your action by running `make build` (which uses `esbuild` to compile the code and dependencies) and running `node build/action.cjs` with [environment variables](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#inputs) to configure your inputs.

```sh
INPUT_VERSION=v1.2.3 node build/action.cjs
```

This project uses `Makefile` as a "task runner" and be can be used to perform all of the actions that the GitHub actions builds run.

- `make code` to dry-run code linting
- `make code.fix` to fix code linting issues
- `make test` to run the tests
- `make test.watch` to run the tests in watch mode
- `make build` to build the compiled action file
