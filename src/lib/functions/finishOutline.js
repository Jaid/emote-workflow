import api from "lib/api"

export const title = "Finish outline"

export default async emote => {

  await api.hideLayer("Draft")
  await api.selectPathsOfLayer("Outline")
  await api.setLayerStrokeWidth("Outline", 2)
  await api.setLayerStrokeCap("Outline", "ROUNDENDCAP")
  await api.setLayerStrokeJoin("Outline", "MITERENDJOIN")
  await api.save()

}