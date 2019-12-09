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
          if (response === "false") {
            reject(new Error("evalScript returned false"))
          }
          resolve(response)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * @param {string} scriptTemplateName
   * @param {Object} context
   * @return {Promise<void>}
   */
  async evalScriptTemplate(scriptTemplateName, context) {
    return this.evalPromise(scripts[scriptTemplateName](context))
  }

  /**
   * @return {Promise<void>}
   */
  async addDocument() {
    await this.evalScriptTemplate("addDocument")
  }

  /**
   * @return {Promise<void>}
   */
  async addSavedDocument(file) {
    const context = {
      file: JSON.stringify(file),
    }
    await this.evalScriptTemplate("addSavedDocument", context)
  }

  /**
   * @return {Promise<void>}
   */
  async addLayer(name) {
    const context = {
      name: JSON.stringify(name),
    }
    await this.evalScriptTemplate("addLayer", context)
  }

  /**
   * @return {Promise<void>}
   */
  async focusLayer(name) {
    const context = {
      name: JSON.stringify(name),
    }
    await this.evalScriptTemplate("focusLayer", context)
  }

  /**
   * @param {string} [layerName=Layer 1]
   * @return {Promise<void>}
   */
  async deleteDefaultLayer(layerName = "Layer 1") {
    const context = {
      name: JSON.stringify(layerName),
    }
    await this.evalScriptTemplate("deleteLayer", context)
  }

  /**
   * @param {string} file
   * @return {Promise<void>}
   */
  async openFile(file) {
    const context = {
      file: JSON.stringify(file),
    }
    await this.evalScriptTemplate("openFile", context)
  }

  async fillLayer(name, color) {
    const context = {
      name: JSON.stringify(name),
      color: JSON.stringify(color),
    }
    await this.evalScriptTemplate("fillLayer", context)
  }

}