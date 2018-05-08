//管理员列表
let sample = [{
    "content": [
        {
            "id": 1,
            "loginName": "admin",
            "realName": "管理员",
            "regDate": "2018-04-03 21:28:41",
            "files":""
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
const cList = (state = {}, action) => {
    if (action.type === 'GET_LIST') {
        if (action.data != null)
            state = Object.assign({}, action.data)
    }
    if (action.type === 'ADD_TO_GRID') {        
        if (action.data != null) {
            //console.log(action.data)
            //如果存在相由的id说明是修改记录，则先删除state中原记录           
            let index = state.content.findIndex(v => v.id === action.data.id)
            if (index > -1)
                state.content.splice(index, 1, action.data);
            else
                state.content.splice(0, 0, action.data);
            //state.push(action.data)
            state = Object.assign({}, state)
        }
    }
    if (action.type === 'DEL_FROM_GRID') {
        if (action.data != null) {            
            //如果存在相由的id说明是修改记录，则先删除state中原记录  
            action.data.map(id => {
                let index = state.content.findIndex(v => v.id === id)
                if (index > -1)
                    state.content.splice(index, 1);
            })
            state = Object.assign({}, state)
        }
    }
    return state;
}
export default cList;