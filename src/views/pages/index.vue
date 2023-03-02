<template>
    <div>
        <h1>欢迎来到用户管理系统</h1>
        <h1>hello github</h1>
        <div @click="fn">{{ msg }}</div>
        <div id="btnId">{{ active.name }}{{ active.age }}</div>
        <div id="box">
            <div id="boxs"></div>
        </div>
        <div @click="down">下载</div>
        <div id="div" style="width: 300px;height: 300px;  margin: auto;">
            <br>
            <input type="file" @change="showPreview" />
            <br>
            <br>
            <br>
            <br>
            <textarea id="text" style="resize: none;" :value="temp_str" disabled="false" cols="40" rows="10"
                type="text"></textarea>
            <br>
            <br>
            <input type="button" value="读取内容" @click="getDname">
        </div>
        <div @click="debounce">输出内容</div>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
//乘法表
for(var i=1;i<=9;i++){
    var str=''
    for(var j=1;j<=i;j++){  //执行原理 1*1=1 1*2=2 2*2=4 1*3=3 2*3=6
      str+=j+'*'+i+'='+j*i+' '
    }
    console.log(str,'乘法表');
}
for(var i=9;i>0;i--){
    var str2=''
    for(var j=9;j>=i;j--){
        str2+=j+'*'+i+'='+j*i+' '
    }
    console.log(str2,'倒序');
}
let ArrNum=[1,2,3]
console.log(ArrNum.toString());
console.log(encodeURIComponent('你好'));//编码
console.log(decodeURIComponent('%E4%BD%A0%E5%A5%BD'));//解析
var arr = new Array();
var temp_str = "";
function showPreview(source) {//type为file时会有文件对象
    // console.log(source,'source');
    var input = source.srcElement;
    var reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = function () {
        if (reader.result) {
            //显示文件内容
            temp_str = reader.result;
        }
    };
}
function getDname() {
    if (temp_str == "") {
        alert("请先上传文件");
    }
    else {
        //Math.floor 返回小于或等于一个给定数字的最大整数,45.56==>45
        //把所有内容分割成数组，每次读取一部分
        document.getElementById("text").value = temp_str;
    }
}
let msg = '正在加载中...'
let active = reactive({
    name: "小明", age: '20'
})
function down() {
    window.location.href = 'https://dldir1.qq.com/qqfile/qq/PCQQ9.7.3/QQ9.7.3.28946.exe'
}
function fn() {
    alert('当前端口为:8080')
}
(function test() {//深拷贝
    var obj = [{ name: 'Javascript', age: '25' }, { name: 'Node', age: '22' }]
    // var obj1=deepclone(obj)
    // obj[0].name="Php"
    // console.log(obj,'JSON---deepclone');
    // console.log(obj1,'JSON---deepclone');
    // function deepclone(params) {
    //     return JSON.parse(JSON.stringify(params))
    // }
    var obj1 = {}
    Enum(obj1, obj)
    obj1[0].name = 'Java'
    console.log(obj);
    console.log(obj1);
    function Enum(newobj, obj) {
        for (var key in obj) {
            if (obj[key] instanceof Array) {
                newobj = []
                Enum(newobj[key], obj[key])
            } else if (obj[key] instanceof Object) {
                newobj[key] = {}
                Enum(newobj[key], obj[key])
            } else {
                newobj[key] = obj[key]
            }
        }
    }


    //手写call
    Function.prototype.MYCALL = function (Obj, FnData) {//第一参数改变this指向，第二参数为原函数参数()
        let Th = this
        let thisArg = (Obj === undefined || Obj === null) ? window : Object(obj)//改变this指向wind还是原函数
        FnData = Array.isArray(FnData) ? FnData : []
        thisArg.Th = Th//借用this指向
        let Finally = thisArg.Th(...FnData)
        delete thisArg.Th
        return Finally
    }
    let arr = ['2', '5', '65']
    console.log(Math.max.MYCALL(null, arr), '620');//65


    //手写apply
    Function.prototype.MYAPPLY = function (obj, FnData) {
        let TH = this
        let tharg = (obj === undefined || obj === null) ? window : Object(obj)
        tharg.TH = TH
        FnData = Array.isArray(FnData) ? FnData : []
        let newdata = tharg.TH(...FnData)
        delete tharg.TH
        return newdata
    }
    let arr2 = ['2', '5', '65']
    console.log(Math.max.MYAPPLY(null, arr2), '225');//65


    //手写bind
    Function.prototype.MYBIND = function (obj, ...FnData1) {
        let Th = this
        let thisArg = (obj === undefined || obj === null) ? window : Object(obj)

        function proxyFN(...FnData2) {
            thisArg.Th = Th
            let FnData3 = [...FnData1, ...FnData2]
            let result = thisArg.Th(...FnData3)
            delete thisArg.Th
            return result
        }
        return proxyFN
    }
    let arr3 = ['555', '666', '888']
    console.log(Math.max.MYBIND(null, arr3), '229');//65

    function person(a, b, c, d) {
        return {
            name: this.name,
            a: a, b: b, c: c, d: d
        }
    }

    var egg = { name: '蛋老师' };

    Function.prototype.newCall = function (obj) {
        if (typeof this !== "function") {
            console.error("type error");
        }
        var obj = obj || window; //如果对象存在就不管了，如果对象不存在就执行window
        obj.p = this;  //这里开始还没有硬绑定，依旧是隐式绑定,this指向调用者person

        var newArguments = [...arguments].slice(1);//删除name:this.name，//否则为a: {name: "蛋老师"}
        var result = obj.p(...newArguments);
        delete obj.p;  //要把方法删除，因为不能改写来对象
        return result
    }
    var bibi = person.newCall(egg, '点赞', '收藏', '转发', '充电');
    console.log(bibi)

}())


