<template>
  <!-- 动画-->
  <transition name="confirm-fade">
    <!--封装弹出层组件-->
    <div class="loading-wapper" v-show="show">

      <div class="shade">
        <img src="../../../static/images/loading.gif" alt="">
        <p>{{context}}</p>
      </div>
    </div>
  </transition>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        props:{
            show:{
                type:Boolean,
                // default:false,
                // required:true
            },
            context:{
                type: String,
                // default:'加载中',
                // required: true,
            },
        },
    }
</script>
<style lang="scss">
  /* 进入和出去的动画 */
  .confirm-fade-enter-active {
    animation: opacity 0.3s;
  }
  .confirm-fade-enter-active .confirm-content-wrap {
    animation: scale 0.3s;
  }
  .confirm-fade-leave-active {
    animation: outOpacity 0.2s;
  }
  /* 进来的动画 */
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes scale {
    0% {
      transform: scale(0);
    }
    60% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  /* 出去的动画 */
  @keyframes outOpacity {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .loading-wapper{
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
    font-size: 16px;
    width: 100%;
    height: 100%;
    /*background: rgba(0,0,0,.2);*/
    z-index: 199999;
    left: 0;
    position: fixed;
    text-align: center;
    top: 0;
    .shade{
      width: 360px;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      padding: 100px 0;
      border-radius: 10px;
      transform: translate(-50%,-50%);
      box-shadow: 0 0 10px #ccc;
      background: rgba(0,0,0,.1);
      p{margin-top: 6px;color: #ccc}
    }
  }
  @media (max-width: 1081px) {
    .loading-wapper{
      .shade {
        width: 60%;
        padding: 50px 0;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }
</style>
