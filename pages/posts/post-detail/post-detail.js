Page({
    data: {
        postId: '',
        noMusic: true,
        history: {},
        isCollect: false
    },
    onLoad(option) {
        let localData = require('../../../data/local-data.js');
        let postId = parseInt(option.postId);
        this.data.postId = postId;
        this.setData((localData.postData.list)[postId]);
        this.handleSession(postId);
    },
    handleMusic() {
        let that = this;
        if (that.data.noMusic) {  //播放音乐
            wx.playBackgroundAudio({
                title: this.data.music.title,
                dataUrl: this.data.music.url,
                coverImgUrl: this.data.coverImgUrl
            });
        } else {
            wx.pauseBackgroundAudio();
        }
        that.setData({
            noMusic: !this.data.noMusic
        });
    },
    handleSession(postId) {
        let that = this;
        wx.getStorage({
            key: 'history',
            success(res) {
                if (JSON.stringify(res.data) !== "{}") {
                    let flag = false;
                    if (res.data[postId]) {
                        flag = res.data[postId];
                    }
                    that.setData({
                        history: res.data,
                        isCollect: flag
                    });
                }
            },
            fail(res) {
                wx.setStorage({
                    key: 'history',
                    data: {}
                });
            }
        })
    },
    collect() {
        this.data.history[this.data.postId] = !this.data.isCollect;
        this.setData({
            isCollect: !this.data.isCollect,
            history: this.data.history
        });
        wx.setStorage({
            key: 'history',
            data: this.data.history
        });
        wx.showToast({
            title: this.data.isCollect ? '分享成功' : '取消成功',
            duration: 1000,
            mask: true
        });
    },
    share() {
        wx.showActionSheet({
            itemList: ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到微博'],
            itemColor: '#405f80',
            success(res) {
                console.log(res);
                console.log(res.tapIndex);
            },
            complete(res) {
                console.log(res);
            }
        });
    }
});