<template>
  <div class="menu-wapper animated fadeIn" :style="bgStyle" @click="allC" v-show="menuShow">
    <div class="menu-content" :style="rightStyel" @click.stop="contentC">
      <p class="clone-menu">
        <span @click="allC" title="关闭菜单"><i class="iconfont" v-show="showMenu==true">&#xe901;</i><i class="iconfont" v-show="showMenu==false">&#xe646;</i></span>
        <button class="loginout" @click="loginOut">退出系统</button>
      </p>
      <ul class="menu-title">
        <li v-for="(menu,index) in menuList"  @mouseover="selectStyle(menu.hover,index)"  @mouseout="outStyle(menu.hover,index)" :key="index">
          <a class="top-link" @click="controlMenu(menu.show,index)"><span><i class="iconfont iconmenu" v-html="menu.icon"></i>  {{menu.title}}</span><span v-show="menu.show==false" class="iconfont">&#xe606;</span><span v-show="menu.show==true" class="iconfont">&#xe68d;</span></a>
          <div class="menu-child-list" :class="menu.show==false||showMenu==false?'hidden-h':''">
            <div v-for="(item,index1) in menu.child"  :class="item.url=='/'+rolve?'active_now':''" :key="index1">
              <router-link :target="item.now" :to="item.url">{{item.title}}</router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
      name:'menus',
      data(){
          return{
              rightStyel:'right: 0;',
              bgStyle:'background: rgba(0,0,0,.3);',
              showMenu:false,
              now:'',
              menuList:[
                  // {title:'生产管理',url:'/',show:true,hover:1,icon:'&#xe623;',child:[
                  //         {title:'订单下达',url:'/orders',},
                  //         // {title:'订单查询',url:'/record',},
                  //     ]
                  // },
                  // {title:'看板管理',url:'billboard',show:true,hover:1,icon:'&#xe60c;',now:'_blank',child:[
                  //         {title:'看板',url:'billboard',now:'_blank'}
                  //     ]
                  // },
                  // {title:'实时监测',url:'board',},
                  // {title:'仓库实时',url:'housereal',},
                  // {title:'下单',url:'orders',},
                  // {title:'下单记录',url:'record',},
                  // {title:'设备运行',url:'runtime',},

              ],
              menuShow:true,
              rolve:'',
          }
      },
      mounted(){
        // console.log(tt.menuList)
        this.menuList=tt.menuList;
          let url=window.location.href;
              this.rolve=url.substring(url.lastIndexOf('/#/')+3,url.length);
          let w=document.body.clientWidth||document.documentElement.clientWidth;
          if(this.rolve=='billboard'){
              this.menuShow=false;
              this.showMenu=false;
          }
          if(w>1080){
              this.showMenu=true;
          }else{
              this.showMenu=false;
              this.rightStyel='right:-204px;'
          }
      },
      props:{
          show:{
              type:Boolean,
              default:false,
              required:true
          },
      },
      watch:{
          show(val){
              if(val===true){
                  this.showMenu=true;
                  // this.rightStyel='right:0;'
                  // this.bgStyle='background:rgba(0,0,0,.3);width:100%;'
              }else{
                  this.showMenu=false;
                  // this.rightStyel='right:-202px;'
                  // this.bgStyle='background:none;width:0;'
              }
          },
          'showMenu':function(){
              this.$emit('showMenu', this.showMenu);
              if(this.showMenu==true){
                  this.rightStyel='right:0;'
              }else{
                  this.rightStyel='right:-202px;'
              }
          },
          $route(to,from){
              console.log(to)
              console.log(from)
          }
      },
      methods:{
          controlMenu(shows,index){
              if(shows===false){
                  this.menuList[index].show=true;
              }else{
                  this.menuList[index].show=false;
              }
          },
          //hover
          selectStyle(hover,i){
              if(this.showMenu==false){
                  this.menuList[i].hover=2;
                  this.showMenu=true;
              }
          },
          //移走鼠标
          outStyle(hover,i){
              if(this.menuList[i].hover==2){
                  this.showMenu=false;
                  this.menuList[i].hover=1;
              }
              // console.log(hover,i)
          },
          allC(){
              if(this.showMenu==true){
                  this.showMenu=false;
                  this.$emit('cancel', false);
              }else{
                  this.showMenu=true
              }
              // this.rightStyel='right:-204px;'
              // this.bgStyle='background:none;'
              // this.$emit('cancel', false);
          },
          contentC(){
            // 菜单点击阻止默认事件
          },
          //退出系统
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
<style lang="scss" scoped="scoped">
  @import "../../../static/scss/common";
  
   .menu-wapper{
     transition: all ease-in .5s;
     z-index: 9999;
     height: 100%;
     /*width:100%;*/
     position: fixed;
     .menu-content{
       transition: all ease-in .6s;
       z-index: 9999;
       width: 20%;
       max-width: 250px;
       position: fixed;
       background: rgba(38,148,144,.9);
       height: 100%;
       right:-204px;
     }
     .menu-title{
       color: #fff;
       font-size:18px;
       li{cursor: pointer;border-bottom: 2px solid #ccc;background: #2d6b62;}
       li:hover{
         /*background: #b2c9d2;*/
       }
       li:first-child{
         border-top: 2px solid #ccc;
       }
       a{color: #fff;padding: 16px 0.16rem;display: block;display: flex;justify-content: space-between;}

       .top-link{
         background: #1b81a9;
         padding: 16px 0.06rem;
         .iconmenu{
           padding-right: 0.06rem;
         }
       }
     }
     .menu-child-list{
       transition: all ease-in 0.5s;
       a{
         padding-left: 0.3rem;
       }
       a:hover{
         color: #11bbfd;
         background: rgba(0,0,0,.2);;
       }
       .active_now{
         background: rgba(169, 189, 2, 0.35);
         border-bottom: 1px solid #fff;
         a{
           color: #11bbfd;
         }
       }
     }
     .hidden-h{
       height: 0;
       overflow: hidden;
     }
     .clone-menu{color: #fff;font-size: 24px;margin: 16px 20px 26px 12px;position: relative;
       i{cursor: pointer;}
     }
     .loginout{
       color: #fff;
       background: $cl;
       position: absolute;
       right: 0;
       font-size: 16px;
       padding: 4px 8px;
       top: 0;
     }
   }
   @media (max-width: 1081px) {
     .menu-wapper{
       .menu-content{width:45%;}
       .menu-title{
         a{padding:0.10rem 0.14rem;}
       }
       .menu-title{font-size: 0.16rem;}
       .loginout{
         font-size: 0.14rem;
       }
       .menu-child-list{
         a{
           padding-left: 0.3rem;
         }
       }
       .clone-menu{margin: 0.16rem 0.14rem 0.24rem 0.14rem;}
     }
   }
</style>
