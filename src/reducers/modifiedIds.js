//新增或修改文档的ＩＤ数组
let sample = [
    1,2
]
const modifiedIds = (state = [], action) => {
    if (action.type === 'ADD_MODIFY_RECORDS') { 
            state = Object.assign([], action.ids)           
    }     
    return state;
}
export default modifiedIds;