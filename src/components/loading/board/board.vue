<template>
  <div class="board">
    <toptitle></toptitle>
    <div class="content-wapper" :style="getH">
      <warehouse></warehouse>
      <agv></agv>
    </div>
  </div>
</template>
<script>
    import agv from '../agv/agv'
    import warehouse from '../warehouse/warehouse'
    import toptitle from '../toptitle/toptitle'
    export default{
        name:'board',
        components:{toptitle,agv,warehouse},
        data(){
            return{
                getH:{
                    height:''
                },
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
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                let w=document.body.clientWidth||document.documentElement.clientWidth;
                if(w>1080){
                    this.getH.height=(h-150)+'px';//减去已有标签的高度
                }else{
                    this.getH.height=(h-116)+'px';//减去已有标签的高度
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
  @import "../../../static/scss/common";
  .board{
    height: 100%;
  }
  .content-wapper{
    overflow: auto;
    padding: 40px 0;
    .btn-posi{
      padding-top: 18%;
    }
  }
  @media (max-width: 1080px) {

    .content-wapper{
      background: #f8fdff;
      padding: 20px 0;
    }
  }
</style>
