import { resolveVersionFromString } from './version.js';

describe('resolve()', (): void => {
  type TestCase = {
    input: string;

    version: string;

    major: string;
    minor: string;
    patch: string;
    prerelease: string;
    build: string;
  };

  it.each<TestCase>([
    /* Release */
    { input: '1', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'v1', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'refs/tags/v1', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'release/v1', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: '1.2', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'v1.2', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'refs/tags/v1.2', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'release/v1.2', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1.2', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: '1.2.3', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'v1.2.3', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'refs/tags/v1.2.3', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'release/v1.2.3', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1.2.3', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },

    /* Pre-release */
    { input: '1-beta.1', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '' },
    { input: 'v1-beta.1', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '' },
    { input: 'refs/tags/v1-beta.1', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '' },
    { input: 'release/v1-beta.1', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '' },
    { input: 'refs/heads/release/v1-beta.1', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '' },
    { input: '1.2-dev', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '' },
    { input: 'v1.2-dev', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '' },
    { input: 'refs/tags/v1.2-dev', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '' },
    { input: 'release/v1.2-dev', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '' },
    { input: 'refs/heads/release/v1.2-dev', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '' },
    { input: '1.2.3-dev-2022-01-01', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: '' },
    { input: 'v1.2.3-dev-2022-01-01', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: '' },
    { input: 'refs/tags/v1.2.3-dev-2022-01-01', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: '' },
    { input: 'release/v1.2.3-dev-2022-01-01', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: '' },
    { input: 'refs/heads/release/v1.2.3-dev-2022-01-01', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: '' },

    /* Empty pre-release */
    { input: '1-', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'v1-', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'refs/tags/v1-', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'release/v1-', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1-', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: '1.2-', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'v1.2-', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'refs/tags/v1.2-', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'release/v1.2-', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1.2-', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: '1.2.3-', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'v1.2.3-', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'refs/tags/v1.2.3-', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'release/v1.2.3-', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1.2.3-', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },

    /* Build */
    { input: '1+21AF26D3----117B344092BD', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '21AF26D3----117B344092BD' },
    { input: 'v1+21AF26D3----117B344092BD', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '21AF26D3----117B344092BD' },
    { input: 'refs/tags/v1+21AF26D3----117B344092BD', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '21AF26D3----117B344092BD' },
    { input: 'release/v1+21AF26D3----117B344092BD', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '21AF26D3----117B344092BD' },
    { input: 'refs/heads/release/v1+21AF26D3----117B344092BD', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '21AF26D3----117B344092BD' },
    { input: '1.2+001', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '001' },
    { input: 'v1.2+001', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '001' },
    { input: 'refs/tags/v1.2+001', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '001' },
    { input: 'release/v1.2+001', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '001' },
    { input: 'refs/heads/release/v1.2+001', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '001' },
    { input: '1.2.3+exp.sha.5114f85', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: 'exp.sha.5114f85' },
    { input: 'v1.2.3+exp.sha.5114f85', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: 'exp.sha.5114f85' },
    { input: 'refs/tags/v1.2.3+exp.sha.5114f85', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: 'exp.sha.5114f85' },
    { input: 'release/v1.2.3+exp.sha.5114f85', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: 'exp.sha.5114f85' },
    { input: 'refs/heads/release/v1.2.3+exp.sha.5114f85', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: 'exp.sha.5114f85' },

    /* Empty build */
    { input: '1+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'v1+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'refs/tags/v1+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'release/v1+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: '1.2+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'v1.2+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'refs/tags/v1.2+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'release/v1.2+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1.2+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: '1.2.3+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'v1.2.3+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'refs/tags/v1.2.3+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'release/v1.2.3+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1.2.3+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },

    /* Pre-release and build */
    { input: '1-beta.1+21AF26D3----117B344092BD', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '21AF26D3----117B344092BD' },
    { input: 'v1-beta.1+21AF26D3----117B344092BD', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '21AF26D3----117B344092BD' },
    { input: 'refs/tags/v1-beta.1+21AF26D3----117B344092BD', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '21AF26D3----117B344092BD' },
    { input: 'release/v1-beta.1+21AF26D3----117B344092BD', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '21AF26D3----117B344092BD' },
    { input: 'refs/heads/release/v1-beta.1+21AF26D3----117B344092BD', version: '1.0.0-beta.1', major: '1', minor: '0', patch: '0', prerelease: 'beta.1', build: '21AF26D3----117B344092BD' },
    { input: '1.2-dev+001', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '001' },
    { input: 'v1.2-dev+001', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '001' },
    { input: 'refs/tags/v1.2-dev+001', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '001' },
    { input: 'release/v1.2-dev+001', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '001' },
    { input: 'refs/heads/release/v1.2-dev+001', version: '1.2.0-dev', major: '1', minor: '2', patch: '0', prerelease: 'dev', build: '001' },
    { input: '1.2.3-dev-2022-01-01+exp.sha.5114f85', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: 'exp.sha.5114f85' },
    { input: 'v1.2.3-dev-2022-01-01+exp.sha.5114f85', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: 'exp.sha.5114f85' },
    { input: 'refs/tags/v1.2.3-dev-2022-01-01+exp.sha.5114f85', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: 'exp.sha.5114f85' },
    { input: 'release/v1.2.3-dev-2022-01-01+exp.sha.5114f85', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: 'exp.sha.5114f85' },
    { input: 'refs/heads/release/v1.2.3-dev-2022-01-01+exp.sha.5114f85', version: '1.2.3-dev-2022-01-01', major: '1', minor: '2', patch: '3', prerelease: 'dev-2022-01-01', build: 'exp.sha.5114f85' },

    /* Empty pre-release and build */
    { input: '1-+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'v1-+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'refs/tags/v1-+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'release/v1-+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1-+', version: '1.0.0', major: '1', minor: '0', patch: '0', prerelease: '', build: '' },
    { input: '1.2-+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'v1.2-+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'refs/tags/v1.2-+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'release/v1.2-+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1.2-+', version: '1.2.0', major: '1', minor: '2', patch: '0', prerelease: '', build: '' },
    { input: '1.2.3-+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'v1.2.3-+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'refs/tags/v1.2.3-+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'release/v1.2.3-+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
    { input: 'refs/heads/release/v1.2.3-+', version: '1.2.3', major: '1', minor: '2', patch: '3', prerelease: '', build: '' },
  ])('with value, can cleanse, $input', (data): void => {
    const value = resolveVersionFromString(data.input);

    expect(value).not.toBeUndefined();
    expect(value?.version).toStrictEqual(data.version);
    expect(value?.part.major).toStrictEqual(data.major);
    expect(value?.part.minor).toStrictEqual(data.minor);
    expect(value?.part.patch).toStrictEqual(data.patch);
    expect(value?.part.prerelease).toStrictEqual(data.prerelease);
    expect(value?.part.build).toStrictEqual(data.build);
  });

  it.each<string>([
    'a.b.c',
    'testing',
  ])('with value, invalid, return null, $input', (version): void => {
    expect(
      resolveVersionFromString(version),
    ).toBeUndefined();
  });
});
