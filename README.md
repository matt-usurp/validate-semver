# Validate Semantic Version Action

> Ensure the given version complies with semantic versioning.

An action that can validate the given `version` input and ensure that it complies with [semantic versioning](http://semver.org/).
If the action suceeds then the version and its breakdown can be accessed through outputs.
The input is analysed and the version is extracted if a [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) has been provided.

## Usage

The action can be used on its own or with an assigned `id` depending on the use case.
When the given `version` is not valid the action will cause the workflow to halt with an error.
Otherwise the version and its components are avaialbe through action outputs.

```yaml
- id: semver
  uses: matt-usurp/validate-semver@v2
  with:
    version: ${{ github.ref }}

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

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `version` | `string` | `true` | The version or [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) |

> [!IMPORTANT]
> See more in the [resolution strategy](#resolution-strategy) section.

> [!TIP]
> A valid version can be with or without the `v` prefix.
> This prefix will always be stripped if present.
> If you wish to keep the `v` prefix then you can manually add it back when making use of the action outputs.

## Outputs

The following outputs are available through `steps.<id>.outputs` when the action has completed successfully.

| Name | Type | Description | Example |
| ---- | --- | ------------ | ------- |
| `version` | `string` | The full version without prefixes | `2.13.34-dev+001` |
| `major` | `string` | The major version number | `2` |
| `minor` | `string` | The minor version number | `13` |
| `patch` | `string` | The patch version number | `34` |
| `prerelease` | `string` | The prerelease version | `dev` |
| `build` | `string` | The build metadata | `001` |

> [!TIP]
> The version is coerced in to a semantic version as per the [resolution strategy](#resolution-strategy), therefore all outputs will be present assuming the action succeeds.
> In all cases the `prerelease` output will always be an empty string (`""`) unless provided in the [prerelease version](https://semver.org/#spec-item-9).
> Similarly the `build` output will always be an empty string (`""`) unless provided in the [build metadata](https://semver.org/#spec-item-10).

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
Assuming the version part can be resolved as mentioned above then the prerelease part is re-attached and is made available through action outputs.

| Input | Output |
| ----- | ------ |
| `v1-alpha.0` | `1.0.0-alpha.0` |

## Action Versions

This action uses [semver](https://semver.org/) for its tagging and change management.

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

> [!NOTE]
> Both `v1` and `v2` are running the same code, however they are compiled for different node versions.
