import path from "path"
import configure from "webpack-config-jaid"

export default configure({
  include: false,
  inlineSource: true,
  sourceFolder: path.join(__dirname, "src"),
  outDir: path.join(__dirname, "dist", "package", process.env.NODE_ENV || "development"),
  type: "nodeScript",
})