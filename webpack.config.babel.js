import CopyPlugin from "copy-webpack-plugin"
import path from "path"
import configure from "webpack-config-jaid"

export default configure({
  inlineSource: true,
  cepOptions: {
    apps: {
      illustrator: "23.0",
    },
  },
  extra: {
    plugins: [
      new CopyPlugin([
        {
          from: path.join(__dirname, "client", "dist", "package", process.env.NODE_ENV || "development", "index.js"),
          to: "client.js",
        },
      ]),
    ],
  },
})