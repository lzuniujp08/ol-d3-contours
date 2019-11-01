# d3Map
d3 等高线图，基于idw算法
[项目原地址](https://github.com/sgcc/d3Map.git)
效果图：
  <img width="900" src="https://liquid-zhangliquan.github.io/ol-d3-contours/images/20170626014633.png">

# ol-d3-contour 
ol集成d3-contour(通过canvaslayer叠加)
主要核心是将地理坐标转屏幕坐标然后在画布内进行idw插值
然后交与d3-contour绘制（
最后交由canvaslayer进行贴图展示
实际就是canvas绘图，这里的效果是每px每px绘制，所以不会出现锯齿，主要优化在idw算法里的优化，以及canvas画布相关的优化

## 优化历程
```
 1.zoom大时，PXregion异常 | ok 左上角尚有小问题
 2.等值线添加label
 3.引入webworker 多线程计算 | 效果不明显，可能是方法的问题
 4.idw插值算法优化的思路
（1）画布以（0，0）为起点 xmax => width, ymax => height | 这条好像行不通
  1）直接在region的extent里计算
  2）直接在region里插值计算（需要判断空间关系，范围内计算，范围外不计算）
（2）画布以（xmin, ymin) 为起点 xmax - xmin => width, ymax - ymin => height | 已通
  3）region的extent(xmax - xmin, ymax - ymin)计算插值，然后canvas偏移至（xmin, ymin)
（3）基于idw算法函数优化 | Math函数优化,循环优化（递减）
```

# 项目地址
[demo](https://liquid-zhangliquan.github.io/ol-d3-contours/)
* 主要分聊城AQI指数和广西的气温色斑图
* 分好几个版本优化，代码里写了优化过程

# 部分效果图
聊城AQI
  <img width="900" src="https://liquid-zhangliquan.github.io/ol-d3-contours/images/lc.jpg">
广西TEM
 <img width="900" src="https://liquid-zhangliquan.github.io/ol-d3-contours/images/gx.jpg">


