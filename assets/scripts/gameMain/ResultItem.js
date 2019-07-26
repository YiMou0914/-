cc.Class({
    extends: cc.Component,

    properties: {
        window: null,
        objGou: cc.Node,
        objCha: cc.Node,
        isRightItem:cc.Node,
    },

    onLoad() {
        this.isRightItem = this.node.getChildByName("isRightItem");
        this.objGou = this.isRightItem.getChildByName("objGou");
        this.objCha = this.isRightItem.getChildByName("objCha");
    },

    start() {

    },

});