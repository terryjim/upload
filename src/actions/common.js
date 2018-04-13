//显示错误信息
export const showError = (msg) => ({
  type: 'SHOW_ERROR',
  msg,
})
//关闭错误信息
export const closeError = () => ({
  type: 'CLOSE_ERROR'
})
//显示成功信息
export const showSuccess = (msg) => ({
  type: 'SHOW_SUCCESS',
  msg,
})
//关闭成功信息
export const closeSuccess = () => ({
  type: 'CLOSE_SUCCESS'
})
