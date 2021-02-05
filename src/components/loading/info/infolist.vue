<template>
  <div class="broad-info">
    <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 设备信息</span></p>
    <div class="flex-borad-bd">
      <div class="borad-bd-wapper">
        <div class="info-text info-title">
          <div class="text-list" v-for="(item,index) in dataList" :key='index'>
            {{item.devname}}
            <div class="timelabel-wapper">
              <div><span class="runkuai"></span>待机：{{item.standby.toFixed(2)}}h
              <span  v-show="!phoneShow">&nbsp;&nbsp;</span>
              <div v-show="phoneShow"></div>
              <span class="runkuai daikuai"></span>运行：{{item.run.toFixed(2)}}h
            </div>
            </div> 
          </div>
          <!-- <div class="text-list">
            {{dataList[0].devname}}
            <div class="timelabel-wapper">
              <div><span class="runkuai"></span> 待机时间：{{dataList[0].standby}}h</div>
              <div> <span class="runkuai daikuai"></span> 运行时间：{{dataList[0].run}}h</div>
            </div> 
          </div>
          <div class="text-list">{{dataList[1].devname}}
            <div class="timelabel-wapper">
              <div><span class="runkuai"></span> 待机时间：{{dataList[1].standby}}h</div>
              <div> <span class="runkuai daikuai"></span> 运行时间：{{dataList[1].run}}h</div>
            </div> 
          </div>
          <div class="text-list">{{dataList[2].devname}}
            <div class="timelabel-wapper">
              <div><span class="runkuai"></span> 待机时间：{{dataList[2].standby}}h</div>
              <div> <span class="runkuai daikuai"></span> 运行时间：{{dataList[2].run}}h</div>
            </div> 
          </div> -->
        </div>
        <div class="info-wapper">
          <!-- 图片背景信息 -->
          <!-- <div class="infolist" v-for="item in dataList" >
            <p class="infotitle"><span>{{item.devname}}</span></p>
            <div class="infoimg" >
              <span class="infodai">运行</span>
              <span class="dai-time">{{item.run.toFixed(3)||'000'}}</span>
              <span class="dai-dan">h</span>
            </div>
            <div class="infoimg inforight">
              <span class="infodai">待机</span>
              <span class="dai-time">{{item.standby.toFixed(3)||'000'}}</span>
              <span class="dai-dan">h</span>
            </div>
          </div> -->

          <!-- eacharts 图形信息 -->
          <div id="pieo1" style="width:100%;height:100px;">

          </div>
          
    <!--      <p class="info-b"><span class="infotime">2019/12/20 12:04:56</span>  客户订单 WO20160910001 有产品正在进行 <span class="info-active">打标</span></p>-->
    <!--      <p class="info-b"><span class="infotime">2019/12/20 12:04:56</span>  客户订单 WO20160910001 有产品正在进行 <span class="info-active">打标</span></p>-->
        </div>
        <div class="info-text">
          <div class="text-list"> 
            <p><span class="text-title">电压：</span><span class="cl-dy">{{tofixedTree(powerData[0].value)}}</span> V</p>
            <p><span class="text-title">电流：</span><span class="cl-dl">{{tofixedTree(powerData[3].value)}}</span>A</p>
            <p><span class="text-title">功率：</span><span class="cl-gl">{{tofixedTree(powerData[6].value)}}</span>kW</p>
            <p><span class="text-title">电能：</span><span class="cl-dn">{{tofixedTree(powerData[9].value)}}</span>kWh</p>
          </div>
          <div class="text-list">
            <p><span class="text-title">电压：</span><span class="cl-dy">{{tofixedTree(powerData[1].value)}}</span> V</p>
            <p><span class="text-title">电流：</span><span class="cl-dl">{{tofixedTree(powerData[4].value)}}</span>A</p>
            <p><span class="text-title">功率：</span><span class="cl-gl">{{tofixedTree(powerData[7].value)}}</span>kW</p>
            <p><span class="text-title">电能：</span><span class="cl-dn">{{tofixedTree(powerData[10].value)}}</span>kWh</p>
          </div>
          <div class="text-list">
            <p><span class="text-title">电压：</span><span class="cl-dy">{{tofixedTree(powerData[2].value)}}</span> V</p>
            <p><span class="text-title">电流：</span><span class="cl-dl">{{tofixedTree(powerData[5].value)}}</span>A</p>
            <p><span class="text-title">功率：</span><span class="cl-gl">{{tofixedTree(powerData[8].value)}}</span>kW</p>
            <p><span class="text-title">电能：</span><span class="cl-dn">{{tofixedTree(powerData[11].value)}}</span>kWh</p>
          </div>
        </div>
        <div class="xian-wapper" id="linears" :style="xianHeight">
            线性图
          </div>
      </div>
    </div>
  </div>
