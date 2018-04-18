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
//修改或添加记录的ＩＤ列表，用于标识文档修改状态
export const addModifyRecords = (data) => ({
  type: 'ADD_MODIFY_RECORDS',
  ids:data
})