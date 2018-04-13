//管理员列表
let sample = [
    {'id':'',
    'loginName':'',
    'realName':'',
    'regDate':''}
]
const admin = (state = [], action) => {
    if (action.type === 'ADMIN_LIST') {
        console.log(action.list);
        if (action.list != null)
            state = Object.assign([],action.list)      
    }
    return state;

}
export default admin;