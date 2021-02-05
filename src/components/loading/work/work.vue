<template>
  <div class="work-wapper clearfix">
    <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 工单信息</span></p>
    <div class="work-list">
      <div class="work-tabheader">
        <p class="left_table_h" v-for="(item,index) in tableHeader" :key="index">{{item}}</p>
      </div>
      <div class="work-rightbox" :style="animates">
        <div class="work-tabcontent" v-for="(item1,index1) in tableContent" :key="index1">
          <p class="dis_block"><span>{{item1.woId}}</span></p>
          <p :class="item1.woSta===1?'submit_c':(item1.woSta===2?'alive_c':(item1.woSta===3?'complete_c':(item1.woSta===4?'cancel_c':'')))">{{item1.woSta===1?'提交':(item1.woSta===2?'运行':(item1.woSta===3?'完成':(item1.woSta===4?'作废':'未知状态')))}}</p>
          <p>{{item1.woPname}}</p>
          <p>{{item1.woCusername}}</p>
          <p>{{item1.woPnum}}</p>
          <p>{{formateDate(item1.woStime)}}</p>
          <p>{{formateDate(item1.woEtime)}}</p>
          <p>{{item1.woRemark}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        name:'work',
        data(){
            return{
                tableHeader:['工单号','工单状态','产品名称','创建人','产品总数','开始时间','结束时间','备注信息'],
                // tableHeader:['产品ID','工单ID','原料出库','切割','打磨','打标','图案检测','文字检测','装配','产品入库','产品名称'],
                tableContent:[
                    {woId:' ',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                    {woId:' ',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                    {woId:' ',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                    {woId:'',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                    {woId:'',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                    {woId:'',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                    {woId:'',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                    {woId:'',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                    {woId:'',woSta:'',woPname:'',woCusername:'',count:'',woStime:'',woEtime:'',woRemark:''},
                ],
                sta:'',
                listLength:0,
                animates:'',
                workTimer:''
            }
        },
        destroyed(){
            clearTimeout(this.workTimer)
        },
        mounted(){
            this.getFromInfo()
            let width=$('.work-tabcontent').outerWidth();
            // console.log(width)
        },
        methods:{
            getFromInfo(){
                let me=this;
                this.$api.ListGet().then(res=>{
                    if(res.data.result.length==0){
                      return false
                    }else{
                      me.tableContent=res.data.result.slice(0,10);//拿数据前十条
                      me.listLength=res.data.result.length;
                    }
                    
                }).catch((err)=>{
                    console.log(err)
                })
                clearTimeout(me.workTimer)
                me.workTimer=setTimeout(me.getFromInfo,10000);
            },
            //日期转化格式
            formateDate(datetime) {
                // console.log(datetime)
                function addDateZero(num) {
                    return (num < 10 ? "0" + num : num);
                }
                if(datetime==null||datetime==''){//时间错误的时候
                    return ' ';
                    // return 'Timing error';
                }else{
                    // console.log(datetime)
                    // let d = new Date(datetime.substr(0,parseInt(datetime.indexOf('.'))).replace(/-/g,"/").replace('T'," "));//转化兼容IE时间格式
                    let d = new Date(datetime);
                    let formatdatetime = d.getFullYear() + '/' + addDateZero(d.getMonth() + 1) + '/' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
                    return formatdatetime;
                }
            },
        }
    }
</script>
<style lang="scss" scoped="scoped">
@import "../../../static/scss/common";
  @keyframes myMoveL {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-245%);
    }
  }
  .work-wapper{
    height: 100%;
    overflow: hidden;
    .work-list{
      position: relative;

      height: 90%;
      /*display: flex;*/
      /*justify-content:space-between;*/

      /*flex-direction: column;*/

    }
    .work-tabheader{
      height: 100%;
      color: #00e9ff;
      width: 15%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      /*display:flex;*/
      /*flex-flow: column nowrap;*/
      /*align-items:center;!*垂直居中*!*/
      background: $bgc;
      p{
        /*line-height:31px;*/
        /*padding: 12% 0;*/
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 18% 0;
        height: 12%;
        width: 100%;
        // flex-grow: 1;
        border-bottom: 1px solid #7eb2bb;
        border-right:1px solid #7eb2bb;
      }
    }
    .work-rightbox{
      /*display: inline-block;*/
      height: 100%;
      margin-left: 15%;
      /*overflow: auto;*/
      font-size: 0;
      white-space: nowrap;
      text-align: left;
      overflow: hidden;
      /*animation: myMoveL 30s linear infinite;*/
      /*animation-fill-mode: forwards;*/
      /*animation-direction:alternate;*/
    }
    .work-tabcontent{
      width: 20%;
      display: inline-block;
      color: #fff;
      /*display:flex;*/
      /*flex-flow: column nowrap;*/
      /*align-items:center;!*垂直居中*!*/
      float: left;
      height: 100%;
      white-space: normal;
      /*width: 20%;*/
      .dis_block{
        display: block;
        // padding: 8% 2px;
        // overflow: auto;
        // overflow: auto;
        span{
          display: block;
          padding: 8% 2px;
          text-align: center;
        }
      }
      p{
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: stretch;
        flex-wrap: wrap;
        font-size: 12px;
        height: 12%;
        // overflow: auto;
        padding: 0 2px;
        /*line-height:31px;*/
        /*height: 10%;*/
        /*padding: 9% 2%;*/
        // padding: 18% 0;
        /*flex-grow: 1;*/
        /*overflow: hidden;*/
        /*word-wrap: normal;*/
        /*text-overflow:ellipsis;*/
        /*width: 100%;*/
        word-wrap: break-word;
        white-space: normal;
        border-bottom: 1px solid #7eb2bb;
        border-right:1px solid #7eb2bb;
        span{
          display: block;
        }
      }
    }
    @media (max-width: 800px) {
      .work-tabcontent:last-child{
        /*display: none;*/
      }
    }
  }
</style>
