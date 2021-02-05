<template>
  <div class="title-w">
<!--    @cancel="cancel"-->
    <menuList :show="menuShow" @cancel="cancel" @showMenu="showMenus"></menuList>
    <div class="title-wapper">
      <div class="top-title">
        <img :src="logoUrl" alt="">
        <span>{{titleName}}</span>
      </div>
      <!--      <button class="loginout" @click="loginOut">退出系统</button>-->
      <div class="menu-lists" :style="rightP">
        <div>
          <span class="time">{{currentTime}}</span>
          <p class="time pcshow">{{lianxi}}</p>
        </div>
        <span class="logo-img">
          <img :src="logoImg" alt="">
        </span>
        <!-- <b class="wapshow"><br/></b> -->
        <b class="wapshow">{{currentTime}}</b>
      </div>
      <div style="text-align:right;">
        
      </div>
      
      <span class="menu-list" @click="showMenu" v-show="menu1Show"><i class="iconfont">&#xe66d;</i></span>
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
                title:'华北电力大学项目MES系统',
                show:true,
                user:{
                    'userName':localStorage.getItem('nowUserName')||'admin'
                },
                menuShow:false,
                menu1Show:true,
                timer:'',
                currentTime:'',
                rightP:'',
                rolve:'',
                logoUrl:'../../static/images/hb_logo.png',
                logoImg:'../../static/images/logo.png',
                lianxi:''
            }
        },
        props:['titleName'],
        mounted(){
          this.title=tt.stName;
          this.lianxi=tt.lianxiName;
          console.log(this.lianxi)
            this.getNowTime();
            let url=window.location.href;
            let w=document.body.clientWidth||document.documentElement.clientWidth;

            this.rolve=url.substring(url.lastIndexOf('/#/')+3,url.length);
            if(this.rolve=='billboard'){
                this.menuShow=false;
                this.menu1Show=false;
                this.rightP='right:12px;'
            }
        },
        watch:{
            'menuShow':function () {
                console.log(this.menuShow)
            }
        },
        methods:{
            //实时获取当前时间
            getNowTime(){
                let me=this;
                this.timer=setInterval(function(){
                    me.currentTime=new Date().getFullYear() +
                        "/" +
                        (new Date().getMonth() + 1) +
                        "/" +
                        new Date().getDate() +
                        " " +
                        me.getZero(new Date().getHours()) +
                        ":" +
                        me.getZero(new Date().getMinutes()) +
                        ":" +
                        me.getZero(new Date().getSeconds());
                },1000)
            },
            cancel(is){
                // console.log(is)
                this.menuShow=is;
            },
            showMenus(i){
                let w=document.body.clientWidth||document.documentElement.clientWidth;
                let url=window.location.href;
                this.rolve=url.substring(url.lastIndexOf('/#/')+3,url.length);

                if(w>1080&&this.rolve!='billboard'){
                    if(i==true){
                        this.rightP='right:240px;'
                    }else{
                        // this.menu1Show=true;
                        this.rightP='right:40px;'
                    }
                }else{

                }
                // console.log(i)
            },
            getZero(num){
              if(num<10){
                  return '0'+num;
              } else{
                  return num
              }
            },
            showMenu(){
                this.menuShow=true;
                // console.log(111)
                // console.log(this.menuShow)
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
  @font-face {
    font-family:'cg'; 
    src:url('../../../static/font/font_cg.ttf');
  }
  .time{
    font-family:'cg';
    font-size: 36px;
  }
  .title-wapper{
    padding: 20px 26px 20px 26px;
    position: relative;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
    .top-title{
      img{
        max-width: 80px;
      }
    }
  }
  .pcshow{
    font-size: 14px;
    margin-right: 20px;
  }
  .wapshow{display: none;}
  /*.loginout{
    color: #fff;
    background: $cl;
    position: absolute;
    right: 26px;
    font-size: 16px;
    padding: 4px 8px;
    top: 50px;
  }*/
  .menu-lists{
    transition: all ease .6s;
    color: #fff;
    position: absolute;
    right: 40px;
    font-size: 16px;
    padding: 5px 20px;
    /*cursor: pointer;*/
    top: 26px;
    display: flex;
    align-items: center;
    text-align: right;
    img{vertical-align: middle;}
    span{vertical-align: bottom;margin-right: 20px;}
    .logo-img{
      display: inline-block;
      margin-right: 0;
      max-width: 70px;
      // height: 50px;
      img{
        width: 100%;
        // height: 100%;
      }
    }
  }
  .menu-list{
    display: none;
    color: #fff;
    background: #13b5b1;
    position: absolute;
    right: 9px;
    font-size: 16px;
    padding: 2px 14px;
    cursor: pointer;
    top: 28px;
    .iconfont{
      font-size: 0.13rem;
    }
  }
  @media (max-width: 1081px) {
    .menu-list{
      display: block;
    }
    .title-wapper{
      .top-title{
        img{
          max-width:60px;
        }
      }
    }
    .pcshow{
      display: none;
    }
    .wapshow{display: block;height: 5px;font-size: 16px;font-family:'cg';
      text-align: right;}
    .title-wapper{padding: 0;}
    .time{display: none;}
    .menu-lists{
      right:15%;
      /*font-size: 14px;*/
      padding: 6px 10px;
      top: 12px;
      display: block;
      text-align: right;
      .logo-img{
        max-width: 40px;
      }
    }
    .top-title{
      font-size: 16px;
    }
  }
  @media (max-width: 341px){
    .top-title{font-size: 16px;}
  }
</style>
