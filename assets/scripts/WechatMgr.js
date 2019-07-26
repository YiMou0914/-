cc.Class({
    extends: cc.Component,

    properties: {

    },

    //控制屏幕常亮
    keepWechatMiniGameScreenOn: function () {
        wx.setKeepScreenOn({
            keepScreenOn: true,
            success: function (res) {

            },
            fail: function (res) {

            },
            complete: function (res) {

            },
        });
    },

    //分享
    miniGameShareImg: function () {
        var canvas = cc.game.canvas;
        let tempFilePath = canvas.toTempFilePath({
            x: 1000,
            y: 1000,
            width: canvas.width,
            height: canvas.height,
            destWidth: canvas.width,
            destHeight: canvas.height,
            success: function (res) {
                cc.log('-------------');
                wx.shareAppMessage({
                    imageUrl: res.tempFilePath,
                    title: "记忆回溯!",
                    query: "快来挑战自己的记忆力吧！",
                    success: function (res) {
                        cc.log('拉起分享 成功');
                        cc.log(res);
                    },
                    fail: function (res) {
                        cc.log('拉起分享 失败');
                        cc.log(res);
                    }
                })
            },
        })
        // wx.saveImageToPhotosAlbum();
        // cc.log("----------------")
        // wx.shareAppMessage({
        //     title: "记忆回溯!",
        //     query: "快来挑战自己的记忆力吧！",
        //     imageUrl: tempFilePath,
        //     success: function (res) {
        //         cc.log('拉起分享 成功');
        //         cc.log(res);
        //     },
        //     fail: function (res) {
        //         cc.log('拉起分享 失败');
        //         cc.log(res);
        //     }
        // });
    },

    //设置头像
    setUserHeadImg: function () {
        if (window.wx != undefined) {

            var sprite = this.getComponent(cc.Sprite);
            let image = wx.createImage();
            image.src = headimgurl;
            image.onload = function () {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                sprite.enabled = true;
                sprite.spriteFrame = new cc.SpriteFrame(texture);
            };
        }
    },

    //授权登录
    // wechatMiniGameLogin: function () {
    //     if (window.wx == undefined) {
    //         cc.log("return")
    //         return;
    //     }

    //     wx.getSetting({
    //         success: function (res) {
    //             cc.log("authSetting"+res.authSetting);
    //             var authSetting = res.authSetting;
    //             // if (authSetting['scope.userInfo'] === true) {
    //             //     cc.log("已授权")
    //             //     // 用户已授权，可以直接调用相关 API
    //             //     wx.getUserInfo({
    //             //         fail: function (res) {
    //             //             // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
    //             //             if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
    //             //                 // 处理用户拒绝授权的情况
    //             //             }
    //             //         },
    //             //         success: function (res) {
    //             //             cc.vv.debug.log(res);

    //             //             var data = res.rawData;
    //             //             // cc.vv.playerMgr.miniGameLogin(data);
    //             //         }
    //             //     })
    //             // } 
    //             // else 
    //             if (authSetting['scope.userInfo'] === false) {
    //                 cc.log("拒绝授权")
    //                 // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
    //                 wx.showModal({
    //                     title: '警告通知',
    //                     content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
    //                     success: function (res) {
    //                         if (res.confirm) {
    //                             wx.openSetting({
    //                                 success: (res) => {
    //                                     if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
    //                                         wx.login({
    //                                             success: function (loginResp) {
    //                                                 var loginCode = loginResp.code;
    //                                                 UserInfoButton({
    //                                                     fail: function (res) {
    //                                                         // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
    //                                                         if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
    //                                                             // 处理用户拒绝授权的情况
    //                                                         }
    //                                                     },
    //                                                     success: function (res) {
    //                                                         var data = res.rawData;
    //                                                         // cc.vv.playerMgr.miniGameLogin(data, loginCode);
    //                                                     }
    //                                                 })
    //                                             }
    //                                         });
    //                                     }
    //                                 },
    //                                 fail: function (res) {

    //                                 }
    //                             })
    //                         }
    //                     }
    //                 })
    //             } else {
    //                 // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
    //                 wx.login({
    //                     success: function (loginResp) {
    //                         var loginCode = loginResp.code;
    //                         UserInfoButton({
    //                             fail: function (res) {
    //                                 // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
    //                                 if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
    //                                     // 处理用户拒绝授权的情况
    //                                 }
    //                             },
    //                             success: function (res) {
    //                                 cc.vv.debug.log(res);

    //                                 var data = res.rawData;
    //                                 // cc.vv.playerMgr.miniGameLogin(data, loginCode);
    //                             }
    //                         })
    //                     }
    //                 })
    //             }
    //         }
    //     });
    // },
});