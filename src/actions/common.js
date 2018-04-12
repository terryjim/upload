//显示错误信息
export const showError = (msg) => ({
  type: 'SHOW_ERROR',
  msg,
})
//显示错误信息
export const closeError = () => ({
  type: 'CLOSE_ERROR'
})

