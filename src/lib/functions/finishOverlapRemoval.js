import api from "lib/api"

export const title = "Finish outline overlap removal"

export default async emote => {

  await api.selectPathsOfLayer("Outline")
  await api.executeMenuCommand("Make Planet X")
  await api.duplicateLayer("Outline", "Filling")
  await api.setLayerColor("Filling", 0, 215, 215)
  await api.placeLayerAboveLayer("Filling", "Outline")
  await api.lockLayer("Outline")
  await api.save()

}