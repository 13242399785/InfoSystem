<template>
  <div class="housereal">
    <toptitle></toptitle>
    <div class="content-wapper" :style="getH">
      <warehouse></warehouse>
    </div>
  </div>
</template>
<script>
    import warehouse from '../warehouse/warehouse'
    import toptitle from '../toptitle/toptitle'
    export default{
        name:'housereal',
        components:{toptitle,warehouse},
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
  .housereal{
    height: 100%;
  }
  .content-wapper{
    padding: 40px 0;
    overflow: auto;
    .btn-posi{
      padding-top: 18%;
    }
  }
  @media (max-width: 1080px) {
    /*background: #f8fdff;*/
    .content-wapper{padding: 10px 0;}
  }
</style>
