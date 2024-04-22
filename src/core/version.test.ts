import { resolveVersionFromString } from './version.js';

describe('resolve()', (): void => {
  type TestCase = {
    input: string;

    version: string;

    major: string;
    minor: string;
    patch: string;
    extra: string;
  };

  it.each<TestCase>([
    { input: '1', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'v3', version: '3.0.0', major: '3', minor: '0', patch: '0', extra: '' },

    { input: '1.0', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: '1.1', version: '1.1.0', major: '1', minor: '1', patch: '0', extra: '' },
    { input: 'v3.4', version: '3.4.0', major: '3', minor: '4', patch: '0', extra: '' },

    { input: 'v1.0.0', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: '1.2.3', version: '1.2.3', major: '1', minor: '2', patch: '3', extra: '' },
    { input: 'v3.4.2', version: '3.4.2', major: '3', minor: '4', patch: '2', extra: '' },

    { input: 'refs/tags/1', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'refs/tags/3', version: '3.0.0', major: '3', minor: '0', patch: '0', extra: '' },
    { input: 'refs/tags/v3', version: '3.0.0', major: '3', minor: '0', patch: '0', extra: '' },

    { input: 'refs/tags/1.0', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'refs/tags/3.4', version: '3.4.0', major: '3', minor: '4', patch: '0', extra: '' },
    { input: 'refs/tags/v5.3', version: '5.3.0', major: '5', minor: '3', patch: '0', extra: '' },

    { input: 'refs/tags/1.0.0', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'refs/tags/3.4.2', version: '3.4.2', major: '3', minor: '4', patch: '2', extra: '' },
    { input: 'refs/tags/v4.6.1', version: '4.6.1', major: '4', minor: '6', patch: '1', extra: '' },

    { input: '1-beta.1', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', extra: 'beta.1' },
    { input: '1.2-beta.2', version: '1.2.0-beta.2', major: '1', minor: '2', patch: '0', extra: 'beta.2' },
    { input: '1.2.3-beta.3', version: '1.2.3-beta.3', major: '1', minor: '2', patch: '3', extra: 'beta.3' },

    { input: 'v1-beta.1', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', extra: 'beta.1' },
    { input: 'v1.2-beta.2', version: '1.2.0-beta.2', major: '1', minor: '2', patch: '0', extra: 'beta.2' },
    { input: 'v1.2.3-beta.3', version: '1.2.3-beta.3', major: '1', minor: '2', patch: '3', extra: 'beta.3' },

    { input: 'refs/tags/v1-beta.1', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', extra: 'beta.1' },
    { input: 'refs/tags/v1.2-beta.2', version: '1.2.0-beta.2', major: '1', minor: '2', patch: '0', extra: 'beta.2' },
    { input: 'refs/tags/v1.2.3-beta.3', version: '1.2.3-beta.3', major: '1', minor: '2', patch: '3', extra: 'beta.3' },

    { input: '1.2.3-dev', version: '1.2.3-dev', major: '1', minor: '2', patch: '3', extra: 'dev' },
    { input: '1.2.3-dev-2022-01-01', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', extra: 'dev-2022-01-01' },

    { input: 'release/1', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'release/v3', version: '3.0.0', major: '3', minor: '0', patch: '0', extra: '' },

    { input: 'release/1.0', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'release/1.1', version: '1.1.0', major: '1', minor: '1', patch: '0', extra: '' },
    { input: 'release/v3.4', version: '3.4.0', major: '3', minor: '4', patch: '0', extra: '' },

    { input: 'release/v1.0.0', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'release/1.2.3', version: '1.2.3', major: '1', minor: '2', patch: '3', extra: '' },
    { input: 'release/v3.4.2', version: '3.4.2', major: '3', minor: '4', patch: '2', extra: '' },

    { input: 'refs/heads/release/1', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'refs/heads/release/v3', version: '3.0.0', major: '3', minor: '0', patch: '0', extra: '' },

    { input: 'refs/heads/release/1.0', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'refs/heads/release/1.1', version: '1.1.0', major: '1', minor: '1', patch: '0', extra: '' },
    { input: 'refs/heads/release/v3.4', version: '3.4.0', major: '3', minor: '4', patch: '0', extra: '' },

    { input: 'refs/heads/release/v1.0.0', version: '1.0.0', major: '1', minor: '0', patch: '0', extra: '' },
    { input: 'refs/heads/release/1.2.3', version: '1.2.3', major: '1', minor: '2', patch: '3', extra: '' },
    { input: 'refs/heads/release/v3.4.2', version: '3.4.2', major: '3', minor: '4', patch: '2', extra: '' },
  ])('with value, can cleanse, $input', (data): void => {
    const value = resolveVersionFromString(data.input);

    expect(value).not.toBeUndefined();
    expect(value?.version).toStrictEqual(data.version);
    expect(value?.part.major).toStrictEqual(data.major);
    expect(value?.part.minor).toStrictEqual(data.minor);
    expect(value?.part.patch).toStrictEqual(data.patch);
    expect(value?.part.extra).toStrictEqual(data.extra);
  });

  it('with value, invalid, return null', (): void => {
    expect(
      resolveVersionFromString('testing'),
    ).toBeUndefined();
  });
});
