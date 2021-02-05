<template>
  <!-- @click="Switching" title="点击可切换方案" -->
  <div class="warehouse clearfix" :style="yuanS" ref="warehouse">
    <!-- <div class="mokeswitch" :class="switchshow?'mokeswitch-hide':''">
      点击可切换
    </div> -->
    <!-- <div class="posilist">切换方案</div> -->
    <div class="real-wapper cleargix">
      <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 原材料仓库实时信息</span></p>
      <div class="cangreal wap1">
        <ul class="warehouse-wapper yuan-home" :class="scheme==1?'control-lih':''">
          <li class="" v-for="(item,index) in cang" :key="index" :class="{'active-at':item.m==1}"><span class="cite-here">{{getzero(item.num)}}</span></li>
        </ul>
      </div>
    </div>
    <!-- <div class="real-wapper" v-show="scheme==0">
      <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 原材料仓库实时信息</span></p>
      <div class="cangreal wap1">
        <ul class="warehouse-wapper yuan-home" :class="scheme==0?'control-lih':''">
          <li class="" v-for="(item,index) in cang" :key="index" :class="{'active-at':item.m==1}"><span class="cite-here">{{getzero(item.num)}}</span></li>
        </ul>
      </div>
    </div> -->
    <div class="real-wapper" v-show="scheme==1">
      <p class="warehouse-titles wap2"><i class="iconfont">&#xe605;</i><span> 成品仓库实时信息</span></p>
      <div class="cangreal wap2">
        <ul class="warehouse-wapper cang-home" :class="scheme==1?'control-lih':''">
          <li v-for="(item1,index1) in cang" :key="index1" :class="{'active-at':item1.p==1}"><span class="cite-here">{{getzero(item1.num)}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        name:'warehouse',
        data(){
            return{
                cang:[
                    {m:0,num:1,p:0},{m:0,num:2,p:0},{m:0,num:3,p:0},{m:0,num:4,p:0},{m:0,num:5,p:0},{m:0,num:6,p:0},{m:0,num:7,p:0},{m:0,num:8,p:0},{m:0,num:9,p:0},
                    // {m:0,num:10,p:0},{m:0,num:11,p:0},{m:0,num:12,p:0},{m:0,num:13,p:0},{m:0,num:14,p:0},{m:0,num:15,p:0},{m:0,num:16,p:0},{m:0,num:17,p:0},{m:0,num:18,p:0},
                ],
                cang1:[{m:0,num:1,p:0},{m:0,num:2,p:0},{m:0,num:3,p:0},{m:0,num:4,p:0},{m:0,num:5,p:0},{m:0,num:6,p:0},{m:0,num:7,p:0},{m:0,num:8,p:0},{m:0,num:9,p:0},],
                allData:[],
                timer:null,
                yuanS:'',
                cangList:{},
                scheme:1,
                switchshow:true
            }
        },
        mounted(){
            this.getReal();
            let me=this;
            // this.switchshow=true;
            setTimeout(function(){
              me.switchshow=false;
            },1000)
            let w=document.body.clientWidth||document.documentElement.clientWidth;
            let height= this.$refs.warehouse.offsetHeight;  //100
            if(w>1080){
                // this.yuanS='margin-top:-'+height+'px';
            }else{
                // this.width=countWidth*0.14;
            }

        },
        destroyed(){
            clearTimeout(this.timer)
        },
        methods:{
          // 切换方案
          Switching(){
            if(this.scheme==0){
              this.cang=this.cangList.planBList
              // this.cang=this.cang
              this.scheme=1
            }else{
              this.cang=this.cangList.planAList
              // this.cang=this.cang
              this.scheme=0
            }
            // console.log(this.scheme)
            // console.log('切换方案')
          },
          getReal(){ 
              let me=this;
              this.$api.realGet(this.formList).then((res)=>{
                  if(res.data.result==undefined||res.data.result==[]||res.data.result.length==0){
                      return false
                  }else{
                      me.cangList=res.data.result;
                      if(me.scheme==1){
                        me.cang=res.data.result.planAList;
                      }else{
                        me.cang=res.data.result.planBList;
                      }
                      
                  }
                  // console.log(me.cang)
              })
              clearTimeout(me.timer)
              me.timer=setTimeout(me.getReal,5000);
          },
          getzero(num){
              if(parseInt(num)<10){
                  num='0'+num;
                  return num;
              }else{
                  return num;
              }
          }
        }
    }
