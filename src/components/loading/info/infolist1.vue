<template>
  <div class="broad-info">
    <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 设备信息</span></p>
    <div class="info-wapper">
      <div class="infolist" v-for="item in dataList">
        <p class="infotitle"><span>切割设备</span></p>
        <div class="infoimg" >
          <span class="infodai">待机</span>
          <span class="dai-time">1654.64</span>
          <span class="dai-dan">h</span>
        </div>
        <div class="infoimg inforight">
          <span class="infodai">待机</span>
          <span class="dai-time">1654.64</span>
          <span class="dai-dan">h</span>
        </div>
      </div>
      <p class="info-b"><span class="infotime">2019/12/20 12:04:56</span>  客户订单 WO20160910001 有产品正在进行 <span class="info-active">打标</span></p>
      <p class="info-b"><span class="infotime">2019/12/20 12:04:56</span>  客户订单 WO20160910001 有产品正在进行 <span class="info-active">打标</span></p>
    </div>
  </div>
</template>
<script>
  export default {
      name:'infolist',
      data(){
          return{
            dataList:[1,2,3,4,5]
          }
      }
  }
</script>
<style scoped="scoped" lang="scss">
  @import "../../../static/scss/common";
  .broad-info{
    height: 100%;
    background: #383838;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
    position: relative;
  }
  .info-wapper{
    padding-top: 3%;
    height: 90%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    .infolist{
      display: flex;
      display: -webkit-flex;
      align-items:center;
      justify-content:center;
      margin-bottom: 14px;
      flex: 1;
      .infotitle{
        color: #49edfd;
        width: 28%;
        /*padding-top: 24%;*/
        position: relative;
        margin-left: -6%;
        span{
          position: absolute;
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .infoimg{
        height: 0;
        padding-top: 22%;
        position: relative;
        width: 22%;
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
        margin-left: 6%;
        background: url("../../../static/images/info_02.png") no-repeat;
        background-size: 100% 100%;
        .dai-time{
          color: #fff100;
        }
      }
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
        .infoimg{
          width: 30%;
          padding-top: 30%;
        }
      }
    }
  }
</style>
