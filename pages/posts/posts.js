Page({
    data: {
        bannerArr: [],
        list: []
    },
    onLoad() {
        let postData = require('../../data/local-data.js');
        this.getBanner(postData.postData.banner);
        this.getList(postData.postData.list);
    },
    getBanner(bannerArr) {
        /* 轮播图 */
        this.setData({
            bannerArr: bannerArr
        });
    },
    getList(list) {
        /* 新闻列表 */
        this.setData({
            list: list
        });
    },
    go(event) {
        let postId = event.currentTarget.dataset.item.postId;
        wx.navigateTo({
            url: './post-detail/post-detail?postId=' + postId
        });
    },
    scrollLowEvt(event) {
        wx.showLoading();
        let dataArr = [];
        if (this.data.list.length > 0) {
            dataArr = this.data.list.concat(this.data.list);
        }
        this.setData({
            list: dataArr
        });
        wx.hideLoading();
    }
});