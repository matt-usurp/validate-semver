import coerce from 'semver/functions/coerce';

export type VersionBreakdown = {
  readonly version: string;

  readonly part: {
    readonly major: string;
    readonly minor: string;
    readonly patch: string;
    readonly extra: string;
  };
};

export const resolve = (value: string): VersionBreakdown | undefined => {
  const refless = value.replace(/^refs\/tags\//, '');
  const coerced = coerce(refless);

  if (coerced === null) {
    return undefined;
  }

  let extra = '';
  let version = coerced.format();

  const prerelease = refless.indexOf('-');
  if (prerelease > -1) {
    extra = refless.slice(prerelease + 1);
    version = `${version}-${extra}`;
  }

  return {
    version,

    part: {
      major: coerced.major.toString(),
      minor: coerced.minor.toString(),
      patch: coerced.patch.toString(),
      extra,
    },
  };
};