</template>
<script>
// import echarts from 'echarts'
  export default {
      name:'infolist',
      data(){
          return{
            dataList:[
                {run:0.00,standby:0.00,devname:'设备名称'},
                {run:0.00,standby:0.00,devname:'设备名称'},
                {run:0.00,standby:0.00,devname:'设备名称'},
                // {run:0.00,standby:0.00,devname:'设备名称'},
                // {run:0.00,standby:0.00,devname:'设备名称'},
            ],
            powerData:[
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
              {value:0},
            ],//设备电流信息
            infoTimer:'',
            orgOptions:'',//线形图
            chart:'',
            pieOptions:'',//饼状图
            chart1:'',
            xianHeight:'',
            phoneShow:false,
            prodect1:[0,0,0,0,0,0,0,0,0,0,0,0],
            prodect2:[0,0,0,0,0,0,0,0,0,0,0,0],
            prodect3:[0,0,0,0,0,0,0,0,0,0,0,0],
            dataTimeList:[]//横坐标时间  
          }
      },
      mounted(){
          this.getFrom();
          
          this.linearC();
          this.getPie();
          let w=document.body.clientWidth||document.documentElement.clientWidth;
          if(w>1080){
              this.phoneShow=false;
          }else{
            this.phoneShow=true
          }
      },
      created(){
        window.addEventListener('resize', this.resizeAll);
      },
      destroyed(){
        window.removeEventListener('resize', this.resizeAll)
        clearTimeout(this.infoTimer)
      },
      methods:{
          //控制标点符号
          tofixedTree(num){
            let data=parseFloat(num).toFixed(3);
            if(!num||typeof(num)!='number'){
              return '0'
            }else{
               return data;
            }
          },
          resizeAll(){
            this.getPie();
            this.linearC();
          },
          //获取表单记录
          getFrom(){
              let me=this;
              this.$api.runtimeGet().then(res=>{
                  // console.log(res.data.result)
                  me.$loading.hide('');
                  let json=res.data.result;
                  me.formDataList=res.data.result.length;
                  if(json.length==0){
                      return false;
                  }else{
                      me.dataList=json.timeShows;
                      me.powerData=json.tablePowerData;
                      me.dataList[0].devname=tt.deviceName[0]
                      me.dataList[1].devname=tt.deviceName[1]
                      me.dataList[2].devname=tt.deviceName[2]
                      me.getPie();
                      me.getEchartPic()
                      // console.log(me.powerData)
                  }
              }).catch((err)=>{

              })
              clearTimeout(me.infoTimer)
              me.infoTimer=setTimeout(me.getFrom,10000);
          },
          //获取折线图
          getEchartPic(){
            let me=this;
            this.$api.getEchartPic().then(res=>{

                  let datas=res.data.result;
                  let hourago=datas[0].hourago;  
                  let firstIndex = hourago.indexOf(" ");
                  let lastIndex = hourago.lastIndexOf(":")
                  
                  let agoTime= hourago.substring(firstIndex+1,lastIndex),//服务器一小时前时间格式HH:MM
                      agoHours=parseInt(agoTime.substr(0,2)),//小时
                      agoMuine=parseInt(agoTime.substr(3,2));//分钟
                      // console.log(hourago)
                      // console.log(agoHours,agoMuine)
                  // me.dataTimeList=[me.getzero(agoHours)+':'+me.getzero(agoMuine)];//1小时前时间
                  me.dataTimeList=[];//1小时前时间
                  for(let i=0;i<12;i++){
                      agoMuine+=5;

                      if(agoMuine>=60){
                        agoMuine=parseInt(agoMuine.toString().substr(1,1));
                        // console.log(agoMuine)
                        agoHours+=1;
                        if(agoHours>=24){
                          agoHours=parseInt(agoHours.toString().substr(1,1));
                        }
                      }
                      me.dataTimeList.push(me.getzero(agoHours)+':'+me.getzero(agoMuine))
                      // console.log(me.getzero(agoHours)+':'+me.getzero(agoMuine))
                  }
                  me.prodect1=[datas[0].zero,datas[0].five,datas[0].ten,datas[0].fifteen,datas[0].twenty,datas[0].twentyFive,datas[0].thirty,datas[0].thirtyFive,datas[0].fourty,datas[0].fourtyFive,datas[0].fifty,datas[0].fiftyFive]
                  me.prodect2=[datas[1].zero,datas[1].five,datas[1].ten,datas[1].fifteen,datas[1].twenty,datas[1].twentyFive,datas[1].thirty,datas[1].thirtyFive,datas[1].fourty,datas[1].fourtyFive,datas[1].fifty,datas[1].fiftyFive]
                  me.prodect3=[datas[2].zero,datas[2].five,datas[2].ten,datas[2].fifteen,datas[2].twenty,datas[2].twentyFive,datas[2].thirty,datas[2].thirtyFive,datas[2].fourty,datas[2].fourtyFive,datas[2].fifty,datas[2].fiftyFive]
                  // console.log(me.prodect1)
                  me.linearC()
              }).catch((err)=>{

              })
          },
          getzero(num){
            if(parseFloat(num)<10){
              return '0'+num;
            }else{
              return num
            }
          },
          //上饼图
          getPie(){
            let me=this;
            this.pieOptions={
                // title: {
                //     // subtext: '虚构数据',
                //     left: 'center'
                // },
                tooltip: {},
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{a} <br/>{b} : {c} ({d}%)'
                // },
                // legend:{ x: 'center',
                //           y: 'bottom',
                //           padding:[0,50,0,0],
                //         textStyle:{
                //             fontSize: 12,//字体大小
                //             color: '#ffffff'//字体颜色
                //         },
                // },
                dataset: {
                    source:[
                        ['product', '1', '2', '3'],
                        ['运行时间', me.dataList[0].run.toFixed(2), me.dataList[1].run.toFixed(2), me.dataList[2].run.toFixed(2)],
                        ['待机时间', me.dataList[0].standby.toFixed(2), me.dataList[1].standby.toFixed(2), me.dataList[2].standby.toFixed(2)],
                    ]
                },
                grid: {//扩充整个
                  top: '10px' ,
                  bottom: '10px',
                  left: '50px',
                  right: '20px'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '100%',
                        center: ['16%', '50%'],
                        // selectedMode: 'single',
                        hoverAnimation:false,
                        encode: {
                            itemName: 'product',
                            value: '1'
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 12    //文字的字体大小
                                },
                                formatter:'{d}%'     
                            }
                        },
                    },
                    {
                        type: 'pie',
                        radius: '100%',
                        hoverAnimation:false,
                        center: ['50%', '50%'],
                        // selectedMode: 'single',
                        encode: {
                            itemName: 'product',
                            value: '2'
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 12    //文字的字体大小
                                },
                                formatter:'{d}%'     
                            }
                        },
                    },
                    {
                        type: 'pie',
                        radius: '100%',
                        hoverAnimation:false,
                        center: ['82%', '50%'],
                        // selectedMode: 'single',
                        encode: {
                            itemName: 'product',
                            value: '3'
                        },
                        // data: [
                        //     {value: 535, name: '荆州'},
                        //     {value: 510, name: '兖州'},
                        //     {value: 634, name: '益州'},
                        //     {value: 735, name: '西凉'}
                        // ],
                        label:{
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 12    //文字的字体大小
                                },
                                formatter:'{d}%'     
                            }
                        },
                    }
                ]
            };
            this.chart1 = echarts.init(document.getElementById('pieo1'));
            // console.log(chart1)
            this.chart1.clear();
            this.chart1.setOption(this.pieOptions);
            // this.char1.resize({height:this.xianHeight,width:'100%;'});
          },
          //线性图
          linearC(){
            let that=this;
            this.xianHeight='height:30%';
            // console.log(this.xianHeight)
            var base = +new Date(1968, 9, 3);
            var oneDay = 24 * 3600 * 1000;
            var date = [];

            var data = [Math.random() * 300];

            for (var i = 1; i < 20000; i++) {
                var now = new Date(base += oneDay);
                date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
                data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
            }

            this.orgOptions = {
              title: {
                  // text: '产品产量分析图',
                  textStyle:{
                    fontSize: 16,//字体大小
                    color: '#ffffff'//字体颜色
                },
              },
              textStyle:{
                  title:'tls',
                  fontSize: 12,//字体大小
                  color: '#ffffff'//字体颜色
              },
              legend: {
                  data: [that.dataList[0].devname, that.dataList[1].devname, that.dataList[2].devname],
                  textStyle:{//图例文字的样式
                    color:'#fff',
                    fontSize:12
                  }
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data:that.dataTimeList,
                  axisLabel:{
                    interval:0,
                    rotate:35,//倾斜度 -90 至 90 默认为0
                    margin:12, 
                  }
                  // data: ['1小时前', '55分钟前', '50分钟前', '45分钟前', '40分钟前', '35分钟前', '30分钟前','25分钟前', '20分钟前', '15分钟前', '10分钟前', '5分钟前']//一小时前分成十二段
              },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          backgroundColor: '#6a7985'
                      }
                  }
              },
              yAxis: {
                  type: 'value',
                  // name:'生产个数',
                  nameTextStyle:{
                    // color:'#f1f1f1',
                    padding:[0,0,0,0],
                    fontSize:10,
                    fontWeight:'bold'
                  },
                  minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
                  // maxInterval: 50, //设置成1保证坐标轴分割刻度显示成整数
                  // interval: 50,
                  axisLine: { 
                    show: false,
                  },
                  axisTick: {
                    show: false
                  },
                  boundaryGap: [0, '100%']
              },
              grid: {//扩充整个
                top: '18%' ,
                bottom: '40px',
                left: '50px',
                right: '20px'
              },
              series: [{
                  name: that.dataList[0].devname,
                  data: that.prodect1,
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  sampling: 'average',
                  itemStyle: {
                      color: 'rgb(255, 70, 131)'
                  },
                  areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgb(255, 158, 68)'
                      }, {
                          offset: 1,
                          color: 'rgb(255, 70, 131)'
                      }])
                  },
              },
               {
                  name: that.dataList[1].devname,
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  sampling: 'average',
                  itemStyle: {
                      color: 'rgb(25, 137, 250)'
                  },
                  areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgb(25, 200, 120)'
                      }, {
                          offset: 1,
                          color: 'rgb(25, 137, 250)'
                      }])
                  },
                  data: that.prodect2
              },
              {
                  name: that.dataList[2].devname,
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  sampling: 'average',
                  itemStyle: {
                      color: 'rgb(145, 199, 174)'
                  },
                  areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgb(103, 230, 20)'
                      }, {
                          offset: 1,
                          color: 'rgb(145, 199, 174)'
                      }])
                  },
                  data: that.prodect3
              },
              ]
            }
            this.chart = echarts.init(document.getElementById('linears'));
            this.chart.clear();
            this.chart.setOption(this.orgOptions);
            // this.char.resize({height:this.xianHeight,width:'100%;'});
          }
      }
  }
