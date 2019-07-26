var OperationObj = require("OperationObj");
cc.Class({
    extends: cc.Component,

    properties: {
        panel: null,
        operObjArr: null,
        opera: 0,
        recall: 1, //几溯答 1=一溯答 2=二溯答 ....
        operNum: 0,
        resultArr: null,
        tru: null,
        fal: null,
        timeId: null,
        itemArr: null,
        gameTime: 1,
        minute: 0,
        max: null,

        btn_0: null,

    },

    onLoad() {
        this.panel = this.node.getComponent("GameMainView");
        this.panel.window = this;
        this.opera = 0;
        this.recall = 1;
        this.operObjArr = [];
        this.resultArr = [];
        this.itemArr = [];

        this.panel.onbtnDeleteClickCallBack = this.onBtnbtnDeleteClicked;
        this.panel.onbtn0ClickCallBack = this.onBtnbtn0Clicked;
        this.panel.onbtn1ClickCallBack = this.onBtnbtn1Clicked;
        this.panel.onbtn2ClickCallBack = this.onBtnbtn2Clicked;
        this.panel.onbtn3ClickCallBack = this.onBtnbtn3Clicked;
        this.panel.onbtn4ClickCallBack = this.onBtnbtn4Clicked;
        this.panel.onbtn5ClickCallBack = this.onBtnbtn5Clicked;
        this.panel.onbtn6ClickCallBack = this.onBtnbtn6Clicked;
        this.panel.onbtn7ClickCallBack = this.onBtnbtn7Clicked;
        this.panel.onbtn8ClickCallBack = this.onBtnbtn8Clicked;
        this.panel.onbtn9ClickCallBack = this.onBtnbtn9Clicked;
        this.panel.onbtnAbandonClickCallBack = this.onBtnbtnAbandonClicked;
        cc.director.preloadScene("GameOver");
        this.AudioSourcePlay();
        this.setGameTime();

        this.newOperationObj();
        this.panel.oper1.active = false;
        this.panel.txtRightNum.string = "0";
        this.panel.txtRecall.string = "1溯答";
        this.panel.isResultShow.active = false;
    },

    AudioSourcePlay: function () {
        this.btn_0 = this.panel.btn0.getComponent(cc.AudioSource);
    },

    setGameTime: function () {
        this.schedule(function () {
            this.gameTime++;
            if (this.gameTime >= 60) {
                this.gameTime = 1;
                this.minute++;
                this.panel.txtTime.string = this.minute + "分" + this.gameTime + "秒";
            } else {
                if (this.minute != 0 && this.minute != null) {
                    this.panel.txtTime.string = this.minute + "分" + this.gameTime + "秒";
                } else {
                    this.panel.txtTime.string = this.gameTime + "秒";
                }

            }

            //如果小于0就结束游戏
            if (this.minute >= 4) {
                var recall = cc.sys.localStorage.getItem("recall");
                var max = cc.sys.localStorage.getItem("userMax");

                if (recall < this.recall) {
                    cc.sys.localStorage.setItem("recall", this.recall);
                    cc.sys.localStorage.setItem("userMax", this.tru)
                } else if (recall == this.recall) {
                    if (max >= this.tru) {
                        cc.sys.localStorage.setItem("recall", this.recall);
                        cc.sys.localStorage.setItem("userMax", max)
                    } else {
                        cc.sys.localStorage.setItem("recall", this.recall);
                        cc.sys.localStorage.setItem("userMax", this.tru)
                    }
                }

                cc.vv.start.recall = this.recall;
                cc.vv.start.max = this.tru;

                cc.director.loadScene('GameOver');
            }
        }, 0.6);
    },

    setOperation1Item: function (operObj) {
        this.panel.txtIntA.string = operObj.intA;
        this.panel.txtIntB.string = operObj.intB;
        this.panel.txtOperation.string = operObj.operator;
        this.panel.timg3.active = true;
        this.panel.txtNum.string = operObj.index;

        var self = this;
        if (this.opera == 0) {
            this.scheduleOnce(function () {
                self.panel.oper1.active = true;
                self.opera = 1;
                self.setOperation2Item();
            }, 1.2);
        } else if (this.opera == 2) {
            var self = this;
            this.scheduleOnce(function () {
                self.opera = 0;
                self.newOperationObj();
            }, 1);
        } else if (this.opera > 2) {
            this.createOperationObj(this.opera - 1);
        }
    },

    createOperationObj: function (index) {
        var self = this;
        this.scheduleOnce(function () {
            self.opera = index;
            self.newOperationObj();
        }, 1);
    },

    //实例化运算对象
    newOperationObj: function () {
        if (this.operNum >= 20) {
            this.operNum = 0;
        }
        var operObj = new OperationObj();
        operObj.index = ++this.operNum;
        operObj.intA = cc.vv.GameManager.randomNumA();
        operObj.intB = cc.vv.GameManager.randomNumB();
        operObj.operator = cc.vv.GameManager.getOperation();
        this.operObjArr.push(operObj);
        this.setOperation1Item(operObj);
    },

    setOperation2Item: function () {
        if (this.opera == 0) {
            this.panel.oper1.active = true;
            this.opera = 1;
        }
        if (this.panel.txtNum.string % 20 == 0) {
            this.panel.oper.active = false;
        }

        this.panel.txtIntD.string = this.operObjArr[this.operObjArr.length - this.recall].intA
        this.panel.txtIntE.string = this.operObjArr[this.operObjArr.length - this.recall].intB
        this.panel.txtIntF.string = "";
        this.panel.txtNum1.string = this.operObjArr[this.operObjArr.length - this.recall].index
        this.panel.txtOperation1.string = this.operObjArr[this.operObjArr.length - this.recall].operator
        this.panel.timg4.active = true;
        this.panel.timg5.active = true;

        this.newOperationObj();
    },

    onBtnbtnDeleteClicked: function () {
        this.window.btn_0.play();
        this.txtIntF.string = "";
    },

    precision: function () {
        this.yinChang();
        this.deleteArr();

        var self = this;
        this.panel.isResultShow.active = false;
        this.max = this.tru;
        if (this.tru * 5 >= 85) { //难度升级
            var index = this.recall + 1
            this.panel.txtIsTrue.string = "当前准确率为" + this.tru * 5 + "%,进入下一关." + index + "溯答";
            this.isRecallNum(index);
        } else if (this.tru * 5 < 85 && this.tru * 5 >= 75) { //游戏难度不变
            this.panel.txtIsTrue.string = "当前准确率低于85%,高于75%,游戏难度不变,继续游戏.";
            if (this.recall == 1) { //一溯答
                this.oneRecall();
            } else {
                this.isRecallNum(this.recall);
            }
        } else { //降低难度
            var index = this.recall - 1
            if (this.recall == 1) this.panel.txtIsTrue.string = "当前准确率低于85%,不能进入下一关,继续游戏.";
            else this.panel.txtIsTrue.string = "当前准确率低于65%,降低难度,回到" + index + "溯答.";
            if (this.recall <= 2) {
                //停留一溯答
                this.oneRecall();
            } else {
                //当前难度降低一溯答
                this.isRecallNum(index);
            }
        }
        this.panel.txtRightNum.string = "0";
    },

    //一溯答
    oneRecall: function () {
        var self = this;
        this.scheduleOnce(function () {
            self.operNum = 0;
            self.recall = 1;
            self.panel.txtRecall.string = self.recall + "溯答";
            self.opera = 0;
            if (self.operObjArr.length == 0) {
                self.newOperationObj()
            } else {
                self.showOper1Item();
            }
            self.panel.txtResult.string = "";
            self.panel.txtIsTrue.string = "";
            self.tru = 0;
            self.fal = 0;
            self.panel.oper.active = true;
        }, 1.2);
    },

    //溯答
    isRecallNum: function (index) {
        var self = this;
        this.panel.txtRecall.string = index + "溯答";
        this.scheduleOnce(function () {
            self.recall = index;
            self.opera = index;
            self.panel.txtResult.string = "";
            self.panel.txtIsTrue.string = "";
            self.tru = 0;
            self.fal = 0;
            self.twoRecall();
        }, 0.4);
    },

    deleteArr: function () {
        var maxLength = this.operObjArr.length;
        for (var i = 0; i < maxLength; i++) {
            if (this.resultArr.length != 0) this.resultArr.splice(0, 1);
            if (this.itemArr.length != 0) this.itemArr.splice(0, 1);
            this.operObjArr.splice(0, 1);
        }
    },

    twoRecall: function () {
        var self = this;
        this.scheduleOnce(function () {
            self.operNum = 0;
            self.newOperationObj();
            self.panel.oper.active = true;
        }, 1.5);
    },

    //显示运算item
    showOper1Item: function () {
        var self = this;
        this.scheduleOnce(function () {
            self.setOperation2Item();
            self.panel.gou.active = false;
            self.panel.Cha.active = false
        }, 0.6);
    },

    onBtnbtnAbandonClicked: function () {
        this.window.btn_0.play();
        this.window.setIntc("");
    },

    onBtnbtn0Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(0);
    },

    onBtnbtn1Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(1);
    },

    onBtnbtn2Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(2);
    },

    onBtnbtn3Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(3);
    },

    onBtnbtn4Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(4);
    },

    onBtnbtn5Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(5);
    },

    onBtnbtn6Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(6);
    },

    onBtnbtn7Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(7);
    },

    onBtnbtn8Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(8);
    },

    onBtnbtn9Clicked: function () {
        this.window.btn_0.play();
        this.window.setIntc(9);
    },

    setIntc: function (num) {
        if (this.panel.txtIntF.string != "") return;
        this.panel.txtIntF.string = num;
        this.isResultTrue(num);
    },

    isResultTrue: function (num) {
        var self = this;

        var isTrue = this.panel.gou.getComponent(cc.AudioSource);
        var isFalse = this.panel.Cha.getComponent(cc.AudioSource);
        var result = cc.vv.GameManager.operation(this.panel.txtIntF.string,
            this.panel.txtOperation1.string,
            this.panel.txtIntD.string,
            this.panel.txtIntE.string);
        if (this.timeId != null) clearTimeout(this.timeId);
        this.timeId = null;

        if (this.panel.txtIntF.string == "") {
            this.panel.gou.active = false;
            this.panel.Cha.active = true;
            isFalse.play();
            this.fal++;
            this.isTrueOrFalse(result);
            return;
        }
        if (result) {
            this.panel.gou.active = true;
            this.panel.Cha.active = false;
            isTrue.play();
            this.tru++;
            this.panel.txtRightNum.string = this.tru;
            this.isTrueOrFalse(result);
        } else {
            this.timeId = setTimeout(function () {
                self.panel.gou.active = false;
                self.panel.Cha.active = true;
                isFalse.play();
                self.fal++;
                self.isTrueOrFalse(result);
            }, 1500);
        }
    },

    isTrueOrFalse: function (result) {
        var self = this;
        if (this.timeId != null) clearTimeout(this.timeId);
        this.timeId = null;
        if (this.panel.txtNum1.string % 20 == 0) {
            this.resultShow();
            this.panel.gou.active = false;
            this.panel.Cha.active = false
        } else {
            this.scheduleOnce(function () {
                self.setOperation2Item();
                self.panel.gou.active = false;
                self.panel.Cha.active = false
            }, 0.5);
        }

        this.resultArr.push(result);
        this.panel.timg4.active = false;
        this.panel.timg5.active = false;
    },

    yinChang: function () {
        for (let i = 0; i < this.itemArr.length; i++) {
            this.itemArr[i].active = false;
        }
    },

    resultShow: function () {
        var self = this;
        this.yinChang();
        var index = 0;
        this.panel.oper1.active = false;
        for (var i = 0; i < this.resultArr.length; i++) {
            var node = null;
            if (this.itemArr.length > i) {
                node = this.itemArr[i];
            } else {
                node = this.createResultShowItem();
            }
            node.active = false;

            var delay = 0.15 * i;
            this.scheduleOnce(function () {
                self.itemArr[index].active = true;
                var result = self.itemArr[index].getComponent("ResultItem");
                if (self.resultArr[index]) {
                    result.objGou.active = true;
                    result.objCha.active = false;
                } else {
                    result.objGou.active = false;
                    result.objCha.active = true;
                }
                var ani = result.isRightItem.getComponent(cc.Animation)
                ani.play();
                index++;
            }, delay);
        }
        this.panel.txtResult.string = this.tru * 5 + "%准确率    " + this.tru + "/20"
        this.scheduleOnce(function () {
            self.precision();
        }, 4);
    },

    createResultShowItem: function () {
        var node = cc.instantiate(this.panel.isResultShow);
        node.parent = this.panel.isResultShow.parent;
        node.setPosition(0, 0);
        this.itemArr.push(node);
        return node;
    },


});