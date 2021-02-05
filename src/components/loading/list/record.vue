<template>
  <div class="record">
    <toptitle></toptitle>
    <div class="content-wapper bg-auto" :style="getH">
      <div class="product">

        <div class="shuru clearfix"><i class="iconfont">&#xe68c;</i>&nbsp;<span>工单信息</span>
          <p class="t-total pc-total"><span>总数:{{sumToal}}</span>&nbsp;&nbsp;
<!--            &nbsp;<span>合格率:{{yield}}%</span>-->
          </p>
          <div class="padd-le">
<!--            <span>工单状态:</span>-->
<!--             <select name="" v-model="selState">-->
<!--               <option :value='item.index' v-for="(item,index) in optionList" :key="index">{{item.title}}</option>-->
<!--             </select>-->

            <div class="time-chooce"><span></span>
<!--              <input @click="dateShow" readonly class="timeInput" placeholder="选择时间" v-model="timeC" type="text">-->
<!--              <div class="date-picker">-->
<!--                <van-datetime-picker-->
<!--                  v-model="currentDate"-->
<!--                  type="date"-->
<!--                  :min-date="minDate"-->
<!--                  :max-date="maxDate"-->
<!--                  @confirm="dateSure"-->
<!--                  @cancel="dateCancel"-->
<!--                />-->
<!--                <van-calendar v-model="show1" type="range" @confirm="onConfirm" />-->
              <el-date-picker
                v-model="formList1.startTime"
                type="date"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                placeholder="开始日期">
              </el-date-picker>
              <span>至</span>
              <el-date-picker
                v-model="formList1.endTime"
                :picker-options="pickerOptions"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束日期">
              </el-date-picker>
<!--              </div>-->
            </div>
            <input type="text" class="dingdanh" placeholder="请输入订单编号" v-model="formList1.woId">
            <span class="serch-sou" @click="searchList"><i class="iconfont">&#xe6e6;</i> 搜索</span>
          </div>
        </div>
        <p class="t-total wap-total"><span>总数:{{sumToal}}</span>&nbsp;&nbsp;&nbsp;
<!--          <span>合格率:{{yield}}%</span>-->
        </p>
        <table border="0" class="table-list" cellpadding="0">
          <tr>
            <th style="width: 20%">订单编号</th>
            <th style="width: 11%" v-if="!phoneShow">小树吊牌</th>
            <th style="width: 11%" v-if="!phoneShow">风车吊牌</th>
            <th style="width: 11%" v-if="!phoneShow">星月吊牌</th>
            <th style="width: 6%">总数</th>
            <th style="width: 20%">下单时间</th>
            <th style="width: 8%">状态</th>
            <th style="width: 8%" v-if="!phoneShow">备注</th>
          </tr>
<!--          <tr v-for="(item,index) in fieldData" :key="index" @click="elect(item)">-->
<!--            <td>{{item.woId}}</td>-->
<!--            <td v-if="!phoneShow">{{item.woPnum1}}</td>-->
<!--            <td v-if="!phoneShow">{{item.woPnum2}}</td>-->
<!--            <td v-if="!phoneShow">{{item.woPnum3}}</td>-->
<!--            <td>{{item.woPnum1+item.woPnum2+item.woPnum3}}</td>-->
<!--            <td>{{formateDate(item.woSstime)}}</td>-->
<!--            <td>{{states(item.woSta)}}</td>-->
<!--            <td v-if="!phoneShow">{{item.woRemark}}</td>-->
<!--          </tr>-->
        </table>
        <div class="table-auto">
          <table border="0" class="table-list" cellpadding="0">
            <tr v-for="(item,index) in fieldData" :key="index" @click="elect(item)">
              <td style="width: 20%">{{item.woId}}</td>
              <td style="width: 11%" v-if="!phoneShow">{{item.woPnum1}}</td>
              <td style="width: 11%" v-if="!phoneShow">{{item.woPnum2}}</td>
              <td style="width: 11%" v-if="!phoneShow">{{item.woPnum3}}</td>
              <td style="width: 6%">{{item.woPnum1+item.woPnum2+item.woPnum3}}</td>
              <td style="width: 20%">{{formateDate(item.woSstime)}}</td>
              <td style="width: 8%">{{states(item.woSta)}}</td>
              <td style="width: 8%" v-if="!phoneShow">{{item.woRemark}}</td>
            </tr>
          </table>
        </div>
