/**
 * Normalise a given string input value.
 */
export const normaliseInputStringValue = (value: string): string | undefined => {
  const trimmed = value.trim();

  if (trimmed === '') {
    return undefined;
  }

  return trimmed;
};
