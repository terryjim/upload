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
export const showConfirm = (msg, module, operate) => ({
  type: 'SHOW_CONFIRM',
  msg,
  module,
  operate
})
//选中确认按钮
export const confirm = (module, operate) => ({
  type: 'CONFIRM',
  module,
  operate
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
  ids: data
})
export const clearEditedIds = () => ({
  type: 'CLEAR_EDITED_IDS'
})
//删除列表
export const delList = (ids, module) => dispatch => {
  //关闭确认窗口
  dispatch(closeConfirm())
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify(ids)
  let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }
  //如果配置文件中没有专门的删除api则采用约定api地址
  let delUrl = window.TParams.urls['del_' + module]
  if (delUrl === '')
    delUrl = window.TParams.defaultUrl + module + '/del'
  return fetch(delUrl, args).then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json.data)
      if (json.code !== 0) {
        console.log(json.msg)
        return dispatch(showError(json.msg + '<br>' + json.data))
      }
      else {
        dispatch(showSuccess(json.data))  //显示删除成功信息
        dispatch(delFromGrid(ids, module))    //从列表中删除 
      }
    }).catch(e => {
      return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
    }
    )
}
//删除记录后更新列表
export const delFromGrid = (ids,module) => {
  //alert(values)
  return {
    type: 'DEL_FROM_GRID',
    data: ids
  }
}
//获取列表
export const getList = ({whereSql,page, size},module) => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };

  //headers.Authorization = WebIM.config.tokenLocal
  let body = JSON.stringify({ whereSql,page, size })
  let args = { method: 'POST', mode: 'cors', body, headers: headers, cache: 'reload' }
  let getUrl = window.TParams.urls['get_' + module+'_list']
  if (getUrl === '')
  getUrl = window.TParams.defaultUrl + module + '/getByPage'
  return fetch(getUrl, args).then(response => response.json())
    .then(json => {
      if (json.code !== 0)
        return dispatch(showError(json.msg + '<br>' + json.data))
      else
        return dispatch(getListResult(json.data))
    }).catch(e => {
      return dispatch(showError('系统异常，请稍后再试！<br/>' + e))
    }
    )
}
//获取列表回调
export const getListResult = (json) => (
  {
    type: 'GET_LIST',
    data: json
  }
)

//保存管理员
export const saveForm = (values,module) => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };
  //headers.Authorization = WebIM.config.tokenLocal
  let body = JSON.stringify(values)
  //let body = values
  let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }
  let saveUrl = window.TParams.urls['save_' + module]
  if (saveUrl === '')
  saveUrl = window.TParams.defaultUrl + module + '/save'
  return fetch(saveUrl, args).then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json.data)
      if (json.code !== 0) {
        console.log(json.msg)
        return dispatch(showError(json.msg + '<br>' + json.data))
      }
      else {
        dispatch(showSuccess('保存成功！'))
        //回传添加或修改后的记录    
        dispatch(addToGrid(json.data))
        //回传添加或修改后的记录id,用于页面标识修改痕迹
        //alert(json.data.id)
        dispatch(addEditedIds([json.data.id]))
      }     
    }).catch(e => {
      return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
    }
    )
}

//新增或修改后的记录更新列表
export const addToGrid = (values) => {  
  return {
    type: 'ADD_TO_GRID',
    data: values
  }
}

//根据返回
export const fillForm = (json) => (
  {
    type: 'FILL_FORM',
    data: json
  }
)