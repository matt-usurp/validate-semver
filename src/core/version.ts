import type { Nullable } from '@matt-usurp/grok';
import coerce from 'semver/functions/coerce';

export const validate = (value: string): Nullable<string> => {
  const refless = value.replace(/^refs\/tags\//, '');
  const coerced = coerce(refless);

  if (coerced === null) {
    return null;
  }

  return coerced.format();
};
