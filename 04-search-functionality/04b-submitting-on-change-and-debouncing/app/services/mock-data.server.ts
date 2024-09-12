import fs from 'node:fs'
import wordListPath from 'word-list'

const allWords = fs.readFileSync(wordListPath, 'utf8').split('\n')

export async function getSearchResults(q: string) {
  const startsWithWords = allWords.filter((word) => word.startsWith(q))
  const includesWords = allWords.filter(
    (word) => word.includes(q) && !word.startsWith(q)
  )
  return { startsWithWords, includesWords }
}
