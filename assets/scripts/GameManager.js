cc.Class({
    extends: cc.Component,

    properties: {
        ranA:null,
        ranB:null,
        ranC:null,
        operationStr:null,
    },

    start () {

    },

    randomNumA:function(i){
        this.ranA=Math.round(Math.random()*9);
        return this.ranA;
    },

    randomNumB:function(i){
        this.ranB=Math.round(Math.random()*9);

        if(this.ranA>this.ranB){
            this.operationStr="-";
        }else{
            this.operationStr="+";
        }
        if(this.ranA+this.ranB>=10){
            this.randomNumB();
        }
        return this.ranB;
    },

    operation:function(result,oper,a,b){
        var ranC=0;
        var A=parseInt(a);
        var B=parseInt(b);
        if(oper=="+"){
            ranC=A+B;
            //return this.operationAdd(result,a,b);
        }else{
            ranC=A-B;
            //return this.operationJian(result,a,b);
        }
        return this.resultBool(result,ranC)
    },

    getOperation:function(){
        return this.operationStr;
    },

    resultBool:function(result,ranC){
        if(ranC==result){
            return true;
        }else{
            return false;
        }
    },
});
