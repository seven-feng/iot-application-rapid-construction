1. 增加 delete 键盘事件，选中并按下 delete，删除当前 dom 元素
div 默认无法获得焦点，通过添加 tabindex = '0' 使其具有获得焦点的能力
     当然，要使 div 聚焦，还是需要鼠标点击或者用 js 代码给 div 绑定 focus ( element.focus() ) 20191101
   
   我将 `div.focus()` 提前，发现聚焦失效了。后来发现，dom 需要“挂载”后，再调用 `div.focus()` 才会生效。
   
2. 在右边属性面板修改图表组件的宽高时，动态调节图表样式
   通过手动调用 echartsInstance.resize() 方法，使 echarts 图表自适应外部容器大小

3. ~~直接增删改 attributeInfo 对象的属性，并不能触发响应式（ attributeInfo 被注入到子组件中 ），需要通过~~
   ~~vm.$set(vm.obj, key, value) 增删改属性，或者通过创建新对象增删改多个属性 Object.assign({}, vm.obj, { key: value })~~——后续已经解决啦！！！

4. 今天遇到一个奇葩的现象，当开启两个 websocket 以后，onmessage 事件会被触发两次，导致图表上的数据是两个 websocket 的数据，开始以为是数据串了。
   其实不然，一个 websocket，对应一个 onmessage。真相就是，两个 websocket 的 onmessage 各触发了一次，但是每个 onmessage 里面又引用了同一个图表，导致数据一起出现的情况。

5. 需求：屏蔽原生右键菜单栏，自定义菜单

   ~~~js
   element.addEventListener('contextmenu', function(e) {
       e.preventDefault() // 取消事件默认动作，这里是打开原生右键菜单栏
       // 自定义菜单栏
       // ...
   })
   ~~~

6. 动态创建的 dom，在单文件组件中，只有全局样式才能生效？

7. 动态创建 svg 及 svg 元素，需要加上命名空间才能成功，为啥呢？

   document.createElementNS('http://www.w3.org/2000/svg', 'svg')

   document.createElementNS('http://www.w3.org/2000/svg','rect')

   原因：用 document.createElement 创建出来的节点是属于 html dom，而 svg 的节点是 svg dom。所以需要用 createElementNS 函数并传入节点的命名空间

8. 动态生成 svg，默认生成一块 300*150 的空间，导致不能拖放图标到那块区域。如果设置 z-index=-1，又会导致 svg 内的图形不能显示，原因嘛就是 svg 连同包含的图形都藏在面板下面了。考虑过用 svg 代替整个画板，但是 svg 内的 dom 需要包一层另外的东西（说是< foreignObject >，还没验证），导致代码重构，太麻烦。最后，突发奇想，将 svg 变成一个像素点（width=1, height=1）,哈哈，搞定！

