import type { InputOptions } from '@actions/core';
import { validate } from './version';

export type InputFunction = (name: string, options: InputOptions) => string;
export type OutputFunction = (name: string, value: string) => void;
export type FailFunction = (reason: string) => void;

export type ActionDependencies = {
  input: InputFunction;
  output: OutputFunction;
  fail: FailFunction;
};

export const action = async ({ input, output, fail }: ActionDependencies): Promise<void> => {
  try {
    const version = input('version', { required: true });
    const validated = validate(version);

    if (validated === null) {
      fail('The value given is not a valid semantic version');

      return;
    }

    output('version', validated.version);
    output('major', validated.part.major);
    output('minor', validated.part.minor);
    output('patch', validated.part.patch);
  } catch (error: unknown) {
    fail(`An unknown error occured: ${error}`);
  }
};
