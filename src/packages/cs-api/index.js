import {CSInterface} from "@cep/csinterface"

import handlebars from "lib/handlebars"

const scriptsRequire = require.context("./scriptTemplates/", false)
const scripts = scriptsRequire.keys().reduce((state, value) => {
  const scriptName = value.match(/\.\/(?<key>[\da-z]+)/i).groups.key
  console.log(scriptName)
  const template = require(`!raw-loader!./scriptTemplates/${scriptName}.hbs`).default
  state[scriptName] = handlebars.compile(template)
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
   * @param {number} [width=100]
   * @param {number} [height=100]
   * @return {Promise<void>}
   */
  async addDocument(width = 100, height = 100) {
    const context = {
      width,
      height,
    }
    await this.evalScriptTemplate("addDocument", context)
  }

  /**
   * @param {string} file
   * @param {number} [width=100]
   * @param {number} [height=100]
   * @return {Promise<void>}
   */
  async addSavedDocument(file, width = 100, height = 100) {
    const context = {
      file,
      width,
      height,
    }
    await this.evalScriptTemplate("addSavedDocument", context)
  }

  /**
   * @return {Promise<void>}
   */
  async addLayer(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("addLayer", context)
  }

  /**
   * @return {Promise<void>}
   */
  async focusLayer(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("focusLayer", context)
  }

  /**
   * @param {string} [layerName=Layer 1]
   * @return {Promise<void>}
   */
  async deleteDefaultLayer(layerName = "Layer 1") {
    const context = {
      layerName,
    }
    await this.evalScriptTemplate("deleteLayer", context)
  }

  /**
   * @param {string} file
   * @return {Promise<void>}
   */
  async openFile(file) {
    const context = {
      file,
    }
    await this.evalScriptTemplate("openFile", context)
  }

  /**
   * @param {string} name
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @return {Promise<void>}
   */
  async fillLayer(name, red, green, blue, itemName) {
    const context = {
      name,
      red,
      green,
      blue,
      itemName,
    }
    await this.evalScriptTemplate("fillLayer", context)
  }

  /**
   * @typedef {Object} AddRectOptions
   * @prop {string} layerName
   * @prop {number} width
   * @prop {number} height
   * @prop {number} top
   * @prop {number} left
   * @prop {number} red
   * @prop {number} green
   * @prop {number} blue
   * @prop {number} transparency
   * @prop {boolean} filled
   * @prop {boolean} stroked
   * @prop {number} opacity
   * @prop {number} strokeWidth
   * @prop {string} itemName
   */

  /**
   * @param {AddRectOptions} options
   * @return {Promise<void>}
   */
  async addRect(options) {
    const context = {
      layerName: "Layer 1",
      stroked: false,
      filled: true,
      opacity: 100,
      red: 0,
      green: 0,
      blue: 0,
      strokeWidth: 10,
      itemName: "Rect",
      ...options,
    }
    await this.evalScriptTemplate("addRect", context)
  }

  /**
   * @param {string} name
   * @return {Promise<void>}
   */
  async lockLayer(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("lockLayer", context)
  }

}