import api from "lib/api"

export default async emote => {

  console.log(emote)
  await api.addDocument()
  console.log(2)

}