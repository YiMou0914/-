cc.Class({
    extends: cc.Component,

    properties: {
       window:null,

       txtNowFen:cc.Label,
       txtZuiJia:cc.Label,
       btnAgen:cc.Button,
       btnShare:cc.Button,
       btnReturn:cc.Button,
       link:cc.Node,

       onbtnShareClickCallBack:null,
       onbtnAgenClickCallBack:null,
       onbtnReturnClickCallBack:null,
    },
    
    onLoad () {
        this.btnShare=cc.find("Canvas/over/btnShare").getComponent(cc.Button);
        this.btnAgen=cc.find("Canvas/over/btnAgen").getComponent(cc.Button);
        this.btnReturn=cc.find("Canvas/over/btnReturn").getComponent(cc.Button);
        this.txtNowFen=cc.find("Canvas/over/txtNowFen").getComponent(cc.Label);
        this.txtZuiJia=cc.find("Canvas/over/txtZuiJia").getComponent(cc.Label);
        this.link=cc.find("Canvas/over/link");
        this.over=cc.find("Canvas/over").getComponent(cc.AudioSource);
        cc.vv.start.addClickEvent(this.btnShare,this.node,"GameOverView","onBtnbtnShareClicked");
        cc.vv.start.addClickEvent(this.btnReturn,this.node,"GameOverView","onBtnbtnReturnClicked");
        cc.vv.start.addClickEvent(this.btnAgen,this.node,"GameOverView","onBtnbtnAgenClicked");
    },

    onBtnbtnShareClicked: function () {
        if (this.onbtnShareClickCallBack != null) {
          this.onbtnShareClickCallBack();
        }
    },
    
    onBtnbtnReturnClicked: function () {
        if (this.onbtnReturnClickCallBack != null) {
          this.onbtnReturnClickCallBack();
        }
    },

    onBtnbtnAgenClicked: function () {
        if (this.onbtnAgenClickCallBack != null) {
          this.onbtnAgenClickCallBack();
        }
    },
    
});
