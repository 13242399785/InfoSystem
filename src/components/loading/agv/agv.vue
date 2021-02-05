<template>
  <div class="agv-wapper">
<!--    {{topList[topList.length-1]}},{{parseInt(nowTop)}}-->
    <div class="top">
      <div class="le" v-for="(titem,index) in tople" :key="index"
           :class="{'fl':index==0,'fr':index==5,'leftd':index==nowTop&&topList.length==0,'topd':topList.indexOf(index)>-1&&nowTop<7&&index===parseInt(nowTop-1),'topactive':nowTop==7,'rightd':nowTop==7,'hoveractive':topList.indexOf(index)>-1&&index!=5||topList.indexOf(6)>-1}">
      </div>
    </div>
    <div class="bottom">
      <div class="le" v-for="(bitem,index1) in bottomle" :key="index1"
           :class="{'fl':index1==0,'fr':index1==5,'rightd':nowBottom==6&&index1==5,'bottomactive':nowBottom==-1,'rightactive':nowBottom==5,'bottomd':index1===parseInt(nowBottom),'hoveractive':btoomList.indexOf(index1)>-1&&index1!=0||btoomList.indexOf(-1)>-1,'leftd':nowBottom==-1}">
      </div>
    </div>
    <p class="electricity">AGV剩余电量: <span>{{electricity}}</span>&nbsp;%</p>
    <span class="agv-text agv-kong">AGV空载路线</span>
    <span class="agv-text agv-fu">AGV负载路线</span>
    <span class="shengc shengl" :class="{'cangk':cang=='1'}">仓库</span>
    <span class="shengc shengr" :class="{'cangk':dian=='1'}">产品下料点</span>
  </div>
</template>
<script>
  export default {
      name:'agv',
      data(){
          return{
              tople:[1,2,3,4,5,6],
              nowTop:null,
              topList:[],
              bottomle:[1,2,3,4,5,6],
              nowBottom:null,
              btoomList:[],
              cang:'',
              dian:'',
              electricity:0,
              leaveRemove:false,
          }
      },
      mounted() {
          let me=this;
          this.getAgv();
          // this.Ttimer();
          // this.Btimer();
      },
      destroyed: function () {
          this.leaveRemove=true;
      },
      methods:{
          getAgv(){
              let me=this;
              this.$api.agvGet().then(res=>{
                  console.log(res)
                  let timer=setTimeout(me.getAgv,5000);
                  let t=res.data.result[0].loadroute;
                  let b=res.data.result[0].reloadroute;
                  me.electricity=res.data.result[0].energy;
                  if(parseInt(t)==1){//从产品下料点去仓库的路上
                      clearTimeout(timer)
                      me.Btimer();
                  }else if(parseInt(b)==1){//从仓库去产品下料点
                      clearTimeout(timer)
                      me.Ttimer();
                  }else if(me.leaveRemove==true){
                      console.log(me.leaveRemove)
                      me.nowTop=null;
                      me.nowBottom=null;
                      me.topList=[];
                      me.btoomList=[];
                      clearTimeout(timer)
                  }else{//两个都在0状态
                      console.log(me.leaveRemove)
                      me.nowTop=null;
                      me.nowBottom=null;
                      me.topList=[];
                      me.btoomList=[];
                  }
              }).catch((err)=>{
                  // let timer=setTimeout(me.getAgv,5000);
                  me.leaveRemove==true
              })
          },
          setTime(time){
              let me=this;
              return new Promise(function (resolve, reject) {
                  setTimeout(function () {
                      me.topList.push(me.nowTop)
                      me.nowTop++;
                      resolve();
                  }, time);
              })
              //方案二
              // let timer = setTimeout((res) => {
              //     me.topList.push(me.nowTop)
              //     me.nowTop++;
              //     clearTimeout(timer)
              //     if(me.nowTop>7){
              //         setTimeout(function(){
              //             me.nowTop=null;
              //             me.topList=[];
              //             me.dian=''
              //             //clearInterval(timer);
              //             // me.getAgv();//停止之后动起来
              //         },1000)
              //     }
              // }, time);
          },
          setTime1(time){
              let me=this;
              return new Promise(function (resolve, reject) {
                  setTimeout(function () {
                      me.btoomList.push(me.nowBottom)
                      me.nowBottom--;
                      resolve();
                  }, time);
              })

              // let timer = setTimeout((res) => {
              //     me.btoomList.push(me.nowBottom)
              //     me.nowBottom--;
              //     console.log(me.nowBottom)
              //     clearTimeout(timer)
              //     if(me.nowBottom<-1){//运行完成
              //         setTimeout(function(){
              //             // console.log(me.nowBottom)
              //             me.nowBottom=null;
              //             me.btoomList=[];
              //             me.cang=''
              //             // me.getAgv();//停止之后动起来
              //         },1000)
              //     }
              // }, time);
          },
          async Ttimer(){//上动画
              let me=this,timer;
              this.dian='1'
              me.nowTop=0;
              await this.setTime(8000);
              await this.setTime(7000);
              await this.setTime(4000);
              await this.setTime(4000);
              await this.setTime(3000);
              await this.setTime(5000);
              await this.setTime(5000);
              await this.setTime(4000);
              if(me.nowTop>7){
                  setTimeout(function(){
                      me.nowTop=null;
                      me.topList=[];
                      me.dian=''
                      //clearInterval(timer);
                      if(me.leaveRemove==true){

                      }else{
                          me.getAgv();//停止之后动起来
                      }
                  },1000)
              }

              // setTimeout(()=>me.setTime(8000),0);
              // setTimeout(()=>me.setTime(7000),8000);
              // setTimeout(()=>me.setTime(4000),15000);
              // setTimeout(()=>me.setTime(4000),19000);
              // setTimeout(()=>me.setTime(3000),23000);
              // setTimeout(()=>me.setTime(5000),26000);
              // setTimeout(()=>me.setTime(5000),31000);
              // setTimeout(()=>{//最后动画
              //     me.setTime(4000)
              // },36000);

              //方案1
              // this.nowTop=0;
              // // let me=this;
              // timer=setInterval(function(){
              //     me.topList.push(me.nowTop)
              //     me.nowTop++;
              //     if(me.nowTop>6){
              //         clearInterval(timer);
              //         me.getAgv();//停止之后动起来
              //     }
              // },5000);
          },
          async Btimer(){//下动画
              this.nowBottom=6;
              let me=this;
              this.cang='1';
              await this.setTime1(2000);
              await this.setTime1(2000);
              await this.setTime1(2000);
              await this.setTime1(2000);
              await this.setTime1(5000);
              await this.setTime1(4000);
              await this.setTime1(5000);
              await this.setTime1(4000);
              if(me.nowBottom<-1){//运行完成
                  setTimeout(function(){
                      // console.log(me.nowBottom)
                      me.nowBottom=null;
                      me.btoomList=[];
                      me.cang=''
                      if(me.leaveRemove==true){

                      }else{
                          me.getAgv();//停止之后动起来
                      }
                  },1000)
              }

              //方案二
              // setTimeout(()=>me.setTime1(2000),0);
              // setTimeout(()=>me.setTime1(2000),2000);
              // setTimeout(()=>me.setTime1(2000),4000);
              // setTimeout(()=>me.setTime1(2000),6000);
              // setTimeout(()=>me.setTime1(5000),8000);
              // setTimeout(()=>me.setTime1(4000),13000);
              // setTimeout(()=>me.setTime1(5000),17000);
              // setTimeout(()=>{//最后动画
              //     me.setTime1(4000)
              // },23000);


              //方案1
              // var Btimer=setInterval(function(){
              //     me.nowBottom--;
              //     me.btoomList.push(me.nowBottom)
              //     if(me.nowBottom<0){
              //         clearInterval(Btimer);
              //         me.getAgv();//停止之后动起来
              //     }
              // },1000*3.125);
          }
      }
  }
