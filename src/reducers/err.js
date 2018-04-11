//短信历史记录列表
let sample = {'code':0,'msg':''}
const err = (state = sample, action) => {
    if (action.type === 'SHOW_ERROR') {       
        if (action.msg != null)
            state = Object.assign({},action.msg)
        else
            state = {}
    }
    return state;

}
export default err;