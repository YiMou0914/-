cc.Class({
    extends: cc.Component,

    properties: {
        window: null,

        txtIntA: cc.Lable,
        txtIntB: cc.Lable,
        txtIntC: cc.Lable,
        txtNum: cc.Lable,
        txtOperation: cc.Lable,
        timg: cc.Node,
        timg2: cc.Node,
        timg3: cc.Node,
    },

    onLoad() {
        this.txtIntA = this.node.getChildByName("txtIntA").getComponent(cc.Label);
        this.txtIntB = this.node.getChildByName("txtIntB").getComponent(cc.Label);
        this.txtIntC = this.node.getChildByName("txtIntC").getComponent(cc.Label);
        this.txtNum = this.node.getChildByName("txtNum").getComponent(cc.Label);
        this.txtOperation = this.node.getChildByName("txtOperation").getComponent(cc.Label);
        this.timg = this.node.getChildByName("timg")
        this.timg2 = this.node.getChildByName("timg2")
        this.timg3 = this.node.getChildByName("timg3")
    },

    start() {

    },

});