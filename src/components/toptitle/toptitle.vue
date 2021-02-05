<template>
  <div class="title-w">
    <menuList :show="menuShow" @cancel="cancel"></menuList>
    <div class="title-wapper">
      <div class="top-title">
        <img src="@/static/images/logo.png" alt="">
        <span>{{title}}</span>
      </div>
<!--      <button class="loginout" @click="loginOut">退出系统</button>-->
      <span class="menu-list" @click="showMenu"><i class="iconfont">&#xe66d;</i></span>
<!--      <van-popup v-model="show"  position="bottom">内容</van-popup>-->
    </div>
  </div>
</template>
<script>
    import Vue from 'vue';
    import { Popup } from 'vant';

    Vue.use(Popup);
    import menuList from '../menu/menu'
    export default{
        name:'toptitle',
        components:{menuList},
        data(){
            return{
               title:'“双胞胎”数字化制造实验平台网络商城',
                show:true,
                user:{
                    'userName':localStorage.getItem('nowUserName')||'admin'
               },
                menuShow:false,
            }
        },
        watch:{

        },
        methods:{
            cancel(is){
                // console.log(is)
                this.menuShow=is;
            },
            showMenu(){
                this.menuShow=true;
                // console.log(111)
                console.log(this.menuShow)
            },
            loginOut(){
                let me=this;
                this.$api.loginout(this.user).then(res=>{
                    localStorage.removeItem('nowUserName');
                    localStorage.removeItem('sessionIds');
                    // console.log(res)
                    me.$router.push({name:'login'})
                })
            }
        }
    }
</script>
<style lang="scss">
  @import "../../../static/scss/common";
  
  
  .title-wapper{
    padding: 38px 26px 42px 26px;
    position: relative;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  /*.loginout{
    color: #fff;
    background: $cl;
    position: absolute;
    right: 26px;
    font-size: 16px;
    padding: 4px 8px;
    top: 50px;
  }*/
  .menu-list{
    color: #fff;
    background: $cl;
    position: absolute;
    right: 26px;
    font-size: 16px;
    padding: 5px 20px;
    cursor: pointer;
    top: 50px;
    .iconfont{
      font-size: 0.13rem;
    }
  }
  @media (max-width: 1081px) {
    .title-wapper{padding: 0;}
    .menu-list{
      right: 10px;
      /*font-size: 14px;*/
      padding: 6px 10px;
      top: 20px;
    }
  }
  @media (max-width: 341px){
    .top-title{font-size: 16px;}
  }
</style>
