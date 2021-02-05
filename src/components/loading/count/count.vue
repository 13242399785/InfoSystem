<template>
  <div class="count-wapper" ref="counts">
    <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 生产统计</span></p>
    <div class="flex-box">
      <div class="flex-center-t">
        <div class="count-countent">
          <div class="count-title">
            累计生产：{{allCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br v-show="phoneShow"/>
            <!-- <span class="count-hege">合格品：{{dataAll.passproduct}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br v-show="phoneShow"/>
            <span class="count-nohege">不合格品：{{dataAll.failproduct}}</span> -->
          </div>
          <div class="bing-wapper" style="">
            <div class="ectop border-ri" id="counted"></div>
            <div class="ectop ectop1" id="counted1"></div>
          </div>
          <!-- <div class="ectop" id="counted">

          </div> -->
          <div class="count-title count-title-mt">
            <span>工单总数:{{orderCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <span>合格率:{{yields.toFixed(2)}}%</span> -->
          </div>
          <div class="progress-list">
    <!--        <circles v-if="isShow"-->
    <!--                 ref="count"-->
    <!--                 class="progress"-->
    <!--                 key="duration-model"-->
    <!--                 :isAnimation="false"-->
    <!--                 :isRound="true"-->
    <!--                 :width="width"-->
    <!--                 :radius="radius"-->
    <!--                 :progress="currentTime / durationTime * 100"-->
    <!--                 :barColor="barColor"-->
    <!--                 :duration="duration"-->
    <!--                 :delay="delay"-->
    <!--                 :timeFunction="timeFunction"-->
    <!--                 :backgroundColor="backgroundColor">-->
    <!--        </circles>-->
            <div class="progress-wapper">
              <color-progress :baseWidth="3" :isShowPoint='true' :pointRadius="10" :fontSize="12" :lineWidth="12" :circleRadius="width" :pointColor="barColor" :progress="zeroT(rateList.complete)" :baseColor="backgroundColor" :lineColor="barColor" :graColor="colorList"> </color-progress>
              <span class="progress-title complete_c">已完成</span>
              <span class="posi-w">{{rateListText[0]}}</span>
            </div>
            <div class="progress-wapper">
              <color-progress :baseWidth="3" :isShowPoint='true' :pointRadius="10" :fontSize="12" :lineWidth="12" :circleRadius="width" :pointColor="barColor1" :progress="zeroT(rateList.submit)" :baseColor="backgroundColor" :lineColor="barColor1" :graColor="colorList1"> </color-progress>
              <span class="progress-title submit_c">已提交</span>
              <span class="posi-w">{{rateListText[1]}}</span>
            </div>
            <div class="progress-wapper">
              <color-progress :baseWidth="3" :isShowPoint='true' :pointRadius="10" :fontSize="12" :lineWidth="12" :circleRadius="width" :pointColor="barColor2" :progress="zeroT(rateList.run)" :baseColor="backgroundColor" :lineColor="barColor2" :graColor="colorList2"> </color-progress>
              <span class="progress-title alive_c">运行中</span>
              <span class="posi-w">{{rateListText[2]}}</span>
            </div>
            <div class="progress-wapper">
              <color-progress :baseWidth="3" :isShowPoint='true' :pointRadius="10" :fontSize="12" :lineWidth="12" :circleRadius="width" :pointColor="barColor3" :progress="zeroT(rateList.fail)" :baseColor="backgroundColor" :lineColor="barColor3" :graColor="colorList3"> </color-progress>
              <span class="progress-title cancel_c">已作废</span>
              <span class="posi-w">{{rateListText[3]}}</span>
            </div>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
    import Vue from 'vue'
    import circles from '../cricle/circle'
    // import echarts from 'echarts'
    import ColorProgress from 'vue-color-progress'
    // Vue.use(echarts)
  export default{
      name:'count',
      components:{circles,ColorProgress},
      data(){
          return{
              isDurationModel: true, // 是否打开持续缓动模式
              isShow: true,
              width: 20,
              radius: 6,
              progress: 70,
              duration: 1000,
              delay: 20,
              barColor: '#00ff00',
              barColor1: '#00baff',
              barColor2: '#fff100',
              barColor3: '#ff00ff',
              colorList:['#00ff00','#fff100'],
              colorList1:['#00baff','#00baff'],
              colorList2:['#fff100','#fff100'],
              colorList3:['#ff00ff','#ff00ff'],
              backgroundColor: '#434343',
              orderCount:0,//生产总数
              yields:0,//合格率
              rateList:{
                  fail: 0,
                  submit: 0,
                  run: 0,
                  complete:0,
              },//列表
              rateListText:['0%','0%','0%','0%'],
              jindutext:'60%',
              showPoint:true,
              timeFunction: 'cubic-bezier(0.99, 0.01, 0.22, 0.94)',
              intervalTimer: null, // 持续模式，循环计时器
              currentTime: 20, // 当前时间
              durationTime: 100, // 持续模式总时长
              allCount:'',
              orgOptionsList:[//左边图形数据
                  // {value:0, name:'小树吊牌'},
                  // {value:0, name:'风车吊牌'},
                  // {value:0, name:'星月吊牌'},
                  {value:0, name:'合格'},
                  {value:0, name:'不合格'},
                  {value:0, name:'其它'},
              ],
              orgOptionsListR:[//右边图形数据
                  // {value:0, name:'小树吊牌'},
                  // {value:0, name:'风车吊牌'},
                  // {value:0, name:'星月吊牌'},
                  {value:0, name:'小接线柱不合格'},
                  {value:0, name:'大接线柱不合格'},
                  {value:0, name:'大小接线柱均不合格'},
              ],
              orgOptions:'',
              orgOptions1:'',
              phoneShow:false,
              proTimer:null,
              dataAll:{
                "allcomplete": 0,     //产品总数
                "passproduct": 0,     //合格产品
                "failproduct": 0,     //不合格产品
                "other": 0,           //其他
                "passproductper": 0,  //合格率百分比
                "failproductper": 0   //不合格率百分比
              }
          }
      },
      updated(){
          // let ele = document.getElementsByClassName("canvas);
          // console.log(ele)
      },
      mounted(){
          // this.getPro();
          // this.getYield();
          // this.countList();
          // this.getOrderList();
          let w=document.body.clientWidth||document.documentElement.clientWidth;
          let countWidth= this.$refs.counts.offsetWidth;
          if(w>1080){
              this.width=countWidth*0.07;
              this.phoneShow=false;
          }else{
            this.phoneShow=true
              this.width=countWidth*0.14;
          }
          // this.getOption()
          // this.getOption1()
          // this.getDisqualification();
          this.allGotime();
      },
      created(){
        window.addEventListener('resize', this.resizeOption);
      },
      methods:{
          //过滤进度比率
          zeroT(num){
            if(parseInt(num)==0||typeof(num)!='number'){
              return parseInt(1)
            }else{
              return parseInt(num)
            }
          },
          allGotime(){
            let me=this;
            this.getPro();
            this.countList();
            me.getOption()
            me.getOption1()
            me.getOrderList();
            this.getDisqualification();
            clearTimeout(me.proTimer)
            me.proTimer=setTimeout(me.allGotime,10000);
          },
          resizeOption(){
            this.getOption();
            
            // this.getOption1();
            let w=document.body.clientWidth||document.documentElement.clientWidth;
            if(w>1080){
              let countWidth= this.$refs.counts.offsetWidth;
                this.width=countWidth*0.07;
                this.phoneShow=false;
            }else{
              let countWidth= this.$refs.counts.offsetWidth;
              this.phoneShow=true
                this.width=countWidth*0.14;
            }
            // console.log(this.phoneShow)
          },
          getOption(){
              let me=this;
              this.orgOptions={
                  tooltip: {
                      trigger: 'item',
                          formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                  title:'',
                  grid:{  
                    left:"3%",  
                    right:"4%",  
                    bottom:"3%",  
                    containLabel:true  
                  },  
                  legend:{ 
                    x: 'left',
                    y: 'top',
                    // formatter:"{name}",
                    formatter: function(name){//修改方法显示名称+值
                      let index=0;
                      var clientName = ['合格','不合格','其它'];
                      var clientValue=[me.dataAll.passproduct,me.dataAll.failproduct,me.dataAll.other]
                          clientName.forEach(function(v,i){
                            if(v==name){
                              index=i
                            }
                          })
                      return name+':'+clientValue[index]
                    },
                    padding:[0,0,0,0],
                    orient: 'vertical',//垂直显示
                    textStyle:{
                        fontSize: 12,//字体大小
                        color: '#ffffff'//字体颜色
                    },
                  },
                  
                  series: [
                      {
                          name:'',
                          type:'pie',
                          center: ['50%','66%'],
                          radius: ['50%', '65%'],
                          avoidLabelOverlap: false,
                          // labelLine: {
                          //     normal: {
                          //         show : true,
                          //         formatter: " {d}% \n {b} "
                          //     }
                          // },
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
                          data:this.orgOptionsList,
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              },
                              normal:{
                                  color:function(params) {
                                      //自定义颜色
                                      var colorList = [
                                          '#ff759d', '#f70000', '#ffc600', '#00fff3', '#FF0000', '#FE8463',
                                      ];
                                      return colorList[params.dataIndex]
                                  }
                              }
                          }
                      }
                  ]
              }
              this.chart = echarts.init(document.getElementById('counted'));
              this.chart.clear();
              this.chart.setOption(this.orgOptions);
          },
          getOption1(){
              let me=this;
              this.orgOptions1={
                  tooltip: {
                      trigger: 'item',
                          formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                  legend:{ 
                    x: 'right',
                    y: 'top',
                    // formatter:"{name}",
                    formatter: function(name){//修改方法显示名称+值
                      let index=0;
                      var clientName = [me.orgOptionsListR[0].name,me.orgOptionsListR[1].name,me.orgOptionsListR[2].name];
                      var clientValue=[me.orgOptionsListR[0].value,me.orgOptionsListR[1].value,me.orgOptionsListR[2].value]
                          clientName.forEach(function(v,i){
                            if(v==name){
                              index=i
                            }
                          })
                      return name+':'+clientValue[index]
                    },
                    padding:[0,0,0,0],
                    orient: 'vertical',//垂直显示
                    textStyle:{
                        fontSize: 12,//字体大小
                        color: '#ffffff'//字体颜色
                    },
                  },
                  
                  series: [
                      {
                          name:'',
                          type:'pie',
                          radius: ['50%', '65%'],
                          center: ['50%','66%'],
                          avoidLabelOverlap: false,
                          labelLine: {
                              normal: {
                                  show : true,
                                  formatter: " {d}% \n {b} "
                              }
                          },
                          label:{
                            normal:{
                                show:true,
                                position:'inside', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 12    //文字的字体大小
                                },
                                formatter:' {d}%'   
                                // {b}：{c}  
                            }
                          },
                          data:this.orgOptionsListR,
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              },
                              normal:{
                                  color:function(params) {
                                      //自定义颜色
                                      var colorList = [
                                          '#49edfd', '#ffc600',  '#FE8463',
                                      ];
                                      return colorList[params.dataIndex]
                                  }
                              }
                          }
                      }
                  ]
              }
              this.chart = echarts.init(document.getElementById('counted1'));
              this.chart.clear();
              this.chart.setOption(this.orgOptions1);
          },
          //获取生产
          getPro(){
              let me=this;
              this.$api.getProduction().then(res=>{    
                // console.log(res.data.result)       
                  me.allCount=res.data.result.allcomplete;
                  me.dataAll=res.data.result;
                  me.orgOptionsList[0].value=res.data.result.passproduct;
                  me.orgOptionsList[1].value=res.data.result.failproduct;
                  me.orgOptionsList[2].value=res.data.result.other;
                  // console.log(me.orgOptionsList[2].value)
                  me.getOption();
                  // me.orgOptionsList[1].value=res.data.result.moonpro;
                  // me.orgOptionsList[2].value=res.data.result.windmillpro;
                  // me.orgOptionsList[3].value=res.data.result.allcomplete;
                  
                  // console.log(me.orgOptionsList)
              })
              
          },
          //获取工单总数
          getOrderList(){
              let me=this;
              this.$api.ListGet().then(res=>{
                  me.orderCount=res.data.result.length
                  // console.log(res)
              }).catch((err)=>{
                  console.log(err)
              })
          },
          //已完成合格率
          // getYield(){
          //     let me=this;
          //     this.$api.percentPass().then(res=>{
          //       // console.log(res.data)
          //         me.yields=res.data.result;
          //     }).catch((err)=>{
          //     })
          // },
          //获取比率
          countList(){
              let me=this;
              this.$api.rateKey().then(res=>{
                  let data=res.data.result;
                  setTimeout(()=>{
                    me.rateList=data;//当前比率值
                    // console.log(me.rateList)
                  },200)
                  
                  // console.log(((data.fail).toFixed(2)))
                  let text=[(data.complete).toFixed(2)+'%',(data.submit).toFixed(2)+'%',(data.run).toFixed(2)+'%',(data.fail).toFixed(2)+'%'];
                  me.rateListText=text;
              })
          },
          //获取不合格产品比率
          getDisqualification(){
            let me=this;
              this.$api.getDisqualification().then(res=>{
                  me.orgOptionsListR[0].value=res.data.result.smallAndBigBindingPostFail;
                  me.orgOptionsListR[1].value=res.data.result.bigBindingPostFail;
                  me.orgOptionsListR[2].value=res.data.result.smallBindingPostFail;
                  // console.log(res.data.result)
                  me.getOption1();
              })
          },
          canvasWidth(){
              let me=this;
              var h = document.documentElement.clientHeight || document.body.clientHeight;

          }
      }
  }
</script>
<style lang="scss" scoped="scoped">
  .count-wapper{
    height: 100%;
    font-size: 14px;
    color: #fff;
    .flex-box{
      display: flex;
      align-items: center;
      height: 92%;
      width: 100%;
      .flex-center-t{
        width: 100%;
      }
    }
    .count-countent{
      padding: 4%;
      // padding: 25px;
      }
    .count-title{
      text-align: left;
      margin-bottom: 12px;
      // margin-top: 5%;
    }
    .count-title-mt{
      margin-top: 2%;
    }
    .progress-list{
      // padding-top: 18px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      .progress{display: inline-block;}

    }
    .progress-wapper{
      position: relative;
      margin-bottom: 8px;
      .progress-title{
        position: absolute;
        bottom: -20px;
        width: 100%;
        // color: #55bcc4;
        left: 50%;
        transform: translateX(-50%);
      }
      .posi-w{
        position: absolute;
        left:50%;
        top:50%;
        font-size:12px;
        color: #29d1ef;
        transform: translate(-50%,-50%);

      }
    }
    .count-hege{
      color: #ff759d;
    }
    .count-nohege{
      color: #f70000;
    }
    
    .canvas{
      /*width: 100px;*/
      /*height: 100;*/
    }
    .bing-wapper{
      max-height: 400px;
      // height:170px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom:1px solid #5babb0;
    }
    .border-ri{
      border-right:1px solid #5babb0;
    }
    .ectop{
      width: 98%;
      max-width: 500px;
      max-height: 400px;
      height:200px;
      margin: auto;
      padding-bottom: 1%;
    }
    .echarts{
      width: 100%;
      height: 100%;
    }
    @media (max-width: 1081px) {
      .progress-wapper{
        margin-bottom: 20px;
      }
      .border-ri{
        border-right: none;
      }
      .bing-wapper{
        display: block;
        #counted1{
          padding-top: 20px;
          border-top:1px solid #5babb0;
        }
      }
    }
  }
</style>
