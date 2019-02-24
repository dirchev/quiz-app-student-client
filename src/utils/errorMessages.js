export let getAllErrorMessages = (error) => {
  if (["ValidationError", "RequestDataError"].indexOf(error.name) !== -1) {
    return error.errors.map(error => error.message)
  } else {
    return [error.toString()]
  }
}

export let getErrorMessagesForField = (error, field) => {
  if (["ValidationError", "RequestDataError"].indexOf(error.name) !== -1) {
    return error.errors.filter(error => error.path === field).map(error => error.message)
  } else {
    return [error.toString()]
  }
}
