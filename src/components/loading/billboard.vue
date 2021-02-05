<template>
  <div class="billboard">
    <toptitle :titleName='stNameK'></toptitle>
    <div class="content-wapper" :style="getH">
      <div class="bill-left clearfix">
        <div class="countall" :style="countHeigth">
          <count></count>
        </div>
        <div class="work-gre" :style="workHeigth">
          <work></work>
        </div>
      </div>
      <div class="bill-center" :style="autoHeight">
        <div class="war"  ref="warehouses">
          <yuan></yuan>
        </div>
        <div class="avg" ref="warehouses1" id="avgHeight">
          <!-- <p class="warehouse-titles wap1"><i class="iconfont">&#xe605;</i><span> 实时物料</span></p>
          <div class="avg-w">
            <agv></agv>
          </div> -->
        </div>
      </div>
      <div class="bill-right">
        <infolist :style="countHeigth"></infolist>
        <div :style="workHeigth1" class="progress">
          <progresslist></progresslist>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import agv from './agv/agv'
    import yuan from './warehouse/yuan'
    import infolist from './info/infolist'
    import count from './count/count'
    import progresslist from './list/progress'
    import work from './work/work'
    import toptitle from './toptitle/header'
    export default{
        name:'billboard',
        components:{toptitle,agv,yuan,infolist,count,work,progresslist},
        data(){
            return{
                getH:{
                    height:''
                },
                autoHeight:'',
                countHeigth:'',
                workHeigth:'',
                workHeigth1:'',
                stNameK:''
            }
        },
        mounted(){
            this.stNameK=tt.stNameK;
            let w=document.body.clientWidth||document.documentElement.clientWidth;
            let height= this.$refs.warehouses.offsetHeight;
            let height1= this.$refs.warehouses1.offsetHeight;
            this.workHeigth='height:'+(height1-height)+'px';
            this.workHeigth1='height:'+(height1-height)+'px';
            if(w>1080){
                this.countHeigth='height:'+height+'px';
                // this.autoHeight='padding-top:'+height+'px';
            }else{
              this.workHeigth='height:40.2%';
              this.workHeigth1='height:42%';
              // this.countHeigth='height:auto;'
              // this.autoHeight='height:auto;'
            }
        },
        created(){
            //自动设定高度
            window.addEventListener('resize', this.getHeight);
            this.getHeight();
        },
        methods:{
            order(){
                this.$router.push('orders')
            },
            getList(){
                this.$router.push('orderlist')
            },
            //获取高度
            getHeight(){
                //窗口高度
                let me=this;
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                let w=document.body.clientWidth||document.documentElement.clientWidth;
                
                // let height1= me.$refs.warehouses1.offsetHeight;
                // this.workHeigth='height:'+(height1-height)+'px';
                // this.workHeigth1='height:'+(height1-height)+'px';
                if(w>1080){
                    this.getH.height=(h-158)+'px';//减去已有标签的高度 
                    setTimeout(() => {
                      let height= me.$refs.warehouses.offsetHeight;
                      let height1= this.$refs.warehouses1.offsetHeight;
                      me.workHeigth='height:'+(height1-height)+'px';
                      me.workHeigth1='height:'+(height1-height)+'px';
                      me.countHeigth='height:'+height+'px';
                    }, 100);
                   
                    // console.log(this.countHeigth)
                    // console.log(height)
                    //  this.workHeigth='height:'+(height1-height)+'px';
                }else{
                    this.getH.height=(h-130)+'px';//减去已有标签的高度
                    this.workHeigth='height:40.2%';
                    this.workHeigth1='height:60%';
                    // this.autoHeight='padding-top:'+height+'px';
                }
            },
        },
        destroyed(){
            //组件销毁清除事件
            window.removeEventListener('resize', this.getHeight)
        }
    }
</script>
<style lang="scss" scoped="scoped">
  @import "../../static/scss/common";
  .billboard{
    height: 100%;
    overflow: auto;
    .war{
      height: 60%;
    }
  }
  .content-wapper{
    background: none;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    padding: 0 0;
    .bill-left{
      width: 34%;
      padding-right: 8px;
      height: 100%;
    }
    .bill-center{
      width: 35%;
      height: 100%;
    }
    .bill-right{
      width: 35%;
      padding-left: 8px;
    }
    .btn-posi{
      padding-top: 18%;
    }
    .avg{
      height: 100%;
      /*display: flex;*/
      /*display: -webkit-flex;*/
      margin-top: 8px;
    }
    .avg-w{
      display: flex;
      display: -webkit-flex;
      height: 90%;
    }
    .countall,.work-gre{
      background:$bgc;
    }
    .work-gre,.progress{
      margin-top:8px;
    }
    .work-gre{
      margin-right: -53%;
    }
    .progress{
      height: 52%;
      background: $bgc;
      position: relative;
      overflow: hidden;
      // margin-left: -102.5%;
      margin-left: -51.2%;
    }
}
@media (max-width: 1080px) {
  .content-wapper{
    background: #f8fdff;
    flex-wrap:wrap;
    overflow: auto;
    padding: 20px 0;
    .bill-left,.bill-center,.bill-right{
      width: 100%;
      padding: 0 10px;
      height: auto;
    }
    .avg-w{
      height: auto;
      padding: 50px 0;
    }
    .progress{
      margin-left: 0;
    }
    .work-gre{
      margin-right: 0;
    }
    .bill-center{
      margin-top: 30%;
    }
    .war{
      height:auto;
    }
  }
}
</style>
