import { setFailed } from '@actions/core'
import api from './api'
import { UpgradeError } from './replace-formula-fields'
import run from './main'

run(api).catch((error) => {
  console.log(`sandlog: run 1`)
  if (error instanceof UpgradeError) {
    console.warn('Skipping: %s', error.message)
    return
  }
  console.log(`sandlog: run 2`)
  setFailed(error.toString())
  console.log(`sandlog: run 3`)
  if (process.env.GITHUB_ACTIONS == undefined) {
    console.error(error.stack)
  }
  console.log(`sandlog: run 4`)
})
