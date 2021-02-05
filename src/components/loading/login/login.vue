<template>
  <div class="login">
    <!-- <toptitle ></toptitle> -->
    <div class="posititle">
      <div class="top-title">
        <img :src="loginI" alt="">
        <span>{{stName}}</span>
      </div>
    </div>
    <!--<img src="@/static/images/loginbg.png" alt="">-->
    <!--from-->
    <div class="login-from">
      <p class="login-title">用户登录</p>
      <div class="login-input">
        <span><i class="iconfont">&#xe636;</i></span>
        <input type="text" placeholder="用户名" @blur="blurtop" v-model="user.userName">
      </div>
      <div class="login-input margin-tow">
        <span><i class="iconfont">&#xe6b4;</i></span>
        <input type="password" placeholder="密码" @blur="blurtop" v-model="user.password">
        <a class="foget" title="密码提示" @click="fogetPassword">忘记密码?</a>
      </div>
      <button class="login-btn" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
    import toptitle from '../toptitle/header'
    import { Toast } from 'vant';//引入ui提示
    const tip = msg => {
        Toast({
            message: msg,
            duration: 1000,
            forbidClick: true
        });
    }
  export default {
      name:'login',
      components:{toptitle},
      data(){
          return{
            user:{
                'userName':'',
                'password':''
            },
            ticp:localStorage.getItem('nowUserName')||'admin',
            stName:'',
            loginI:'../../../static/images/hb_logo.png'
          }
      },
      mounted(){
        console.log(tt.stName)
        this.stName=tt.stName;
      },
      methods:{
          //失去焦点屏幕回弹
          blurtop(){
              window.scrollTo({top:0,left:0,behavior:"smooth"});
          },
          //登录
          login(){
              let me=this;
              localStorage.setItem('nowUserName',me.user.userName)
              if(this.user.userName==''){
                  tip('用户名不能为空！')
              }else if(this.user.password==''){
                  tip('密码不能为空！')
              }else{
                  this.$api.login(this.user).then(res=>{
                      localStorage.setItem('nowUserName',me.user.userName)
                      // console.log(res)
                      localStorage.setItem('sessionIds',res.data.result.substring(parseInt(res.data.result.indexOf('为:'))+2,res.data.result.length))
                      // console.log(res.data.result.substring(parseInt(res.data.result.indexOf('为:'))+2,res.data.result.length))
                      
                      me.$router.push('/orders')
                      tip('登录成功!')
                  })
              }
          },
          //忘记密码
          fogetPassword(){
              // this.$loading.show('提交订单中...');
              if(this.user.userName==''){
                  tip('用户名不能为空！')
              }else{
                  this.$api.passwordT(this.user.userName).then(res=>{
                      // console.log(res)
                      tip(""+res.data.result)
                  })
              }
          }

      }
  }
</script>
<style lang="scss">
  @import "../../../static/scss/common";
  /*pc*/
  .login{
    position: relative;
    height: 100%;width: 100%;
    background: url("../../../static/images/loginbg.png");
    background-position: 45% 85%;
    background-repeat: no-repeat;
    background-size: 45% 68%;
    .login-from{width: 400px;height: 270px;background: #fff;
      box-shadow: 0px 0px 10px #ccc;
      position: absolute;
      left:50%;
      border-radius: 12px;
      text-align: center;
      font-size: 18px;
      top:25%;
      .login-title{
        text-align: center;
        font-size: 24px;
        color: #383838;
        padding: 24px 0;
      }
      .login-input{
        position: relative;
        width: 260px;
        margin: auto;
        border: 1px solid #959595;
        margin-bottom: 30px;
        .foget{position: absolute;right: 0;bottom: -22px;font-size: 14px;color: #b2c9d2;cursor: pointer;text-decoration:underline;padding-bottom: 2px;}
        .foget:hover{
          color: #13b5b1;
        }
        span{display: inline-block;padding: 8px 10px;}
        input{border: none;width: 80%;}
      }
      .margin-tow{margin-bottom: 25px;}
      .login-btn{border-radius: 50px;width:120px;height: 40px;line-height: 40px;background: #f19149;color: #fff;margin-bottom: 20px; }
    }
    .posititle{
      text-align: center;
      padding-top: 106px;
      img{
        max-width: 100px;
      }
    }
  }
  /*phone*/
  @media (max-width: 1081px) {
    .login{
      background-size: 96% 70%;
      .login-from{
        width: 92%;
        top:20%;
        height: auto;
        border: 1px solid #ccc;
        transform: translateX(-50%);
      }
      .posititle{padding-top: 14px;
        img{
          // max-width: 90px;
        }
      }
    }
  }
  @media (max-width: 341px){
    .top-title{font-size: 16px;}
  }
</style>
