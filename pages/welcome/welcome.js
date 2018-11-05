Page({
    go() {
        /* redirectTo一般用于跳转到统计页面，无返回。navigateTo一般用于跳转到子页面，有返回。 */
        /* navigateTo, redirectTo 只能打开非 tabBar 页面。 */
        /* switchTab 只能打开 tabBar 页面。 */
        /* reLaunch 可以打开任意页面。 */
        wx.reLaunch({
            url: '/pages/posts/posts'
        });
    }
});