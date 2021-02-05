<template>
  <div class="placeindex">
    <toptitle :titleName='stName'></toptitle>
    <div class="content-wapper" @scroll="scroll" :style="getH">
<!--      <div class="btn-posi">-->
<!--        <button class="btn-common pad-right" @click="order">我要下单</button>-->
<!--        <button class="btn-common" @click="getList">订单查询</button>-->
<!--      </div>-->
      <div class="x-auto">
        <div class="x-order-wapper">
          <!--轮播-->
          <div class="x-orders-left">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide paddi"> 
                  <p class="prodect-name">{{prodectname}}</p>
                  <div class="img-prodect">
                    <img :src="chanpin" alt="">
                  </div>
                </div>
                <!-- <div class="swiper-slide paddi">
                  <img src="../../static/images/fc.png" alt="">
                </div>
                <div class="swiper-slide paddi">
                  <img src="../../static/images/xiaoshupng.png" alt="">
                </div> -->
              </div>
              <!-- 如果需要分页器 -->
              <!-- <div class="swiper-pagination"></div> -->
              <!-- 如果需要导航按钮 -->
              <!-- <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div> -->
            </div>
            <!-- <div class="bottom-swiper">
              <div class="swiper-container2 gallery-thumbs">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img src="../../static/images/s_xingyue.png" alt="">
                  </div>
                  <div class="swiper-slide"> <img src="../../static/images/s_fengche.png" alt=""></div>
                  <div class="swiper-slide"><img src="../../static/images/s_xiaoshu.png" alt=""></div>
                </div>
              </div>
            </div> -->
          </div>
          <!--下单-->
          <div class="x-orders-right">
            <h2>定制{{prodectname}}</h2>
            <!-- <p class="zhiding" style="opacity:0;">可根据客户需求定做外形、尺寸，提供图片或者实物样品以及要求（颜色、数量等），联系客服议价</p> -->
            <p style="height:30px;"></p>
            <p class="leixing">类型：</p>
            <div class="dan-list" v-for="(item,index) in product" :key="index">
              <div class="diap">
                <span class="phone-diap">{{item.name}}</span>
                <p class="img_wapper"><img :src="item.img" alt=""></p>
                <span class="pc-diap">{{item.name}}</span>
              </div>
              <div class="dan-num">
                <span>下单数量</span>
                <input type="number" v-model="item.number"  placeholder="0">
                <span>件</span>
              </div>
              <!-- <div class="dan-content">
                <span>打印内容</span>
                <input type="text" placeholder="字数不大于3" v-model="item.content" maxlength="3">
              </div> -->
            </div>
            <div class="dan-info">
              <span>客户信息</span>
              <textarea placeholder="姓名/联系电话/发货地址" v-model="woCustomerid"></textarea>
            </div>
            <div class="dan-btn">
              <span class="sub-btn" @click="orders">确认下单</span>
            </div>
          </div>
        </div>
        <div class="pro-detail">
          <span class="posi-detail">产品详情</span>
          <div class="detail-list">
<!--            biaoge-->
            <div class="detail-table" v-for="(item,index) in tableList" :key="index">
              <div class="detail-tabheader">
                <p v-for="(head,index1) in item.header" :key="index1">{{head}}</p>
              </div>
              <div class="detail-tabcontent">
                <p v-for="(content,index2) in item.content" :key="index2">{{content}}</p>
              </div>
            </div>
<!--            -->
<!--            <img src="../../static/images/shuoming.png" alt="">-->

          </div>
          <div class="img-list">
            <!-- <img src="../../static/images/siren.png" alt="">
            <img src="../../static/images/kezi.png" alt="">
            <img src="../../static/images/waix.png" alt=""> -->
          </div>
        </div>
        <div class="pro-detail">
          <span class="posi-detail">全智能生产线简介</span>
          <div class="img-list">
            <img src="../../static/images/zhili.jpg" alt="">
          </div>
        </div>
        <!-- <div class="pro-detail">
          <span class="posi-detail">全系列数字仿真</span>
          <div class="img-list">
            <img src="../../static/images/number.png" alt="">
          </div>
        </div> -->
        <!-- <div class="pro-detail">
          <span class="posi-detail">小知识</span>
          <div class="img-list">
            <img src="../../static/images/zhishi.png" alt="">
          </div>
        </div> -->
      </div>
    </div>
    <!--返回顶部-->
    <div class="gotop" v-show="gotopShow" @click="gotop">
      <i class="iconfont">&#xe631;</i>
    </div>
    <!-- 弹窗组件-->
    <popup :content="dititle" :show="showDialog" @masksure="masksure" @cancel="cancel"></popup>
  </div>
