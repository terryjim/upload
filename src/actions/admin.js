import { showError,showSuccess } from "./common";

//获取管理员列表
export const getAdmin = () => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };

  //headers.Authorization = WebIM.config.tokenLocal

  let args = { method: 'GET', mode: 'cors', headers: headers, cache: 'reload' }

  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.defaultParams.getAdminUrl, args).then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json.data)
      if (json.code !== 0)
        return dispatch(showError(json.msg))
      else
        return dispatch(getAdminResult(json.data))
    }).catch(e => {
      return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
    }
    )
}
//根据指定条件获取sms记录
export const getAdminResult = (json) => (
  {
    type: 'ADMIN_LIST',
    list: json
  }
)
//根据指定条件获取sms记录
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
  //let body = JSON.stringify(values) 
 let body = values
  let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }

  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.defaultParams.saveAdminUrl, args).then(response => response.json())
    .then(json => {
      if (json.code !== 0)
        dispatch(showError(json.msg))
      else
        dispatch(showSuccess('保存成功！'))
      /*  console.log(json) */
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
