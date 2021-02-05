<template>
  <div class="orders">
    <toptitle></toptitle>
    <div class="content-wapper" :style="getH">
      <div class="product">
        <p class="shuru"><i class="iconfont">&#xe68c;</i>&nbsp;输入订单信息</p>
        <ul class="product-list">
          <li v-for="(item,index) in product" :key="index">
            <div class="product-left">
              <span class="product-name">{{item.name}}</span>
              <div class="product-img">
                <div class="border-img">
                  <img :src="item.img" alt="">
                </div>
              </div>
            </div>
            <div class="product-right">
              <p class="margin-b"><span>下单数量</span><input type="number" v-model="item.number" placeholder="0"></p>
              <p><span>打印内容</span><textarea type="text" v-model="item.content" ></textarea></p>
            </div>
          </li>
        </ul>
        <div class="userinfo">
          <span>客户信息</span>
          <textarea type="text" placeholder="姓名/联系电话/发货地址" v-model="woCustomerid"></textarea>
        </div>
        <div class="product-btn">
          <span></span>
          <button class="btn-common mar-36" @click="orders">确定下单</button>
          <router-link to="/"><button class="btn-common">返回首页</button></router-link>
        </div>
      </div>
      <!-- 弹窗组件-->
      <popup :content="dititle" :show="showDialog" @masksure="masksure" @cancel="cancel"></popup>
    </div>

  </div>
