import api from "lib/api"

export const title = "Finish outline overlap removal"

export default async emote => {

  await api.selectPathsOfLayer("Outline")
  await api.executeMenuCommand("Make Planet X")
  await api.addLayer("Filling")
  await api.duplicatePageItems("Outline", "Filling")
  await api.placeLayerAboveLayer("Filling", "Outline")
  await api.lockLayer("Outline")
  // await api.addLayer('Silhouette')
  await api.save()

}