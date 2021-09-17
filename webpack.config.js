import path from "path"
import configure from "webpack-config-jaid"

export default configure({
  inlineSource: true,
  cepOptions: {
    apps: {
      illustrator: "23.0",
    },
    scriptSourceFile: path.join(__dirname, "client", "dist", "package", process.env.NODE_ENV || "development", "index.js"),
  },
  extra: {
    target: "node",
  },
})