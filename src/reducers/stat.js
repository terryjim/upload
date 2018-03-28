//统计总量及按月统计数量
let sample = {
    total: 1000,
    sum: 10.00,
    data: [
        { 'statYear':2017,'statMonth': 9, 'count': 12 },
        { 'statYear':2017,'statMonth': 8, 'count': 151 },
    ]
}
const stat = (state =sample, action) => {
    if (action.type === 'STAT') {
        state = action.stat
    }  
    return state;

}
export default stat;