<!--        <div class="infoshow"  v-show="another.woCustomerid">-->
<!--          <span class="infoshow-titile">客户信息</span>-->
<!--          <span>{{another.woCustomerid}}</span>-->
<!--        </div>-->
        <!-- 没有订单-->
        <div class="noneorder"  v-show="formDataList<=0">
          <p>当前时间段没有工单信息！</p>
          <button class="btn-common" @click="order">去下单</button>
        </div>
        <!--分页-->
        <div class="page-wapper">
          <van-pagination
            v-model="formList1.page"
            :total-items="formDataList"
            :show-page-size="formList1.size"
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
    import {Pagination,DatetimePicker,Calendar} from 'vant';
    import { DatePicker } from 'element-ui';
    Vue.use(Pagination);
    // Vue.use(DatetimePicker);
    // Vue.use(Calendar);
    Vue.use(DatePicker);

    import toptitle from '../toptitle/header'
    import popup from '../dialog/dialog'
    console.log(DatePicker )
    export default{
        name:'record',
        components:{toptitle,popup},
        data(){
            return{
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime()>Date.now();
                    }
                },
                optionList:[
                    {index:1,title:'已完成'},
                    {index:2,title:'运行中'},
                    {index:3,title:'提交中'},
                    {index:4,title:'已作废'},
                ],
                value1: '',
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
                formList1:{
                    'startTime':'',
                    'endTime':'',
                    'woId':'',
                    'page':1,
                    'size':10
                },
                startTime:'',
                endTime:'',
                formDataList:[],//获取后台数据
                fieldData:[],//前台数据模拟分页
                sessionId:localStorage.getItem('sessionIds'),
                selState:1,
                sumToal:0,//总数
                yield:0,//合格率
                dingNumber:'',
                minDate: new Date(2017,1, 1),
                maxDate: new Date(),
                currentDate: new Date(),
                timeC:'',
                datePs:false,
                date: '',
                show1: true
            }
        },
        methods:{
            onConfirm(date) {
                const [start, end] = date;
                this.show1 = false;
                this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
            },
            formatDate(date) {
                return `${date.getMonth() + 1}/${date.getDate()}`;
            },
            dateConversion(value){
                function addDateZero(num) {
                    return (num < 10 ? "0" + num : num);
                }
                var d = new Date(value);
                var date = d.getFullYear() + '-' + addDateZero((d.getMonth() + 1)) + '-' + addDateZero(d.getDate());
                return date;
            },
            dateShow(){
                this.datePs=true;
                this.timeC='';
            },
            dateSure(val){
                this.timeC=this.dateConversion(val);
                this.datePs=false;
                console.log(this.dateConversion(val))
            },
            dateCancel(val){
              this.datePs=false;
            },
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
                    this.getH.height=(h-130)+'px';//减去已有标签的高度
                }
            },
            // state
            states(data){
                if(data===1){
                    return '待生产'
                }else if(data===2){
                    return '加工中'
                }else if(data===3){
                    return '已完成'
                }else if(data===4){
                    return '已作废'
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
            NewDate(str){
                if(!str){
                    return 0;
                }
                arr=str.split(" ");
                d=arr[0].split("-");
                t=arr[1].split(":");
                var date = new Date();
                date.setUTCFullYear(d[0], d[1] - 1, d[2]);
                date.setUTCHours(t[0], t[1], t[2], 0);
                return date;
            },
            //日期转化格式
            formateDate(datetime) {
                function addDateZero(num) {
                    return (num < 10 ? "0" + num : num);
                }
                if(datetime==null||datetime==''){//时间错误的时候
                    return 'Timing error';
                }else{
                    let d = new Date(datetime.substr(0,parseInt(datetime.indexOf('.'))).replace(/-/g,"/").replace('T'," "));//转化兼容IE时间格式
                    let formatdatetime = d.getFullYear() + '/' + addDateZero(d.getMonth() + 1) + '/' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
                    return formatdatetime;
                }
            },
            //获取表单记录
            getFrom(){
                let me=this;
                this.$loading.show('数据加载中...');
                this.$api.ListGet().then(res=>{
                    me.$loading.hide('');
                    let json=res.data.result;
                    if(me.dingNumber==''&&me.timeC==''){//两个条件都没有
                        me.datalist=json;
                        me.formDataList=res.data.result.length;
                    }else if(me.dingNumber!=''&&me.timeC==''){//只有编号
                        me.datalist=json.filter(item =>{
                            return item.woId==me.dingNumber
                        })
                        me.formDataList=me.datalist.length;
                    }else if(me.dingNumber==''&&me.timeC!=''){//只有时间
                        me.datalist=json.filter(item =>{
                            return me.dateConversion(item.woSstime)==me.timeC
                        })
                        me.formDataList=me.datalist.length;
                    }else{//两个条件都有
                        me.datalist=json.filter(item =>{
                            return item.woId==me.dingNumber&&me.dateConversion(item.woSstime)==me.timeC
                        })
                        me.formDataList=me.datalist.length;
                    }
                    console.log(me.datalist)

                    // //初始值
                    me.another.woCustomerid=json[0].woCustomerid;
                    me.another.woSta=json[0].woSta;
                    me.another.woSstime=json[0].woSstime;
                    me.another.woStime=json[0].woStime;
                    me.another.woEtime=json[0].woEtime;
                    // console.log(res.data.result)
                    me.pageSw(1);
                    me.getYield();
                    me.getToal();
                }).catch((err)=>{
                    me.$loading.hide('');
                })
            },
            getFrom1(){
                let me=this;
                this.$loading.show('数据加载中...');
                this.$api.ListGet1(this.formList1).then(res=>{
                    me.$loading.hide('');
                    let json=res.data.result.list;
                    me.formDataList=res.data.result.total;
                    me.sumToal=res.data.result.total;
                    me.fieldData=json;
                    me.getYield();
                    console.log(me.datalist)
                }).catch((err)=>{
                    me.$loading.hide('');
                })
            },
            //获取总数
            getToal(){
                let me=this;
                this.$api.totalGet().then(res=>{
                    console.log(res)
                    me.sumToal=res.data.result;
                    me.datalist=json;
                }).catch((err)=>{
                })
            },
            //已完成合格率
            getYield(){
                let me=this;
                this.$api.percentPass().then(res=>{
                    console.log(res)
                    me.yield=res.data.result;
                }).catch((err)=>{
                })
            },
            //分页
            pageSw(value){
                console.log(value)
                this.formList1.page=value;
                this.getFrom1();
                // this.formList.page=value
                // this.fieldData=this.datalist.slice((value-1)*10,value*10)
            },
            //搜索
            searchList(){
                // console.log(this.startTime)
                // this.formList.sta=this.selState;
                this.formList1.page=1;
                this.getFrom1();
                // console.log(this.selState)
            }
        },
        created(){
            //自动设定高度
            window.addEventListener('resize', this.getHeight);
            this.getHeight();
        },
        mounted() {
            let me=this;
            this.getFrom1();
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

  /*.timeInput{*/
  /*  padding: 4px 12px;*/
  /*  color: #9da4a7;*/
  /*  vertical-align: middle;*/
  /*  font-size: 18px;*/
  /*}*/
  .table-auto{
    max-height: 450px;
    overflow:auto;
    border-bottom: 1px solid #ccc;
    .table-list{
      border-top: none;
      margin-top: 0;
      tr:first-child{
        background: none;
      }
    }
  }
  .record{
    height: 100%;
    .el-input__inner{
      height: 34px;
      line-height: 34px;
    }
    .el-input__prefix,.el-input__suffix{
      top:-4px;
    }
  }
  .content-wapper{
    overflow: auto;
  }
  .bg-auto{
    background:transparent;
  }
  .content-wapper::-webkit-scrollbar {/*滚动条整体样式*/
    width:0.1rem;     /*高宽分别对应横竖滚动条的尺寸*/
    height:1px;
    display: none;
  }
  .time-chooce{
    display: inline-block;
    position: relative;
    margin-right: 6px;
  }
  .date-picker{
    z-index: 99;
    position: absolute;
    width: 100%;
    /*height: 500px !important;*/
    left: 0;
    height: 0px;
    bottom: 0;
  }
  .content-wapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(111,172,180,.3);
  }
  .shuru{position: relative;}
  .t-total{font-size: 16px;display: inline-block;padding-left: 20px;font-weight: bold;}
  .padd-le{
    font-size: 0;
    position: absolute;
    right: 0;
    top: 0;
    input{padding: 4px 12px;color: #9da4a7;vertical-align: middle;font-size: 18px;}
    .timeInput{
      width: 200px;
    }
    select{font-size: 18px;border: 1px solid #1b81a9;padding: 4px 12px;vertical-align: middle;color: #7eb2bb}
    span{font-size: 18px;vertical-align: middle;}
    .serch-sou{
      border: 1px solid #13b5b1;
      cursor: pointer;
      display: inline-block;
      padding: 4px 10px;
      color:#13b5b1;
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
    background: #fff;
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
    th,td{padding: 14px 5px;border-bottom: 1px solid #ccc;}
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
  .wap-total{display: none;}
  .time-chooce{
    sapn{
      vertical-align: middle;
    }
    .el-input__inner{
      height: 33px;
      line-height: 33px;
    }
    .el-input{
      vertical-align: middle;
      width: 200px;
      font-size: 18px;
      /*padding: 4px;*/
      .el-input__inner{
        height: 33px;
        line-height: 33px;
      }
    }
  }
  /*.pc-total{display: block;}*/
  @media (max-width: 1023px) {
    .wap-total{display: block;padding: 6px 6px 0px 6px;}
    .pc-total{display: none;}
  }
  /*iphone*/
  @media (max-width: 1081px) {
    .noneorder{
      p{
        font-size: 0.14rem;
      }
    }
    .time-chooce{
      display: block;
      text-align: left;
      margin-bottom: 4px;
      .el-input{
        font-size: 12px;
        width:134px;
        .el-input__inner{
          height: 33px;
          line-height: 33px;
        }
      }
    }
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
    .padd-le{
      text-align: right;
      left:0;
      top: -170%;
      /*<!--top: 50%;-->*/
      /*<!--transform: translateY(-50%);-->*/
      .timeInput{
        width: 1.5rem;
      }
      input{
        font-size: 0.12rem;
        padding: 4px 4px;
      }
      .dingdanh{color: #9da4a7;vertical-align: middle;font-size: 0.12rem;width: 1.2rem;}
      select{font-size: 0.14rem;border: 1px solid #1b81a9;padding: 0.04rem 0.12rem;vertical-align: middle;color: #7eb2bb;}
      span{font-size: 0.16rem;vertical-align: middle;}
      .serch-sou{
        padding: 0.04rem 0.12rem;
        font-size: 0.12rem;
      }
    }
    .table-list{
      font-size: 14px;
    }
    .product{width: 100%;
      /*background: #f8fdff;*/
      padding: 79px 4px 28px 4px;
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
