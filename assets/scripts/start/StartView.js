cc.Class({
    extends: cc.Component,

    properties: {
        window:null,

        btnStart:cc.Button,
        btnShare:cc.Button,
        btnLink:cc.Button,
        btnState:cc.Button,
        btnClose:cc.Button,
        spTouXiang:cc.Sprite,
        txtPaiMing:cc.Label,
        txtName:cc.Label,
        txtFenShu:cc.Label,

        onbtnCloseClickCallBack:null,
        onbtnStartClickCallBack:null,
        onbtnShareClickCallBack:null,
        onbtnLinkClickCallBack:null,
        onbtnStateClickCallBack:null,
    },

    onLoad () {
        this.btnStart=cc.find("Canvas/start/btnStart").getComponent(cc.Button);
        this.btnShare=cc.find("Canvas/start/btnShare").getComponent(cc.Button);
        this.btnLink=cc.find("Canvas/start/btnLink").getComponent(cc.Button);
        this.btnState=cc.find("Canvas/start/btnState").getComponent(cc.Button);
        this.btnClose=cc.find("Canvas/start/link/btnClose").getComponent(cc.Button);

        this.link=cc.find("Canvas/start/link");
        // this.useritem=cc.find("Canvas/start/link/scrollView/view/content/userInfo")

        cc.vv.start.addClickEvent(this.btnClose,this.node,"StartView","onBtnbtnCloseClicked");
        cc.vv.start.addClickEvent(this.btnStart,this.node,"StartView","onBtnbtnStartClicked");
        cc.vv.start.addClickEvent(this.btnShare,this.node,"StartView","onBtnbtnShareClicked");
        cc.vv.start.addClickEvent(this.btnLink,this.node,"StartView","onBtnbtnLinkClicked");
        cc.vv.start.addClickEvent(this.btnState,this.node,"StartView","onBtnbtnStateClicked");
    },

    onBtnbtnCloseClicked: function () {
        if (this.onbtnCloseClickCallBack != null) {
          this.onbtnCloseClickCallBack();
        }
    },

    onBtnbtnStartClicked: function () {
        if (this.onbtnStartClickCallBack != null) {
          this.onbtnStartClickCallBack();
        }
    },

    onBtnbtnShareClicked: function () {
        if (this.onbtnShareClickCallBack != null) {
          this.onbtnShareClickCallBack();
        }
    },

    onBtnbtnLinkClicked: function () {
        if (this.onbtnLinkClickCallBack != null) {
          this.onbtnLinkClickCallBack();
        }
    },

    onBtnbtnStateClicked: function () {
        if (this.onbtnStateClickCallBack != null) {
          this.onbtnStateClickCallBack();
        }
    },
});
