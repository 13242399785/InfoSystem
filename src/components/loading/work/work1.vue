<template>
  <div class="work-wapper">
    <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 工单信息</span></p>
    <div class="work-list">
      <div class="work-tabheader">
        <p v-for="(item,index) in tableHeader" :key="index">{{item}}</p>
      </div>
      <div class="work-rightbox" :style="animates">
        <div class="work-tabcontent" v-for="(item1,index1) in tableContent" :key="index1">
          <p>{{item1.woId}}</p>
          <p>{{item1.woSta===1?'提交':(item1.woSta===2?'运行':(item1.woSta===3?'完成':'作废'))}}</p>
          <p>{{item1.woPnum1}}</p>
          <p>{{item1.woPnum2}}</p>
          <p>{{item1.woPnum3}}</p>
          <p>{{item1.woPnum1+item1.woPnum2+item1.woPnum3}}</p>
          <p>{{formateDate(item1.woSstime)}}</p>
          <p>{{formateDate(item1.woEtime)}}</p>
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
                tableHeader:['工单号','工单状态','小树吊牌','星月吊牌','风车吊牌','产品总数','下单时间','完成时间'],
                // tableHeader:['产品ID','工单ID','原料出库','切割','打磨','打标','图案检测','文字检测','装配','产品入库','产品名称'],
                tableContent:[
                    {woId:'WO2016091001',woSta:'11',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                    {woId:'WO2016091001',woSta:'22',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                    {woId:'WO2016091001',woSta:'33',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                    {woId:'WO2016091001',woSta:'33',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                    {woId:'WO2016091001',woSta:'33',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                    {woId:'WO2016091001',woSta:'33',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                    {woId:'WO2016091001',woSta:'33',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                    {woId:'WO2016091001',woSta:'33',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                    {woId:'WO2016091001',woSta:'33',woPnum1:'完成',woPnum2:'完成',woPnum3:'完成',count:'完成',woSstime:'完成',woEtime:'完成'},
                ],
                sta:'',
                listLength:0,
                animates:''
            }
        },
        mounted(){
            this.getFromInfo()
            let width=$('.work-tabcontent').outerWidth();
            console.log(width)
        },
        methods:{
            getFromInfo(){
                let me=this;
                this.$api.ListGet().then(res=>{
                    me.tableContent=res.data.result.slice(0,10);//拿数据前十条
                    me.listLength=res.data.result.length;
                }).catch((err)=>{
                    console.log(err)
                })
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
        }
    }
</script>
<style lang="scss" scoped="scoped">
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
      width: 20%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      /*display:flex;*/
      /*flex-flow: column nowrap;*/
      /*align-items:center;!*垂直居中*!*/
      background: #313131;
      p{
        /*line-height:31px;*/
        /*padding: 12% 0;*/
        padding: 10% 0;
        height: 12.5%;
        width: 100%;
        flex-grow: 1;
        border-bottom: 1px solid #7eb2bb;
        border-right:1px solid #7eb2bb;
      }
    }
    .work-rightbox{
      /*display: inline-block;*/
      height: 100%;
      margin-left: 20%;
      /*overflow: auto;*/
      font-size: 0;
      white-space: nowrap;
      text-align: left;
      animation: myMoveL 30s linear infinite;
      animation-fill-mode: forwards;
      animation-direction:alternate;
    }
    .work-tabcontent{
      width: 34%;
      display: inline-block;
      color: #fff;
      /*display:flex;*/
      /*flex-flow: column nowrap;*/
      /*align-items:center;!*垂直居中*!*/
      height: 100%;
      /*width: 20%;*/
      p{
        text-align: center;
        font-size: 12px;
        height: 12.5%;
        /*line-height:31px;*/
        /*height: 10%;*/
        /*padding: 9% 2%;*/
        padding: 10% 0;
        /*flex-grow: 1;*/
        overflow: hidden;
        word-wrap: normal;
        text-overflow:ellipsis;
        /*width: 100%;*/
        border-bottom: 1px solid #7eb2bb;
        border-right:1px solid #7eb2bb;
      }
    }
    @media (max-width: 800px) {
      .work-tabcontent:last-child{
        /*display: none;*/
      }
    }
  }
</style>
