import type { InputOptions as ActionInputFunctionOptions } from '@actions/core';
import { normaliseInputStringValue } from './action/input';
import { resolveVersionFromString } from './version';

export type {
  ActionInputFunctionOptions,
};

/**
 * A function that can retreive the action input of the given {@link name}.
 */
export type ActionInputFunction = (name: string, options?: ActionInputFunctionOptions) => string;

/**
 * A function that can set action outputs of the given {@link name}.
 */
export type ActionOutputFunction = (name: string, value: string) => void;

/**
 * A function that can fail the build for a given {@link reason}.
 */
export type ActionFailFunction = (reason: string) => void;

/**
 * An abstraction that allows for testing of the main action function.
 * These are the dependencies that are required for the action to run.
 */
export type ActionDependencies = {
  readonly input: ActionInputFunction;
  readonly output: ActionOutputFunction;
  readonly fail: ActionFailFunction;
};

/**
 * The actions main function that runs the logic.
 */
export const action = async (action: ActionDependencies): Promise<void> => {
  try {
    const version = normaliseInputStringValue(action.input('version', { required: true }));

    if (version === undefined) {
      action.fail('The version input parameter is required');

      return;
    }

    const validated = resolveVersionFromString(version);

    if (validated === undefined) {
      action.fail('The version given is not a valid semantic version format');

      return;
    }

    action.output('version', validated.version);
    action.output('major', validated.part.major);
    action.output('minor', validated.part.minor);
    action.output('patch', validated.part.patch);
    action.output('extra', validated.part.extra);
  } catch (error: unknown) {
    action.fail(`An unexpected error occured: ${error}`);
  }
};
