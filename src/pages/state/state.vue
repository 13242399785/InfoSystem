<template>
    <div class="state-wapper">
        <div class="select_top">
            <p>
                <span class="select_title">设备名称</span>
                <el-input class='max_input' v-model='searchItem.DeviceName'></el-input>
                <!-- <el-select class='max_input' v-model="typeValue" filterable placeholder="请选择">
                    <el-option
                    v-for="item in typeOptions"
                    :key="item.type"
                    :label="item.type"
                    :value="item.type">
                    </el-option>
                </el-select> -->
            </p>
            <p>
                <span class="select_title">设备状态</span>
                <el-select class='max_input' v-model="searchItem.DeviceStatus" filterable placeholder="请选择">
                    <el-option
                    v-for="item in stateList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
            </p>

            <p class="timep">
                <span class="select_title">时间</span>
                <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy/MM/dd" value-format="yyyy/MM/dd" @change="getDate">
                </el-date-picker>
            </p>
            
            
            <p class="search_p">
                <el-button class="" @click="initGetlist">查找<i class="el-icon-search el-icon--right"></i></el-button>
                <el-button @click="goLedger" class="">返回台账管理<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
                
            </p>
        </div>
        <div class="table_content" :style="'height:'+(mainData.length>15?'80%;':'auto;')">
            <div class="posi_th" v-show="posithShow">
                <span v-for="(item,index) in thList" :key='index' :style="'width:'+(parseInt(thWidthList[index])+1)+'px'">{{item}}</span>
            </div>
            <div class="table_box">
                <table class="my_table" id='tableId'>
                    <tbody>
                    <tr>
                        <th ref="thref" style="min-width:40px;" v-for="(item,index) in thList" :key='index'>{{item}}</th>
                    </tr>
                    <tr v-for="(item,index) in mainData" :key="index">
                        <td>{{(pagination.currentPage-1)*(pagination.size)+index+1}}</td>
                        <td>{{item.DeviceName}}</td>
                        <td>{{stateControl(item.DeviceStatus)}}</td>
                        <!-- <td>{{item.alarmsLeve}}</td>  -->
                        <td>{{item.DeviceStatusTime}}</td> 
                       
                    </tr>
                    </tbody>
                </table>
                <div class="nodatatext" v-show="listData.length==0"> 
                    暂无数据
                </div>
            </div>
        </div>
        <div class="pagination-box">
            <el-pagination v-show="pagination.total>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.arr" :page-size="pagination.size" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            options:[
                {
                    'CrmName':12
                }
            ],
            value:'',
            
            typeValue:'',
            leveValue:'',
            facValue:'',
            transValue:'',
            busValue:'',
            devValue:'',
            thList:[
                '序号','设备名称','设备状态','时间'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:20
            },
            stateList:[
                {name:'全部',value:''},
                {name:'正常',value:0},
                {name:'故障',value:1},
                {name:'维修',value:2},
                {name:'报废',value:3},
                {name:'遗失',value:4},
                {name:'未知',value:5},
            ],
            date: [this.getToday().replace(/-/g, '/'), this.getToday().replace(/-/g, '/')],
            mainData:[],
            listData:[],
            thWidthList:[],
            typeOptions:[],
            searchItem:{
                'DeviceName':localStorage.getItem('devName')||'',
                'DeviceStatus':''
            },
            posithShow:false
        }
    },
    mounted(){
        let that=this;
        let refs=that.$refs;
        //首次赋值宽度
        // this.$nextTick(()=>{
            setTimeout(() => {
               that.thWidthList=[];
                for(let key in refs){//必须先获取
                    for(let i=0;i<that.thList.length;i++){
                        that.thWidthList.push(refs[key][i].clientWidth)
                    }
                }  
                that.posithShow=true;
                // console.log(that.thWidthList)
            }, 1000);
            
        // })
         window.addEventListener('resize', this.getWidth);
        this.getList();
    },
    beforeDestroy() {

        // window.removeEventListener('resize', this.getWidth);
    },
    methods:{
        stateControl(val){
            if(parseInt(val)==0){
                return '正常'
            }else if(parseInt(val)==1){
                return '故障'
            }else if(parseInt(val)==2){
                return '维修'
            }else if(parseInt(val)==3){
                return '报废'
            }else if(parseInt(val)==4){
                return '遗失'
            }else {
                return '未知'
            }
        },
        goLedger(){
            this.$router.push('ledger')
        },
        getDate(val){
            // console.log(val)
        },
        initGetlist(){
            this.pagination.currentPage=1;
            this.getList();
        },
        getList(){
            let that=this;
            let params={
                // "startTime": that.date[0]+' 00:00:00',
                // "endTime": that.date[1]+' 23:59:59'
            }
            if(that.date){
                params.startTime=that.date[0]+' 00:00:00';
                params.endTime=that.date[1]+' 23:59:59';
            }
            if(this.searchItem.DeviceName){
                // localStorage.setItem('devName',name)
                params.DeviceName=this.searchItem.DeviceName
            }
            if(this.searchItem.DeviceStatus!=''){
                params.DeviceStatus=this.searchItem.DeviceStatus
            }
            this.$api.getState(params).then(res=>{
                let data=res.data.Data;
                if(res.data.Code==0){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    that.listData=data;
                    that.mainData = that.listData.slice(0, that.pagination.size);
                    that.pagination.total=that.listData.length;
                    that.getWidth()
                }else{
                    that.$message.error(res.data.Msg)
                }
                
            }).catch((error) => {
                that.getList();
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
        //动态设定模拟表头宽度
        getWidth(){
            let that=this;
            let refs=that.$refs;
            this.$nextTick(()=>{
                that.thWidthList=[];
                for(let key in refs){//必须先获取
                    for(let i=0;i<that.thList.length;i++){
                        this.thWidthList.push(refs[key][i].clientWidth)
                    }
                }
                
            })
        },
        timeStamp(timestamp) {
			function zeros(num){
				if(parseInt(num)<10){
					return '0'+num
				}else{
					return num
				}
            }
            if(!timestamp){
                return ''
            }
		    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		    var Y = date.getFullYear() + '-';
		    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		    var D = date.getDate() + ' ';
		    var h = date.getHours() + ':';
		    var m = date.getMinutes() + ':';
		    var s = date.getSeconds();
		    return Y + M + zeros(D) + zeros(h) + zeros(m) + zeros(s);
		},
        handleSizeChange(val) {
            //改变每页长度
            this.pagination.size = val;
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
        },
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
        },
        // exportToExcel(tab){
        //     let me=this;
        //     console.log(tab)
		// 	require.ensure([], () => {
        //         let {
        //             export_json_to_excel
        //         } = require('../../vendor/Export2Excel');
        //         let tHeader = ['采集项','采集值','采集时间'];
        //         let filterVal;

        //         filterVal =['tagName', 'alarmsLeve', 'busName']
		// 		let data = this.formatJson(filterVal,tab)	 
		// 		console.log(data)
		// 		let str =me.fileName;
		// 		export_json_to_excel(tHeader, data, str);
        //     })
		// },
        // formatJson(filterVal, jsonData) { // 参数过滤
        //     return jsonData.map(v => filterVal.map(j => v[j]))
        // },
    }
}
</script>
<style lang="scss">
    @import "../../../static/scss/common";
    
    .state-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 14px 14px;
        // border: 2px solid #00ffff;
        .select_top{
            font-size: 0.07rem;
            // overflow: hidden;
            color: #fff;     
            input, select, textarea{
                color:#fff;
                background: none;
                border: 1;
                border:1px solid #426680;
            }
            .el-button{
                background: #0aa4c5;
                color: #fff;
                padding: 10px 20px;
                border: none;
            }
            p{
                width:22%;
                display: flex;
                float: left;
                align-items: center;
                margin-bottom: 14px;
                .select_title{
                    vertical-align: middle;
                    display: inline-block;
                    min-width: 70px;
                    margin-right: 4px;
                    font-size: 14px;
                    text-align: right;
                }
            }
            .timep{
                width: 34%;
            }
            .search_p{
                width: 20%;
                float: right;
                display: block;
                text-align: right;
            }
            .serch_btn{
                vertical-align: middle;
                border-radius: 4px;
                display: inline-block;
                padding: 8px 26px;
                cursor: pointer;
                background:$btn_b;
                font-size: 14px;
            }
            .el-range-editor.el-input__inner{
                color: #fff;
                background:none;
                border:1px solid #426680;
                width: 100%;
                input{
                    border: none;
                }
            }
            
            .el-date-editor .el-range-separator,.el-date-editor .el-range-input{
                color:#fff;
                line-height: 26px;
            }
        }
    }
</style>