//短信历史记录列表
let sample = {
    'content': [
          ],
    "last": false,
    "totalElements": 817,
    "totalPages": 41,
    "number": 10,
    "size": 20,
    "numberOfElements": 20,
    "sort": [
        {
            "direction": "DESC",
            "property": "created",
            "ignoreCase": false,
            "nullHandling": "NATIVE",
            "descending": true,
            "ascending": false
        }
    ],
    "first": false
}
const sms = (state = sample, action) => {
    if (action.type === 'SMS_LIST') {
        if (action.list != null)
            state = Object.assign({},action.list)
        else
            state = null
    }
    return state;

}
export default sms;