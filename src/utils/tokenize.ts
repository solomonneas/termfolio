/**
 * Shell-like tokenizer supporting quoted strings and escape sequences.
 * Splits input into tokens, handling:
 * - Double quotes: "hello world" -> one token
 * - Single quotes: 'hello world' -> one token
 * - Backslash escapes: hello\ world -> one token
 *
 * Returns null if quotes are unmatched/unclosed (parse error).
 */
export function tokenize(input: string): string[] | null {
  const tokens: string[] = [];
  let current = '';
  let inDoubleQuote = false;
  let inSingleQuote = false;
  let escaped = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // Handle escape sequences
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    // Backslash starts escape (only outside single quotes)
    if (char === '\\' && !inSingleQuote) {
      escaped = true;
      continue;
    }

    // Handle quotes
    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    // Handle whitespace (token separator when not in quotes)
    if (/\s/.test(char) && !inDoubleQuote && !inSingleQuote) {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
      continue;
    }

    current += char;
  }

  // Detect unclosed quotes or trailing escape
  if (inDoubleQuote || inSingleQuote || escaped) {
    return null;
  }

  // Push final token
  if (current.length > 0) {
    tokens.push(current);
  }

  return tokens;
}
