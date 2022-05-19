import { validate } from './version';

describe('validate()', (): void => {
  it.each<[input: string, version: string, major: string, minor: string, patch: string]>([
    ['1', '1.0.0', '1', '0', '0'],
    ['v3', '3.0.0', '3', '0', '0'],

    ['1.0', '1.0.0', '1', '0', '0'],
    ['1.1', '1.1.0', '1', '1', '0'],
    ['v3.4', '3.4.0', '3', '4', '0'],

    ['v1.0.0', '1.0.0', '1', '0', '0'],
    ['v1.2.3', '1.2.3', '1', '2', '3'],
    ['v3.4.2', '3.4.2', '3', '4', '2'],

    ['refs/tags/1', '1.0.0', '1', '0', '0'],
    ['refs/tags/3', '3.0.0', '3', '0', '0'],
    ['refs/tags/v3', '3.0.0', '3', '0', '0'],

    ['refs/tags/1.0', '1.0.0', '1', '0', '0'],
    ['refs/tags/3.4', '3.4.0', '3', '4', '0'],
    ['refs/tags/v5.3', '5.3.0', '5', '3', '0'],

    ['refs/tags/1.0.0', '1.0.0', '1', '0', '0'],
    ['refs/tags/3.4.2', '3.4.2', '3', '4', '2'],
    ['refs/tags/v4.6.1', '4.6.1', '4', '6', '1'],
  ])('with value, can cleanse, %s', (input, version, major, minor, patch): void => {
    const value = validate(input);

    expect(value).not.toBeNull();
    expect(value?.version).toStrictEqual(version);
    expect(value?.part.major).toStrictEqual(major);
    expect(value?.part.minor).toStrictEqual(minor);
    expect(value?.part.patch).toStrictEqual(patch);
  });

  it('with value, invalid, return null', (): void => {
    expect(
      validate('testing'),
    ).toBeNull();
  });
});
