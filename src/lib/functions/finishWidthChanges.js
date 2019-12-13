import api from "lib/api"

export const title = "Finish width adjustments"

export const hintBefore = "Choose the Width tool and adjust the outline thicknesses for the viewer to know more and less important contour."

export default async emote => {

  await api.hideLayer("Emote Bounds")
  await api.selectPathsOfLayer("Outline")
  await api.executeMenuCommand("Expand3")
  await api.save()

}