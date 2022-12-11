import { normaliseInputStringValue } from './input';

describe('normaliseInputStringValue()', (): void => {
  it('with empty string, return undefined', (): void => {
    expect(
      normaliseInputStringValue(''),
    ).toStrictEqual(undefined);
  });

  it('with string, only whitespace, return undefined', (): void => {
    expect(
      normaliseInputStringValue(' '),
    ).toStrictEqual(undefined);
  });

  it('with string, return string', (): void => {
    expect(
      normaliseInputStringValue('foobar'),
    ).toStrictEqual('foobar');
  });

  it('with string, with whitespace, return string', (): void => {
    expect(
      normaliseInputStringValue(' foobar '),
    ).toStrictEqual('foobar');
  });
});
