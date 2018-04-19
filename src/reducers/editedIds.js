//返回新增或修改文档后ＩＤ数组
let sample = [
    1,2
]
const editedIds = (state = [], action) => {
    if (action.type === 'ADD_EDITED_IDS') {         
            state = state.concat(action.ids) 
    }    
    if (action.type === 'CLEAR_EDITED_IDS') { 
        state = []         
}  
    return  Object.assign([], state)
}
export default editedIds;


