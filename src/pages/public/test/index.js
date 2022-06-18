export default () => {

  const myMax = (num)=> {
    num = Math.ceil(num);
    if(num%10===0) {return num;}
    if(num<100) {
      return parseInt((num+10)/10)*10;
    } else {
      return num;
    }
  };

  console.log(12, myMax(12))
  console.log(60, myMax(60))
  console.log(100, myMax(100))
  console.log(123, myMax(123))
  console.log(210, myMax(210))


  const name = "123141212414";
  let saveJson = '[{"title":"折线图","type":"tab-pane","chartType":"line","remark":"不同类型图表的个性配置，必须给chartType赋值，如：柱图就填bar，线图就填line，饼图就填pie，对应的是series里面的type","color":["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],"options":[{"label":"显示标签值","formType":"switch","key":"series-line.label.show","keyType":"object","value":true,"activeValue":true,"inactiveValue":false},{"label":"线条宽度","formType":"inputNumber","key":"series-line.lineStyle.width","keyType":"array","value":"2","remark":"如果配置的数组下面的某一项，用-连接数组key和type，示例：series-line.lineStyle.width表示设置series中type为line的配置"},{"label":"拐点样式","formType":"select","key":"series-line.symbol","keyType":"array","value":"circle","options":[{"value":"circle","label":"圆形"},{"value":"rect","label":"rect"},{"value":"roundRect","label":"roundRect"}]},{"label":"拐点大小","formType":"inputNumber","key":"series-line.symbolSize","keyType":"array","value":"5"}]},{"title":"柱图配置","type":"tab-pane","chartType":"bar","options":[{"label":"标记","formType":"switch","key":"series-bar.markPoint","keyType":"object","value":false,"activeValue":true,"inactiveValue":false},{"label":"柱图方向","formType":"radio","key":"series-bar.barDirection","keyType":"array","value":"y","barDirection":"","options":[{"value":"x","label":"横向"},{"value":"y","label":"竖向"}]},{"label":"柱子大小","formType":"inputNumber","key":"series-bar.barWidth","keyType":"array","value":"10"},{"label":"显示标签值","formType":"switch","key":"series-bar.label.show","keyType":"object","value":true,"activeValue":true,"inactiveValue":false},{"label":"显示标签位置","formType":"select","key":"series-bar.label.position","keyType":"object","value":"top","options":[{"value":"top","label":"top"},{"value":"bottom","label":"bottom"},{"value":"middle","label":"middle"}]}]},{"title":"颜色配置","key":"color","value":["#000","#919e8b","#d7ab82","#6e7074","#61a0a8","#efa18d","#787464","#cc7e63","#724e58","#4b565b"],"options":[{"formType":"select","key":"color","keyType":"object","options":[{"value":["#d87c7c","#123","#d7ab82","#6e7074","#61a0a8","#efa18d","#787464","#cc7e63","#724e58","#4b565b"],"label":"复古"},{"value":["#dd6b66","#759aa0","#e69d87","#8dc1a9","#ea7e53","#eedd78","#73a373","#73b9bc","#7289ab","#91ca8c","#f49f42"],"label":"dark"},{"value":["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],"label":"macarons"},{"value":["#C1232B","#27727B","#FCCE10","#E87C25","#B5C334","#FE8463","#9BCA63","#FAD860","#F3A43B","#60C0DD","#D7504B","#C6E579","#F4E001","#F0805A","#26C0C0"],"label":"infographic"},{"value":["#c12e34","#e6b600","#0098d9","#2b821d","#005eaa","#339ca8","#cda819","#32a487"],"label":"shine"},{"value":["#E01F54","#001852","#f5e8c8","#b8d2c7","#c6b38e","#a4d8c2","#f3d999","#d3758f","#dcc392","#2e4783","#82b6e9","#ff6347","#a092f1","#0a915d","#eaf889","#6699FF","#ff6666","#3cb371","#d5b158","#38b6b6"],"label":"roma"}],"value":["#dd6b66","#759aa0","#e69d87","#8dc1a9","#ea7e53","#eedd78","#73a373","#73b9bc","#7289ab","#91ca8c","#f49f42"]}]},{"title":"背景色配置","type":"tab-pane123","key":"backgroundColor","options":[{"label":"背景色配置","formType":"inputColor","key":"backgroundColor","keyType":"object","value":"#f00"}]},{"title":"表格","type":"tab-pane123","key":"tableConfig","options":[{"label":"表头背景","formType":"inputColor","key":"table.headBgColor","keyType":"object","value":"#f00"},{"label":"表头颜色","formType":"inputColor","key":"table.headColor","keyType":"object","value":"#FFF"},{"label":"内容背景色","formType":"inputColor","key":"table.cellBgColor","keyType":"object","value":"#FFFFFF"},{"label":"内容颜色","formType":"inputColor","key":"table.cellColor","keyType":"object","value":"#606266"}]},{"title":"横轴配置","type":"tab-pane","key":"xAxis","options":[{"label":"坐标轴刻度标签旋转1","formType":"inputNumber","key":"xAxis.axisLabel.rotate","keyType":"object","value":"0"},{"label":"标签间隔","formType":"inputNumber","key":"xAxis.axisLabel.interval","keyType":"object","value":"0"}]},{"title":"竖轴配置","type":"tab-pane","key":"yAxis","options":[{"label":"网格线颜色配置","formType":"inputColor","key":"yAxis.splitLine.lineStyle.color","keyType":"object","value":"#efefef","remark":"必须给默认值，否则不显示"},{"label":"纵坐标轴颜色配置","formType":"inputColor","key":"yAxis.axisLine.lineStyle.color","keyType":"object","value":"#171717","remark":"必须给默认值，否则不显示"}]},{"title":"标题配置","type":"tab-pane","chartType":"default","key":"title","options":[{"label":"标题横向对齐","formType":"select","key":"title.textAlign","keyType":"object","value":"center","options":[{"value":"auto","label":"auto"},{"value":"left","label":"left"},{"value":"right","label":"right"},{"value":"center","label":"center"}]},{"label":"标题纵向对齐","formType":"select","key":"title.textVerticalAlign","keyType":"object","value":"top","options":[{"value":"auto","label":"auto"},{"value":"top","label":"top"},{"value":"bottom","label":"bottom"},{"value":"middle","label":"middle"}]},{"label":"标题文字","formType":"input","key":"title.text","keyType":"object","value":""},{"label":"标题上间距(top)","formType":"input","key":"title.top","keyType":"object","value":"10"},{"label":"标题左间距(left)","formType":"select","key":"title.left","keyType":"object","value":"center","options":[{"value":"left","label":"left"},{"value":"center","label":"center"},{"value":"right","label":"right"}]},{"label":"标题颜色","formType":"inputColor","key":"title.textStyle.color","keyType":"object","value":"#f33","remark":"必须给默认值，否则不显示"},{"label":"副标题文字","formType":"input","key":"title.subtext","keyType":"object","value":""},{"label":"副标题颜色","formType":"inputColor","key":"title.subtextStyle.color","keyType":"object","value":"","remark":"必须给默认值，否则不显示"}]},{"title":"提示框配置","type":"tab-pane","options":[{"label":"提示框显示","formType":"switch","key":"tooltip.show","keyType":"object","value":true,"activeValue":true,"inactiveValue":false},{"label":"提示框触发条件","formType":"select","key":"tooltip.trigger","keyType":"object","value":"axis","options":[{"value":"item","label":"item"},{"value":"axis","label":"axis"},{"value":"none","label":"none"}]}]},{"title":"图例配置","type":"tab-pane","options":[{"label":"图例显示","formType":"switch","key":"legend.show","keyType":"object","value":false,"activeValue":true,"inactiveValue":false},{"label":"图例位置","formType":"select","key":"legend.top","keyType":"object","value":"bottom","options":[{"value":"auto","label":"auto"},{"value":"top","label":"top"},{"value":"bottom","label":"bottom"},{"value":"middle","label":"middle"}]},{"label":"提示框触发条件","formType":"select","key":"tooltip.trigger","keyType":"object","value":"axis","options":[{"value":"item","label":"item"},{"value":"axis","label":"axis"},{"value":"none","label":"none"}]}]},{"title":"工具箱配置","type":"tab-pane","options":[{"label":"保存图片","formType":"switch","key":"toolbox.feature.saveAsImage.show","keyType":"object","value":false,"activeValue":true,"inactiveValue":false},{"label":"原始数据","formType":"switch","key":"toolbox.feature.dataView.show","keyType":"object","value":false,"activeValue":true,"inactiveValue":false}]}]';
  let defaultJson = '[{"title":"折线图","type":"tab-pane","chartType":"line","remark":"不同类型图表的个性配置，必须给chartType赋值，如：柱图就填bar，线图就填line，饼图就填pie，对应的是series里面的type","color":["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],"options":[{"label":"线条宽度","formType":"inputNumber","key":"series-line.lineStyle.width","keyType":"array","value":"2","remark":"如果配置的数组下面的某一项，用-连接数组key和type，示例：series-line.lineStyle.width表示设置series中type为line的配置"},{"label":"拐点样式","formType":"select","key":"series-line.symbol","keyType":"array","value":"circle","options":[{"value":"circle","label":"圆形"},{"value":"rect","label":"rect"},{"value":"roundRect","label":"roundRect"}]},{"label":"拐点大小","formType":"inputNumber","key":"series-line.symbolSize","keyType":"array","value":"5"},{"label":"显示标签值","formType":"switch","key":"series-line.label.show","keyType":"array","value":true,"activeValue":true,"inactiveValue":false},{"label":"阴影设置","formType":"inputNumber","key":"series-line.lineStyle.shadowBlur","keyType":"array","value":"5"},{"label":"线条颜色设置","formType":"inputColor","key":"series.itemStyle.color:type=line","keyType":"object","value":"#00a2ff"}]},{"title":"柱图配置","type":"tab-pane","chartType":"bar","options":[{"label":"标记","formType":"switch","key":"series-bar.markPoint","keyType":"object","value":false,"activeValue":true,"inactiveValue":false},{"label":"柱图方向","formType":"radio","key":"series-bar.barDirection","keyType":"array","value":"y","barDirection":"","options":[{"value":"x","label":"横向"},{"value":"y","label":"竖向"}]},{"label":"柱子大小","formType":"inputNumber","key":"series-bar.barWidth","keyType":"array","value":"10"},{"label":"显示标签值","formType":"switch","key":"series-bar.label.show","keyType":"array","value":true,"activeValue":true,"inactiveValue":false},{"label":"标签位置","formType":"select","key":"series-bar.label.position","keyType":"array","value":"top","options":[{"value":"top","label":"top"},{"value":"bottom","label":"bottom"},{"value":"middle","label":"middle"}]},{"label":"阴影设置","formType":"inputNumber","key":"series-bar.itemStyle.shadowBlur","keyType":"array","value":"5"},{"label":"柱图颜色","formType":"inputColor","key":"series.itemStyle.color:type=bar","keyType":"object","value":"#00a2ff"}]},{"title":"颜色配置","key":"color","value":["#00bb00","#919e8b","#d7ab82","#6e7074","#61a0a8","#efa18d","#787464","#cc7e63","#724e58","#4b565b"],"options":[{"formType":"select","key":"color","keyType":"object","options":[{"value":["#0780cf","#765005","#fa6d1d","#0e2c82","#b6b51f","#da1f18","#701866","#f47a75","#009db2","#024b51","#0780cf","#765005"],"label":"复古"},{"value":["#194f97","#555555","#bd6b08","#00686b","#c82d31","#625ba1","#898989","#9c9800","#007f54","#a195c5","#103667","#f19272"],"label":"清新"},{"value":["#00a8e1","#99cc00","#e30039","#fcd300","#800080","#00994e","#ff6600","#808000","#db00c2","#008080","#0000ff","#c8cc00"],"label":"商务"},{"value":["#3682be","#45a776","#f05326","#eed777","#334f65","#b3974e","#38cb7d","#ddae33","#844bb3","#93c555","#5f6694","#df3881"],"label":"雅致"},{"value":["#fa2c7b","#ff38e0","#ffa235","#04c5f3","#0066fe","#8932a5","#c90444","#cb9bff","#434348","#90ed7d","#f7a35c","#8085e9"],"label":"艳丽"},{"value":["#0082fc","#05f8d6","#fdd845","#22ed7c","#09b0d3","#1d27c9","#f9e264","#f47a75","#009db2","#024b51","#0780cf","#765005"],"label":"科技"},{"value":["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],"label":"macarons"},{"value":["#27727B","#FCCE10","#E87C25","#B5C334","#FE8463","#9BCA63","#FAD860","#F3A43B","#60C0DD","#D7504B","#C6E579","#F4E001","#F0805A","#26C0C0"],"label":"infographic"},{"value":["#c12e34","#e6b600","#0098d9","#2b821d","#005eaa","#339ca8","#cda819","#32a487"],"label":"shine"},{"value":["#e01f54","#001852","#f5e8c8","#b8d2c7","#c6b38e","#a4d8c2","#f3d999","#d3758f","#dcc392","#2e4783","#82b6e9","#ff6347","#a092f1","#0a915d","#eaf889","#6699FF","#ff6666","#3cb371","#d5b158","#38b6b6"],"label":"roma"}]}]},{"title":"背景色配置","type":"tab-pane","key":"backgroundColor","options":[{"label":"背景色配置","formType":"inputColor","key":"backgroundColor","keyType":"object","value":"#fff"}]},{"title":"表格","type":"tab-pane","key":"tableConfig","options":[{"label":"表头背景","formType":"inputColor","key":"table.headBgColor","keyType":"object","value":"#f5f7fa"},{"label":"表头颜色","formType":"inputColor","key":"table.headColor","keyType":"object","value":"#90939b"},{"label":"内容背景色","formType":"inputColor","key":"table.cellBgColor","keyType":"object","value":"#FFFFFF"},{"label":"内容颜色","formType":"inputColor","key":"table.cellColor","keyType":"object","value":"#606266"}]},{"title":"横轴配置","type":"tab-pane","key":"xAxis","options":[{"label":"坐标轴刻度标签旋转1","formType":"inputNumber","key":"xAxis.axisLabel.rotate","keyType":"object","value":"0"},{"label":"标签间隔","formType":"inputNumber","key":"xAxis.axisLabel.interval","keyType":"object","value":"0"},{"label":"横坐标轴颜色配置","formType":"inputColor","key":"xAxis.axisLine.lineStyle.color","keyType":"object","value":"#171717","remark":"必须给默认值，否则不显示"}]},{"title":"竖轴配置","type":"tab-pane","key":"yAxis","options":[{"label":"网格线颜色配置","formType":"inputColor","key":"yAxis.splitLine.lineStyle.color","keyType":"object","value":"#efefef","remark":"必须给默认值，否则不显示"},{"label":"纵坐标轴颜色配置","formType":"inputColor","key":"yAxis.axisLine.lineStyle.color","keyType":"object","value":"#171717","remark":"必须给默认值，否则不显示"}]},{"title":"标题配置","type":"tab-pane","chartType":"default","key":"title","options":[{"label":"标题横向对齐","formType":"select","key":"title.left","keyType":"object","value":"center","options":[{"value":"left","label":"left"},{"value":"center","label":"center"},{"value":"right","label":"right"}]},{"label":"标题纵向对齐","formType":"select","key":"title.textVerticalAlign","keyType":"object","value":"top","options":[{"value":"auto","label":"auto"},{"value":"top","label":"top"},{"value":"bottom","label":"bottom"},{"value":"middle","label":"middle"}]},{"label":"标题文字","formType":"input","key":"title.text","keyType":"object","value":""},{"label":"标题上间距","formType":"input","key":"title.top","keyType":"object","value":"15"},{"label":"标题颜色","formType":"inputColor","key":"title.textStyle.color","keyType":"object","value":"#f33","remark":"必须给默认值，否则不显示"},{"label":"标题文字大小","formType":"inputNumber","key":"title.textStyle.fontSize","keyType":"object","value":"14"},{"label":"副标题文字","formType":"input","key":"title.subtext","keyType":"object","value":""},{"label":"副标题颜色","formType":"inputColor","key":"title.subtextStyle.color","keyType":"object","value":"","remark":"必须给默认值，否则不显示"}]},{"title":"提示框配置","type":"tab-pane","options":[{"label":"提示框显示","formType":"switch","key":"tooltip.show","keyType":"object","value":true,"activeValue":true,"inactiveValue":false},{"label":"提示框触发条件","formType":"select","key":"tooltip.trigger","keyType":"object","value":"axis","options":[{"value":"item","label":"item"},{"value":"axis","label":"axis"},{"value":"none","label":"none"}]}]},{"title":"图例配置","type":"tab-pane","options":[{"label":"图例显示","formType":"switch","key":"legend.show","keyType":"object","value":false,"activeValue":true,"inactiveValue":false},{"label":"图例位置","formType":"select","key":"legend.top","keyType":"object","value":"bottom","options":[{"value":"auto","label":"auto"},{"value":"top","label":"top"},{"value":"bottom","label":"bottom"},{"value":"middle","label":"middle"}]},{"label":"提示框触发条件","formType":"select","key":"tooltip.trigger","keyType":"object","value":"axis","options":[{"value":"item","label":"item"},{"value":"axis","label":"axis"},{"value":"none","label":"none"}]}]},{"title":"工具箱配置","type":"tab-pane","options":[{"label":"保存图片","formType":"switch","key":"toolbox.feature.saveAsImage.show","keyType":"object","value":false,"activeValue":true,"inactiveValue":false},{"label":"原始数据","formType":"switch","key":"toolbox.feature.dataView.show","keyType":"object","value":false,"activeValue":true,"inactiveValue":false}]}]';

  saveJson = JSON.parse(saveJson);
  defaultJson = JSON.parse(defaultJson);

  let newJson = []; //处理以后的新对象
  defaultJson.forEach((defJson) => {
    let targetConfig= saveJson.find((item) => ('key' in item && 'key' in defJson) && item.key === defJson.key); //先通过key值找对象
    if(!targetConfig) { //如果没有找到，再通过title值找对象
      targetConfig = saveJson.find((item) => ('title' in item && 'title' in defJson) && item.title === defJson.title);
    }
    if(!targetConfig) { //如果依然没有找到，则说明此配置属性之前没有被配置过，那么直接存入新对象中
      newJson.push(defJson);
    } else { //否则，将targetConfig中的数据覆盖defJson中的数据，再存入新对象中
      // console.log(targetConfig)
      // if(targetConfig.title === "颜色配置") { //todo 这里暂时加条件
      //   console.log(defJson, targetConfig);
      const resJson = mergeJson(defJson, targetConfig);
      newJson.push(resJson);
       // console.log(resJson)
      // }
    }
  });
  // console.log(newJson);

  function mergeJson(oldJson, newJson) {
    let resJson = {};
    // let resJson = oldJson;
    if(newJson) {
      Object.keys(oldJson).forEach((field) => {
        if(newJson[field]) { //要新数据里面存在此值才做处理
          const valObj = oldJson[field];
          if(!newJson[field]) {resJson[field] = valObj;} //如果新数据中不存在，则直接赋值
          if (typeof valObj === 'object') {
            if (Array.isArray(valObj)) { //如果是数组
              let tempArr = [];
              let isObjCur = false;
              if(valObj.length<=0) {return;}
              if(typeof valObj[0] === 'object') {
                valObj.forEach((temp) => {
                  //下列可匹配对象唯一性的数据有：key、title、name、label
                  let tempNewObj = newJson[field].find((tempObj) => ('key' in tempObj && 'key' in temp) && (tempObj.key === temp.key));
                  if(!tempNewObj) {tempNewObj = newJson[field].find((tempObj) => ('title' in tempObj && 'title' in temp) && tempObj.title === temp.title);}
                  if(!tempNewObj) {tempNewObj = newJson[field].find((tempObj) => ('name' in tempObj && 'name' in temp) && tempObj.name === temp.name);}
                  if(!tempNewObj) {tempNewObj = newJson[field].find((tempObj) => ('label' in tempObj && 'label' in temp) && tempObj.label === temp.label);}
                  if(!tempNewObj) {
                    tempArr.push(temp);
                  } else {
                    tempArr.push(mergeJson(temp, tempNewObj));
                    isObjCur = true;
                  }
                });
              } else {
                tempArr = newJson[field];
              }
              resJson[field] = tempArr;
            } else { //如果是对象
              resJson[field] = mergeJson(valObj, newJson[field]);
            }
          } else {
            // console.log(newJson[field], field)
            resJson[field] = newJson[field];
          }
        }
      });
    }
    return resJson;
  }

  /*//将newJson中的数据覆盖oldJson中的数据
  const mergeJson = (oldJson, newJson) => {
    let resJson = {};
    Object.keys(oldJson).map((field) => {
      console.log(field)
    });
    return resJson;
  };*/
  // console.log(newJson);
  return (
    <div>{name} default page</div>
  );
}
