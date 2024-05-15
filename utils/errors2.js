 export const createError = (code, message) => {
    const err = new Error()
    err.status = code
    err.message = message
    return err
 }