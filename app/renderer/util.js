module.exports = {
  formDataObj,
  fillForm,
  focusEnd,
}

// formData doesn't take in "empty" (checkbox) fields
function formDataObj (form) {
  const dataObj = {}
  const els = form.querySelectorAll('[name]')
  const formData = new FormData(form)
  // for (const k of formData.keys()) {
  for (const el of els) {
    const k = el.name
    if (formData.has(k)) {
      const arr = formData.getAll(k)
      dataObj[k] = arr.length > 1
        ? arr : arr[0]
    }
    else {
      dataObj[k] = ''
    }
  }
  return dataObj
}

// todo: array values at other tags
// todo: select[multiple]
function fillForm (form, data) {
  for (const key in data) {
    const value = data[key]
    const qk = `[name="${key}"]`
    const qkv = `[name="${key}"][value="${value}"]`
    const el = formQuery(form, qk)
    switch (el.tagName) {
      case 'TEXTAREA':
        el.textContent = value
        continue
    }
    switch (el.type) { // tagName=input
      case 'checkbox':
        el.checked = value
        continue
      case 'radio':
        formQuery(form, qkv).checked = true
        continue
      default: // type=text
        el.value = value
    }
  }
}
function formQuery (form, selector) {
  return form.querySelector(selector)
}

function focusEnd (input) {
  const { length } = input.value
  input.setSelectionRange(length, length)
  input.focus()
}
