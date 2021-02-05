<template>
    <div class="kwh-wapper">
        <build @buildId="getBuildId"></build>
        <div class="content_right">
            <div class="content_r_t">
                <p class="top_title">用能报表</p>   
            </div>
            <div class="select_box">
                <div class="select_box_l">
                    <el-radio-group  v-model="selDate" @change="changeDate">
                        <el-radio label="0">日报表</el-radio>
                        <el-radio label="1">月报表</el-radio>
                        <el-radio label="2">年报表</el-radio>
                        <el-radio label="3">区间报表</el-radio>
                    </el-radio-group>
                    <div class="select_date">
                        <span>时间</span>
                        <el-date-picker v-show="parseInt(selDate)!=3" @change="dayChange"  v-model="dateType" :type="selType" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>
                        <!-- <el-date-picker  v-show="parseInt(selDate)==3"  v-model="endTime" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker> -->
                        <el-date-picker class="select_date_none" v-show="parseInt(selDate)==3"  v-model="dateB" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy/MM/dd" value-format="yyyy/MM/dd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="select_box_r">
                    <el-button class="" @click="exportTo">导出<i class="el-icon-share el-icon--right"></i></el-button>
                    <el-button class="" @click="getList">查找<i class="el-icon-search el-icon--right"></i></el-button>
                </div>
            </div>
            <div class="table_content" :style="'height:'+(listData.length>15?'80%;':'auto;')">
                <div class="table_box">
                    <table class="my_table" id='tableId'>
                        <tbody>
                        <tr>
                            <th ref="thref" style="min-width:40px;" v-for="(item,index) in thList" :key='index'>{{item}}</th>
                        </tr>
                        <tr v-for="(item,index) in mainData" :key="index">
                            <td>{{item.orgName||''}}</td>
                            <td v-show='index1<thList.length-1' v-for="(item1,index1) in item.itemList" :key="index1">{{item1.firstval}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="nodatatext" v-show="mainData.length==0"> 
                        暂无数据
                    </div>
                </div>
            </div>
            <div class="pagination-box">
                <el-pagination v-show="pagination.total>0"  @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="pagination.currentPage" :page-sizes="pagination.arr" :page-size="pagination.size" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                </el-pagination>
            </div>
        </div> 
    </div>
</template>
<script>
import build from '@/components/build.vue';
require('script-loader!xlsx/dist/xlsx.core.min'); 
export default {
    components: { build },
    name:'kwh',
    data(){
        return{
            selDate:'0',
            dateType:'',
            thList:[
                '设备名称'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 10,
                currentPage: 1,
                total:0
            },
            date: ['', ''],
            listData:[],
            mainData:[],
            thWidthList:[],
            co_id:'',
            selType:'date',
            dateB:[],
            tdE:[],//动态数据结构
            exportData:[]
        }
    },
    mounted(){
        // this.listData=new Array(18);
        this.dateType=this.getToday()
        this.dateB.push(this.getToday().replace(/-/g, '/'), this.getToday().replace(/-/g, '/'))
        // this.dateB.push(this.getToday().replace(/-/g, '/'), this.getToday().replace(/-/g, '/'))
        // console.log(this.dateB)
        // this.dateB[1]=this.getToday()
        // window.addEventListener('resize', this.getWidth);
    },
    watch:{
        'selDate':function(){
            if(parseInt(this.selDate)==0||parseInt(this.selDate)==3){
                this.selType='date'
            }else if(parseInt(this.selDate)==1){
                this.selType='month'
            }else{
                this.selType='year'
            }
            // console.log(this.dateType)
        }
    },
    methods:{
        getBuildId(id){
            this.co_id=id;
            this.getList()
        },
        changeDate(){
            //  console.log(this.dateType)
        },
        dayChange(val){
            console.log(val); 
        },
        
        getDaysInMonth(year, month){  
            let date = new Date(year, month, 1);  
            return new Date(date.getTime() - 864e5).getDate();  
        }, 
        getList(){
            let that=this;
            that.pagination.currentPage=1;
            this.thList=['设备名称'];
            this.tdE=[];
            let myDate = new Date(this.dateType.replace(/-/g, '/')); //获取系统当前时间
            // 获取特定格式的时间：
            let year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            let month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            let length=this.getDaysInMonth(year,month);//当月天数
            let params={
            //    StartTime:'', 
            //    EndTime:'', 
            //    SearchType:this.selDate,
               DevIdStr:this.co_id
            }
            
            if(parseInt(this.selDate)==0){//日
                let arr=['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时']
                this.thList=this.thList.concat(arr);
                params.SearchType=parseInt(this.selDate);
                params.searchTime=this.dateType;
            }else if(parseInt(this.selDate)==1){  //月
                // this.getDaysInMonth(year,month)
                for(let i=0;i<length;i++){
                    this.thList.push((i+1)+'日')
                }
                params.SearchType=parseInt(this.selDate);
                params.searchTime=this.dateType;
            }else if(parseInt(this.selDate)==2){    //年
                params.SearchType=parseInt(this.selDate);
                params.searchTime=year;
                for(let i=0;i<12;i++){
                    this.thList.push((i+1)+'月')
                }
            }
            
            if(parseInt(this.selDate)==3){//区间
                let yearS = new Date(this.dateB[0].replace(/-/g, '/')).getFullYear(); 
                let yearS1 = new Date(this.dateB[1].replace(/-/g, '/')).getFullYear(); 
                
                params.SearchType=parseInt(this.selDate);
                params.searchTime=this.dateType;
                params.StartTime=(new Date(Date.parse(this.dateB[0]+' 00:00:00')).getTime())/1000;
                params.EndTime=(new Date(Date.parse(this.dateB[1]+' 23:59:59')).getTime())/1000;

                if(!this.dateB){
                    this.$message.error('请先选择时间段！')
                    return false
                }
                if(yearS!=yearS1){
                    this.$message.error('两个时间段年份必须一致！')
                    return false
                }
                if(this.getDaysBetween(params.StartTime*1000,params.EndTime*1000)>60){
                    this.$message.error('当前区间段时间不能超过60天！')
                    return false
                }
                let arr=this.getDateList(this.dateB[0],this.dateB[1])
                this.thList=this.thList.concat(arr);
            }
            
            this.$api.getEnergy(params).then(res=>{ 
                if(res.data.Code==0){
                    that.listData=res.data.Data;
                    that.pagination.total=that.listData.length;
                    that.exportData=res.data.Data;
                    that.mainData = that.listData.slice(0, that.pagination.size)
                    that.pagination.arr=that.$api.fiterArr(that.listData.length)
                    for(let i=0;i<that.pagination.total;i++){
                        // console.log(that.exportData)
                        // that.exportData[i].push({})
                        for(let j=0;j<res.data.Data[i].itemList.length;j++){
                            let td='td'+(j+1);
                            if(i==0){
                                that.tdE.push(td);
                            }
                            that.exportData[i][td]=res.data.Data[i].itemList[j].firstval;//拼接需要导出数据
                        }
                    }
                }else{
                    that.mainData =[]
                    that.exportData=[];
                    that.getList()
                    that.$message('当前建筑没有数据！')
                }
            }).catch((error) => {
                // that.getList()
                console.log(error)
            })
        },
        handleSizeChange(val) {
            //改变每页长度
            this.pagination.size = val;
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
            // this.getWidth()
        },
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
            // this.getWidth()
        },
        getToday(){
            var myDate = new Date(); //获取系统当前时间
            // 获取特定格式的时间：
            var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            var day = myDate.getDate(); //获取当前日(1-31)
            return year + "-" + month + "-" + day
        },
        //获取两个时间差
        getDaysBetween(s1,s2){
            var days=(s2 - s1)/(1*24*60*60*1000);
            return  parseInt(Math.round(days));
        },
        //获取两个时间之间的集合(2020-07-30,2020-08-10)
        getDateList(startDate, endDate) {
            const dateList = [];
            let startTime=new Date(startDate);
            let endTime=new Date(endDate);
            while(endTime-startTime>=0) {
                let year=startTime.getFullYear();
                // startTime.getMonth().toString().length==1?'0'+(startTime.getMonth()+1).toString():
                let month=startTime.getMonth()+1;
                let day=startTime.getDate().toString().length==1?'0'+startTime.getDate():startTime.getDate();
                dateList.push(month+'月'+day+'日')
                startTime.setDate(startTime.getDate()+1)
            }
            // dateList.push(new Date(endDate))
            return dateList
        },
        exportTo(){
            if(this.exportData.length==0){
                this.$message.error('当前数据为空！');
                return false;
            }
            // console.log(this.exportData)
            this.exportToExcel(this.exportData)
        },
        exportToExcel(tab){
            
            let me=this;
            // console.log(me.tdE)
			require.ensure([], () => {
                let {
                    export_json_to_excel
                } = require('../../vendor/Export2Excel');
                let tHeader =me.thList;
                let filterVal;
    
                filterVal =['orgName'].concat(me.tdE);
				let data = this.formatJson(filterVal,tab)	 
				let str ='用能报表';
				export_json_to_excel(tHeader, data, str);
            })
		},
        formatJson(filterVal, jsonData) { // 参数过滤
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
    }
}
</script>
<style lang="scss">
    @import "../../../static/scss/common";
    .kwh-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 4px;
        // border: 2px solid #00ffff;
        display: flex;
        .el-range-editor.el-input__inner{
            color: #fff;
            background: none;
            border: 1px solid #426680;
            vertical-align: middle;
            max-width: 270px;
            input{
                border: none;
            }
            
        }
        .content_right{
            .select_box{
                .select_date{
                    .select_date_none{
                        input{
                            border: none;
                        }
                    }
                }
            }
        }
        
        
        .el-date-editor .el-range-separator{
            color: #fff;
            line-height: 26px;
        }
        .select_box_r{
            white-space: nowrap;
        }
    }
    .content_right{
        padding: 12px 10px;
        margin-left: 6px;
        border: 1px solid $border_c;
        width: 100%;
        color: #fff;
    }
    
</style>