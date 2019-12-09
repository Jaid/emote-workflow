import fsp from "@absolunet/fsp"
import path from "path"

import api from "lib/api"

export default async emote => {

  const emoteFolder = path.join("E:", "Emote Projects", emote)
  const aiFile = path.join(emoteFolder, `${emote}.ai`)
  console.log(`Ensuring existence of ${aiFile}`)
  const aiFileExists = await fsp.pathExists(aiFile)
  if (aiFileExists) {
    await api.openFile(aiFile)
    return true
  }
  await api.addSavedDocument(aiFile)
  await api.addLayer("Background")
  await api.deleteDefaultLayer()
  await api.fillLayer("Background", 250, 250, 250)
  await api.lockLayer("Background")
  await api.addLayer("Emote Bounds")
  await api.addRect({
    red: 255,
    opacity: 10,
    top: 25,
    left: 25,
    height: 50,
    width: 50,
    filled: true,
    stroked: false,
  })
  await api.lockLayer("Emote Bounds")
  const draftFile = path.join(emoteFolder, "draft.png")
  const draftFileExists = await fsp.pathExists(draftFile)
  if (draftFileExists) {
    await api.addLayer("Draft")
  }
  await api.addLayer("Outline")
  await api.focusLayer("Outline")
  await api.fillLayer("Outline")
}