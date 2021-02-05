<template>
    <div class='box-wapper analyze-wapper'>
        <div class="tap-serch">
            <div class="tap-serch-l">
                <div class="tap-box">
                    <span @click="tapChange(index)" :class="nowIndex==index?'active':''" v-for="(item,index) in tapList" :key="index">{{item.name}}</span>
                </div>
            </div>
            <div class="tap-serch-r" v-show="nowIndex!=2">
                <p class="timep">
                    <span class="select_title">时间</span>
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy/MM/dd">
                    </el-date-picker>
                </p>
                <el-button class="" @click="initGetRate">查找<i class="el-icon-search el-icon--right"></i></el-button>
            </div>
        </div>
        <!-- cpu使用率和内存使用率 -->
        <div class="analyze-box" v-show="nowIndex==0||nowIndex==1">
            <div class="analyze-box-w analyze-box-t">
                <div class="analyze-box-table">
                    <p class="analyze-title">主{{tapList[nowIndex].name}}</p>
                    <div class="table_box">
                        <table class="my_table">
                            <tbody>
                            <tr>
                                <th ref="thref" style="min-width:40px;" v-for="(item,index) in ['时间','使用率 %']" :key='index'>{{item}}</th>
                            </tr>
                            <tr v-for="(item,index) in mainData" :key="index">
                                <td>{{item.tagTime}}</td>
                                <td>{{nowIndex==0?item.cpuRate:item.memoryRate}}</td>
                                <!-- <td>{{item.momoryRate}}</td> -->
                            </tr>
                            </tbody>
                        </table>
                        <!-- <div class="nodatatext"> 
                            暂无数据
                        </div> -->
                    </div>
                    <div class="pagination-box">
                        <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange" :current-page="pagination.currentPage"  :page-size="pagination.size" :total="pagination.total">
                        </el-pagination>
                    </div>
                </div>
                
                <div class="analyze-echar">
                    <div id="analyze1"></div>
                </div>
                <!-- 告警 -->
                <!-- <div class="report_o" :class="reportT?'report_h':''">
                    <i v-show="!reportT" class="el-icon-warning" @click="reportT=true"></i>
                    <i v-show="reportT" class="el-icon-error" @click="reportT=false"></i>
                    <p>这是条告警信息</p>
                </div> -->
            </div>
            <div class="analyze-box-w analyze-box-b">
                <div class="analyze-box-table">
                    <p class="analyze-title">备用{{tapList[nowIndex].name}}</p>
                    <div class="table_box">
                        <table class="my_table">
                            <tbody>
                            <tr>
                                <th ref="thref" style="min-width:40px;" v-for="(item,index) in ['时间','使用率 %']" :key='index'>{{item}}</th>
                            </tr>
                            <tr v-for="(item,index) in backData" :key="index">
                                <td>{{item.tagTime}}</td>
                                <td>{{nowIndex==0?item.cpuRate:item.memoryRate}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <!-- <div class="nodatatext"> 
                            暂无数据
                        </div> -->
                    </div>
                    <div class="pagination-box">
                        <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChangeb" :current-page="paginationb.currentPage"  :page-size="paginationb.size" :total="paginationb.total">
                        </el-pagination>
                    </div>
                </div>
                <div class="analyze-echar">
                    <div id="analyze2"></div>
                </div>
            </div>
        </div>
        <!-- 磁盘情况 -->
        <diskChart v-if="nowIndex==2" :nowindex='nowIndex'></diskChart>
        <!-- 网络状态 -->
        <div v-if="nowIndex==3" class="network-box">
           <el-radio-group  v-model="dType" @change="changeData">
                <el-radio label="hour">服务器IOServer</el-radio>
                <el-radio label="day">通信管理机</el-radio>
            </el-radio-group>
            <div class="table_content">
                <div class="table-box">
                    <table class="my_table">
                        <tbody>
                            <tr>
                                <th>序号</th>
                                <th>类型</th>
                                <th>IP</th>
                                <th>状态</th>
                                <th>时间</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import diskChart from '../../components/disk/disk'
export default {
    components:{diskChart},
    data(){
        return{
            tapList:[
                {name:'CPU使用率',value:0},
                {name:'内存使用率',value:1},
                {name:'硬盘情况',value:2},
                // {name:'网络状况',value:3},
            ],
            nowIndex:0,
            date:[this.getToday(),this.getToday()],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 5,
                currentPage: 1,
                total:0
            },
            paginationb: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 5,
                currentPage: 1,
                total:0
            },
            lineColor:'#6ab06a',
            eOptions1:null,
            eOptions2:null,
            reportT:false,
            dType:'',
            nowRateList:[{
                'tagTime':'2020-7-10 11:20:36',
                'cpuRate':24,
                'memoryRate':22,
            },{
                'tagTime':'2020-7-11 11:20:36',
                'cpuRate':14,
                'memoryRate':72,
            },{
                'tagTime':'2020-7-12 11:20:36',
                'cpuRate':4,
                'memoryRate':7,
            },{
                'tagTime':'2020-7-13 11:20:36',
                'cpuRate':1,
                'memoryRate':2,
            }],
            mainData:[],
            backData:[],
            mainRateList:[],//主使用率
            backRateList:[],//备用使用率
            xData:[],//横坐标
            yData:[],//纵坐标
            timerD:null
        }
    },
    mounted(){
        let that=this;
        window.onresize = function() {
            setTimeout(function() {
                that.eOptions2.resize();
                that.eOptions1.resize();
            }, 100);
        };
        
        this.getRate();
        this.timerD=setInterval(function(){
             that.getRate();
        },60000)
        // console.log(this.date)
    },
    beforeDestroy() {
        clearInterval(this.timerD)
    },
    methods:{
        changeData(){},
        initGetRate(){
            let that=this;
            that.pagination.currentPage=1;
            that.paginationb.currentPage=1;
            that.getRate();
        },
        //获取使用率
        getRate(){
             if(!this.date){
                this.date=[this.getToday().replace(/-/g, '/'), this.getToday().replace(/-/g, '/')]
            }
            let that=this,
                params={
                    'startTime':new Date(Date.parse(this.date[0]+' 00:00:00'))/1000,
                    'endTime':new Date(Date.parse(this.date[1]+' 23:59:59'))/1000,
                }
                // console.log(params) 
            this.$api.getCpuwork(params).then(res=>{
            //    console.log(res.data.Data)
               that.mainRateList=res.data.Data.mainList;         
               that.backRateList=res.data.Data.backList;  
                that.mainData = that.mainRateList.slice(0, that.pagination.size)
                that.backData = that.backRateList.slice(0, that.paginationb.size)
               that.pagination.total=that.mainRateList.length;   
               that.paginationb.total=that.backRateList.length;   
               that.getEchart();
               that.getEchart1();
               
            }).catch((error) => {
                // that.getRate()
                console.error(error);
            })
        },
        getToday(){
            var myDate = new Date(); //获取系统当前时间
            // 获取特定格式的时间：
            var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            var day = myDate.getDate(); //获取当前日(1-31)
            return year + "/" + month + "/" + day
        },
        tapChange(i){
            this.nowIndex=i;
            this.pagination.currentPage=1;
            this.paginationb.currentPage=1;
            if(this.nowIndex==1){
                this.lineColor='#c9cd65';
                this.getEchart()
                this.getEchart1()
            }else{
                this.lineColor='#6ab06a';
                this.getEchart()
                this.getEchart1()
            }
        },
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.mainData=this.mainRateList.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
        },
        handleCurrentChangeb(val) {
            //改变当前页
            this.paginationb.currentPage = val;
            this.backData=this.backRateList.slice((this.paginationb.currentPage - 1) * this.paginationb.size,this.paginationb.currentPage * this.paginationb.size);
        },
        getEchart(){
            let that=this;
            let xData=[],yData=[];
            //获取横纵坐标的值
            if(that.backRateList.length==0){
                that.backRateList=[
                    {
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },{
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },{
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },{
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },{
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },
                ]
            }else{
                for(let i=0;i<that.backRateList.length;i++){
                    xData.push(that.backRateList[i].tagTime)
                    if(that.nowIndex==0){
                        yData.push(that.backRateList[i].cpuRate)
                    }else{
                        yData.push(that.backRateList[i].memoryRate)
                    }
                }
            }
            
            // console.log(that.tapList[that.nowIndex].name)
            this.eOptions2=echarts.init(document.getElementById('analyze2'));
            this.eOptions2.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['备用'+that.tapList[that.nowIndex].name],
                    textStyle:{
                        color:'#EFEFEF'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
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
                    data: xData
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
                        name: '备用'+that.tapList[that.nowIndex].name,
                        type: 'line',
                        data: yData,
                        itemStyle: {
                            normal: {
                                color: that.lineColor, //折线点的颜色
                                lineStyle: {
                                    color: that.lineColor //折线的颜色
                                }
                            }
                        },
                    },
                ]
            });
        },
        getEchart1(){
            let that=this;
            let xData=[],yData=[];
            //获取横纵坐标的值
            if(that.mainRateList.length==0){
                that.mainRateList=[
                    {
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },{
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },{
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },{
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },{
                        'tagTime':'',
                        'cpuRate':'',
                        'memoryRate':'',
                    },
                ]
            }else{
                for(let i=0;i<that.mainRateList.length;i++){
                    xData.push(that.mainRateList[i].tagTime)
                    if(that.nowIndex==0){
                        yData.push(that.mainRateList[i].cpuRate)
                    }else{
                        yData.push(that.mainRateList[i].memoryRate)
                    }
                }
            }
            
            this.eOptions1=echarts.init(document.getElementById('analyze1'));
            this.eOptions1.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [that.tapList[that.nowIndex].name],
                    textStyle:{
                        color:'#EFEFEF'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
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
                    data: xData
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
                        name: that.tapList[that.nowIndex].name,
                        type: 'line',
                        data: yData,
                        itemStyle: {
                            normal: {
                                color: that.lineColor, //折线点的颜色
                                lineStyle: {
                                    color: that.lineColor //折线的颜色
                                }
                            }
                        },
                    },
                ]
            });
        }
    }
}
</script>
<style lang="scss">
    @import "../../../static/scss/common";
    .analyze-wapper{
        .analyze-box{
            height: 95%;
            overflow: hidden;
            // background: #fff;
            .analyze-box-w{
                height: 48%;
                display: flex;
                margin: 20px 0;
                position: relative;
                align-items: center;
                .analyze-title{
                    color: #4fa7ba;
                    padding-bottom:14px;
                }
                .analyze-box-table{
                    width: 36%;
                    padding: 0 35px;
                }
                .table_box{
                    border: 1px solid #252a47;
                    border-right:none;
                }
                .analyze-echar{
                    height: 95%;
                    // background: #fff;
                    width:60%;
                    padding: 20px 35px;
                    #analyze1,#analyze2{
                        height: 100%;
                        width: 100%;
                    }
                }
                .report_o{
                    position: absolute;
                    color: #fff;
                    transition: all ease 0.5s;
                    right: -37%;
                    width:40%;
                    bottom: 6px;
                    white-space: nowrap;
                    background: #410825;
                    padding: 4px 10px;
                    font-size: 14px;
                    border-top-left-radius: 20px;
                    border-bottom-left-radius: 20px;
                    display: flex;
                    align-items: center;
                    i{
                        font-size: 20px;
                        color: #673951;
                        border: #fff;
                        cursor: pointer;
                    }
                    p{
                        padding-left: 20px;
                    }
                }
                .report_h{
                    right: 0;
                }
            }
            .analyze-box-t{
                border-bottom: 1px solid #098596;
            }
            .analyze-box-b{
                margin-bottom:0;
            }
        }
        .network-box{
            color: #fff;
            padding: 24px 20px 18px 20px;
            height: 90%;
            .el-radio{
                color: #098596;
            }
            .table_content{
                max-height: 50%;
            }
        }
    }
    
</style>