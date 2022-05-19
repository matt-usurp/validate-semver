import type { Nullable } from '@matt-usurp/grok';
import coerce from 'semver/functions/coerce';

export type VersionBreakdown = {
  readonly version: string;

  readonly part: {
    readonly major: string;
    readonly minor: string;
    readonly patch: string;
  };
};

export const validate = (value: string): Nullable<VersionBreakdown> => {
  const refless = value.replace(/^refs\/tags\//, '');
  const coerced = coerce(refless);

  if (coerced === null) {
    return null;
  }

  return {
    version: coerced.format(),

    part: {
      major: coerced.major.toString(),
      minor: coerced.minor.toString(),
      patch: coerced.patch.toString(),
    },
  };
};
