cc.Class({
    extends: cc.Component,

    properties: {
        panel: null,
        scortSub: null,
        audio:null,
    },

    onLoad() {
        this.panel = this.node.getComponent("GameOverView");
        this.panel.window = this;

        this.panel.onbtnShareClickCallBack = this.onBtnbtnShareClicked;
        this.panel.onbtnReturnClickCallBack = this.onBtnbtnReturnClickedl;
        this.panel.onbtnAgenClickCallBack = this.onBtnbtnAgenClicked;

        this.panel.over.play();
        cc.director.preloadScene("GameMain");
        cc.director.preloadScene("GameStart");
        this.audio=this.panel.btnReturn.getComponent(cc.AudioSource);
        this.panel.txtNowFen.string = "本局结算: " + cc.vv.start.recall + "溯答  " + cc.vv.start.max + "题";
        var defen = this.panel.txtNowFen.string.substring(6, 7);
        var recall = cc.sys.localStorage.getItem("recall");
        var zuigao = cc.sys.localStorage.getItem("userMax")

        if (recall > defen) {
            this.panel.txtZuiJia.string = "历史最佳: " + recall + "溯答   答对" + zuigao + "题";

            var scort = recall + "," + zuigao;
            cc.sys.localStorage.setItem("recall", recall);
            cc.sys.localStorage.setItem("userMax", zuigao)
            console.log("------>-------" + recall, zuigao);
            var self = this;
            wx.postMessage({
                message: 'end',
                hiegth: recall,
                max: zuigao,
            })
        } else if (recall == defen) {
            if (cc.vv.start.max > zuigao || cc.vv.start.max == zuigao) {
                this.panel.txtZuiJia.string = "历史最佳: " + recall + "溯答   答对" + cc.vv.start.max + "题";

                var scort = recall + "," + cc.vv.start.max;
                cc.sys.localStorage.setItem("recall", recall);
                cc.sys.localStorage.setItem("userMax", cc.vv.start.max)
                console.log("------=>=-------" + recall, cc.vv.start.max);
                wx.postMessage({
                    message: 'end',
                    hiegth: recall,
                    max: cc.vv.start.max,
                })
            } else if (cc.vv.start.max < zuigao) {
                this.panel.txtZuiJia.string = "历史最佳: " + recall + "溯答   答对" + zuigao + "题";

                var scort = recall + "," + zuigao;
                cc.sys.localStorage.setItem("recall", recall);
                cc.sys.localStorage.setItem("userMax", zuigao)
                console.log("------=<-------" + recall, zuigao);
                wx.postMessage({
                    message: 'end',
                    hiegth: recall,
                    max: zuigao,
                })
            }
        } else {
            this.panel.txtZuiJia.string = "历史最佳: " + cc.vv.start.recall + "溯答   答对" + cc.vv.start.max + "题";
            var scort = this.panel.txtNowFen.string + "," + this.panel.txtZuiJia.string;
            cc.sys.localStorage.setItem("recall", defen);
            cc.sys.localStorage.setItem("userMax", cc.vv.start.max)
            console.log("------<-------", cc.vv.start.recall, cc.vv.start.max);
            wx.postMessage({
                message: 'end',
                hiegth: cc.vv.start.recall,
                max: cc.vv.start.max,
            })
        }
    },

    onBtnbtnAgenClicked: function () {
        this.window.audio.play();
        cc.director.loadScene('GameMain');
    },

    onBtnbtnReturnClickedl: function () {
        this.window.audio.play();
        cc.director.loadScene('GameStart');
    },

    onBtnbtnShareClicked: function () {
        this.window.audio.play();
        cc.vv.WechatMgr.miniGameShareImg();
    },

});