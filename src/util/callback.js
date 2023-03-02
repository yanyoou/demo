import { resolve } from "core-js/es6/promise"
import { reject } from "core-js/fn/promise"
import { da } from "element-plus/es/locale"

Function.prototype.call=function(obj,data){
    let th=this
    let tharg=(obj===undefined||obj===null)?window:Object(obj)
    data=Array.isArray(data)?data:[]
    tharg.th=th
    let result=tharg.th(...data)
    delete tharg.th
    return result
}

Function.prototype.apply=function(obj,data){
 let th=this   
 let tharg=obj===undefined||obj===null?window:Object(obj)
 tharg.th=th
 data=Array.isArray(data)?data:[]
 let result=tharg.th(...data)
 delete tharg.th
 return result
}

function Promiseall(requests){
    return new Promise((resolve,reject)=>{
        arr=[]
        requests.forEach(element => {
            Promise.resolve(element).then(res=>{
                arr.push(res)
                resolve(arr)
            },err=>{
                reject(err)
            })
        });
    })
}


function Promiserace(requests){
    return new Promise((resolve,reject)=>{
        requests.forEach(u=>{
            Promise.resolve(u).then(res=>{
                resolve(res)
            },err=>{
                reject(err)
            })
        })
    })
}

function deepclone(newobj,obj){
    for(var key in obj){
        if(obj[key] instanceof Array){
            newobj=[]
            deepclone(newobj[key],obj[key])
        }else if(obj[key] instanceof Object){
            newobj={}
            deepclone(newobj[key],obj[key])
        }else{
            newobj[key]=obj[key]
        }
    }
}