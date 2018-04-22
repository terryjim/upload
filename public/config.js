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
const defaultParams = {
    getAdminUrl: defaultUrl + 'admin/getByPage'     ,
    saveAdminUrl:defaultUrl + 'admin/save',

}
window.defaultParams = defaultParams

