cc.Class({
    extends: cc.Component,

    properties: {
        recall:null,
        max:null,
        bannerAd:null,
        videoAd:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initMgr();
    },

    initMgr: function () {
        if (cc.vv == null) cc.vv = {};

        var start = require("Start");
        cc.vv.start = new start();

        var Emitter = require("Emitter")
        cc.vv.emitter = new Emitter();

        var GameManager = require("GameManager")
        cc.vv.GameManager = new GameManager();

        var WechatMgr= require("WechatMgr");
        cc.vv.WechatMgr=new WechatMgr();

    },

    addClickEvent: function (node, target, component, handler) {
        console.log(component + ":" + handler);
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },

     //激励视频广告
    createRewardedVideo: function () {
        console.log("createRewardedVideoAd  ")
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-5062138f0850e22c'
        })
        var self=this;
        this.videoAd.onLoad()
        this.videoAd.show()
            .then(() => console.log('激励视频 广告显示'))
            .catch(err => {
                self.videoAd.load()
                    .then(() => self.videoAd.show())
            })
            this.videoAd.onError(err => {
            console.log(err)
        })
    },

    //底部Banner广告
    bannerAdShow: function () {
        let winSize = wx.getSystemInfoSync();
        console.log("createBannerAd  ")
        this.bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-e3329679fc5ec3f8',
            style: {
                left: (winSize.windowWidth - 80) / 2,
                top: winSize.windowHeight - 76,
                width: 350
            }
        })

        console.log("---------------------  ")
        this.bannerAd.onLoad(() => {
            console.log('banner 广告加载成功')
        })

        console.log("bannerAd: " + this.bannerAd);
        this.bannerAd.show()
            .catch(err => console.log("showerr: " + err))

        console.log("<<<<<<<<<<<<<<<<<<<<<<<  ")
        this.bannerAd.onError(err => {
            console.log("err: " + err)
        })

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  ")
        var self = this;
        this.bannerAd.onResize(res => {
            self.bannerAd.style.top = winSize.windowHeight - self.bannerAd.style.realHeight;
            console.log("//////////////////////////  ")
        })
    },

    // update (dt) {},
});