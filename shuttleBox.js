/**
 * @version: 0.0.1
 * @author: kevin
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @contact: 451436177@qq.com
 */
(function(win,doc){
    var defaultSetting = {
        async : true, //各栏是否需要异步拿数据
        provinceList : '全部',
        cityList : '全部',
        regionList : '全部',
        body:''
    };

    function ShuttleBox(options){
        var self = this;
        if(!options){
            throw new Error('请传入配置参数');
        }
        self = Object.assign(self,defaultSetting,options);
        self.body = typeof self.body === 'string' ? doc.querySelector(self.body) : self.body;

        self.doubleBoxArgs = {
            provinces:[{name:'',value:''}],
            operators:[{name:'',value:''}],
            nodes:[{name:'',value:''}],
        };
        self.str = '';
        self.initBox('.provinces',self.provinceList);
        self.initBox('.operators',self.cityList);
        self.initBox('.nodes',self.regionList);
        self.initThreeResult('.three-result');
        self.addNodes('.add');
        self.addAllNodes('.addAll');
        self.deleteNodes('.delete');
        self.deleteAllNodes('.deleteAll');

    }
    ShuttleBox.prototype = {
        //初始化下拉列表
        initBox:function (doc,arr) {
            var self = this;
            self.body.querySelector(doc).addEventListener("change",function(e){
                let eTarget = e.target || e.srcElement;
                console.log(eTarget[eTarget.selectedIndex].text);
                console.log(eTarget[eTarget.selectedIndex].value);
                let name = eTarget[eTarget.selectedIndex].text;
                let value = eTarget[eTarget.selectedIndex].value;

                switch (doc){
                    case '.provinces':
                        this.doubleBoxArgs.provinces[0].name = name;
                        this.doubleBoxArgs.provinces[0].value = value;
                        break;
                    case '.operators':
                        this.doubleBoxArgs.operators[0].name = name;
                        this.doubleBoxArgs.operators[0].value = value;
                        break;
                    case '.nodes':
                        this.doubleBoxArgs.nodes[0].name = name;
                        this.doubleBoxArgs.nodes[0].value = value;
                        break;
                    default:
                        return;
                }
            }.bind(this));
            if(self.async){

            }else{
                if(arr == '全部'){
                    document.querySelector(doc).innerHTML = '<option>全部</option>';
                }else{
                    let str = '<option>全部</option>';
                    for(var i in arr){
                        str += '<option value='+i+'>'+arr[i]+'</option>'
                    };
                    document.querySelector(doc).innerHTML = str;
                }
            }
        },

        //初始化双选栏结果栏
        initThreeResult:function (doc) {
            document.querySelector(doc).addEventListener("change",function(e){
                let eTarget = e.target || e.srcElement;
                this.doubleBoxArgs.deleteIndex = eTarget.selectedIndex;
            }.bind(this));
        },

        //添加节点
        addNodes:function (doc) {
            var self = this;
            self.body.querySelector(doc).addEventListener("click",function(e) {
                console.log(self.doubleBoxArgs)
                if(self.doubleBoxArgs.provinces[0].name == '' && self.doubleBoxArgs.provinces[0].name == '' && self.doubleBoxArgs.provinces[0].name == ''){
                    alert('请先选中左侧菜单内容')
                }else{
                    //let tempName = self.doubleBoxArgs.provinces[0].name + '-' + self.doubleBoxArgs.operators[0].name + '-' + self.doubleBoxArgs.nodes[0].name
                    //self.str += '<option>'+ tempName + '</option>';
                    //self.body.querySelector('.three-result').innerHTML = self.str;
                    self.body.querySelector('.three-result').options.add(new Option(self.doubleBoxArgs.provinces[0].name + '-' + self.doubleBoxArgs.operators[0].name + '-' + self.doubleBoxArgs.nodes[0].name));

                }
            });
            //数据处理

            //页面展示

        },
        //全选节点
        addAllNodes:function (doc) {
            var self = this;
            let str = '';
            self.body.querySelector(doc).addEventListener("click",function(){
                for(var i in self.provinceList){
                    for(var j in self.cityList){
                        for(var k in self.regionList){
                            let tempName = self.provinceList[i] + '-' + self.cityList[j] + '-' + self.regionList[k];
                            str += '<option>' + tempName + '</option>';
                        }
                    }
                }
                self.body.querySelector('.three-result').innerHTML = str;
                self.str = '';
            });

        },
        //删除节点
        deleteNodes:function (doc) {
            var self = this;
            self.body.querySelector(doc).addEventListener("click",function(){
                if(typeof self.doubleBoxArgs.deleteIndex === 'number')
                self.body.querySelector('.three-result').options.remove(self.doubleBoxArgs.deleteIndex);
                self.doubleBoxArgs.deleteIndex = '';
            });
        },
        //清除节点
        deleteAllNodes:function (doc) {
            var self = this;
            self.body.querySelector(doc).addEventListener("click",function(){
                self.body.querySelector('.three-result').options.length = 0;
                self.str = '';
            }.bind(this));
        },

        //选择前两栏后更新节点
        /*updateNodes:function () {
            this.$el.find('.nodes').html('<option>正在加载...</option>');
            this.doubleBoxArgs.nodesAllValue = [];
            this.doubleBoxArgs.nodesAll = '';
            console.log(this.doubleBoxArgs);
            let queryArgs = {
                provinceIds : [],
                operatorIds : [],
            };
            this.doubleBoxArgs.provinceIds ? queryArgs.provinceIds.push(parseInt(this.doubleBoxArgs.provinceIds)) : queryArgs.provinceIds = '';
            this.doubleBoxArgs.operatorIds ? queryArgs.operatorIds.push(parseInt(this.doubleBoxArgs.operatorIds)) : queryArgs.operatorIds = '';
            if(this.doubleBoxArgs.provinceIds=='' && this.doubleBoxArgs.operatorIds==''){
                queryArgs = ''
            }
            return this.nodeModel.list(queryArgs).then(function(res) {

                if(res.result.length == 0){
                    this.$el.find(".nodes").html('<option>暂无节点</option>')
                }else{
                    let data = res.result;
                    let str = '';

                    for(let i=0;i<data.length;i++){
                        str += '<option value="'+data[i].enName+'">'+data[i].name+'</option>'
                        this.doubleBoxArgs.nodesAll += '<option value="'+data[i].enName+'">'+data[i].name+'</option>'
                        this.doubleBoxArgs.nodesAllValue.push(data[i].enName);
                    }
                    this.$el.find('.nodes').html(str);
                }
                //this.doubleBoxArgs.provinceIds = '';
                //this.doubleBoxArgs.operatorIds = '';
            }.bind(this), (error) => {
                this.$el.find('.nodes').html('获取节点失败')
            });
        },*/
    };
    win.ShuttleBox = ShuttleBox;
})(window,document);