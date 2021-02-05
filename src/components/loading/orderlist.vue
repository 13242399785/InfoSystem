<template>
  <div class="orderlist">
    <toptitle></toptitle>
    <div class="content-wapper" :style="getH">
      <div class="product">
        <p class="shuru clearfix"><i class="iconfont">&#xe68c;</i>&nbsp;<span>订单信息</span>
<!--          <router-link to="/"><button class="btn-common padd-le">返回首页</button></router-link>-->
        </p>
        <table border="0" class="table-list" cellpadding="0">
          <tr>
            <th>订单编号</th>
            <th  v-if="!phoneShow">小树吊牌</th>
            <th  v-if="!phoneShow">星月吊牌</th>
            <th  v-if="!phoneShow">风车吊牌</th>
            <th>总数</th>
            <th>下单时间</th>
<!--            <th>下单时间</th>-->
          </tr>
          <tr v-for="(item,index) in datalist" :key="index" @click="elect(item)">
            <td>{{item.woId}}</td>
            <td v-if="!phoneShow">{{item.woPnum1}}</td>
            <td v-if="!phoneShow">{{item.woPnum2}}</td>
            <td v-if="!phoneShow">{{item.woPnum3}}</td>
            <td>{{item.woPnum1+item.woPnum2+item.woPnum3}}</td>
            <td>{{formateDate(item.woSstime)}}</td>
<!--            <td>{{item.woRemark}}</td>-->
          </tr>
<!--          <tr>-->
<!--            <td>02314</td>-->
<!--            <td>12</td>-->
<!--            <td>10</td>-->
<!--            <td>3</td>-->
<!--            <td>44</td>-->
<!--            <td>2019/11/25 11:24:22</td>-->
<!--          </tr>-->
        </table>
        <div class="infoshow"  v-show="another.woCustomerid">
          <span class="infoshow-titile">客户信息</span>
          <span>{{another.woCustomerid}}</span>
        </div>
        <!-- 没有订单-->
        <div class="noneorder"  v-show="!another.woCustomerid">
          <p>当前没有订单信息！</p>
          <button class="btn-common" @click="order">去下单</button>
        </div>
        <div class="plan-wapper" v-show="another.woCustomerid">
          <p class="shuru"><i class="iconfont">&#xe602;</i>&nbsp;<span>订单进度</span></p>
          <ul class="plan">
            <li>
              <span class="iconf"><i class="iconfont">&#xe69b;</i></span><span class="plan-text">工单提交</span><span class="plan-time">{{formateDate(another.woSstime)}}</span>
            </li>
            <li>
              <span class="iconf"><i class="iconfont rotate-a">&#xe70a;</i></span><span class="plan-text">工单运行</span><span class="plan-time">{{formateDate(another.woStime)}}</span>
            </li>
            <li v-if="another.woSta!=4">
<!--              <b v-if="another.woSta==3">已</b><b v-if="another.woSta<3">未</b>-->
              <span class="iconf"><i class="iconfont rotate-a" :class="{noactive:another.woSta!=3}">&#xe61c;</i></span><span class="plan-text">工单完成</span><span class="plan-time">{{formateDate(another.woEtime)}}</span>
            </li>
            <li v-if="another.woSta==4">
              <span class="iconf"><i class="iconfont zuofei">&#xe601;</i></span><span class="plan-text">工单作废</span><span class="plan-time">{{formateDate(another.woEtime)}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
    import toptitle from './toptitle/toptitle'
    import popup from './dialog/dialog'
    export default{
        name:'orders',
        components:{toptitle,popup},
        data(){
            return{
                phoneShow:false,
                showDialog:false,
                noactive:'noactive',
                getH:{
                    height:''
                },
                user:localStorage.getItem('nowUserName')||'admin',
                datalist:[],
                another:{
                    woCustomerid:'',
                    woSta:0,
                    woSstime:'',
                    woStime:'',
                    woEtime:''
                },
                sessionId:localStorage.getItem('sessionIds'),
            }
        },
        methods:{
            //组件确定下单
            //获取高度
            getHeight(){
                //窗口高度
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                let w=document.body.clientWidth||document.documentElement.clientWidth;
                // console.log(w)
                if(w>1080){
                    this.phoneShow=false;
                    this.getH.height=(h-172)+'px';//减去已有标签的高度
                }else{
                    this.phoneShow=true;
                    this.getH.height=(h-116)+'px';//减去已有标签的高度
                }
            },
            order(){
                this.$router.push('orders')
            },
            //选中当前数据
            elect(item){
                let me=this;
                me.another.woCustomerid=item.woCustomerid;
                me.another.woSta=item.woSta;
                me.another.woSstime=item.woSstime;
                me.another.woStime=item.woStime;
                me.another.woEtime=item.woEtime;
            },
            //日期转化格式
            formateDate(datetime) {
                function addDateZero(num) {
                    return (num < 10 ? "0" + num : num);
                }
                if(datetime==null||datetime==''){
                    return 'Timing error';
                }else{
                    let d = new Date(datetime.substr(0,parseInt(datetime.indexOf('.'))).replace(/-/g,"/").replace('T'," "));
                    let formatdatetime = d.getFullYear() + '/' + addDateZero(d.getMonth() + 1) + '/' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
                    return formatdatetime;
                }
            }
        },
        created(){
            //自动设定高度
            window.addEventListener('resize', this.getHeight);
            this.getHeight();
        },
        mounted() {
            let me=this;
            this.$api.orderList(this.user).then(res=>{
                let json=res.data.result;
                me.datalist=json;
                //初始值
                me.another.woCustomerid=json[0].woCustomerid;
                me.another.woSta=json[0].woSta;
                me.another.woSstime=json[0].woSstime;
                me.another.woStime=json[0].woStime;
                me.another.woEtime=json[0].woEtime;
                console.log(res.data.result)
            })
        },
        destroyed(){
            //组件销毁清除事件
            window.removeEventListener('resize', this.getHeight)
        }
    }