</script>
<style lang="scss">
  $bpx:20px;
  $ac:#4cf5ee;
  $sc:#ff4c4c;
  .agv-wapper{
    color: #00e9ff;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
    width: 80%;
    margin: auto;
    position: relative;
    font-size: 0;
    .le{width: 20%;display: inline-block;font-size: 0;height: 120px;vertical-align: top;}
    .le:first-child,.le:last-child{
      width: 11%;
    }
    .electricity{position: absolute;top:50%;left:50%;font-size: 16px;transform: translate(-50%,-50%);
      color: #fcff00;
      background: #313131;
      padding: 6px;
      span{
        border: 1px solid #ccc;
        display: inline-block;
        vertical-align: text-bottom;
        padding: 2px 8px;
      }
    }
    .agv-text{position: absolute;left: 10%;font-size: 16px;}
    .agv-kong{top:$bpx;}
    .agv-fu{bottom:$bpx;}
    .top {
      .le:first-child {
        border-top-left-radius: 80px;
        border-left: $bpx solid #ccc;
      }
      .le:last-child{
        border-top-right-radius: 80px;
        border-right: $bpx solid #ccc;
      }
      .le{border-top: $bpx solid #ccc;transition: all ease 1s;}
    }
    .hoveractive{border-color:#43daf1 !important;}
    /*.hoveractive1{border-color:#43daf1 !important;animation:none !important;}*/
    .topactive{border-top-color:#43daf1 !important;}
    .rightactive{border-right-color:#43daf1 !important;}
    .bottomactive{border-bottom-color:#43daf1 !important;}
    .bottom {
      .le:first-child {
        border-bottom-left-radius: 80px;
        border-left: $bpx solid #ccc;
      }
      .le:last-child{
        border-bottom-right-radius: 80px;
        border-right: $bpx solid #ccc;
      }
      .le{border-bottom: $bpx solid #ccc;}
    }
    .top,.bottom{position: relative;width: 100%;text-align: center;}
    .fl{position: absolute;left: 0;top:0;}
    .fr{position: absolute;right: 0;top:0;}
    .shengc{
      z-index:999;display:block;font-size:16px;position: absolute;padding: 3px 10px;border: 5px solid #1b81a9;top: 50%;
      background: #313131;
    }
    .shengl{
      border-radius: 8px;
      left: 10px;
      transform: translate(-50%,-50%);
    }
    .shengr{right:14px;transform: translate(50%,-50%);border-radius: 8px;}
  }
  /*动画*/
  .topd { /*上边框动画*/
    animation: topD 1s infinite;
    -moz-animation: topD 1s infinite;	/* Firefox */
    -webkit-animation: topD 1s infinite;
    /*animation-fill-mode : forwards;!*动画停止在最后状态*!*/
    /*-webkit-animation-fill-mode : forwards;*/
    /*animation-iteration-count:1;*/
    /*-webkit-animation-iteration-count:1; !* Safari 和 Chrome *!*/
  }
  .leftd{/*左边动画*/
    animation: tleftD 1s infinite;
    -moz-animation: tleftD 1s infinite;	/* Firefox */
    -webkit-animation: tleftD 1s infinite;
  }
  .rightd{/*左边动画*/
    animation: rightD 1s infinite;
    -moz-animation: rightD 1s infinite;	/* Firefox */
    -webkit-animation: rightD 1s infinite;
  }
  .bottomd{/*下边动画*/
    animation: bottomD 1s infinite;
    -moz-animation: bottomD 1s infinite;	/* Firefox */
    -webkit-animation: bottomD 1s infinite;
  }
  .cangk{
    animation: cang 1s infinite;
    -moz-animation: cang 1s infinite;	/* Firefox */
    -webkit-animation: cang 1s infinite;
  }
  .cangk1{
    animation: cang 1s infinite;
    -moz-animation: cang 1s infinite;	/* Firefox */
    -webkit-animation: cang 1s infinite;
  }
  /*厂库*/
  @keyframes cang {
    0% {border-color: #ff3838;}
    50% {border-color: #1b81a9;}
    100% {border-color: #ff3838;}
  }
  @-moz-keyframes cang /* Firefox */
  {
    0% {border-color: #ff3838;}
    50% {border-color: #1b81a9;}
    100% {border-color: #ff3838;}
  }
  @-webkit-keyframes cang /* Safari 和 Chrome */
  {
    0% {border-color: #ff3838;}
    50% {border-color: #1b81a9;}
    100% {border-color: #ff3838;}
  }
  /*top*/
  @keyframes topD {
    0% {border-top-color: red;}
    50%{border-top-color: #ccc;}
    100%{border-top-color:red;}
  }
  @-moz-keyframes topD /* Firefox */
  {
    0% {border-top-color: red;}
    50%{border-top-color: #ccc;}
    100%{border-top-color:red;}
  }
  @-webkit-keyframes topD /* Safari 和 Chrome */
  {
    0% {border-top-color: red;}
    50%{border-top-color: #ccc;}
    100%{border-top-color:red;}
  }
  /*right*/
  @keyframes rightD {
    0% {border-right-color: red;}
    50%{border-right-color: #ccc;}
    100%{border-right-color:red;}
  }
  @-moz-keyframes rightD /* Firefox */
  {
    0% {border-right-color: red;}
    50%{border-right-color: #ccc;}
    100%{border-right-color:red;}
  }
  @-webkit-keyframes rightD /* Safari 和 Chrome */
  {
    0% {border-right-color: red;}
    50%{border-right-color: #ccc;}
    100%{border-right-color:red ;}
  }
  /*bottom*/
  @keyframes bottomD {
    0% {border-bottom-color: red;}
    50% {border-bottom-color: #ccc;}
    100%{border-bottom-color:red;}
  }
  @-moz-keyframes bottomD /* Firefox */
  {
    0% {border-bottom-color: red;}
    50% {border-bottom-color: #ccc;}
    100%{border-bottom-color:red;}
  }
  @-webkit-keyframes bottomD /* Safari 和 Chrome */
  {
    0% {border-bottom-color: red;}
    50% {border-bottom-color: #ccc;}
    100%{border-bottom-color:red;}
  }
  /*tleftD*/
  @keyframes tleftD {
    0% {border-left-color: red;}
    50% {border-left-color: #ccc;}
    100%{border-left-color: red;}
  }
  @-moz-keyframes tleftD /* Firefox */
  {
    0% {border-left-color: red;}
    50% {border-left-color: #ccc;}
    100%{border-left-color: red;}
  }
  @-webkit-keyframes tleftD /* Safari 和 Chrome */
  {
    0% {border-left-color: red;}
    50% {border-left-color: #ccc;}
    100%{border-left-color: red;}
  }
/*  phone*/
  @media (max-width:1023px) {
    .agv-wapper{
      width: 90%;
      .le{width: 15%;}
      .le:first-child,.le:last-child{
        width: 21%;
      }
      .shengc{font-size: 0.16rem;padding: 0.01rem 0.04rem;}
      .shengl{left: 12px;}
      .shengr{right: 22px;}
      .agv-text{
        left: 16%;
        font-size: 0.16rem;
      }
      .electricity{
        font-size: 0.16rem;
        right: -0.1rem;
      }
    }
  }
</style>
