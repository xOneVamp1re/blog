import { useEffect } from 'react'

export const useSavedFormData = (formName, watch, setValue, setError, setFocus, errors) => {
  // Загрузка данных из localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(formName)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        if (parsedData && typeof parsedData === 'object') {
          Object.keys(parsedData.values).forEach((key) => {
            setValue(key, parsedData.values[key])
          })

          if (parsedData.errors) {
            Object.keys(parsedData.errors).forEach((key) => {
              setError(key, {
                type: 'manual',
                message: parsedData.errors[key],
              })
            })
          }

          if (parsedData.focus) {
            setFocus(parsedData.focus)
          }
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных из localStorage:', error)
    }
  }, [formName, setValue, setError, setFocus])

  useEffect(() => {
    const subscription = watch((data) => {
      try {
        const errorsObj = {}
        Object.keys(errors).forEach((key) => {
          if (errors[key]) {
            console.log(errors[key])
            errorsObj[key] = errors[key]
          }
        })
        console.log(errorsObj)
        const focusField = document.activeElement?.name

        localStorage.setItem(
          formName,
          JSON.stringify({
            values: data,
            errors: errorsObj,
            focus: focusField,
          })
        )
      } catch (error) {
        console.error('Ошибка при сохранении данных в localStorage:', error)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, formName, errors])
}
