# Validate Semantic Version Action

> Ensure the given version complies with semantic versioning.

This action will validate the given `version` input and ensure that it complies with [semantic versioning](http://semver.org/).
If the action succeeds then the cleansed `version` and its separate components can be accessed through the acount outputs.
The input can also be a [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) which contains a version string, in this case it will be parsed out. See [resolution strategy](#resolution-strategy) for more information.

## Usage

The action can be used on its own or with an assigned `id` depending on the use case.
When the given `version` is not valid the action will cause the workflow to halt with an error.
Otherwise the version and its components are available through the action outputs.

```yaml
- id: semver
  uses: matt-usurp/validate-semver@v2
  with:
    version: ${{ github.ref }} # refs/tags/v1.2.3

- run: |
    echo "v${{ steps.semver.outputs.version }}"
    echo "v${{ steps.semver.outputs.major }}"
    echo "v${{ steps.semver.outputs.minor }}"
    echo "v${{ steps.semver.outputs.patch }}"
    echo "v${{ steps.semver.outputs.prerelease }}"
    echo "v${{ steps.semver.outputs.build }}"
```

## Inputs

You can configure the action with the following parameters:

| Name | Type | Required | Description | Example |
| ---- | ---- | -------- | ----------- | ------- |
| `version` | `string` | `true` | The version or [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) | `v2.3.4-dev+001` |

## Outputs

The following outputs are available through `steps.<id>.outputs` when the action has completed successfully.

| Name | Type | Description | Example |
| ---- | --- | ------------ | ------- |
| `version` | `string` | The full version without prefixes | `2.3.4-dev+001` |
| `major` | `number` | The major version number | `2` |
| `minor` | `number` | The minor version number | `3` |
| `patch` | `number` | The patch version number | `4` |
| `prerelease` | `string` | The [prerelease](https://semver.org/#spec-item-9) version | `dev` |
| `build` | `string` | The [build](https://semver.org/#spec-item-10) metadata | `001` |

> [!TIP]
> The version is coerced in to a semantic version as per the [resolution strategy](#resolution-strategy), therefore all outputs will be present assuming the action succeeds.
> The default values for `number` types is `0` and `string` types (such as [prerelease](https://semver.org/#spec-item-9) and [build](https://semver.org/#spec-item-10)) will be empty strings.


## Resolution Strategy

The `version` parameter can be a version string with an optional `v` prefix which is stripped.
All versions that are in a short-form are expanded to their full-form.

| Input | Output |
| ----- | ------ |
| `1` or `v1` | `1.0.0` |
| `1.2` or `v1.2` | `1.2.0` |
| `1.2.3` or `v1.2.3` | `1.2.3` |

If you supply a [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) then the version will be extracted before performing the above operation.

| Input | Output |
| ----- | ------ |
| `refs/tags/1` or `refs/tags/v1` | `1.0.0` |
| `refs/tags/1.2` or `refs/tags/v1.2` | `1.2.0` |
| `refs/tags/1.2.3` or `refs/tags/v1.2.3` | `1.2.3` |

## Action Versions

This action uses [semantic versioning](https://semver.org/) for its tagging and change management.

As with most actions, there is a major version branch that mimics the latest tag for that major version.
This means its safe to target the `v2` ref instead of a specific tag (e.g `2.0.1`) if you want to receive bug fixes automatically.
Breaking changes from this point will result in the creation of a new `v3` branch and set of tags.

> [!TIP]
> It is **recommended** to use `v2` of this action.

| Action | Node | Comment |
| ------ | ---- | ------- |
| `matt-usurp/validate-semver@v2` | `node@20` | Recommended |
| `matt-usurp/validate-semver@v1` | `node@16` | Archived |

At this point `v1` is deprecated as its target node version `node@16` has been [end of life since September 11th 2023](https://nodejs.org/en/blog/announcements/nodejs16-eol).
You can continue to use `v1` as long as `node@16` is [supported by GitHub](https://github.blog/changelog/2023-09-22-github-actions-transitioning-from-node-16-to-node-20), however it is now archived and will not be receiving any new updates (features or bug fixes).
