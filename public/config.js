const SMS = {}
window.SMS = SMS
//const apiBaseUrl='http://localhost:8080/sms/'
const apiBaseUrl = '/sms/'
SMS.config = {
    loginUrl: apiBaseUrl + 'login',
    sendSmsUrl: apiBaseUrl + 'sendSms',
    getSmsListUrl: apiBaseUrl + 'getSmsList',
    // getSmsSumUrl:apiBaseUrl+'getSmsSum',
    getSmsStatUrl: apiBaseUrl + 'getSmsStat',
    getChgPwdUrl: apiBaseUrl + 'chgPwd',
    //短信费率，10条1元
    rate: 10
}
const defaultUrl = "http://localhost/"
const TParams = {
    defaultUrl,
    urls: {
        get_admin_list: defaultUrl + 'admin/getByPage',
        save_admin: defaultUrl + 'admin/save',
        del_admin: defaultUrl + 'admin/del',
        get_oss_params: defaultUrl + 'oss/getParams'
    }
}
window.TParams = TParams

