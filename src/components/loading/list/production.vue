<template>
  <div class="production">
    <toptitle></toptitle>
    <div class="content-wapper" :style="getH">
      <div class="product">
        <div class="shuru clearfix"><i class="iconfont">&#xe68c;</i>&nbsp;<span>设备信息</span>
          <!--          <div class="padd-le">-->
          <!--            <span>工单状态:</span>-->
          <!--            <select name="" v-model="selState">-->
          <!--              <option :value='item.index' v-for="(item,index) in optionList" :key="index">{{item.title}}</option>-->
          <!--            </select>-->
          <!--            &lt;!&ndash;            <input type="text" class="dingdanh" placeholder="请输入订单号">&ndash;&gt;-->
          <!--            <span class="serch-sou" @click="searchList"><i class="iconfont">&#xe6e6;</i></span>-->
          <!--          </div>-->
        </div>
        <table border="0" class="table-list" cellpadding="0">
          <tr>
            <th>设备名称</th>
            <th>待机时间</th>
            <th>运行时间</th>
          </tr>
          <tr v-for="(item,index) in fieldData" :key="index" @click="elect(item)">
            <td>{{item.devname}}</td>
            <td>{{item.standby}}</td>
            <td>{{item.run}}</td>
          </tr>
        </table>
        <!--        <div class="infoshow"  v-show="another.woCustomerid">-->
        <!--          <span class="infoshow-titile">客户信息</span>-->
        <!--          <span>{{another.woCustomerid}}</span>-->
        <!--        </div>-->
        <!-- 没有订单-->
        <div class="noneorder"  v-show="formDataList.length==0">
          <p>当前没有设备信息！{{formDataList}}</p>
          <!--          <button class="btn-common" @click="order">去下单</button>-->
        </div>
        <!--分页-->
        <div class="page-wapper">
          <van-pagination
            v-model="formList.page"
            :total-items="formDataList"
            :show-page-size="formList.size"
            force-ellipses
            @change="pageSw"
          />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
    import Vue from 'vue';
    import { Pagination } from 'vant';
    Vue.use(Pagination);
    import toptitle from '../toptitle/toptitle'
    import popup from '../dialog/dialog'
    export default{
        name:'production',
        components:{toptitle,popup},
        data(){
            return{
                optionList:[
                    {index:1,title:'已完成'},
                    {index:2,title:'运行中'},
                    {index:3,title:'提交中'},
                    {index:4,title:'已作废'},
                ],
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
                formList:{
                    'sta':1,
                    'page':1,
                    'size':10
                },
                formDataList:[],//获取后台数据
                fieldData:[],//前台数据模拟分页
                sessionId:localStorage.getItem('sessionIds'),
                selState:1,
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
                // let d = new Date(datetime);
                let d = new Date(datetime.substr(0,parseInt(datetime.indexOf('.'))).replace(/-/g,"/").replace('T'," "));
                let formatdatetime = d.getFullYear() + '/' + addDateZero(d.getMonth() + 1) + '/' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
                return formatdatetime;
            },
            //获取表单记录
            getFrom(){
                let me=this;
                this.$loading.show('数据加载中...');
                this.$api.totalGet().then(res=>{
                    me.$loading.hide('');
                    let json=res.data.result;
                    me.formDataList=res.data.result.length;
                    me.datalist=json;
                    console.log(res.data.result)
                    // me.pageSw(1);
                }).catch((err)=>{
                    me.$loading.hide('');
                })
            },
            //分页
            pageSw(value){
                this.formList.page=value
                this.fieldData=this.datalist.slice((value-1)*10,value*10)
            },
            //搜索
            searchList(){
                this.formList.sta=this.selState;
                this.getFrom();
                console.log(this.selState)
            }
        },
        created(){
            //自动设定高度
            window.addEventListener('resize', this.getHeight);
            this.getHeight();
        },
        mounted() {
            let me=this;
            this.getFrom();
        },
        destroyed(){
            //组件销毁清除事件
            window.removeEventListener('resize', this.getHeight)
        }
    }
</script>
<style lang="scss">
  @import "../../../static/scss/common";
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
  .production{
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
  .padd-le{
    font-size: 0;
    position: absolute;
    right: 0;
    top: 0;
    .dingdanh{padding: 4px 12px;color: #9da4a7;vertical-align: middle;font-size: 18px;}
    select{font-size: 18px;border: 1px solid #1b81a9;padding: 4px 12px;vertical-align: middle;color: #7eb2bb}
    span{font-size: 18px;vertical-align: middle;}
    .serch-sou{
      border: 1px solid #13b5b1;
      cursor: pointer;
      display: inline-block;
      padding: 4px 10px;
      i{color: #13b5b1;}
    }
  }
  .product{
    width: 80%;
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
      background:url("../../../static/images/plan_bg.png") no-repeat;
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
    th,td{padding: 14px 11px;border-bottom: 1px solid #ccc;}
    tr:first-child{
      background: #f3f3f3;
    }
    th{color: #469ba2;font-weight: 400;}
  }
  .page-wapper{
    width: 48%;
    margin: auto;
    padding-top: 40px;
    .van-pagination__item{
      color: #1b81a9;
    }
    .van-pagination__item--active{
      background-color: #1b81a9;
      color: #fff;
    }
    .van-pagination__item--disabled, .van-pagination__item--disabled:active{
      color: #7d7e80;
    }
    .van-pagination__item:active{
      background-color: #84c4c6;
      color: #fff;
    }
    .van-pagination__item--disabled, .van-pagination__item--disabled:active {
      color: #7d7e80;
      background-color: #f8f8f8;
      opacity: .5;
    }
  }

  /*iphone*/
  @media (max-width: 1081px) {
    .page-wapper{
      width: 94%;
    }
    .plan-wapper{
      .plan{
        background-position: 26px 0;padding-left: 10px;
        li{
          margin-bottom: 52px;
        }
      }
    }
    .padd-le{right:6px;
      top: 50%;
      transform: translateY(-50%);
      .dingdanh{color: #9da4a7;vertical-align: middle;font-size: 0.18rem;}
      select{font-size: 0.16rem;border: 1px solid #1b81a9;padding: 0.04rem 0.12rem;vertical-align: middle;color: #7eb2bb}
      span{font-size: 0.16rem;vertical-align: middle;}
      .serch-sou{
        padding: 0.04rem 0.12rem;
      }
    }
    .table-list{
      font-size: 14px;
    }
    .product{width: 100%;
      /*background: #f8fdff;*/
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
