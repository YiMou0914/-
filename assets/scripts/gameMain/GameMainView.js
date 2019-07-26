cc.Class({
    extends: cc.Component,

    properties: {
        window:null,

        txtTime:cc.Label,
        txtIsTrue:cc.Label,
        txtRightNum:cc.Label,
        txtIntA:cc.Label,
        txtIntB:cc.Label,
        txtIntC:cc.Label,
        txtIntD:cc.Label,
        txtIntE:cc.Label,
        txtIntF:cc.Label,
        txtRecall:cc.Label,

        txtNum: cc.Lable,
        txtOperation: cc.Lable,
        txtOperation1: cc.Lable,
        timg3: cc.Node,
        timg4: cc.Node,
        timg5: cc.Node,
        Cha:cc.Node,
        gou:cc.Node,
        txtResult:cc.label,

        btn0:cc.Button,
        btn1:cc.Button,
        btn2:cc.Button,
        btn3:cc.Button,
        btn4:cc.Button,
        btn5:cc.Button,
        btn6:cc.Button,
        btn7:cc.Button,
        btn8:cc.Button,
        btn9:cc.Button,
        btnAbandon:cc.Button,
        btnDelete:cc.Button,

        onbtnDeleteClickCallBack:null,
        onbtn0ClickCallBack:null,
        onbtn1ClickCallBack:null,
        onbtn2ClickCallBack:null,
        onbtn3ClickCallBack:null,
        onbtn4ClickCallBack:null,
        onbtn5ClickCallBack:null,
        onbtn6ClickCallBack:null,
        onbtn7ClickCallBack:null,
        onbtn8ClickCallBack:null,
        onbtn9ClickCallBack:null,
    },

    onLoad () {
        this.txtRecall=cc.find("Canvas/GameMain/txtRecall").getComponent(cc.Label);
        this.txtTime=cc.find("Canvas/GameMain/txtTime").getComponent(cc.Label);
        this.txtIsTrue=cc.find("Canvas/GameMain/txtIsTrue").getComponent(cc.Label);
        this.txtResult=cc.find("Canvas/GameMain/txtResult").getComponent(cc.Label);
        this.txtRightNum=cc.find("Canvas/GameMain/txtRightNum").getComponent(cc.Label);
        this.oper=cc.find("Canvas/GameMain/view/content/OperationItem0")
        this.oper1=cc.find("Canvas/GameMain/view/content/OperationItem1")

        this.isResultShow=cc.find("Canvas/GameMain/rightItem/rightView/content");
        this.resultshow=cc.find("Canvas/GameMain/rightItem");

        this.txtIntA=cc.find("Canvas/GameMain/view/content/OperationItem0/txtIntA").getComponent(cc.Label);
        this.txtIntB=cc.find("Canvas/GameMain/view/content/OperationItem0/txtIntB").getComponent(cc.Label);
        this.txtIntC=cc.find("Canvas/GameMain/view/content/OperationItem0/txtIntC").getComponent(cc.Label);
        this.txtNum=cc.find("Canvas/GameMain/view/content/OperationItem0/txtNum").getComponent(cc.Label);
        this.txtOperation=cc.find("Canvas/GameMain/view/content/OperationItem0/txtOperation").getComponent(cc.Label);
        this.timg3=cc.find("Canvas/GameMain/view/content/OperationItem0/timg3")

        this.txtIntD=cc.find("Canvas/GameMain/view/content/OperationItem1/txtIntD").getComponent(cc.Label);
        this.txtIntE=cc.find("Canvas/GameMain/view/content/OperationItem1/txtIntE").getComponent(cc.Label);
        this.txtIntF=cc.find("Canvas/GameMain/view/content/OperationItem1/txtIntF").getComponent(cc.Label);
        this.txtNum1=cc.find("Canvas/GameMain/view/content/OperationItem1/txtNum1").getComponent(cc.Label);
        this.txtOperation1=cc.find("Canvas/GameMain/view/content/OperationItem1/txtOperation1").getComponent(cc.Label);
        this.timg4=cc.find("Canvas/GameMain/view/content/OperationItem1/timg4")
        this.timg5=cc.find("Canvas/GameMain/view/content/OperationItem1/timg5")
        this.gou=cc.find("Canvas/GameMain/view/content/OperationItem1/gou")
        this.Cha=cc.find("Canvas/GameMain/view/content/OperationItem1/Cha")

        this.btn0=cc.find("Canvas/GameMain/buttonGroup/btn0").getComponent(cc.Button);
        this.btn1=cc.find("Canvas/GameMain/buttonGroup/btn1").getComponent(cc.Button);
        this.btn2=cc.find("Canvas/GameMain/buttonGroup/btn2").getComponent(cc.Button);
        this.btn3=cc.find("Canvas/GameMain/buttonGroup/btn3").getComponent(cc.Button);
        this.btn4=cc.find("Canvas/GameMain/buttonGroup/btn4").getComponent(cc.Button);
        this.btn5=cc.find("Canvas/GameMain/buttonGroup/btn5").getComponent(cc.Button);
        this.btn6=cc.find("Canvas/GameMain/buttonGroup/btn6").getComponent(cc.Button);
        this.btn7=cc.find("Canvas/GameMain/buttonGroup/btn7").getComponent(cc.Button);
        this.btn8=cc.find("Canvas/GameMain/buttonGroup/btn8").getComponent(cc.Button);
        this.btn9=cc.find("Canvas/GameMain/buttonGroup/btn9").getComponent(cc.Button);
        this.btnDelete=cc.find("Canvas/GameMain/buttonGroup/btnDelete").getComponent(cc.Button);
        this.btnAbandon=cc.find("Canvas/GameMain/buttonGroup/btnAbandon").getComponent(cc.Button);

        cc.vv.start.addClickEvent(this.btnAbandon,this.node,"GameMainView","onBtnbtnAbandonClicked");
        cc.vv.start.addClickEvent(this.btnDelete,this.node,"GameMainView","onBtnbtnDeleteClicked");
        cc.vv.start.addClickEvent(this.btn0,this.node,"GameMainView","onBtnbtn0Clicked");
        cc.vv.start.addClickEvent(this.btn1,this.node,"GameMainView","onBtnbtn1Clicked");
        cc.vv.start.addClickEvent(this.btn2,this.node,"GameMainView","onBtnbtn2Clicked");
        cc.vv.start.addClickEvent(this.btn3,this.node,"GameMainView","onBtnbtn3Clicked");
        cc.vv.start.addClickEvent(this.btn4,this.node,"GameMainView","onBtnbtn4Clicked");
        cc.vv.start.addClickEvent(this.btn5,this.node,"GameMainView","onBtnbtn5Clicked");
        cc.vv.start.addClickEvent(this.btn6,this.node,"GameMainView","onBtnbtn6Clicked");
        cc.vv.start.addClickEvent(this.btn7,this.node,"GameMainView","onBtnbtn7Clicked");
        cc.vv.start.addClickEvent(this.btn8,this.node,"GameMainView","onBtnbtn8Clicked");
        cc.vv.start.addClickEvent(this.btn9,this.node,"GameMainView","onBtnbtn9Clicked");
    },

    start () {

    },

    onBtnbtnAbandonClicked: function () {
        if (this.onbtnAbandonClickCallBack != null) {
          this.onbtnAbandonClickCallBack();
        }
    },

    onBtnbtnDeleteClicked: function () {
        if (this.onbtnDeleteClickCallBack != null) {
          this.onbtnDeleteClickCallBack();
        }
    },

    onBtnbtn0Clicked: function () {
        if (this.onbtn0ClickCallBack != null) {
          this.onbtn0ClickCallBack();
        }
    },

    onBtnbtn1Clicked: function () {
        if (this.onbtn1ClickCallBack != null) {
          this.onbtn1ClickCallBack();
        }
    },

    onBtnbtn2Clicked: function () {
        if (this.onbtn2ClickCallBack != null) {
          this.onbtn2ClickCallBack();
        }
    },

    onBtnbtn3Clicked: function () {
        if (this.onbtn3ClickCallBack != null) {
          this.onbtn3ClickCallBack();
        }
    },

    onBtnbtn4Clicked: function () {
        if (this.onbtn4ClickCallBack != null) {
          this.onbtn4ClickCallBack();
        }
    },

    onBtnbtn5Clicked: function () {
        if (this.onbtn5ClickCallBack != null) {
          this.onbtn5ClickCallBack();
        }
    },

    onBtnbtn6Clicked: function () {
        if (this.onbtn6ClickCallBack != null) {
          this.onbtn6ClickCallBack();
        }
    },

    onBtnbtn7Clicked: function () {
        if (this.onbtn7ClickCallBack != null) {
          this.onbtn7ClickCallBack();
        }
    },

    onBtnbtn8Clicked: function () {
        if (this.onbtn8ClickCallBack != null) {
          this.onbtn8ClickCallBack();
        }
    },

    onBtnbtn9Clicked: function () {
        if (this.onbtn9ClickCallBack != null) {
          this.onbtn9ClickCallBack();
        }
    },

    // update (dt) {},
});
