/* eslint-disable no-undef */

if (!$._ext) {
  $._ext = {}
}

$._ext.x = function () {
  return 2
}
// const functions = {}
// const functionRequire = require.context("./functions/", true, /index.js$/)
// for (const value of functionRequire.keys()) {
//   const {functionName} = value.match(/[/\\](?<functionName>.+?)[/\\]index\.js$/).groups
//   functions[functionName] = functionRequire(value).default
// }

app.documents.add()