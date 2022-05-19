import { getInput as input, setFailed as fail, setOutput as output } from '@actions/core';
import { action } from './core/action';

void action({
  input,
  output,
  fail,
});
