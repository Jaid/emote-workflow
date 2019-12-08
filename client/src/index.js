/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

if (!$.functions) {
  $.functions = {}
}

$.functions.init = function () {
  const document = app.documents.add(DocumentColorSpace.RGB)
  const newLayer = document.layers.add()
  newLayer.name = "Test"
  return true
}