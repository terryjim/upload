//管理员列表
let sample = {list:[
    {
        'id': '',
        'loginName': '',
        'realName': '',
        'regDate': ''
    }],
    modifiedIds:[1,3,5]
}
const admin = (state = [], action) => {
    if (action.type === 'ADMIN_LIST') {
        console.log(action.list);
        if (action.list != null)
            state = Object.assign({}, {list:action.list})
    }
    if (action.type === 'ADD_ADMIN_TO_GRID') {
        if (action.data != null) {
            //如果存在相由的id说明是修改记录，则先删除state中原记录
            console.log(action.data)
            console.log(state)
            let index = state.list.findIndex(v => v.id === action.data.id)
            if (index > -1)
                state.list.splice(index, 1, action.data);
            else
                state.list.push(action.data)
            state = Object.assign({}, state.list,{modifiedIds:[action.data.id]})
            console.log(state)
        }
    }

    return state;

}
export default admin;