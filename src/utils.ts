import child_process from 'node:child_process'

export function fixOrphans(text?: string): string {
  if (!text) {
    return ''
  }
  return text.replace(/ (.) /g, ' $1&nbsp;')
}

let gitRevision = ''
export function getGitRevision() {
  if (gitRevision) {
    return gitRevision
  }

  gitRevision = child_process
    .execSync('git rev-parse HEAD')
    .toString()
    .trim()
    .slice(0, 7)

  return gitRevision
}
