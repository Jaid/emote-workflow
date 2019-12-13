import path from "path"

import api from "lib/api"

export const title = "Export PNG"

export default async emote => {

  const emoteFolder = path.join("E:", "Emote Projects", emote)
  const file = path.join(emoteFolder, emote)
  await api.exportPng(file, 300)
  await api.save()

}