</template>
<script>
    import agv from './agv/agv'
    import toptitle from './toptitle/header'
    // import Swiper from 'swiper';
    import popup from './dialog/dialog'
    import { Toast } from 'vant';//引入ui提示
    // import 'swiper/dist/css/swiper.min.css';
    const tip = msg => {
        Toast({
            message: msg,
            duration: 1000,
            forbidClick: true
        });
    }

    export default{
      name:'index',
      components:{toptitle,agv,popup},
      data(){
          return{
              getH:{
                  height:''
              },
              product:[
                  {name:'变压器',index:'1',img:'../../static/images/chanpin1.png',number:null,content:''}, 
                  // {name:'风车吊牌',index:'3',img:'../../static/images/dan_fengche.png',number:null,content:''},
                  // {name:'小树吊牌',index:'5',img:'../../static/images/dan_xiaoshu.png',number:null,content:''},
              ],
              woCustomerid:"",//客户信息
              nowData:{},//当前订单
              dititle:'确定信息无误并提交订单?',
              showDialog:false,
              tableList:[
                  {header:['品牌','产品','材质'],content:['华北电力大学','变压器模型','铝合金']},
                  {header:['包装材质','单价','是否现货'],content:['SUS304材质','¥100','现货']},
                  {header:['产品尺寸','包装尺寸','生产地址'],content:['70mm*42mm*66mm','82mm*65mm*75mm','北京市昌平区华北电力大学智能制造实验室']},
              ],
              src:'',
              gotopShow:false,
              prodectname:'',
              chanpin:'../../static/images/chanpin.png',
              stName:''
          }
      },
      created(){
          //自动设定高度
          window.addEventListener('resize', this.getHeight);
          this.getHeight();

      },
      mounted(){
          // console.log(tip)
          this.stName=tt.stName
          this.prodectname=tt.prodectName;
          // console.log(tt)
          window.addEventListener('resize', function () {
              if(document.activeElement.tagName === 'INPUT'||document.activeElement.tagName === 'TEXTAREA'){
                  document.activeElement.scrollIntoView({behavior: "smooth"})
              }
              // me.getHeight();
          })

          // var gallerySwiper = new Swiper('.swiper-container2',{
          //     spaceBetween: 5,
          //     slidesPerView: 5,
          //     // loop: true,
          //     freeMode: true,
          //     loopedSlides: 3, //looped slides should be the same
          //     watchSlidesVisibility: true,
          //     // watchSlidesProgress: true,
          // })
          // var mySwiper = new Swiper('.swiper-container', {
          //     spaceBetween: 5,
          //     // loop:true,
          //     navigation: {
          //         nextEl: '.swiper-button-next',
          //         prevEl: '.swiper-button-prev',
          //     },
          //     pagination: {
          //         el: '.swiper-pagination',
          //     },
          //     // loopedSlides: 3, //looped slides should be the same
          //     thumbs: {
          //         swiper: gallerySwiper,
          //     },
          // })
      },
      methods:{
          gotop(){
              let me=this;
              let nowTop = document.querySelector('.content-wapper').scrollTop; // 获取当前滚动条位置
              if (nowTop > 0) {
                  window.requestAnimationFrame(me.gotop);
                  document.querySelector('.content-wapper').scrollTo(0,nowTop - (nowTop/5));
              }
          },
          scroll(e){
              if(e.target.scrollTop>100){
                  this.gotopShow=true
              }else{
                  this.gotopShow=false
              }
          },
          order(){
              this.$router.push('orders')
          },
          getList(){
              this.$router.push('orderlist')
          },
          //组件确定下单
          masksure(data){
              console.log(this.nowData)
              let me=this;
              this.$loading.show('提交订单中...');
              this.$api.workAdd(this.nowData).then(res=>{
                  me.$loading.hide('');
                  tip('订单已下达成功！')
                  console.log(res);
                  // this.$router.push('orderlist')
              }).catch((err)=>{
                  console.log(err)
                  me.$loading.hide('');
              })
              this.showDialog=false;
              // this.$router.push('present')
          },
          cancel(){
              this.showDialog=false;
          },
          //是否下单
          orders(){
              let me=this;
              let date=new Date(),
                  nowdataTime=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds();
              console.log(nowdataTime)
              let data={
                  "woChtime": "",//创建时间
                  "woChusername": localStorage.getItem('nowUserName')||"admin",//修改人
                  "woCusername": localStorage.getItem('nowUserName')||"admin",//创建人
                  "woCustomerid": this.woCustomerid,//客户信息
                  "woEtime": "",//订单结束时间
                  "woId": "",//工单id
                  // "woLcontent1": this.product[0].content,
                  // "woLcontent2":  this.product[1].content,
                  // "woLcontent3":  this.product[2].content,
                  // "woPname1":  this.product[0].index,
                  // "woPname2": this.product[1].index,
                  // "woPname3": this.product[2].index,
                  // "woPnum1": this.product[0].number||0,
                  // "woPnum2": this.product[1].number||0,
                  // "woPnum3": this.product[2].number||0,
                  "woPname": "变压器模型",
                  "woPnum": this.product[0].number||0,
                  "woRemark": "",//备注
                  "woSstime": '',//订单下单时间
                  "woSta": 1,//工单状态 下单状态
                  "woStime": ""//开始订单生产时间
              }
              this.nowData=data;
              console.log(this.nowData)
              // console.log((parseInt(data.woPnum))+(parseInt(data.woPnum2))+(parseInt(data.woPnum3)))
              if(parseInt(data.woPnum)<=0){
                  tip('下单总数量不能为0！')
              }else if(parseInt(data.woPnum)>18){
                  tip('下单总数量不能超过18！')
              }else{
                  this.showDialog=true;
              }
              // this.showDialog=true;
              // this.$loading.show('提交订单中...');
              // setTimeout((res)=>{
              //     me.$loading.hide('');
              // },1000)
          },
          //获取高度
          getHeight(){
              //窗口高度
              var h = document.documentElement.clientHeight || document.body.clientHeight;
              let w=document.body.clientWidth||document.documentElement.clientWidth;
              if(w>1080){
                  this.getH.height=(h-140)+'px';//减去已有标签的高度
              }else{
                  this.getH.height=(h-130)+'px';//减去已有标签的高度
              }
          },
      },
      computed: {
          number1() {
              if(this.product[0].number<0){
                  this.product[0].number=null;
              }
              return this.product[0].number
          },
          // number2() {
          //     if(this.product[1].number<0){
          //         this.product[1].number=null;
          //     }
          //     return this.product[1].number
          // },
          // number3() {
          //     if(this.product[2].number<0){
          //         this.product[2].number=null;
          //     }
          //     return this.product[2].number
          // },
      },
      watch:{
          // 'product[0].number':function(){
          //   console.log(this.product[0].number)
          // },
          // 'number2':function(){
          // },
          // 'number3':function(){
          // }
      },
      destroyed(){
          //组件销毁清除事件
          window.removeEventListener('resize', this.getHeight)
      }
  }
