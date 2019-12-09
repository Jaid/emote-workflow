import Handlebars from "handlebars"
import helperJson from "handlebars-helper-json"

const handlebars = Handlebars.create()
handlebars.registerHelper("json", helperJson)

export default handlebars