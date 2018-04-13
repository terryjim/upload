//是否登录成功
export const logined = ({ token, userName }) => ({
  type: 'LOGINED',
  token,
  userName
})
//获取总页数
export const getPages = (pages) => (
  {
    type: 'GET_PAGES',
    pages
  }
)



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
//根据指定条件获取sms记录
export const getResult = (json) => (
  {
    type: 'SMS_LIST',
    list: json
  }
)
/*export const changePage = (page) => dispatch => {
  dispatch(getResult([
    { 'tels': '187188199,1897866567', 'content': '东区发生火灾，请速到现场[湖北城建职院]', sentTime: '2017-08-02' },
    { 'tels': '187188199,1897866567', 'content': '东区发生火灾，请速到现场[湖北城建职院]', sentTime: '2017-08-02' },
    { 'tels': '187188199,1897866567', 'content': '东区发生火灾，请速到现场[湖北城建职院]', sentTime: '2017-08-02' }
  ]))
  return dispatch(changePage2(page))
}*/
//更换当前页
/* export const changePage = (page) =>
  ({
    type: 'CHANGE_PAGE',
    currentPage: page
  }
  ) */
//显示指定页面的短信记录
export const getSmsByPage = (page) => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };

  //headers.Authorization = WebIM.config.tokenLocal
  let body = JSON.stringify({
    page
  })
  let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }

  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.SMS.config.getSmsListUrl, args).then(response => response.json())
    .then(json => {
      /*  console.log(json) */
      /*   let ret = json
        if (ret != null) {
          ret.map(x => x.created = new Date(parseInt(x.created)).Format('yyyy-MM-dd hh:mm:ss'))
        }
        dispatch(getResult(ret)) */
      //return dispatch(changePage(json))
      return dispatch(getResult(json))
    }).catch(e => {
      console.log(e);
      alert(e)
      alert('网络异常，请稍后再试！')

    }
    )
}
export const loginFailure = () => ({
  type: 'LOGIN_FAILURE'
})
//用户管辖的部门列表
export const userDepts = (depts) => ({
  type: 'USER_DEPTS',
  depts
})
export const stat = (json) => (
  {
    type: 'STAT',
    stat: json
  }
)
export const loginOut = () => ({
  type: 'LOGIN_OUT'
})
export const login = ({ userName, password }) => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };

  //headers.Authorization = WebIM.config.tokenLocal
  let body = JSON.stringify({
    userName, password
  })

  let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }
  console.log('登录')
  dispatch(loading())
  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.SMS.config.loginUrl, args).then(response => {
    return (response.json())
  })
    .then(json => {
      console.log(json)
      if (json != null && json.token != null && json.token != '') {
        console.log('登录成功')
        dispatch(loaded())
        return dispatch(logined({ token: json.token, userName }))
      }
      else {
        console.log('登录失败')
        alert('用户名或密码错误，请重新登录！')
        return dispatch(loaded())
      }
    }).catch(e => {
      console.log(e);
      alert('网络异常，请稍后再试！')
      return dispatch(loaded())
    }
    )
}

export const sendSms = (json) => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };

  //headers.Authorization = WebIM.config.tokenLocal

  let args = { method: 'POST', mode: 'cors', headers: headers, body: json, cache: 'reload' }
  console.log('短信发送')
  dispatch(loading())
  // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
  return fetch(window.SMS.config.sendSmsUrl, args).then(response => response.text()).then(json => {
    if (json != '1#1') {
      alert('发送失败')
    } else {
      alert('发送成功!')
    }
    return dispatch(loaded())

  }).catch(e => {
    console.log(e);
    alert('发送异常，请稍后再试！')
    return dispatch(loaded())
  }
    )
}
//页面刷新中
export const loading = () => (
  {
    type: 'LOADING'
  }
)
//页面刷新中
export const loaded = () => (
  {
    type: 'LOADED'
  }
)

//查询统计信息
export const fetchStat = () => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };

  //headers.Authorization = WebIM.config.tokenLocal

  let args = { method: 'GET', mode: 'cors', headers: headers, cache: 'reload' }

  return fetch(window.SMS.config.getSmsStatUrl, args).then(response => response.json())
    .then(json => {
      //console.log(json)
      let total = 0;
      if (json != null) {
        json.map(x => total += x.count)
      }
      let ret = {
        total,
        sum: total / window.SMS.config.rate,
        data: json
      }
      //console.log(ret);
      return dispatch(stat(ret))
    }).catch(e => {
      console.log(e);
      alert('网络异常，数据统计出错，请稍后再试！')

    }
    )
}
//修改密码
export const fetchChgPwd = ({ userName, oldPwd, newPwd }) => dispatch => {
  //不能用headers=new Headers()，否则跨域出错
  /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
  let headers = { 'Content-Type': 'application/json' };

  //headers.Authorization = WebIM.config.tokenLocal
  let body = JSON.stringify({
    userName, oldPwd, newPwd
  })
  console.log(body)
  let args = { method: 'POST', mode: 'cors', headers: headers, body: body, cache: 'reload' }

  return fetch(window.SMS.config.getChgPwdUrl, args).then(response => response.text())
    .then(json => {
      console.log(json)
      if (json === "-1") {
        alert('旧密码不正确，请重新输入！')
        return null
      }
      if (json != "1") {
        alert('密码修改失败，请稍后再试！')
        return null
      } else {
        alert('密码修改成功！')
        return dispatch(chgPwdSuccess())
      }
    }).catch(e => {
      console.log(e);
      alert('网络异常，密码修改失败，请稍后再试！')

    }
    )
}
//是否登录成功
export const chgPwdSuccess = () => ({
  type: 'CHG_PWD_SUCCESS'
})



// 对Date的扩展，将 Date 转化为指定格式的String  
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，  
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)  
// 例子：  
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423  
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
Date.prototype.Format = function (fmt) { //author: meizz  
  var o = {
    "M+": this.getMonth() + 1,                 //月份  
    "d+": this.getDate(),                    //日  
    "h+": this.getHours(),                   //小时  
    "m+": this.getMinutes(),                 //分  
    "s+": this.getSeconds(),                 //秒  
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度  
    "S": this.getMilliseconds()             //毫秒  
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
