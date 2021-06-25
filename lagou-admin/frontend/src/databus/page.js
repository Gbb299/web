class Page {
    constructor() {
        this.curPage = 1
        this.pageSize = 5
        this.curRoute = '#/index/users'
    }

    setCurPage(curPage) {
        this.curPage = curPage
    }

    setCurRouter(route) {
        this.curRoute = route
    }
}


export default new Page()