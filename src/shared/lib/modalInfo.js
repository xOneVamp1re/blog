export const modalInfo = (error = {}) => {
  const { data: { errors = {} } = {} } = error
  const errorsText = Object.entries(errors).map(([field, error]) => `${field} ${error}`)
  return errorsText
}
