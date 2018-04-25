//错误信息
let sample = {show:true,confirm:false,msg:''}
const confirm = (state = {}, action) => {
    if (action.type === 'SHOW_CONFIRM') {          
        if (action.msg != null)
            state = Object.assign({},{show:true,msg:action.msg,confirm:false})
        /* else
            state = {} */
    }
    if (action.type === 'CLOSE_CONFIRM') { 
            state = Object.assign({},{show:false,confirm:false})       
    }
    if (action.type === 'CONFIRM') { 
        state = Object.assign({},{show:false,confirm:true})       
}
    return state;
}
export default confirm;