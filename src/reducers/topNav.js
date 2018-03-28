//顶部导航，切换消息、好友、群组、组织
//切换顶部导航，返回值：1、消息列表2、好友列表3、群组列表4、组织架构
const topNav = (state = 1, action) => {
    switch (action.type) {
        case 'CHG_TOP_NAV':
            return action.id;
        default:
            return state;
    }
}
export default topNav;

