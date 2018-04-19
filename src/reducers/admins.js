//管理员列表
let sample = [
    {
        'id': '',
        'loginName': '',
        'realName': '',
        'regDate': ''
    }]
const admins = (state = [], action) => {
    if (action.type === 'ADMIN_LIST') {       
        if (action.data != null)
            state = Object.assign([], action.data)
    }
    if (action.type === 'ADD_ADMIN_TO_GRID') {
        if (action.data != null) {
            //如果存在相由的id说明是修改记录，则先删除state中原记录           
            let index = state.findIndex(v => v.id === action.data.id)
            if (index > -1)
                state.splice(index, 1, action.data);
            else
                state.splice(0, 0, action.data);
                //state.push(action.data)
            state = Object.assign([], state)           
        }
    }
    return state;

}
export default admins;