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
    if (action.type === 'ADD_ADMIN_TO_GRID') {
        console.log(action.data);
        if (action.data != null){
            state.unshift(action.data)
            console.log('-------------------------------------------------')
            console.log(state)
        }    
    }

    return state;

}
export default admin;