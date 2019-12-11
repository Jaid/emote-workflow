import fsp from "@absolunet/fsp"
import Jimp from "jimp"
import path from "path"
import tempy from "tempy"

import api from "lib/api"

const backgroundRed = 250
const backgroundGreen = 250
const backgroundBlue = 250
const documentScale = length => length * 1000

export const title = "Start"

export default async emote => {

  const emoteFolder = path.join("E:", "Emote Projects", emote)
  const aiFile = path.join(emoteFolder, `${emote}.ai`)
  console.log(`Ensuring existence of ${aiFile}`)
  const aiFileExists = await fsp.pathExists(aiFile)
  if (aiFileExists) {
    await api.openFile(aiFile)
    return true
  }
  await api.addDocument(documentScale(1), documentScale(1))
  await api.addLayerWithColor("Background", 111, 157, 124)
  await api.deleteDefaultLayer()
  await api.fillLayer("Background", backgroundRed, backgroundGreen, backgroundBlue)
  await api.lockLayer("Background")
  await api.addLayerWithColor("Emote Bounds", 111, 157, 124)
  await api.addRect({
    layerName: "Emote Bounds",
    red: 255,
    blue: 0,
    green: 0,
    opacity: 10,
    top: documentScale(0.75),
    left: documentScale(0.25),
    height: documentScale(0.5),
    width: documentScale(0.5),
    filled: false,
    stroked: true,
    strokeWidth: 1,
  })
  await api.setLayerOpacity("Emote Bounds", 50)
  await api.lockLayer("Emote Bounds")
  const draftFile = path.join(emoteFolder, "draft.png")
  const draftFileExists = await fsp.pathExists(draftFile)
  if (draftFileExists) {
    const tempFile = await tempy.file({extension: "png"})
    console.log(`Writing optimized draft file to ${tempFile}`)
    const jimp = await Jimp.read(draftFile)
    jimp.autocrop()
    jimp.contain(2000, 2000)
    jimp.grayscale()
    jimp.brightness(1)
    jimp.normalize()
    await jimp.writeAsync(tempFile)
    await api.addLayerWithColor("Draft", 111, 157, 124)
    await api.placeFile({
      layerName: "Draft",
      file: tempFile,
      width: documentScale(0.5),
      height: documentScale(0.5),
      top: documentScale(0.75),
      left: documentScale(0.25),
      opacity: 100,
    })
    await api.setLayerOpacity("Draft", 10)
    await api.lockLayer("Draft")
  }
  await api.addLayer("Outline")
  await api.setLayerColor("Outline", 255, 79, 79)
  await api.addLayerWithColor("Hide Overlap", 111, 157, 124)
  const rects = [
    {
      top: documentScale(1),
      left: 0,
      height: documentScale(1),
      width: documentScale(0.25),
    },
    {
      top: documentScale(1),
      left: documentScale(0.75),
      height: documentScale(1),
      width: documentScale(0.25),
    },
    {
      top: documentScale(1),
      left: 0,
      height: documentScale(0.25),
      width: documentScale(1),
    },
    {
      top: documentScale(0.25),
      left: 0,
      height: documentScale(0.25),
      width: documentScale(1),
    },
  ]
  for (const rect of rects) {
    await api.addRect({
      layerName: "Hide Overlap",
      filled: true,
      stroked: false,
      blue: backgroundBlue,
      red: backgroundRed,
      green: backgroundGreen,
      ...rect,
    })
  }
  await api.hideLayer("Hide Overlap")
  await api.lockLayer("Hide Overlap")
  await api.focusLayer("Outline")
  await api.saveAs(aiFile)
}