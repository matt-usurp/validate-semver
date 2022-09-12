# Validate Semantic Version Action

> Ensure the given version complies with semantic versioning.

An action that can validate the given `version` input and ensure that it complies with [semantic versioning](http://semver.org/).
If the action suceeds then the version and its breakdown can be accessed through outputs.
The input is analysed and the version is extracted if a [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) has been provided.

## Usage

The action can be used on its own or with an assigned `id` depending on the use case.
When the given `version` is not valid the action will cause the workflow to halt with an error.
Otherwise the version and its breakdown are avaialbe through the outputs.

```yaml
- id: semver
  uses: matt-usurp/validate-semver@v1
  with:
    version: ${{ github.ref }}

- run: |
    echo "v${{ steps.semver.outputs.version }}"
    echo "v${{ steps.semver.outputs.major }}"
    echo "v${{ steps.semver.outputs.minor }}"
    echo "v${{ steps.semver.outputs.patch }}"
    echo "v${{ steps.semver.outputs.extra }}"
```

## Inputs

You can configure the action with the following parameters:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `version` | `string` | `true` | The version or [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) |

> **Note** that a valid version can be with or without the `v` prefix.
> This prefix will be stripped if present.
> If you wish to keep the `v` prefix then you can manually add it when you use the outputs.

## Outputs

The following outputs are available through `steps.<id>.outputs` when the action has completed successfully.

| Name | Type | Description | Example |
| ---- | --- | ------------ | ------- |
| `version` | `string` | The full version wihout prefixes | `2.13.34-dev` |
| `major` | `string` | The major version number | `2` |
| `minor` | `string` | The minor version number | `13` |
| `patch` | `string` | The patch version number | `34` |
| `extra` | `string` | The prerelease version number | `dev` |

> **Note** that because the version is coerced in to a semantic version all outputs will be present assuming the action succeeds.
> That is, the version `v4` will mean that the outputs for `minor` and `patch` will be the string value `0`.
> In all cases the `extra` output will always be an empty string (`""`) unless the version is a [prerelease version](https://semver.org/#spec-item-9).

## Resolution Strategy

The `version` parameter can be a semver compliant version string or a [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) pointing to a tag.

| Input | Output |
| ----- | ------ |
| `1` or `v1` | `1.0.0` |
| `1.2` or `v1.2` | `1.2.0` |
| `1.2.3` or `v1.2.3` | `1.2.3` |

If you instead supply a [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) then the version will be extracted first before performing the above operation.

| Input | Output |
| ----- | ------ |
| `refs/tags/1` or `refs/tags/v1` | `1.0.0` |
| `refs/tags/1.2` or `refs/tags/v1.2` | `1.2.0` |
| `refs/tags/1.2.3` or `refs/tags/v1.2.3` | `1.2.3` |

It is possible to also resolve [prerelease](https://semver.org/#spec-item-9) versions in the same way, this takes the first `-` and splits the version before trying to resolve.
Should the version part resolve then the prerelease part is re-attached.

| Input | Output |
| ----- | ------ |
| `v1-alpha.0` | `1.0.0-alpha.0` |
