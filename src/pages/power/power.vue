<template>
    <div class="power-wapper">
        <build></build>
        <div class="content_right">
            <div class="select_box tap-serch">
                <div class="tap-serch-l">
                    <div class="tap-box">
                        <span :class="nowIndex==index?'active':''" v-for="(item,index) in tapList" :key="index">{{item.name}}</span>
                    </div>
                </div>
                <div class="tap-serch-r">
                    <p>
                        <span class="select_title">类别</span>
                        <el-select class='max_input' v-model="category" filterable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="tap-center">
                        <el-checkbox v-model="checked">A相</el-checkbox>
                        <el-checkbox v-model="checked">B相</el-checkbox>
                        <el-checkbox v-model="checked">C相</el-checkbox>
                    </p>
                    <el-button class="">读取<i class="el-icon-search el-icon--right"></i></el-button>
                    <el-button class="">导出<i class="el-icon-share el-icon--right"></i></el-button>
                    
                </div>
            </div>
            <div class="power-echart">
                <div id="powerchart">
                    
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
import echarts from 'echarts'
import build from '@/components/build.vue';
export default {
    components: { build },
    name:'kwh',
    data(){
        return{
            selDate:'',
            dateType:'2020-02-04',
            thList:[
                '设备名称','事件类型','事件级别','事件内容','所属厂站','变电所','总线','设备','变量名','报警值','操作员','处理过程','处理结果','备注'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 10,
                currentPage: 1,
                total:0
            },
            nowIndex:0,
            tapList:[
                {name:'RMS曲线',value:0},
                // {name:'向量图',value:1},
                // {name:'谐波分析图',value:2},
            ],
            category:'',
            options:[
                {name:'电压',value:0},
                {name:'电流',value:1},
                {name:'温度',value:2},
            ],
            date: ['', ''],
            listData:[],
            thWidthList:[],
            checked:'',
            eOptions2:null
        }
    },
    mounted(){
        let that=this;
        this.listData=new Array(18);
        this.getPowerchart()
        window.onresize = function() {
            setTimeout(function() {
                that.eOptions2.resize();
            }, 100);
        };
    },
    methods:{
        changeDate(){},
        dayChange(){

        },
        getPowerchart(){
            let that=this;
            this.eOptions2=echarts.init(document.getElementById('powerchart'));
            this.eOptions2.setOption({
                title: {
                    
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    y:'90%',
                    data: ['Ua', 'Ub', 'Uc'],
                    textStyle:{
                        color:'#EFEFEF'
                    }
                },
                color:['#d3d376','#6ab06a','#ce6060'],
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '18%',
                    top:'15%',
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisLabel:{
                        textStyle:{
                            color:'#fff',
                            fontSize:10
                        },
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#4b5277',
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel:{
                        textStyle:{
                            color:'#fff'
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#242745',
                            // type:'dashed'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#4b5277',
                        }
                    }
                },
                series: [
                    {
                        name: 'Ua',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210],
                        itemStyle : {  
                            normal : {  
                                lineStyle:{  
                                    color:'#d3d376'  
                                }  
                            }  
                        }, 
                        symbol:'none', //去掉折线图中的节点
                        smooth: false  //true 为平滑曲线，false为直线
                    },
                    {
                        name: 'Ub',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310],
                        itemStyle : {  
                            normal : {  
                                lineStyle:{  
                                    color:'#6ab06a'  
                                }  
                            }  
                        }, 
                        symbol:'none', //去掉折线图中的节点
                        smooth: false  //true 为平滑曲线，false为直线
                    },
                    {
                        name: 'Uc',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410],
                        itemStyle : {  
                            normal : {  
                                lineStyle:{  
                                    color:'#ce6060'  
                                }  
                            }  
                        }, 
                        symbol:'none', //去掉折线图中的节点
                        smooth: false  //true 为平滑曲线，false为直线
                    }
                ]
            });
        }
    }
}
</script>
<style lang="scss">
    @import "../../../static/scss/common";
    .power-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 4px;
        // border: 2px solid #00ffff;
        display: flex;
        .tap-serch-r{
            .tap-center{
                padding: 0 14px;
            }
            p{
                white-space: nowrap;
            }
            .el-checkbox{
                color: #fff;
            }
            .el-checkbox + .el-checkbox{
                margin-left: 12px;
            }
            input{
                background: none;
                border: 1px solid $border_c;
                color: #fff;
            }
        }
        .power-echart{
            height: 90%;
            // background:#fff;
            width: 100%;
            #powerchart{
                height: 100%;
                width: 100%;
                margin: auto;
            }
        }
    }
    .content_right{
        padding: 12px 10px;
        margin-left: 6px;
        border: 1px solid $border_c;
        // width: 100%;
        color: #fff;
    }
    
</style>