# Validate SemVer Action

An action that can validate the given `version` input and return it for use in other parts of your workflow.
A cleansing step is taken additionally to strip away prefixes and support some common use cases such as extracting a the `version` from a given [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) instead.

## Usage

```yaml
- id: semver
  uses: matt-usurp/validate-semver@v1
  with:
    version: ${{ github.ref }}

- run: |
    echo "v${{ steps.semver.outputs.version }}"
```

## Inputs

You can configure the action with the following parameters:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `version` | `string` | `true` | The version or [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) |

## Outputs

The following outputs are available through `steps.<id>.outputs` when the action has completed successfully.

| Name | Type | Description |
| ---- | --- | ----------- |
| `version` | `string` | The full version wihout prefixes |

## Resolution Strategy

The `version` parameter can be a semver compliant version string or a [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) pointing to a tag.
A valid version can be with or without the `v` prefix, however the outputs will always be without this prefix.

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
