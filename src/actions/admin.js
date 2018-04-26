import { showError, showSuccess, addEditedIds,closeConfirm } from "./common";

//获取管理员列表
export const getAdmin = () => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };

  //headers.Authorization = WebIM.config.tokenLocal

  let args = { method: 'POST', mode: 'cors', headers: headers, cache: 'reload' }

  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.defaultParams.getAdminUrl, args).then(response => response.json())
    .then(json => {
     
      if (json.code !== 0)
        return dispatch(showError(json.msg+ '<br>'+json.data))
      else
        return dispatch(getAdminResult(json.data))
    }).catch(e => {
      return dispatch(showError('系统异常，请稍后再试！<br/>' + e))
    }
    )
}
//获取管理员列表回调
export const getAdminResult = (json) => (
  {
    type: 'ADMIN_LIST',
    data: json
  }
)
//获取管理员详细信息回调
export const getAdminInfo = (json) => (
  {
    type: 'GET_ADMIN_INFO',
    data: json
  }
)


//保存管理员
export const saveAdmin = (values) => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };
  //headers.Authorization = WebIM.config.tokenLocal
  let body = JSON.stringify(values)
  //let body = values
  let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }

  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.defaultParams.saveAdminUrl, args).then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json.data)
      if (json.code !== 0){
        console.log(json.msg)
        return dispatch(showError(json.msg+ '<br>'+json.data))
    }
      else {
        dispatch(showSuccess('保存成功！'))
        //回传添加或修改后的记录    
        dispatch(addAdminToGrid(json.data))
        //回传添加或修改后的记录id,用于页面标识修改痕迹
        //alert(json.data.id)
        dispatch(addEditedIds([json.data.id]))
      }      /*  console.log(json) */
      /*   let ret = json
        if (ret != null) {
          ret.map(x => x.created = new Date(parseInt(x.created)).Format('yyyy-MM-dd hh:mm:ss'))
        }
        dispatch(getResult(ret)) */
      //return dispatch(changePage(json))
      //return dispatch(getAdminResult(json))
    }).catch(e => {
      return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
    }
    )
}

//新增或修改后的记录更新列表
export const addAdminToGrid = (values) => {
  //alert(values)
  return {
    type: 'ADD_ADMIN_TO_GRID',
    data: values
  }
}
//新增或修改后的记录更新列表
export const delAdmins =  (values) => dispatch => {  
  dispatch(closeConfirm())  
  let headers = { 'Content-Type': 'application/json' };
  //headers.Authorization = WebIM.config.tokenLocal
  //let body = JSON.stringify(values)
  let body = values
  console.log(body)
  let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }

  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.defaultParams.delAdminUrl, args).then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json.data)
      if (json.code !== 0){
        console.log(json.msg)
        return dispatch(showError(json.msg+ '<br>'+json.data))
    }
      else {
        dispatch(showSuccess(json.data))       
      }   
    }).catch(e => {
      return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
    }
    )
}

/* export const fetchPages = () => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  
  let headers = { 'Content-Type': 'application/json' };
  //headers.Authorization = WebIM.config.tokenLocal  
  let args = { method: 'POST', mode: 'cors', headers: headers, cache: 'reload' }
  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.SMS.config.getSmsSumUrl, args).then(response => response.json())
    .then(json => {
      let sum = 0
      if (json != null && json.sum != null)
        sum = json.sum
      return dispatch(getPages(Math.ceil(sum / 10)))
    }).catch(e => {
      console.log(e);
      alert('网络异常，请稍后再试！')
    }
    )
} */
//根据指定页面查询记录
/* export const getListByPage = (page) => dispatch => {
  dispatch(getResult([
    { 'tels': '187188199,1897866567', 'content': '东区发生火灾，请速到现场[湖北城建职院]', sentTime: '2017-08-02' },
    { 'tels': '187188199,1897866567', 'content': '东区发生火灾，请速到现场[湖北城建职院]', sentTime: '2017-08-02' },
    { 'tels': '187188199,1897866567', 'content': '东区发生火灾，请速到现场[湖北城建职院]', sentTime: '2017-08-02' }
  ]))
} */
