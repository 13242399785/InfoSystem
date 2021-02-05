<template>
  <!-- 动画-->
  <transition name="confirm-fade">
  <!--封装弹出层组件-->
  <div class="dialog-wapper" v-if="dialogShow">
      <div class="shade">
        <div class="dialog-top">
          <span>提示</span>
          <span class="dialog-clone" @click="cancel">
            <i class="iconfont">&#xe60b;</i>
          </span>
        </div>
        <p class="dialog-content">
          <i class="iconfont info">&#xe68c;</i>
          {{content}}
        </p>
        <div class="dialog-btn">
          <button class="btn-common btn-sure" @click="masksure">确定</button>
          <button class="btn-common btn-cancel" @click="cancel">取消</button>
        </div>
      </div>
  </div>
  </transition>
</template>
<script>
  export default {
      data(){
          return {
              text:'确定信息无误并提交订单？',
              dialogShow:false
          }
      },
      props:{
          show:{
              type:Boolean,
              default:false,
              required:true
          },
          content:{
              type: String,
              required: true,
          },
      },
      watch:{
          show(val){
              if(val===true){
                  this.dialogShow=true;
              }else{
                  this.dialogShow=false;
              }
          },

      },
      methods:{
          cancel(){
              // this.dialogShow=false;
              this.$emit('cancel', false);
          },
          masksure(){
              this.$emit('masksure',false)
          }
      },
      mounted() {
      }
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
  .dialog-wapper{
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
    font-size: 16px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
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
      transform: translate(-50%,-50%);
      box-shadow: 0 0 10px #ffffff;
    }
    .dialog-top{
      background: #e60012;
      color: #fff;
      padding: 15px 20px;
      text-align: left;
      position: relative;
    }
    .dialog-clone{float: right;font-size: 20px;}
    .dialog-content{
      text-align: center;
      padding: 28px 0;
      color: #585858;
      .info{
        color: #e6a23c;
        font-size: 24px;
      }
    }
    .dialog-btn{text-align: right;padding:20px;padding-top: 0;
      .btn-common{
        padding: 10px 15px;
        border-radius: 8px;
      }
      .btn-sure{
        background: #5bc0de;
        margin-right: 8px;
      }
      .btn-cancel{
        background: #aaa;
      }
    }

  }
  @media (max-width: 1081px) {
    .dialog-wapper{
      .shade{
        width: 90%;
        border-radius: 8px;
        overflow: hidden;
      }
      .dialog-btn{
        /*text-align: center;*/
        /*.btn-sure{margin-right: 40px;}*/
      }
    }
  }
</style>
