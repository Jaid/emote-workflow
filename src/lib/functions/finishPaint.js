import api from "lib/api"

export const title = "Finish painting"

export const hintBefore = "Focus and select the Filling layer. Choose the Live Paint Bucket tool and fill the inner parts."

export default async emote => {

  await api.executeMenuCommand("Expand Planet X")
  await api.duplicateLayer("Filling", "Silhouette")
  await api.setLayerItemsColor("Silhouette", 0, 0, 0)
  await api.setLayerColor("Silhouette", 0, 0, 0)
  await api.unlockLayer("Outline")
  await api.placeLayerBelowLayer("Silhouette", "Outline")
  await api.lockLayer("Outline")
  await api.save()

}