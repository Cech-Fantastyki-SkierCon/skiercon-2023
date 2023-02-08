export function fixOrphans(text: string): string {
  return text.replace(/ (.) /g, ' $1&nbsp;')
}
