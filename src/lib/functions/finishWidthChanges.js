import api from "lib/api"

export const title = "Finish width adjustments"

export default async emote => {

  await api.selectPathsOfLayer("Outline")
  await api.executeMenuCommand("Expand3")
  await api.save()

}