import api from "lib/api"

export const title = "Finish merged Silhouette"

export default async emote => {

  await api.lockLayer("Silhouette")
  await api.removeColoredPathsOfLayerRecursive("Filling", 0, 0, 0)

  await api.duplicateLayer("Filling", "Shadow")
  await api.placeLayerAboveLayer("Shadow", "Filling")
  await api.setLayerColor("Shadow", 122, 124, 150)
  await api.setLayerItemsColor("Shadow", 0, 0, 0)
  await api.setLayerOpacity("Shadow", 20)

  await api.duplicateLayer("Filling", "Light")
  await api.placeLayerAboveLayer("Light", "Shadow")
  await api.setLayerColor("Light", 164, 155, 108)
  await api.setLayerItemsColor("Light", 255, 255, 255)
  await api.setLayerOpacity("Light", 20)
  await api.hideLayer("Light")

  await api.focusLayer("Shadow")
  await api.lockLayer("Filling")
  await api.save()

}