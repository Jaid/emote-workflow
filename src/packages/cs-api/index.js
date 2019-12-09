import {CSInterface} from "@cep/csinterface"

const scriptsRequire = require.context("./scriptTemplates/", false)
const scripts = scriptsRequire.keys().reduce((state, value) => {
  const scriptName = value.match(/\.\/(?<key>[\da-z]+)/i).groups.key
  state[scriptName] = scriptsRequire(value)
  return state
}, {})

export default class Api extends CSInterface {

  constructor() {
    super()
    this.evalPromise("$.ready").then(result => {
      if (Number(result) !== 1) {
        console.warn("Host script is not loaded correctly: ", result)
      }
    }).catch(console.error)
  }

  /**
   * @param {string} script
   * @return {Promise<string>}
   */
  async evalPromise(script) {
    console.debug("Execute: ", script)
    return new Promise((resolve, reject) => {
      try {
        this.evalScript(script, response => {
          resolve(response)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async addDocument() {
    await this.evalPromise(scripts.addDocument())
  }

}