</script>
<style scoped="scoped" lang="scss">
  @import "../../../static/scss/common";
  .broad-info{
    height: auto;
    background:  $bgc;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
    position: relative;
  }
  .xian-wapper{
    // height: 300px;
    height: 50%;
    min-height:180px;
    width: 100%;
    margin: auto;
    // margin-top: -50px;
    display: flex;
    justify-content: center;
  }
  .flex-borad-bd{
    display: flex;
    align-items: center;
    width: 100%;
    height: 92%;
    .borad-bd-wapper{
      flex: 1;
    }
  }
  .info-text{
    color: #fff;
    display: flex;
    margin: 10px 0;
    width: 100%;
    .text-list{
      flex: 1;
      .text-title{
        // min-width: 60px;
        display: inline-block;
        text-align: center;
        
      }
      p{
        padding: 2px 0;
        border-bottom: 1px dashed #176758;
        text-align: center;
      }
      p:last-child{
        border-bottom: none;
      }
    }
    .text-list{
      border-right: 1px dashed #176758;
      .timelabel-wapper{
        text-align: center;
        cursor: pointer;
        padding-left: 4px;
        .runkuai{
          width:10px;
          height: 10px;
          display: inline-block;
          background: #2f4554;
          vertical-align: middle;
          border-radius: 2px;
        }
        .daikuai{
          background: #c23531;
        }
      }
    }
    .text-list:last-child{
      border-right:none;
    }
    .cl-dy{
      color: red;
    }
    .cl-dl{
      color: greenyellow;
    }
    .cl-gl{
      color: hotpink;
    }
    .cl-dn{
      color: #2befca;
    }
  }
  .info-title{
    margin-bottom: 2px;
    color: #47e0ef;
  }
  .info-wapper{
    // padding-top: 3%;
    // height: 90%;
    display: flex;
    display: -webkit-flex;
    // justify-content: space-between;
    justify-content: center;
    // align-items:center;
    align-items:top;
    /*flex-direction: row;*/
    .infolist{
      /*display: flex;*/
      /*display: -webkit-flex;*/
      /*align-items:center;*/
      /*justify-content:center;*/
      /*margin-bottom: 14px;*/
      /*flex: 1;*/
      width: 20%;
      padding: 0 6px;
      max-width: 100px;
      .infotitle{
        color: #49edfd;
        /*width: 28%;*/
        /*padding-top: 24%;*/
        position: relative;
        span{
          /*position: absolute;*/
          /*top:50%;*/
          /*left: 50%;transform: translate(-50%,-50%);*/

        }
      }
      .infoimg{
        height: 0;
        padding-top: 100%;
        position: relative;
        margin: 10% 0;
        /*width: 96%;*/
        background: url("../../../static/images/info_01.png") no-repeat;
        background-size: 100% 100%;
        span{
          position: absolute;
          color: #7b7b7b;
          left: 50%;
          transform: translateX(-50%);
        }
        .infodai{
          top:24%;
        }
        .dai-time{
          top:46%;
          color: #00ff00;
        }
        .dai-dan{
          top:65%;
        }
      }
      .inforight{
        /*margin-left: 6%;*/
        background: url("../../../static/images/info_02.png") no-repeat;
        background-size: 100% 100%;
        .dai-time{
          color: #fff100;
        }
      }
    }
    .infolist:nth-child(2){
      margin: 0 7%;
    }
    .info-b{
      font-size: 0.062rem;
      color: #fff;
      .infotime{
        color: #ababab;
      }
      .info-active{
        color: #fff600;
      }
    }
    
    @media (max-width: 1080px) {
      .infolist{
        padding: 0 2px;
        width: 30%;
        .infoimg{
          /*width: 30%;*/
          /*padding-top: 30%;*/
        }
      }
      .infolist:nth-child(2){
        margin: 0 3%;
      }
    }
  }
</style>
