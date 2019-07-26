cc.Class({
    extends: cc.Component,

    properties: {
       window:null,

       spTouXiang:cc.Sprite,
       txtName:cc.Label,
       txtFenShu:cc.Label,
       txtPaiMing:cc.Label,
    },

    onLoad () {
        this.spTouXiang=this.node.getChildByName("spTouXiang").getComponent(cc.Sprite);
        this.txtName=this.node.getChildByName("txtName").getComponent(cc.Label);
        this.txtFenShu=this.node.getChildByName("txtFenShu").getComponent(cc.Label);
        this.txtPaiMing=this.node.getChildByName("txtPaiMing").getComponent(cc.Label);
    },
});
