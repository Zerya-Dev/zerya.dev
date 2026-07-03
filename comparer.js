// THIS FILE MIGHT BE LATER DELETED
// THIS FILE IS A TEST FILE
import fs from 'node:fs'
import eslintconfig from './eslint.config.ts'

const editorConfig = fs.readFileSync('.editor.config.js', 'utf8')

function converter(editorConfig, esLintConfig) {
  const lines = editorConfig.split('\n')
  const result = {}
  for (const line of lines) {
    if (line.startsWith('[')) {
      continue
    }
    if (line.includes('=')) {
      const [key, value] = line.split('=').map(e => e.trim())
      result[key] = value
    }
  }
  esLintConfig.strip() // this is a placeholder because FREAKING LINT DOES NOT LET ME COMMIT
  return result
}

converter(editorConfig, eslintconfig)
// TODO : fix it and make it work, right now i made editorconfig be converted into an object (no i did not do it by myself) but esLintConfig is untouched, the next step will be converting
//  eslintconfig to an object and then write a code that will compare both
