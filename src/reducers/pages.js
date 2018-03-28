const pages = (state ={total:0,currentPage:0}, action) => {
    if (action.type === 'CHANGE_PAGE') {       
        state = Object.assign({},{total:state.total,currentPage:action.currentPage})
    }
    if (action.type === 'GET_PAGES') {       
        state = Object.assign({},{total:action.pages,currentPage:state.currentPage})
    }
    return state;

}
export default pages;