</script>
<style lang="scss">
  @import "../../static/scss/common";
  .placeindex{
    height: 100%;
    overflow-x: hidden;
  }
  .gotop{
    position: fixed;
    bottom: 10%;
    right: 5%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    border:1px solid #54a8ad;
    i{
      color: #54a8ad;
    }
  }
  .content-wapper{
    height: 80%;
    margin: auto;
    overflow: auto;
    width:97%;
    background: #fff;
    text-align: center;
    position: relative;
    .btn-posi{
      padding-top: 18%;
      /*position: absolute;*/

    }
    .prodect-name{
      width: 194px;
      margin: auto;
      text-align: center;
      line-height: 30px;
      color: #fff;
      font-size: 20px;
      margin-bottom: 5px;
      background: #00767f;
    }
  }
  .phone-diap{
    display: none;
  }
  .pc-diap{
    display: inline-block;
  }
  .img_wapper{
    max-width: 70px;
    display: inline-block;
    img{
      max-width: 100%;
    }
  }
  .x-auto{
    max-width: 1300px;
    padding-bottom: 100px;
    margin: auto;
    width: 90%;
    font-size: 16px;
    color: #585858;
  }
  .img-list{
    font-size: 0;
    img{
      width: 100%;
    }
    .sheng{
      padding-top: 84px;
    }
  }
  .pro-detail{
    position: relative;
    margin-top: 90px;
    padding-top: 34px;
    border-top: 1px solid #383838;
    .posi-detail{
      position: absolute;
      left: 50%;
      padding: 0 10px;
      height: 20px;
      background: #fff;
      top: -10px;
      transform: translateX(-50%);
    }
  }
  /*表格*/
  .detail-list{
    display: flex;
    display: -webkit-flex;
    border-top: 1px solid #d2d2d2;
    border-bottom: 1px solid #d2d2d2;
    margin: 20px 0;
    img{
      width: 100%;
    }
    .detail-table:last-child{
      width: 36%;
    }
    .detail-table{
      display: flex;
      display: -webkit-flex;
      width: 32%;
      
      margin-right: 20px;
      .detail-tabheader{
        width: 20%;
        p{
          font-weight: bold;
          height: 0.27rem;
          line-height: 0.27rem;
        }
      }
      .detail-tabcontent{
        width: 80%;
        text-align: left;
        p{
          padding: 0 22px;
          line-height: 0.27rem;
           height: 0.27rem;
        }
      }
    }
    .detail-table:last-child{
      margin-right: 0;
    }
    p{
      border: 1px solid #d2d2d2;
      // padding: 10px 0;
    }
    p:first-child{
    }
  }
  /**/
  .x-order-wapper{
    display: flex;
    padding-top: 32px;
    .x-orders-left{
      img{
        -moz-user-select:none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }
      .img-prodect{
        max-width: 280px;
        margin: auto;
        img{
          max-width: 100%;
        }
      }
      .swiper-pagination-bullet-active{
        background: #d2d2d2;
      }
      .swiper-pagination-bullet{
        background: #585858;
        width: 10px;
        height: 10px;
      }
      .swiper-button-next,.swiper-button-prev{
        background-size:100% 100%;
        width: 48px;
        height: 48px;
      }
      .swiper-button-prev{
        background-image: url("../../static/images/prop.png");
      }
      .swiper-button-next{
        background-image: url("../../static/images/next.png");
      }
    }
    .x-orders-right{
      padding-left:4%;
      text-align: left;
      width: 100%;
      .dan-list{
        display: flex;
        display: -webkit-flex;
        // justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
        span{
          padding: 0 10px;
          min-width: 88px;
        }
      }
      .dan-btn{
        text-align: center;
        margin-top: 30px;
        .sub-btn{
          background: #ec6941;
          color: #fff;
          padding: 12px 54px;
          display: inline-block;
          transition: all ease .5s;
          cursor: pointer;
        }
        .sub-btn:hover{
          background: #7eb2bb;
        }
      }
      .dan-info{
        padding-top: 8px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        textarea{
          width: 100%;
          height: 38px;
          border: 1px solid #d2d2d2;
          padding: 8px 6px;
          resize: none;
        }
        span{
          width: 10%;
        }
      }
      h2{
        font-size: 24px;
        font-width: bold;
      }
      input{
        height: 38px;
        border: 1px solid #d2d2d2;
        padding: 0 6px;
      }
      .zhiding{
        color: #ff0101;
        font-size: 16px;
        padding: 15px 0 34px 0;
      }
      .leixing{
        margin-bottom: 26px;
      }
      .diap,.dan-content,.dan-num{
        display: flex;
        display: -webkit-flex;
        /*justify-content: center;*/
        align-items: center;
      }
    }
    .bottom-swiper{
      height: 80px;
      margin-top: 10px;
      overflow:hidden;
      .swiper-slide{
        margin-right: 6px;
        cursor: pointer;
      }
      .swiper-slide:last-child{
         margin-right:0;
       }
      .moke-img{
        position: absolute;

      }
    }
  }
  .paddi{
    padding: 14px 0;
  }
  .swiper-container{
    border: 1px solid #6cb5b9;
    background: #fff;

    width: 420px;
    height: 360px;
  }
  .swiper-container2{
    /*background: #313131;*/
    height: 80px;
    width: 420px;
    padding: 0;

  }
  @media (max-width: 1080px) {
    .pro-detail{
      margin-top: 45px;
    }
    .phone-diap{
      display: inline-block;
    }
    .pc-diap{
      display: none;
    }
    .x-auto{
      width: 98%;
      padding-bottom: 35px;
    }
    .x-order-wapper{
      display: block;
      padding-top: 18px;
      .bottom-swiper{
        display: none;
      }
      .x-orders-right {
        padding-left: 0;
        input{
          width: 60%;
        }
        h2{
          font-size: 20px;
          padding-top:0.18rem;
        }
        .zhiding{
          padding-bottom: 0.16rem;
        }
        .dan-info{
          display: block;
          span{
            width: 26%;
            padding: 0 10px;
          }
          textarea{
            width: 60%;
            height: 100px;
            vertical-align: middle;
          }
        }
        .dan-list{
          display: block;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
        }
        .diap,.dan-content,.dan-num{
          margin-bottom: 10px;
        }
      }
    }
    .swiper-container{
      width: 100%;
      height: auto;
    }
    .detail-list{
      font-size: 12px;
      border-bottom: none;
      display: block;
      .detail-table:last-child{
        width: 100%;
      }
      .detail-table{
        margin-right: 1px;
        width: 100%;
        .detail-tabcontent{
          p{
            padding: 0 10px;
          }
        }
        .detail-tabheader{
          width: 22%;
        }
      }
    }
  }
  @media (max-width: 1420px) {
    .x-auto{
      width: 98%;
    }
  }
</style>
