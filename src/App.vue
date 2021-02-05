<template>
  <div id="app">
    <!--:key="$route.fullPath"-->
    <div class="box_title">
      <div class="box_logo"><img :src="logoImg" alt="">
       <!-- <span>&nbsp;广州高谱</span>  -->
      </div>
      <div class="box_title_c">&nbsp;&nbsp;&nbsp;推送管理系统</div>
      <div class="box_title_r"><img  src="../static/images/time.png" alt="">{{currentTime}}</div>
    </div>
    <div class="comtent-wapper">
      <div class="box-left">
        <div class="menu-list">
          <el-menu :default-active="defaultActive" router :collapse="isCollapse" class="menu" :style="isCollapse?'':'width:200px'" background-color="#000" text-color="#fff" active-text-color="#1989fa" unique-opened>
            <li class="collapse-false" v-show="!isCollapse" @click="handleCollapse">
              <span><!-- 收起此栏 --></span>
              <i class="el-icon-back"></i>
            </li>
            <li class="collapse-true" v-show="isCollapse" @click="handleCollapse">
              <i class="el-icon-view"></i>
            </li>
            <!-- <el-menu-item index="/index" route="/index" >
              <img src="/static/img/home.png" class="icon">
              <span slot="title">首页</span>
            </el-menu-item> -->
            <template v-for="(item,index) in menu" v-if="item.attributes.show==1">
              <el-submenu :index="item.id" :key="index" v-if="item.nodes.length>0">
                <template slot="title">
                  <img :src="item.icon" class="icon">
                  <span slot="title">{{item.text}}</span>
                </template>
                <template v-for="(second,secondIndex) in item.nodes" v-if="second.attributes.show==1">
                  <el-menu-item :index="second.attributes.path" :key="secondIndex" :route="second.attributes.path" v-if="!second.nodes">
                    <span slot="title">{{second.text}}</span>
                  </el-menu-item>
                  <el-submenu :index="second.id" :key="secondIndex" v-else>
                    <span slot="title">{{second.text}}</span>
                    <el-menu-item v-for="(third,thirdIndex) in second.nodes" :index="third.attributes.path" :key="thirdIndex" :route="third.attributes.path" v-if="third.attributes.show==1">
                      <span slot="title">{{third.text}}</span>
                    </el-menu-item>
                  </el-submenu>
                </template>

              </el-submenu>
              <el-menu-item :index="item.attributes.path" :route="item.attributes.path" :key="index" v-else>
                <img :src="item.icon" class="icon">
                <span slot="title">{{item.text}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
      <div class="box-right">
          <router-view ></router-view>
      </div>
    </div>
    
    
    <!-- <div class="box_bottom">
      <div class="box_bottom_l">
        <p class="menu_t">电力监控</p>
        <p class="menu_t">各自投监测</p>
        <p class="menu_t">电能质量</p>
        <p class="menu_t">运营工具</p>
        <div class="menu_box">
          <p :class="menuList[index].url==nowPath?'active':''" v-for="(item,index) in menuList" :key="index" @click="gorouter(item.url,index)">
            {{item.name}}
          </p>
        </div>
      </div>
      <div class="box_bottom_r">
        <router-view ></router-view>
      </div>
    </div>  -->
    <!-- 套入 -->
    <span title="刷新" class="reso" @click="upload"><img src="../static/images/re_icon.png" alt=""></span>
    <!-- <router-view v-if="isRouterAlive"></router-view> -->
  </div>
</template>

<script>
  import http from '@/request/http.js'
  export default {
    name: 'App',
    data(){
      return {
        currentTime:'',
        nowIndex:'',
        isRouterAlive:true,
        logoImg:'../static/images/gaopu-LOGO.png',
        menuList:[
          {name:'事件记录',url:'alarm'},
          {name:'SOE记录',url:'soe'},
          {name:'用能报表',url:'kwh'},
          {name:'设备台账',url:'ledger'},
          {name:'分析状况',url:'analyze'},
          {name:'电能质量',url:'power'},
          
        ],
        nowPath:'',
        menu: [
          {
            id:'1',
            attributes:{
              path:'/index',
              show: 1
            },
            icon: "../static/images/home.png",
            nodes: [
              {
                id:'2',
                attributes:{
                  path:'/list',
                  show: 1
                },
                icon: "",
                nodes: null,
                selectable: true,
                selectedIcon: "",
                tags: null,
                text: "员工列表",
              }
            ],
            selectable: true,
            selectedIcon: "",
            tags: null,
            text: "员工管理",
          },
          {
            id:'3',
            attributes:{
              path:'/index',
              show: 1
            },
            icon: "../static/images/tui.png",
            nodes: [
              {
                id:'4',
                attributes:{
                  path:'/pushinfo',
                  show: 1
                },
                icon: "",
                nodes: null,
                selectable: true,
                selectedIcon: "",
                tags: null,
                text: "推送信息",
              },
              {
                id:'5',
                attributes:{
                  path:'/history',
                  show: 1
                },
                icon: "",
                nodes: null,
                selectable: true,
                selectedIcon: "",
                tags: null,
                text: "推送历史",
              }
            ],
            selectable: true,
            selectedIcon: "",
            tags: null,
            text: "推送管理",
          }
        ],
        isCollapse: false
      }
    },
    computed: {
      defaultActive: function() {
        return this.$route.path;
      }
    },
    watch:{
      $route(to,from){
        this.nowPath=to.path.substr(1,to.path.length-1)
      }
    },
      mounted(){
        this.getNowTime();

        this.nowPath=this.$route.path.substr(1,this.$route.path.length-1)
        let e=window.event||e;
      },
      methods:{
        handleCollapse() {
          this.isCollapse = !this.isCollapse;
        },
        exitLogin() {
          sessionStorage.ticket = null;
          this.$router.replace("/login");
        },
        changeLogo(val){
          this.logoPath=val;
        },
        changeTitle(val){
          this.headTitle=val;
        },
        gorouter(name,i){
          this.nowIndex=i
          this.$router.push(name)
        },
        upload(){
          location.reload();
        },
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
          getZero(num){
            if(num<10){
                return '0'+num;
            } else{
                return num
            }
          },
      }
  }
</script>

<style lang="scss">
  @import '../static/scss/common.scss';
  @font-face {
    font-family:'cg'; 
    src:url('../static/font/font_cg.ttf');
  }
  .reso{
    color:#fff;position:absolute;right:3%;bottom:12%;z-index:99;cursor: pointer; transition: all ease 0.5s;
  }
  .reso:hover{
    // background: red;
    transform:rotate(360deg);
  }
  .box_title{
    width: 100%;
    height: 90px;
    background-image: url('../static/images/topi.png');
    background-size:100% 100%;
    color: #fff;
    position: relative;
    background-repeat: no-repeat;
    box-shadow: #0aa4c5 5px -19px 72px inset;
    min-width: 1000px;
    .box_logo,.box_title_c,.box_title_r{
      position: absolute;
    }
    .box_logo{
      left:10px;
      top: -2px;
      display: flex;
      align-items: center;
      max-width: 100px;
      font-size: 28px;
      span{
        font-size: 20px;
        font-weight: bold;
      }
      img{
        width: 100%;
      }
    }
    .box_title_c{
      font-size: 30px;
      font-style: italic;
      font-weight: 100;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .box_title_r{
      font-family:'cg';
      font-size: 20px;
      right:-2%;
      top: 30%;
      transform: translate(-50%,-50%);
      img{
        max-width: 24px;
        vertical-align: middle;
        margin-right: 4px;
      }
    }
  }
  .comtent-wapper{
    display: flex;
    height: 88%;
    .box-left{
      // width: 12%;
      
    }
    .box-right{
      width: 100%;
      height: 100%;
      overflow: hidden;
      // margin-left: 10px;
    }
  }
  .menu-list{
    // max-width: 200px;
    height: 100%;
    // background: #000;
    overflow: hidden;
    .menu{
      // max-width: 200px;
      height: 100%;
    }
    .icon{
      width: 24px;
      padding: 3px;
    }
    .collapse-false{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 15px;
    }
    .collapse-false,.collapse-true{
        text-align: center;
        background: #2f3333;
        color: #fff;
        i{
          font-size: 18px;
          padding: 15px 20px;
          cursor: pointer;
        }
    }
  }
  .box_bottom_l{
    background-image: url('../static/images/menu.png');
    background-repeat: no-repeat;
    background-size:100% 100%;
    margin-right: 20px;
    position: relative;
    color: #fff;
    text-align: center;
    font-size: 14px;
    .menu_t{
      top: 0;
      font-size: 16px;
      color: #b0c4de;
      white-space: nowrap;
      // width: 100%;
      position: absolute;
      left: 60%;
      transform: translate(-50%,-50%);
    }
    .menu_t:nth-child(1){
      top: 3%;
    }
    .menu_t:nth-child(2){
      top: 40%;
    }
    .menu_t:nth-child(3){
      top: 58%;
    }
    .menu_t:nth-child(4){
      top: 71.5%;
    }
    .menu_box{
      position: absolute;
      top: 20%;
      left:50%;
      transform: translate(-50%,-50%);
      p{
        line-height: 30px;
        cursor: pointer;
      }
      .active{
        color: $complete_c;
      }
    }
  }
  #app {
    height: 100%;
    background: #120226;
    overflow: hidden;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
