// @public
function formDataObj (form) {
  const dataObj = {}
  const formData = new FormData(form)
  for (const k of formData.keys()) {
    const arr = formData.getAll(k)
    dataObj[k] = arr.length > 1
      ? arr : arr[0]
  }
  return dataObj
}
exports.formDataObj = formDataObj

// @public
function focusEnd (input) {
  const { length } = input.value
  input.setSelectionRange(length, length)
  input.focus()
}
exports.focusEnd = focusEnd