var testarr = ['555', '666', '777']
console.log(JSON.stringify(testarr) instanceof Object);
console.log(testarr instanceof Object);
console.log(testarr instanceof Array);
// console.log(JSON.parse(testarr));


//封装日期
function add0(m) { return m < 10 ? '0' + m : m }
function format(key) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(key);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
console.log(format(new Date().getTime()), 'format');

var OBJ1 = Symbol({ name: '小米' })//独一无二值，不允许改变
console.log(OBJ1, 'OBJ1');



//手写日期
const Year = new Date().getFullYear();
const Mon = new Date().getMonth() + 1;
const Date2 = new Date().getDate()
const HH = new Date().getHours()
const MM = new Date().getMinutes()
const SS = new Date().getSeconds()
console.log(`${Year}年${Mon}月${Date2}日 ${HH}点${MM}分${SS}秒`, 'target');//Thu Jan 01 2015 08:00:00 GMT+0800 (中国标准时间) 'target'

//手写instanceof
function myinstanceof(L, R) {
    var L = __proto__, R = prototype;
    if (L === null) {
        return false
    } else if (L === R) {
        return true
        L = L.__proto__
    }
}
//手写call
Function.prototype.mycall = function (obj, FnData) {
    var ths = this
    var thisargs = (obj === undefined || obj === null) ? window : Object(obj)//表明this指向
    FnData = Array.isArray(FnData) ? FnData : []
    thisargs.ths = ths
    var newdata = thisargs.ths(...FnData)
    delete thisargs.ths
    return newdata
}
//手写apply
Function.prototype.myapply = function (obj, FnData) {
    var thh = this
    var thisrge = (obj === undefined || obj === null) ? window : Object(obj)
    FnData = Array.isArray(FnData) ? FnData : []
    thisrge.thh = thh
    var result = thisrge.thh(FnData)
    delete thisrge.thh
    return result
}

//手写bind
Function.prototype.mybind = function (obj, FnData1) {
    var Th = this
    var thisArg = (obj === undefined || obj === null) ? window : Object(obj)
    function proxyFN() {
        thisArg.Th = Th
        var FnData3 = [...FnData1]
        var result = thisArg.Th(...FnData3)
        delete thisArg.Th
        return result
    }
    return proxyFN
}
var testarr = [66, 62, 14, 64, 12, 87, 12, 98, 12, 56]
console.log(Math.max.mybind(null, testarr)(), 'mybind');
//手写冒泡排序(升序)
function mysortup(arr) {
    for (var i = 0; i < arr.length - 1; i++) {//循环每个数字1,6
        for (var j = 0; j <= arr.length - 1 - i; j++) {//内层循环比较大小，升序多比一次无影响
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]//变量解构赋值啊，兄弟
            }
        }
    }
    return arr//想得到一个返回数组肯定需要return啊，兄弟
}
var sortarr = [62, 54, 68, 14, 98, 54, 54]
console.log(mysortup(sortarr), '再次手写升序冒泡');
//冒泡排序(降序)
function mysortdown(arr) {
    for (var i = 0; i < arr.length-1 ; i++) {//
        for (var j = 0; j < arr.length-i ; j++) {//内层只需要循环7次，只需拿第二个数与第一个数比，因此循环次数为长度减一
            if (arr[j] < arr[j + 1]) {//68<14
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]//
            }
        }
    }
    return arr
}
var arrnum = [666,68, 14, 34,524, 12, 67, 12, 54, 12,551,3555]
console.log(mysortdown(arrnum), '降序排列22');
console.log(mysortup(arrnum), '升序排列');
let A=[1,2,3],K=100
console.log(A+K,'TEST');
console.log(A+K,'TEST');
//this指向分辨
//普通函数this指向window
//构造函数指向 构造函数
//定时器指向 window
//方法中的 this指向此方法
//箭头函数 this指向上一级的this或者所在作用域的 this
let obj = { uname: '阿飞', age: 22 }
function fn22(key) {
    console.log(key, 'key');//key 为传入的参数
    console.log(this)//this为  obj = {uname:'阿飞',age:22}
    this.sex = key
}
fn22.call(obj, '男')
//第一个参数是修改this指向谁，后面的参数用来传参
console.log(obj);
// 函数调用call，call会让函数执行，执行过程中改变this指向


