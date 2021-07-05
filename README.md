# myvuedemo03

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
 
 # 运行失败
 可以尝试删除node_modules下除了.bin以外的所有依赖，然后运行npm install ,再运行npm run dev
 


# 软件杯学习笔记

## 1.事件响应

### 1.1js处理鼠标的移入和移出事件
    一般使用Mouseover和MouseOut事件监听，需要先获取通过DOM树获取到元素。

- mouseover和mouseout在父元素和其子元素都可以触发，当鼠标穿过一个元素时，触发次数得依子元素数量而言,碰到其中的元素任意元素移出移除都会触发效果。
- mouseenter和mouseleave只在父元素触发，当鼠标穿过一个元素时，只会触发一次。
- mouseover和mouseout比mouseenter和mouseleave先触发
- 注册事件须子父关系，否则会有问题
```js
// Html js鼠标事件
// Mouseover事件（重点）：鼠标移动到标签之上
// Mouse 鼠标
// Over 在…之上
// Mouseout事件（重点）：鼠标离开标签
Var box = doucument.getElementById(“box”)
box.inmouseover=function（）{
var _this =event.target;
console.info(_this);
}
box.onmouseout = function(){
    
}
```