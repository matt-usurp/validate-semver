import { setFailed as fail, getInput as input, setOutput as output } from '@actions/core';
import { action } from './core/action.js';

void action({
  input,
  output,
  fail,
});
