//确认信息
//show:是否显示确认窗口，confirm:确认、取消，msg；确认窗口显示信息，module；模块名，以确保是当前模块引发的确认窗口,operate:操作
let sample = {
    //"key":"user-dir/${filename}",
    "accessid": "LTAIxtqoPGrMU8Ob",
    "OSSAccessKeyId": "LTAIxtqoPGrMU8Ob",
    "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wNS0wM1QwNzozNzowNS40NjlaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ1c2VyLWRpciJdXX0=",
    "signature": "81iNSKYTnFwD8J0+dElW3GSKNXE=",
    "dir": "user-dir/",
    "host": "http://bluechips.oss-cn-hangzhou.aliyuncs.com",
    "expire": "1525333025"
}
const oss = (state = {}, action) => {
    if (action.type === 'GET_OSS') {          
        if (action.data != null)
            state = Object.assign({},action.data)        
    }    
    return state;
}
export default oss;