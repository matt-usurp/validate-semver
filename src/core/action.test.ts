import { fn } from '@matt-usurp/grok/testing.js';
import type { ActionFailFunction, ActionInputFunction, ActionInputFunctionOptions, ActionOutputFunction } from './action.js';
import { action } from './action.js';

describe('action()', (): void => {
  it('with valid version input, no cleansing needed, outputs same version', async (): Promise<void> => {
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('1.2.3');

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(5);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '1.2.3');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(2, 'major', '1');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(3, 'minor', '2');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(4, 'patch', '3');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(5, 'extra', '');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid version input, prefixed with v, outputs version without prefix', async (): Promise<void> => {
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('10.23.4');

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(5);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '10.23.4');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(2, 'major', '10');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(3, 'minor', '23');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(4, 'patch', '4');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(5, 'extra', '');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid version input, suffixed with prerelease, outputs with prerelease', async (): Promise<void> => {
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('2.3-alpha.2');

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(5);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '2.3.0-alpha.2');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(2, 'major', '2');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(3, 'minor', '3');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(4, 'patch', '0');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(5, 'extra', 'alpha.2');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid version input, git ref, tag, output version part', async (): Promise<void> => {
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('refs/tags/v4.36.14');

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(5);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '4.36.14');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(2, 'major', '4');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(3, 'minor', '36');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(4, 'patch', '14');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(5, 'extra', '');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid version input, git ref, tag, suffixed with prerelease, output version part with prerelease suffix', async (): Promise<void> => {
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('refs/tags/v5.31.12-beta.1');

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(5);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '5.31.12-beta.1');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(2, 'major', '5');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(3, 'minor', '31');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(4, 'patch', '12');
    expect(output).toHaveBeenNthCalledWith<[string, string]>(5, 'extra', 'beta.1');

    expect(fail).toBeCalledTimes(0);
  });

  it('with empty version input, fail', async (): Promise<void> => {
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('');

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(0);

    expect(fail).toBeCalledTimes(1);
    expect(fail).toHaveBeenNthCalledWith<[string]>(1, 'The version input parameter is required');
  });

  it('with invalid version input, fail', async (): Promise<void> => {
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('invalid-tag');

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(0);

    expect(fail).toBeCalledTimes(1);
    expect(fail).toHaveBeenNthCalledWith<[string]>(1, 'The version given is not a valid semantic version format');
  });

  it('with input throwing, fail with unexpected error', async (): Promise<void> => {
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockImplementationOnce(() => {
      throw new Error('input-fn-error');
    });

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(0);

    expect(fail).toBeCalledTimes(1);
    expect(fail).toHaveBeenNthCalledWith<[string]>(1, 'An unexpected error occured: Error: input-fn-error');
  });
});
