cc.Class({
    extends: cc.Component,

    properties: {
        panel: null,
        bannerAd: null,
        itemArr: null,

        state: null,
    },

    onLoad() {
        this.panel = this.node.getComponent("StartView");
        this.panel.window = this;
        this.itemArr = [];

        this.panel.onbtnStartClickCallBack = this.onBtnbtnStartClicked;
        this.panel.onbtnShareClickCallBack = this.onBtnbtnShareClicked;
        this.panel.onbtnLinkClickCallBack = this.onBtnbtnLinkClicked;
        this.panel.onbtnStateClickCallBack = this.onBtnbtnStateClicked;
        this.panel.onbtnCloseClickCallBack = this.onBtnbtnCloseClicked;

        this.AudioSourcePlay();

        this.panel.link.active = false;
        // this.createUserButton();
        cc.director.preloadScene("GameMain");
        var recall = cc.sys.localStorage.getItem("recall");
        var zuigao = cc.sys.localStorage.getItem("userMax");
        wx.postMessage({
            message: 'setuser',
            hiegth: recall,
            max: zuigao,
        })

        cc.vv.start.bannerAdShow();
    },

    AudioSourcePlay: function () {
        this.state = this.panel.btnState.getComponent(cc.AudioSource);
    },

    createUserButton: function () {
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            style: {
                left: 125,
                top: 260,
                width: 150,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#ff0000',
                color: '#ffff00',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 10
            }
        });

        //监听用户信息按钮的点击事件,用户每点击一次，就会触发一次回答函数
        button.onTap(function (res) {
            console.log(res.userInfo); //res 为 json 格式，用户点击"拒绝"或"允许"都会对应不同的数据
        });
    },

    onBtnbtnStateClicked: function () {
        this.window.state.play();
    },

    onBtnbtnCloseClicked: function () {
        this.window.state.play();
        this.link.active = false;
    },

    onBtnbtnLinkClicked: function () {
        this.window.state.play();
    },


    onBtnbtnShareClicked: function () {
        this.window.state.play();
        cc.vv.WechatMgr.miniGameShareImg();
    },

    onBtnbtnStartClicked: function () {
        this.window.state.play();
        cc.director.loadScene('GameMain');
    },

});