</script>
<style lang="scss" scoped="scoped">
  @import "../../../static/scss/common";
  .warehouse{height:100%;width: 100%;display: flex;justify-content: center;-moz-user-select:none;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    position: relative;
    .mokeswitch{
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.3);
      font-size: 16px;
      color:#fff;
      padding-top: 190px;
      z-index: 999;
      transition: all ease .8s;
      opacity: 0;
      text-align: center;
    }
    .mokeswitch-hide{
      opacity: 1;
    }
    // .posilist{
    //   position: absolute;
    //   top: 0;
    //   left: 50%;
    //   transform: translateX(-50%);

    // }
  }
  .warehouse:hover .mokeswitch{
    opacity: 1;
  }
  .real-wapper{width: 100%;height: 100%;overflow: hidden;}
  .cangreal{
    height:93.5%;
    ul{
      height: 100%;
    }
  }
  .wap1{
    margin-right: 4px;
  }
  .wap2{margin-left: 4px;}
  
  .warehouse-wapper{
    display: flex;
    flex-wrap:wrap-reverse;
    font-size: 0;
    
    li{
      font-size: 12px;
      width: 33.33%;
      margin-bottom: 1px;
      height: 58px;
      line-height: 30px;
      text-align: right;
      position: relative;
      background-color:  $bgc;
      // border: 0.5px solid #13b5b1;
    }
    li:first-child,li:nth-child(1),li:nth-child(2),li:nth-child(3){
      margin-bottom: 0;
    }
    li:nth-child(3n-1)::before{
      position: absolute;
      width: 1px;
      left: 0;
      background-color: #13b5b1;
      height:100%;
      content:'';
    }
    li:nth-child(3n-1)::after{
      position: absolute;
      width: 1px;
      right: 0;
      background-color: #13b5b1;
      height:100%;
      content:'';
    }
    .cite-here{
      position: absolute;
      left: 2px;
      top:0;
      color: #47e0ef;
    }
  }
  .yuan-home{
    li{
      background: url("../../../static/images/yuan_off.png") no-repeat;
      background-position:center center;
      background-size:auto 100%;
      background-color: $bgc;
    }
    .active-at{
      background: url("../../../static/images/yuan_on.png") no-repeat;
      background-position:center center;
      background-size:auto 100%;
      background-color:  $bgc;
    }
  }
  .cang-home{
    li{
      background: url("../../../static/images/cang_off.png") no-repeat;
      background-position:center center;
      background-size:auto 100%;
      background-color:  $bgc;
    }
    .active-at{
      background: url("../../../static/images/cang_on.png") no-repeat;
      background-position:center center;
      background-size:auto 100%;
      background-color:  $bgc;
    }
  }
  .control-lih{
    li{
      height: 117px;
      height: 160px;
      height: 33.33%;
      background-size: auto 40%;
    }
    .active-at{
      background-size: auto 40%;
    }
    li:nth-child(3n-1)::before{
      position: absolute;
      width: 1px;
      left: 0;
      background-color: #13b5b1;
      height:100%;
      content:'';
    }
  }
  @media (max-width: 1081px) {
    .warehouse{display: block;}
    .real-wapper{width: 100%;}
    .warehouse-wapper{
      li{height: 44px;background-size: auto 70%;}
    }
    .wap1,.wap2{margin:0 0px;}
    .shuru{font-size: 16px;
      i{font-size: 20px;}
    }
    .shuru{font-size: 18px;text-align: left;padding: 4px 15px;background: #b2c9d2;}

  }
</style>
