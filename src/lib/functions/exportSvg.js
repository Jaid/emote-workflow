import path from "path"

import api from "lib/api"

export const title = "Export SVG"

export default async emote => {

  const emoteFolder = path.join("E:", "Emote Projects", emote)
  const file = path.join(emoteFolder, emote)
  await api.exportSvg(file)
  await api.save()

}