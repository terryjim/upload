//短信历史记录列表
let sample = [
    {'id':'',
    'loginName':'',
    'realName':'',
    'regDate':''}
]
const admin = (state = sample, action) => {
    if (action.type === 'ADMIN_LIST') {
        console.log(action.list);
        if (action.list != null)
            state = Object.assign([],action.list)
        else
            state = []
    }
    return state;

}
export default admin;