//显示错误信息
export const showError = (msg) => ({
  type: 'SHOW_ERROR', 
  msg,
})
//关闭错误信息
export const closeError = () => ({
  type: 'CLOSE_ERROR'
})
//显示确认窗口
export const showConfirm = (msg) => ({
  type: 'SHOW_CONFIRM',
  msg,
})
//选中确认按钮
export const confirm = () => ({
  type: 'CONFIRM'
})
//关闭确认窗口
export const closeConfirm = () => ({
  type: 'CLOSE_CONFIRM'
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
export const addEditedIds = (data) => ({
  type: 'ADD_EDITED_IDS',
  ids:data
})
export const clearEditedIds= () => ({
  type: 'CLEAR_EDITED_IDS'
})