<template>
  <div class="warehouse clearfix">
    <div class="real-wapper">
      <p class="warehouse-title shuru wap1"><i class="iconfont">&#xe605;</i><span>原材料仓库实时状况</span></p>
      <div class="cangreal wap1">
        <ul class="warehouse-wapper">
          <li v-for="(item,index) in allData" :key="index" :class="{'active-at':item.m==1}"><span class="cite-here">位置{{item.num}}</span></li>
        </ul>
      </div>
    </div>
    <div class="real-wapper">
      <p class="warehouse-title shuru wap2"><i class="iconfont">&#xe605;</i><span>成品仓库实时状况</span></p>
      <div class="cangreal wap2">
        <ul class="warehouse-wapper">
          <li v-for="(item1,index1) in allData" :key="index1" :class="{'active-at':item1.p==1}"><span class="cite-here">位置{{item1.num}}</span></li>
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
              cang:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
              allData:[],
              timer:null
          }
      },
      mounted(){
          this.getReal();
      },
      destroyed(){
          clearTimeout(this.timer)
      },
      methods:{
          getReal(){
              let me=this;
              this.$api.realGet(this.formList).then((res)=>{
                  me.allData=res.data.result;
                  console.log(res.data.result)
              })
              clearTimeout(me.timer)
              me.timer=setTimeout(me.getReal,5000);
          }
      }
  }
</script>
<style lang="scss" scoped="scoped">
  .warehouse{height:auto;width: 100%;display: flex;justify-content: center;margin-bottom: 40px;}
  .real-wapper{width: 46%;}
  .cangreal{padding: 16px;border: 1px solid #7eb2bb;}
  .wap1{margin-right: 10px;}
  .wap2{margin-left: 10px;}
  .warehouse-wapper{
    display: flex;
    flex-wrap:wrap-reverse;
    font-size: 0;
    li{
      font-size: 12px;
      width: 33.33%;
      margin-bottom: 12px;
      height: 30px;
      line-height: 30px;
      text-align: right;
      padding: 0 16px;
      position: relative;
    }
    li:first-child,li:nth-child(1),li:nth-child(2),li:nth-child(3){
      margin-bottom: 0;
    }
    li::after{
      position: absolute;
      left: 30%;
      transform: translateX(-50%);
      width: 40%;
      height:100%;
      content:'';
      background: #ccc;
    }
    .active-at::after{
      position: absolute;
      left: 30%;
      transform: translateX(-50%);
      width: 40%;
      height:100%;
      content:'';
      z-index: 11;
      background: #f14096;
      box-shadow: inset 0 0 8px #fff;
    }
    .cite-here{
      position: absolute;
      left: 52%;
    }
  }

  .warehouse-title{
    /*font-size: 20px;*/
    margin-bottom: 6px;
    text-align: left;
    i{
      vertical-align: middle;
      font-size: 28px;
    }
    span{vertical-align: middle}
  }
  @media (max-width: 1081px) {
    .warehouse{display: block;}
    .real-wapper{width: 100%;}
    .warehouse-wapper{
      li{height: 25px;line-height: 25px;margin-bottom: 6px;}
    }
    .wap1,.wap2{margin:0 10px;}
    .shuru{font-size: 16px;
      i{font-size: 20px;}
    }
    .shuru{font-size: 18px;text-align: left;padding: 4px 15px;background: #b2c9d2;}
    .cangreal{padding: 6px;}
  }
</style>
