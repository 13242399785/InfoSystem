<template>
  <div class="present">
    <toptitle></toptitle>
    <div class="content-wapper">
      <div class="btn-posi">
        <p class="sub-success">
          <i class="iconfont icon-success">&#xe61c;</i>
          <span>订单提交成功！</span>
        </p>
        <router-link to="/"><button class="btn-common sub-pad">返回首页</button></router-link>
        <button class="btn-common" @click="getList">查看订单</button>
      </div>
    </div>
  </div>
</template>
<script>
    import toptitle from './toptitle/toptitle'
    export default{
        name:'present',
        components:{toptitle},
        data(){
            return{
                dititle:'正在加载中',
                showDialog:true
            }
        },
        methods:{
            getList(){
                this.$router.push('orderlist')
            }
        }
    }
</script>
<style lang="scss" scoped>
  @import "../../static/scss/common";
  .present{
    height: 100%;
  }
  .content-wapper{
    height: 80%;
    margin: auto;
    width:97%;
    background: #fff;
    text-align: center;
    position: relative;
    .btn-posi{
      padding-top: 12%;
      /*position: absolute;*/

    }
  }
  .sub-success{
    font-size: 30px;
    padding-bottom: 48px;
    .icon-success{
      color: #23ad39;
      font-size: 34px;
    }
  }
  .sub-pad{margin-right:20px;}
  @media (max-width: 1080px) {

    .sub-success{font-size: 20px;
      .icon-success{font-size: 26px;}
    }
  }
</style>
