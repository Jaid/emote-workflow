import path from "path"
import configure from "webpack-config-jaid"

/**
 * @type {import("webpack").Configuration}
 */
const extra = {
  target: "node",
  output: {
    libraryTarget: "var",
  },
  optimization: {
    minimize: false,
  },
}

export default configure({
  extra,
  include: false,
  inlineSource: true,
  sourceFolder: path.join(__dirname, "src"),
  outDir: path.join(__dirname, "dist", "package", process.env.NODE_ENV || "development"),
  type: "nodeScript",
  configOutput: true,
})