//防抖函数，规定在固定时间只能触发一次动作，如果多次触发也只能触发一次请求
function debounce(fn) {
    let timer = null; // 定时器
    return function () {
        // 清除上一次的定时器
        clearTimeout(timer);
        // 拿到当前的函数作用域
        let _this = this;
        // 拿到当前函数的参数数组
        let args = Array.prototype.slice.call(arguments, 0);
        // 开启倒计时定时器
        timer = setTimeout(function () {
            // 通过apply传递当前函数this，以及参数
            fn.apply(_this, args);
            // 默认300ms执行
        }, 3000)
    }
}

Function.prototype.mycalls = function (obj, fndatad) {
    let th = this;
    let thisag = (obj === undefined || obj === null) ? window : Object(obj);
    let fndatas = Array.isArray(fndatad) ? fndatad : []
    thisag.th = th
    let result = thisag.th(...fndatas)//call不能传递数组只能传递参数列表，因此需要解构
    delete thisag.th
    return result
}
var newas = ['55', '68', '99']
console.log(Math.max.mycalls(null, newas), '手写mycalls');

Function.prototype.myapplys = function (obj, fndata) {
    let th = this;
    let thisArg = (obj === undefined || obj === null) ? window : Object(obj);
    fndata = Array.isArray(fndata) ? fndata : [];
    thisArg.th = th;
    let Finally = thisArg.th(...fndata)
    delete thisArg.th
    return Finally
}
console.log(Math.max.myapplys(null, newas), '手写myapplys');

Function.prototype.mybinds = function (obj, data1) {
    let th = this;
    let thisage = (obj === undefined || obj === null) ? window : Object(obj)
    function FNIN() {
        console.log(data1, 'data1');
        let data3 = [...data1];
        thisage.th = th;
        let Finally = thisage.th(...data3)
        delete thisage.th
        return Finally
    }
    return FNIN
}
console.log(Math.min.mybinds(null, newas)(), '手写mybinds');


let newarr = Array.from({ length: 3 })
newarr[0] = 1
newarr[1] = 2
newarr[2] = 3
console.log(newarr, 'array.from');

//提取所有页面链接
var aa = document.documentElement.outerHTML.match(/(url\(|src=|href=)[\"\']*([^\"\'\(\)\<\>\[\] ]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\(\)\<\>\[\] ]+)/gi).join("\r\n").replace(/^(src=|href=|url\()[\"\']*|[\"\'\>\) ]*$/gim, "");
// alert(aa);

function checkKey(iKey) {//判断键盘输入是否是有效值
    if (iKey == 32 || iKey == 229) {
        return true;
    } /*空格和异常*/
    if (iKey > 47 && iKey < 58) {
        return true;
    } /*数字*/
    if (iKey > 64 && iKey < 91) {
        return true;
    } /*字母*/
    if (iKey > 95 && iKey < 108) {
        return true;
    } /*数字键盘1*/
    if (iKey > 108 && iKey < 112) {
        return true;
    } /*数字键盘2*/
    if (iKey > 185 && iKey < 193) {
        return true;
    } /*符号1*/
    if (iKey > 218 && iKey < 223) {
        return true;
    } /*符号2*/
    return false;
}
console.log(checkKey(228));


function compresscss(s) {//压缩css
    //压缩代码 
    s = s.replace(/\/\*(.|\n)*?\*\//g, "");
    //删除注释
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{");
    //容错处理 
    s = s.replace(/;\s*;/g, ";");
    //清除连续分号
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    //去掉首尾空白 
    return s == null ? "" : s[1];
}


// 或Date.prototype.format = function(format) {  var o = {    "M+": this.getMonth() + 1, //month    "d+": this.getDate(), //day    "h+": this.getHours(), //hour    "m+": this.getMinutes(), //minute    "s+": this.getSeconds(), //second    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter    S: this.getMilliseconds() //millisecond  };  if (/(y+)/.test(format))    format = format.replace(      RegExp.$1,      (this.getFullYear() + "").substr(4 - RegExp.$1.length)    );  for (var k in o) {    if (new RegExp("(" + k + ")").test(format))      format = format.replace(        RegExp.$1,        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)      );  }  return format;};alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
</script>
<style lang="less">
#box {
    width: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 20px solid skyblue;

}
</style>