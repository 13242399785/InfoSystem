<template>
  <div class="progress-wapper">
    <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 工单进程</span></p>
    <div class="progress-list">
      <div class="progress-top" :style="height_t">
        <div class="top-left">
          <span class="activeCl">工单号:</span>
          <span>{{nowWoid}}</span>
        </div>
        <div class="top-right">
          <!-- <span class="mar-36"><i class="iconfont done">&#xe62b;</i> 已完成</span> -->
          <!-- <span class="mar-36"><i class="iconfont done">&#xe603;</i> 合格的</span> -->
          <!-- <span><i class="iconfont below">&#xe63f;</i> 未完成</span> -->
        </div>
      </div>
      <div class="table-th" :style="positop">
        <span class="th-list"  v-for="(item,index) in tableh" :key="index">{{item}}</span>
      </div>
      <div class="progress-table-box" :class="tableContent.length>6?'anni':''" :style="marginT">
        <table class="progress-table" border="1" id="tableId">
          <thead style="opacity: 0;">
            <tr :style="height_t">
              <th class="activeCl" v-for="(item,index) in tableh" :key="index">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr :style="height_t" v-for="(item,index) in tableContent" class="tablelist" :key="index" @click="getWoid(item.woid)">
              <td >{{item.pid}}</td>
              <td >{{prodectName}}</td>
              <td  :class="item.mstime=='完成'?'done':''">{{item.mstime=='完成'?'已完成':''}}
                <!-- <i v-if="item.mstime=='未完成'" class="iconfont below">&#xe63f;</i><i v-if="item.mstime=='完成'" class="iconfont done">&#xe62b;</i><i v-if="item.mstime=='正在运行'" class="iconfont done">&#xe603;</i> -->
                </td>
              <td :class="item.assemblestime=='完成'?'done':''">{{item.assemblestime=='完成'?'已完成':''}}</td>
              <td :class="item.ispq=='1'?'done':'below'">
                {{item.ispq=='1'?'合格':(item.ispq=='2')?'小接线柱不合格':(item.ispq=='3')?'大接线柱不合格':(item.ispq=='4')?'大小接线柱均不合格':''}}
                <!-- <i v-if="item.ispq=='不合格'" class="iconfont below">&#xe63f;</i><i v-if="item.ispq=='完成'" class="iconfont done">&#xe62b;</i><i v-if="item.ispq=='合格的'" class="iconfont done">&#xe603;</i> -->
              </td>
              <td :class="item.iswqstime=='完成'?'done':''">{{item.iswqstime=='完成'?'已完成':''}}</td>
              <!-- <td ><i v-if="item.iswqstime=='未完成'" class="iconfont below">&#xe63f;</i><i v-if="item.iswqstime=='完成'" class="iconfont done">&#xe62b;</i><i v-if="item.iswqstime=='正在运行'" class="iconfont done">&#xe603;</i></td> -->
              <td :class="item.stackstime=='完成'?'done':''">{{item.stackstime=='完成'?'已完成':''}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>
<script>
  export default{
      name:'progresslist',
      data(){
          return{
            tableh:['产品ID','产品名称','出库','组装','检查结果','质检','装箱码垛'],
            tableContent:[ 
                // {woid:'124dfadsf123',pid:'2fasdfasdf38787',pname:'啊师傅打',mtine:'完成',cuttime:'完成',polishtime:'完成',pltime:'完成',ispq:'合格的',iswq:'合格的',assembletime:'完成',storagetime:'正在运行'},
                // {woid:'sfasdf',pid:'',pname:'',mtine:'',cuttime:'',polishtime:'',pltime:'',ispq:'',iswq:'',assembletime:'',storagetime:''},
                {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'合格',iswqstime:'',stackstime:''},
                {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
                {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
                {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
                {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
                {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
                // {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
                // {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
                // {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
                // {woid:'',pid:'',pname:'',mtine:'',mstime:'',assemblestime:'',ispq:'',iswqstime:'',stackstime:''},
            ],
              MyMarhq:'',
              tblTop:0,
              oHeight:0,
              marginT:'',
              proTimer:'',
              nowWoid:'',
              positop:'',
              height_t:'',
              prodectName:'变压器'
          }
      },
      mounted(){
          // 参数1 tableID,参数2 div高度，参数3 速度，参数4 tbody中tr几条以上滚动
          // this.tableScroll('tableId', 320, 100, 5);
          this.prodectName=tt.prodectName1;
          let me=this;
          //设定模拟表头宽度
          this.getWidth();
          let heightt=$('.table-th').outerHeight();
          let heightt1=$('.progress-top').outerHeight();
          let heightt2=$('.warehouse-titles').outerHeight();
          setTimeout(function(){
            let heightt3=$('.left_table_h').outerHeight();
            me.height_t='height:'+heightt3+'px';
            me.marginT='padding-top:'+(heightt3)+'px';
            me.positop='position:absoulte;top:'+(heightt3)+'px;height:'+heightt3+'px';
          },10)
          
          // this.marginT='margin-top:'+(62)+'px';
          // this.positop='position:absoulte;top:'+(heightt1)+'px;height:'+heightt3+'px';
          // this.marginT='padding-top:'+(heightt1)+'px'; 
          // console.log($('#tableId').find('td:eq(0)').outerHeight())
          this.getWorkOrder();
          setTimeout(function(){
            me.nowWoid=me.tableContent[0].woid;
          },200)
          window.addEventListener('resize', this.getWidth);
      },

      destroyed(){
          clearTimeout(this.proTimer)
      },
      methods:{
        //点击当前获取工单号
        getWoid(id){
          console.log(id)
          this.nowWoid=id;
          console.log(this.nowWoid)
        },
        // 获取宽度
        getWidth(){
            let me=this;
            let heightt3=$('.left_table_h').outerHeight();
            // console.log(heightt3)
            me.height_t='height:'+heightt3+'px';
            me.marginT='padding-top:'+(heightt3-3)+'px';
            me.positop='position:absoulte;top:'+(heightt3)+'px;height:'+heightt3+'px';
            //设定模拟表头宽度
            $(".table-th").find('span').each(function(i) {
                $(this).css('width', $('#tableId').find('th:eq(' + i + ')')[0].scrollWidth+1);
                // console.log($('#tableId').find('th:eq(' + i + ')'))
                // console.log($('#tableId').find('th:eq(' + i + ')')[0].scrollWidth)
            });
        },
        //获取实时工单
        getWorkOrder(){
            let me=this;
            this.$api.workOrder().then(res=>{
                me.getWidth();
                me.tableContent=res.data.result;
                if(me.tableContent.length<6){

                }
                // console.log(me.tableContent)
            }).catch((err)=>{
                console.log(err)
            })
            clearTimeout(me.proTimer)
            me.proTimer=setTimeout(me.getWorkOrder,10000);
        },
      }
  }
</script>
<style lang="scss" scoped="scoped">
  @import "../../../static/scss/common";
  @keyframes myMove {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-80%);
    }
  }
  // .warehouse-titles{position: absolute;width: 100%;z-index: 99;padding: 0;top: 0;left: 0;}
  .progress-wapper{
    background: $bgc;
    color: #fff;
    height: 90%;
    position: relative;
    .progress-list{
      height: 98%;
      position: relative;
      overflow: hidden;
    }
    .done{
      color: #4bff00;
    }
    .below{
      color: #e60d0d;
    }
    .mar-36{
      padding-right: 12px;
    }
  }
  .wap1{
    // height: 36px;
  }
  .progress-top{
    display: flex;
    justify-content:space-between;
    display: -webkit-flex;
    padding: 0 6px;
    // border-bottom: 1px solid #7eb2bb;
    position: absolute;
    align-items: center;
    // top: 36px;
    top: 0;
    width: 100%;
    height: 30px;
    height: 12.1%;
    background: $bgc;
    z-index: 99;
  }
  .progress-table-box th {
    color:#2584e3;
    background: $bgc;
    border-bottom: 1px solid #7eb2bb;
    // padding: 12px 0;
    // padding: 1.2% 0;
  }
  .table-th{
    // padding: 1.2% 0;
    // padding: 12px 0;
    position: absolute;
    // top:20%;
    height: 12.1%;
    display: flex;
    align-items: center;
    // top: 62px;
    z-index: 99;
    font-size: 0;
    width: 100%;
    color:#49edfd;
    background: $bgc;
    border-top: 1px solid #7eb2bb;
    border-bottom: 1px solid #7eb2bb;
    /*background: #fdeeff;*/
    /*position: fixed;*/
    /*justify-content:space-between;*/
    span{
      display: inline-block;
      font-size: 12px;
      word-wrap: break-word;
      white-space: normal;
      text-align: center;
      float: left;
      /*border: 1px solid palegoldenrod;*/
    }
  }
  .anni{
    animation: myMove 15s linear infinite;
    animation-fill-mode: forwards;
  }
  .margin-t{

  }
  .progress-table-box{
    /*margin-top: 78px;*/

    /*animation-direction:alternate;*/
    /*max-height: 400px;*/
    /*overflow: auto;*/
    thead{
      background: $bgc;
    }
  }
  .progress-table{
    width: 100%;
    table-layout:fixed;
    border: 1px solid #7eb2bb;
    tr{
      td{
        // padding: 1.087% 0;
      }
    }

    tbody{
      max-height: 200px;
      overflow: hidden;
    }
  }
   @media (max-width: 1081px) {
     .progress-table{

      tr{
        td{
          padding: 2% 0;
        }
      }

      // tbody{
      //   max-height: 200px;
      //   overflow: hidden;
      // }
    }
   }
</style>
