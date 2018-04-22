//管理员列表
let sample = [{
    "content": [
        {
            "id": 1,
            "loginName": "admin",
            "realName": "管理员",
            "regDate": "2018-04-03 21:28:41"
        },
        {
            "id": 2,
            "loginName": "guest",
            "realName": "游客",
            "regDate": "2018-04-03 21:28:57"
        }
    ],
    "totalElements": 2,
    "totalPages": 1,
    "last": true,
    "number": 0,
    "size": 20,
    "sort": null,
    "first": true,
    "numberOfElements": 2
}]




const admins = (state = {}, action) => {
    if (action.type === 'ADMIN_LIST') {
        if (action.data != null)
            state = Object.assign({}, action.data)
    }
    if (action.type === 'ADD_ADMIN_TO_GRID') {
        if (action.data != null) {
            //如果存在相由的id说明是修改记录，则先删除state中原记录           
            let index = state.content.findIndex(v => v.id === action.data.id)
            if (index > -1)
                state.content.splice(index, 1, action.data.content);
            else
                state.content.splice(0, 0, action.data.content);
            //state.push(action.data)
            state = Object.assign({}, state)
        }
    }
    return state;

}
export default admins;