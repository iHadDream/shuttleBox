# shuttleBox
> can select three option and handle
> depend on bootstrap
## use
#### html
~~~ html
<div id="shuttleBox">
    <div style="float: left">
        <select multiple class="form-control provinces"></select>
    </div>
    <div style="float: left">
        <select multiple class="form-control operators"></select>
    </div>
    <div style="float: left">
        <select multiple class="form-control nodes"></select>
    </div>
    <div class="shuttle-button">
        <a class="add">添加 =></a>
        <a class="addAll">全选 =></a>
        <a class="delete"><= 删除</a>
        <a class="deleteAll"><= 清除</a>
    </div>
    <div style="float: right">
        <select multiple class="form-control three-result"></select>
    </div>
    <div style="clear:both"></div>
</div>
~~~
#### js
~~~ javascript
this.shuttleBox = new ShuttleBox({
    body:'#shuttleBox',
    async:false,
    provinceList:['北京','上海','浙江省'],
    cityList:['美食','酒店','娱乐'],
    regionList:['海底捞','希尔顿','洗浴中心'],
})
~~~
