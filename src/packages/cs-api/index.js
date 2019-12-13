import {CSInterface} from "@cep/csinterface"
import path from "path"

import handlebars from "lib/handlebars"

const scriptsRequire = require.context("./scriptTemplates/", false)
const scripts = scriptsRequire.keys().reduce((state, value) => {
  const scriptName = value.match(/\.\/(?<key>[\da-z]+)/i).groups.key
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
    return new Promise((resolve, reject) => {
      try {
        this.evalScript(script, response => {
          console.debug(response)
          if (response?.startsWith("Error")) {
            reject(new Error(response))
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
    const script = scripts[scriptTemplateName](context)
    console.debug(`Execute: ${scriptTemplateName}\n${script}`)
    return this.evalPromise(script)
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
   * @param {string} name
   * @return {Promise<void>}
   */
  async addLayer(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("addLayer", context)
  }

  /**
   * @param {string} name
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @return {Promise<void>}
   */
  async addLayerWithColor(name, red, green, blue) {
    const context = {
      name,
      red,
      green,
      blue,
    }
    await this.evalScriptTemplate("addLayerWithColor", context)
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
  async deleteDefaultLayer(name = "Layer 1") {
    const context = {
      name,
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
   * @param {number} [red=0]
   * @param {number} [green=0]
   * @param {number} [blue=0]
   * @param {string} [itemName="Fill"]
   * @return {Promise<void>}
   */
  async fillLayer(name, red = 0, green = 0, blue = 0, itemName = "Fill") {
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
   * @prop {boolean} filled
   * @prop {boolean} stroked
   * @prop {number} opacity
   * @prop {number} strokeWidth
   * @prop {string} itemName
   * @prop {boolean} reversed
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
      strokeWidth: 5,
      itemName: "Rect",
      width: 20,
      height: 20,
      top: 0,
      left: 0,
      reversed: false,
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

  /**
   * @param {string} name
   * @return {Promise<void>}
   */
  async hideLayer(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("hideLayer", context)
  }

  /**
   * @return {Promise<void>}
   */
  async save() {
    await this.evalScriptTemplate("save")
  }

  /**
   * @param {string} file
   * @return {Promise<void>}
   */
  async saveAs(file) {
    const context = {
      file,
    }
    await this.evalScriptTemplate("saveAs", context)
  }

  /**
   * @param {string} name
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @return {Promise<void>}
   */
  async setLayerColor(name, red = 100, green = 100, blue = 100) {
    const context = {
      name,
      red,
      green,
      blue,
    }
    await this.evalScriptTemplate("setLayerColor", context)
  }

  /**
   * @param {string} name
   * @param {number} strokeWidth
   * @return {Promise<void>}
   */
  async setLayerStrokeWidth(name, strokeWidth = 5) {
    const context = {
      name,
      strokeWidth,
    }
    await this.evalScriptTemplate("setLayerStrokeWidth", context)
  }

  /**
   * @param {string} name
   * @param {"BUTTENDCAP"|"ROUNDENDCAP"|"PROJECTINGENDCAP"} strokeCap
   * @return {Promise<void>}
   */
  async setLayerStrokeCap(name, strokeCap) {
    const context = {
      name,
      strokeCap,
    }
    await this.evalScriptTemplate("setLayerStrokeCap", context)
  }

  /**
   * @param {string} name
   * @param {"BEVELENDJOIN"|"ROUNDENDJOIN"|"MITERENDJOIN"} strokeJoin
   * @return {Promise<void>}
   */
  async setLayerStrokeJoin(name, strokeJoin) {
    const context = {
      name,
      strokeJoin,
    }
    await this.evalScriptTemplate("setLayerStrokeJoin", context)
  }

  /**
   * @param {string} name
   * @return {Promise<void>}
   */
  async setLayerOpacity(name, opacity = 50) {
    const context = {
      name,
      opacity,
    }
    await this.evalScriptTemplate("setLayerOpacity", context)
  }

  /**
   * @param {string} name
   * @return {Promise<void>}
   */
  async selectPathsOfLayer(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("selectPathsOfLayer", context)
  }

  /**
   * @typedef {Object} PlaceFileOptions
   * @prop {string} layerName
   * @prop {string} itemName
   * @prop {string} file
   * @prop {number} width
   * @prop {number} height
   * @prop {number} top
   * @prop {number} left
   * @prop {boolean} embed
   * @prop {number} opacity
   */

  /**
   * @param {PlaceFileOptions} options
   * @return {Promise<void>}
   */
  async placeFile(options) {
    const context = {
      layerName: "Layer 1",
      itemName: path.basename(options.file),
      width: 10,
      height: 10,
      top: 0,
      left: 0,
      embed: true,
      opacity: 10,
      ...options,
    }
    await this.evalScriptTemplate("placeFile", context)
  }

  /**
   * @param {string} name
   * @return {Promise<void>}
   */
  async executeMenuCommand(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("executeMenuCommand", context)
  }

  /**
   * @param {string} sourceLayer
   * @param {string} targetLayer
   * @return {Promise<void>}
   */
  async duplicatePageItems(sourceLayer, targetLayer) {
    const context = {
      sourceLayer,
      targetLayer,
    }
    await this.evalScriptTemplate("duplicatePageItems", context)
  }

  /**
   * @param {string} sourceLayer
   * @param {string} targetLayer
   * @return {Promise<void>}
   */
  async duplicateLayer(sourceLayer, targetLayer) {
    const context = {
      sourceLayer,
      targetLayer,
    }
    await this.evalScriptTemplate("duplicateLayer", context)
  }

  /**
   * @param {string} sourceLayer
   * @param {string} targetLayer
   * @return {Promise<void>}
   */
  async placeLayerAboveLayer(sourceLayer, targetLayer) {
    const context = {
      sourceLayer,
      targetLayer,
    }
    await this.evalScriptTemplate("placeLayerAboveLayer", context)
  }

  /**
   * @param {string} sourceLayer
   * @param {string} targetLayer
   * @return {Promise<void>}
   */
  async placeLayerBelowLayer(sourceLayer, targetLayer) {
    const context = {
      sourceLayer,
      targetLayer,
    }
    await this.evalScriptTemplate("placeLayerBelowLayer", context)
  }

  /**
   * @param {string} name
   * @param {number} [red=0]
   * @param {number} [green=0]
   * @param {number} [blue=0]
   * @return {Promise<void>}
   */
  async setLayerItemsColor(name, red = 0, green = 0, blue = 0) {
    await this.forPathsInLayerRecursive(name, `var color = new RGBColor(); color.red = ${red}; color.green = ${green}; color.blue = ${blue}; item.fillColor = color`)
  }

  /**
   * @param {string} name
   * @return {Promise<void>}
   */
  async selectPathsOfLayerRecursive(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("selectPathsOfLayerRecursive", context)
  }

  /**
   * @param {string} name
   * @return {Promise<void>}
   */
  async unlockLayer(name) {
    const context = {
      name,
    }
    await this.evalScriptTemplate("unlockLayer", context)
  }

  /**
   * @param {string} name
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @return {Promise<void>}
   */
  async removeColoredPathsOfLayerRecursive(name, red = 0, green = 0, blue = 0) {
    const context = {
      name,
      red,
      green,
      blue,
    }
    await this.evalScriptTemplate("removeColoredPathsOfLayerRecursive", context)
  }

  /**
   * @param {string} layerName
   * @param {string} script
   * @return {Promise<void>}
   */
  async forPathsInLayerRecursive(layerName, script) {
    const context = {
      layerName,
      script,
    }
    await this.evalScriptTemplate("forPathsInLayerRecursive", context)
  }

  /**
   * @return {Promise<void>}
   */
  async unsetSelection() {
    await this.evalScriptTemplate("unsetSelection")
  }
}