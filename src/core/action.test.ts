import { fn } from '@matt-usurp/grok/testing';
import { action, FailFunction, InputFunction, OutputFunction } from './action';

describe('action()', (): void => {
  it('with valid version input, no cleansing needed, outputs same version', async (): Promise<void> => {
    const input = fn<InputFunction>();
    const output = fn<OutputFunction>();
    const fail = fn<FailFunction>();

    input.mockImplementationOnce(() => {
      return '1.2.3';
    });

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);

    expect(output).toBeCalledTimes(4);
    expect(output.mock.calls).toEqual([
      ['version', '1.2.3'],
      ['major', '1'],
      ['minor', '2'],
      ['patch', '3'],
    ]);

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid version input, prefixed with v, outputs version without prefix', async (): Promise<void> => {
    const input = fn<InputFunction>();
    const output = fn<OutputFunction>();
    const fail = fn<FailFunction>();

    input.mockImplementationOnce(() => {
      return '10.23.4';
    });

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);

    expect(output).toBeCalledTimes(4);
    expect(output.mock.calls).toEqual([
      ['version', '10.23.4'],
      ['major', '10'],
      ['minor', '23'],
      ['patch', '4'],
    ]);

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid version input, git ref, tag, output version part', async (): Promise<void> => {
    const input = fn<InputFunction>();
    const output = fn<OutputFunction>();
    const fail = fn<FailFunction>();

    input.mockImplementationOnce(() => {
      return 'refs/tags/v4.36.14';
    });

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);

    expect(output).toBeCalledTimes(4);
    expect(output.mock.calls).toEqual([
      ['version', '4.36.14'],
      ['major', '4'],
      ['minor', '36'],
      ['patch', '14'],
    ]);

    expect(fail).toBeCalledTimes(0);
  });

  it('with invalid version input, fail', async (): Promise<void> => {
    const input = fn<InputFunction>();
    const output = fn<OutputFunction>();
    const fail = fn<FailFunction>();

    input.mockImplementationOnce(() => {
      return 'invalid-tag';
    });

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);

    expect(output).toBeCalledTimes(0);

    expect(fail).toBeCalledTimes(1);
    expect(fail.mock.calls).toEqual([
      ['The value given is not a valid semantic version'],
    ]);
  });

  it('with input throwing, fail with unexpected error', async (): Promise<void> => {
    const input = fn<InputFunction>();
    const output = fn<OutputFunction>();
    const fail = fn<FailFunction>();

    input.mockImplementationOnce(() => {
      throw new Error('input-fn-error');
    });

    await action({
      input,
      output,
      fail,
    });

    expect(input).toBeCalledTimes(1);

    expect(output).toBeCalledTimes(0);

    expect(fail).toBeCalledTimes(1);
    expect(fail.mock.calls).toEqual([
      ['An unknown error occured: Error: input-fn-error'],
    ]);
  });
});
