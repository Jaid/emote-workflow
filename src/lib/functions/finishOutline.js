import api from "lib/api"

export const title = "Finish outline"

export const hintBefore = "Focus the Outline layer, select the Pencil tool and draw an outline."

export default async emote => {

  await api.hideLayer("Draft")
  await api.selectPathsOfLayer("Outline")
  await api.setLayerStrokeWidth("Outline", 3)
  await api.setLayerStrokeCap("Outline", "ROUNDENDCAP")
  await api.setLayerStrokeJoin("Outline", "MITERENDJOIN")
  await api.save()

}