</script>
<style lang="scss" scoped="scoped">
  @import "../../static/scss/common";
  /*旋转动画*/
  @keyframes rotates{
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .rotate-a{
    /*animation: rotates 1s linear 0s infinite;*/
    /*-webkit-animation:rotates 1s linear 0s infinite;*/
    display: inline-block;
  }
  .orderlist{
    height: 100%;
  }
  .content-wapper{
    overflow: auto;
  }
  .content-wapper::-webkit-scrollbar {/*滚动条整体样式*/
    width:0.1rem;     /*高宽分别对应横竖滚动条的尺寸*/
    height:1px;
    display: none;
  }
  .content-wapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(111,172,180,.3);
  }
  .shuru{
    position: relative;}
  .padd-le{position: absolute;right: 0;top: 0;}
  .product{
    width: 60%;
    padding-top: 32px;
    margin: auto;
    text-align: left;
    color: #373737;
    font-size: 18px;
  }
  .infoshow{width: 100%;border: 1px solid #959595;margin-top: 28px;padding: 14px 10px;
    .infoshow-titile{color: #469ba2;display: inline-block;padding-right: 24px;}
  }
  .plan-wapper{margin: 40px 0 20px 0;
    .plan{
      font-size: 18px;
      background:url("../../static/images/plan_bg.png") no-repeat;
      background-position: 16px 0;
      margin-top:32px;
      li{
        margin-bottom: 100px;
        background: #f8fdff;
      }
      li:last-child{
        margin-bottom: 30px;
      }
      span{display: inline-block;}
      .plan-text{padding: 0 24px 0 12px;}
      .plan-time{font-size: 14px;color: #858585;}
      .iconf{
        vertical-align: middle;
        font-size: 34px;
        color: #22ac38;
      }
      .noactive{color: #d2d6d6;}
      .zuofei{color: red;}
    }
  }
  .noneorder{
    text-align: center;
    padding-top: 20px;
    p{font-size: 24px;color: #9da4a7;padding-bottom: 12px;}
  }
  .table-list{width: 100%;
    margin-top: 20px;
    text-align: center;
    border-collapse:separate;
    border-spacing:0px 0;
    border: 1px solid #959595;
    tr{
      cursor: pointer;}
    tr:hover{
      background:#dbf0f9;
    }
    th,td{padding: 14px 11px;}
    tr:first-child{
      background: #f3f3f3;
    }
    th{color: #469ba2;font-weight: 400;}
  }

  /*iphone*/
  @media (max-width: 1081px) {
    .plan-wapper{
      .plan{
        background-position: 26px 0;padding-left: 10px;
        li{
          margin-bottom: 52px;
        }
      }
    }
    .padd-le{right: 0;top: 1px;}
    .table-list{
      font-size: 14px;
    }
    .product{width: 100%;
      background: #f8fdff;
      padding: 28px 4px 28px 4px;
      li{
        display: block;
      }
      .shuru{font-size: 18px;text-align: left;padding: 10px 15px;background: #b2c9d2;}
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
    .userinfo{
      span{font-size: 16px;}
    }
  }
</style>