9. 将设备间的连线从 <line> 变成 <path>，并采用三次方贝塞尔曲线

   > svg path的贝塞尔曲线： https://www.jianshu.com/p/2cbbdd20be70 

   ~~~js
   // 路径计算
   // 将坐标轴等分为8块，顺时针依次为1，2，3，4，5，6，7，8
   function cubicBessel(outPortX, outPortY, inPortX, inPortY, isVertical) {
     let BEZIER_CURVE_OFFSET2 = 20
     if (isVertical) {
       if (outPortY > inPortY) { // 4,5
         const tempDistance = Math.abs(outPortY - inPortY)
         if (tempDistance < 20) {
           BEZIER_CURVE_OFFSET2 = 20 + (20 - tempDistance) / 2
         } else {
           BEZIER_CURVE_OFFSET2 = 20
         }
         return `M ${outPortX} ${outPortY} C ${outPortX} ${(outPortY +
           inPortY) /
           2 -
           BEZIER_CURVE_OFFSET2} ${inPortX} ${(outPortY + inPortY) / 2 +
           BEZIER_CURVE_OFFSET2} ${inPortX} ${inPortY}`
       } else { //  1,8
         const tempDistance = Math.abs(outPortY - inPortY)
         if (tempDistance < 20) {
           BEZIER_CURVE_OFFSET2 = 20 + (20 - tempDistance) / 2
         } else {
           BEZIER_CURVE_OFFSET2 = 20
         }
         return `M ${outPortX} ${outPortY} C ${outPortX} ${(outPortY +
           inPortY) /
           2 +
           BEZIER_CURVE_OFFSET2} ${inPortX} ${(outPortY + inPortY) / 2 -
           BEZIER_CURVE_OFFSET2} ${inPortX} ${inPortY}`
       }
     } else {
       if (outPortX > inPortX) { // 6,7
         const tempDistance = Math.abs(outPortX - inPortX)
         if (tempDistance < 20) {
           BEZIER_CURVE_OFFSET2 = 20 + (20 - tempDistance) / 2
         } else {
           BEZIER_CURVE_OFFSET2 = 20
         }
         return `M ${outPortX} ${outPortY} C ${(outPortX +
           inPortX) /
           2 -
           BEZIER_CURVE_OFFSET2} ${outPortY} ${(outPortX + inPortX) / 2 +
           BEZIER_CURVE_OFFSET2} ${inPortY} ${inPortX} ${inPortY}`
       } else { // 2,3
         const tempDistance = Math.abs(outPortX - inPortX)
         if (tempDistance < 20) {
           BEZIER_CURVE_OFFSET2 = 20 + (20 - tempDistance) / 2
         } else {
           BEZIER_CURVE_OFFSET2 = 20
         }
         return `M ${outPortX} ${outPortY} C ${(outPortX +
           inPortX) /
           2 +
           BEZIER_CURVE_OFFSET2} ${outPortY} ${(outPortX + inPortX) / 2 -
           BEZIER_CURVE_OFFSET2} ${inPortY} ${inPortX} ${inPortY}`
       }
     }
   }
   ~~~

   6. 问题描述：点击“连线”，出现一条灰色“连接线”，向上连接元素时没问题，但是向下连接元素时，偶尔会出现“hover 失效”、“click 失效”等情况。在元素上绑定“mousemove”、“mouseenter”、“mouseleave”事件，发现向下连接元素并且在元素内移动光标，会出现“mouseenter -> mousemove -> mouseleave”，也就是说每次移动，最后光标都是离开元素的状态，自然也就无法触发“hover”、“click”等鼠标事件了。

      分析：强哥推测是 <path> 覆盖元素，导致鼠标事件失效。也就是说，在向下连接元素时，在接近垂直角度时，光标实际上是在 <path> 范围内的。但是也有一点很奇怪，向上连接却没有事情！难道浏览器光标上下是不对称的？

      解决方法：其实很简单，就把“连接线”缩短，距离光标几个像素点就OK啦，由于是垂直方向出问题，所以在向下连接时候，减掉几个像素，向上连接时，增加几个像素！（改了一个后，其他都要改，连左右方向也要改了 T_T）
      
   7. 增加 ACE 代码编辑器

      reference：https://blog.csdn.net/YoshinoNanjo/article/details/82978668

   8. 调整布局，在 `webstudio-container` 内设置 `padding: 15px 370px;`，左右两块放置 `tools` 和 `attributes`，中间这块外层是 `stage-wrapper`，采用 relative 布局，宽度继承父元素，撑满剩余空间，里面是 `stage`，采用 absolute 布局，`width: 100%; height: 100%;`，当 `stage-wrapper`改变时，`stage` 也是自适应的了。

   9. 光标按原路径返回，即碰到 <path> 后，会产生卡顿，原因是代码中遇到 <path> 就 return 了。解决方法也很简单，不 return，也不做计算就好了，具体看 `mousemoveHandler` 函数。也就是说光标碰到 <path> 不会触发 mousemove 事件。

   10. 完成多 `infowindow` 显示数据，其实就是通过闭包保存 `deviceModelId`，然后接收 `websocket` 的数据，对相应的 `deviceModel` 的 `infowindow` 进行更新。

   11. 优化 `infowindow` 组件，通过在 `options` 中传入当前组件实例的 `store`，从而使 infowindow 可以使用全局共享的状态。

   12. Vuex 的状态存储是响应式的，当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。而从 store 实例中读取状态最简单的方法就是在**计算属性**中返回某个状态：

       ~~~js
    computed: {
         ...mapState({
           deviceModels: state => state.device.deviceModelData
         })
       }
       ~~~

       所以说，当从 websocket 接收到数据以后，不用通过操作 dom 去更新 infowindow，而是直接修改 store 中的状态就可以了。此外，要使 computed 中的状态更新，必须在视图中使用，否则不会触发！（亲测）

   13. 当 commit('setDeviceModelListData') 的时候，infowindow 里的 deviceModelInfo 一直没有被触发响应。开始一直在纠结是不是数组里面的值是否被观测，也就是数组里面的值是否有一个 \_\_ob\_\_ 属性。其实，数组的索引是非响应式的，也就是说，数组的索引并不是“访问器属性”，触发不了 get 函数，也就无法收集依赖，所以就不是可响应的了。对于这种情况，需要通过数组的变异方法进行触发。

       看我原来在 vuex 中的定义：

       ~~~js
    state.deviceModelList[i][payload.attr] = payload.data
       ~~~

       这样写的结果是，依赖 deviceModelList\[i\] 的视图会更新，因为 vue 会对 deviceModelList 数组里的对象进行观测，为每个对象里的属性添加 getter 和 setter 方法，所以上面赋值的时候，触发了该属性的收集的依赖，所以视图上的值变了！

       但是，对于使用 computed 返回 deviceModelList 数组里的某一个对象来说，却不是响应式的，原因上面说过了，数组的索引是非响应式的。

       所以，解决办法是，需要通过数组的变异方法来触发响应式：

       ~~~js
    state.deviceModelList.splice(i, 1, Object.assign({}, state.deviceModelList[i], {
           [payload.attr]: payload.data
       }))
       ~~~

   14. Vuex 中把修改数组元素属性值的方式改过来，对象属性值改变可以触发响应式，只是不触发数组改变的响应式罢了。在为数组定义响应式的时候，数组元素（特指对象）的属性也会添加依赖（观察者），所以改变对象的属性值，可以触发相应的依赖。





