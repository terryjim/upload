import { showError, showSuccess, addEditedIds, closeConfirm } from "./common";

//获取管理员列表
export const getOss = () => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };
  let args = { method: 'POST', mode: 'cors', headers: headers, cache: 'reload' }
  return fetch(window.TParams.urls.get_oss_params, args).then(response => response.json())
    .then(json => {
      if (json.code !== 0)
        return dispatch(showError(json.msg + '<br>' + json.data))
      else
        return dispatch(getOssResult(json.data))
    }).catch(e => {
      return dispatch(showError('服务器连接异常，请稍后再试！<br/>' + e))
    }
    )
}
//获取Oss参数回调
export const getOssResult = (json) => (
  {
    type: 'GET_OSS',
    data: {
      OSSAccessKeyId: json.accessid, ...json
    }
  }
)