</template>
<script>
    import toptitle from './toptitle/header'
    import popup from './dialog/dialog'
    export default{
        name:'orders',
        components:{toptitle,popup},
        data(){
            return{
              product:[
                  {name:'小树吊牌',index:'1',img:'../static/images/xiaoshu.png',number:null,content:''},
                  {name:'风车吊牌',index:'3',img:'../static/images/fengche.png',number:null,content:''},
                  {name:'星月吊牌',index:'5',img:'../static/images/yueliang.png',number:null,content:''},
              ],
                woCustomerid:"",
                dititle:'确定信息无误并提交订单?',
                showDialog:false,
                getH:{
                  height:''
                },
                nowData:{},//当前订单
            }
        },
        computed: {
            number1() {
                if(this.product[0].number<0){
                    this.product[0].number=null;
                }
                return this.product[0].number
            },
            number2() {
                if(this.product[1].number<0){
                    this.product[1].number=null;
                }
                return this.product[1].number
            },
            number3() {
                if(this.product[2].number<0){
                    this.product[2].number=null;
                }
                return this.product[2].number
            },
        },
        watch:{
            'number1':function(){
            },
            'number2':function(){
            },
            'number3':function(){
            }
        },
        methods:{
            jisuan(num){
                let now=0;
                for(let i=0;i<30;i++){
                    console.log(num)
                    // if(num>1200){
                    //     num=1200;
                    // }
                    now+=parseFloat(num);
                    num=parseFloat(num)*2;
                }
                // console.log(now)
            },
            //组件确定下单
            masksure(data){
                let me=this;
                this.$loading.show('提交订单中...');
                this.$api.workAdd(this.nowData).then(res=>{
                    me.$loading.hide('');
                    console.log(res);
                    this.$router.push('orderlist')
                }).catch((err)=>{
                    // console.log(err)
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
                let data={
                    "woChtime": "",//创建时间
                    "woChusername": localStorage.getItem('nowUserName')||"admin",//修改人
                    "woCusername": localStorage.getItem('nowUserName')||"admin",//创建人
                    "woCustomerid": this.woCustomerid,//客户信息
                    "woEtime": "",//订单结束时间
                    "woId": "",//工单id
                    "woLcontent1": this.product[0].content,
                    "woLcontent2":  this.product[1].content,
                    "woLcontent3":  this.product[2].content,
                    "woPname1":  this.product[0].index,
                    "woPname2": this.product[1].index,
                    "woPname3": this.product[2].index,
                    "woPnum1": this.product[0].number||0,
                    "woPnum2": this.product[1].number||0,
                    "woPnum3": this.product[2].number||0,
                    "woRemark": "",//备注
                    "woSstime": "",//订单下单时间
                    "woSta": 1,//工单状态 下单状态
                    "woStime": ""//开始订单生产时间
                }
                this.nowData=data;
                if((parseInt(this.product[0].number)+parseInt(this.product[1].number)+parseInt(this.product[2].number))>16){
                    alert('下单总数量不能超过16！')
                }else{
                    this.showDialog=true;
                }

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
                // console.log(w)
                if(w>1080){
                    this.getH.height=(h-160)+'px';//减去已有标签的高度
                }else{
                    this.getH.height=(h-130)+'px';//减去已有标签的高度
                }
            },
        },
        created(){
            //自动设定高度
            // window.addEventListener('resize', this.getHeight);
            this.getHeight();
        },
        mounted() {
            // this.jisuan(1)//测试次方
            let me=this;
            window.addEventListener('resize', function () {
                if(document.activeElement.tagName === 'INPUT'||document.activeElement.tagName === 'TEXTAREA'){
                    document.activeElement.scrollIntoView({behavior: "smooth"})
                }
                // me.getHeight();
            })
        },
        destroyed(){
            //组件销毁清除事件
            window.removeEventListener('resize', this.getHeight)
        }
    }
</script>
<style lang="scss" scoped>
  @import "../../static/scss/common";
  .orders{
    height: 100%;
  }
  .content-wapper{
    overflow: auto;
  }
  .content-wapper::-webkit-scrollbar {/*滚动条整体样式*/
    width: .1rem;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    display: none;
  }
  .content-wapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(111,172,180,.3);
  }
  .product{
    width: 700px;
    padding-top: 32px;
    margin: auto;
    text-align: left;
    color: #373737;
  }
  .product-list{
    font-size: 0;
    /*width: 600px;*/
    /*padding: 0 50px;*/
    margin: auto;
    li{
      border-bottom: 1px solid #383838;
      padding: 25px 0;
      display: flex;
      display:-webkit-flex;
      justify-content: space-around;
    }
    li:last-child{
      border-bottom: none;
    }
    input,textarea{
      width:268px;
      font-size: 16px;
      color: #959595;
      padding: 4px 6px;
      border: 1px solid #959595;
    }
    input{height:38px;}
    textarea{height:85px;resize: none;}
    .product-left{
      display: flex;
      display:-webkit-flex;
      justify-content:space-between;
      align-items:center;
      .product-name{font-size: 18px;color: #469ba2;padding-right: 20px;display: inline-block;}
      .product-img{
        height: 156px;
        width: 156px;
        border: 1px solid #959595;
        padding: 13px 12px;
        background: #fff;
        -moz-user-select:none;
        -webkit-user-select: none;
        -ms-user-select: none;
        img{height: 85%;vertical-align: middle;}
      }
      .border-img{
        border: 1px solid #d5d5d5;width: 100%;height: 100%;overflow: hidden;
        line-height: 128px;
        text-align: center;
      }
    }
    .product-right{
      .margin-b{margin-bottom: 32px;}
      span{
        font-size: 18px;
        vertical-align: top;
        padding: 10px 14px 0 0;
        display: inline-block;
      }
    }
  }
  .userinfo{
    font-size: 0;
    /*display: flex;*/
    /*display:-webkit-flex;*/
    /*justify-content: space-around;*/
    span{font-size: 18px;
      display: inline-block;
      padding-right: 24px;
      vertical-align: top;
      padding-top: 8px;
    }
    textarea{
      padding: 4px 6px;
      font-size: 16px;
      width: 574px;
      resize: none;
      height: 82px;
      color: #959595;
      border: 1px solid #959595;
    }
  }
  .product-btn{
    display:-webkit-flex;
    display: flex;
    display: block;
    font-size: 0;
    justify-content:center;
    padding: 26px 0 28px 0;
    span{display: inline-block;width: 27%;}
    .mar-36{margin-right: 36px;}
  }

  /*iphone*/

  @media (max-width: 1081px) {
    .product{width: 100%;
      background: #f8fdff;
      padding: 28px 4px 28px 4px;
      li{
        display: block;
      }
      .shuru{font-size: 18px;text-align: center;padding: 10px 0;background: #b2c9d2;}
    }
    .product-list{
      /*li{background: rgba(0,0,0,.1)}*/
      .product-right{
        span{font-size: 16px;width: 27%;padding: 10px 14px 0 0;text-align: right;}
        .margin-b{margin-bottom: 10px;}
      }
      input,textarea{width: 70%;}
      .product-left{
        display: block;
        /*text-align: center;*/
        margin-bottom: 10px;
        .product-name{
          text-align: right;
          padding-right: 14px;
          vertical-align: middle;
          width: 27%;
        }
        .product-img{
          /*margin: auto;*/
          vertical-align: middle;
          display: inline-block;
          width: 70%;
        }
      }
    }
    .userinfo{
      textarea{width: 70%;padding-right: 0;}
      span{
        font-size: 18px;
        width: 27%;
        text-align: right;
        padding-right: 14px;}
    }

  }
  @media (max-width: 341px) {
    .product-btn{
      .mar-36{margin-right: 10px;}
    }
    .userinfo{
      span{font-size: 16px;}
    }
  }
</style>
