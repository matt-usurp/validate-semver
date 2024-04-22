import coerce from 'semver/functions/coerce.js';

/**
 * A breakdown of the semantic version.
 */
export type VersionBreakdown = {
  readonly version: string;

  readonly part: {
    readonly major: string;
    readonly minor: string;
    readonly patch: string;
    readonly prerelease: string;
    readonly build: string;
  };
};

/**
 * Resolve and cleanse the given {@link value} and coerce to a version.
 */
export const resolveVersionFromString = (value: string): VersionBreakdown | undefined => {
  const version = coerce(value, { includePrerelease: true });

  if (version === null) {
    return undefined;
  }

  return {
    version: version.format(),

    part: {
      major: version.major.toString(),
      minor: version.minor.toString(),
      patch: version.patch.toString(),
      prerelease: version.prerelease.join('.'),
      build: version.build.join('.'),
    },
  };
};
