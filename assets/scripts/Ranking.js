cc.Class({
    extends: cc.Component,

    properties: {

        tuChen:{
            type:cc.Sprite,
            default:null,
        },

        btnLink:{
            type:cc.Button,
            default:null,
        },

    link:cc.Node,
    },

    onLoad () {
        var self=this;
        var max= cc.sys.localStorage.getItem("userMax")
        var highest= cc.sys.localStorage.getItem("userNowFen")
        this.node.on("touchstart",function(){
            // 发消息给子域
            wx.postMessage({
                message:'start',
                hiegth:highest,
                max:max,
            })
            self.link.active=true;
        });
    },

    start () {
        this.tex = new cc.Texture2D();
    },
    

    _updaetSubDomainCanvas () {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        // this.tuChen.spriteFrame = new cc.SpriteFrame(this.tex);
    },

    update (dt) {
        this._updaetSubDomainCanvas();
    },
});
