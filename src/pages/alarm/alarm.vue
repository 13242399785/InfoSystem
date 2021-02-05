<template>
    <div class="alarm-wapper">
        <div class="select_top">
            <p>
                <span class="select_title">事件类型</span>
                <el-select class='max_input' v-model="typeValue" filterable placeholder="请选择">
                    <el-option label="全部" :key="-1" value="-1"></el-option>
                    <el-option
                    v-for="item in typeOptions"
                    :key="item.type"
                    :label="item.typename"
                    :value="item.type">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span class="select_title">级别</span>
                <el-select class='max_input' v-model="leveValue" filterable placeholder="请选择">
                    <el-option label="全部" :key="-1" value="-1"></el-option>
                    <el-option
                    v-for="item in leveOptions"
                    :key="item.level"
                    :label="item.levelname"
                    :value="item.level">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span class="select_title">厂站</span>
                <el-select class='max_input' v-model="facValue" filterable placeholder="请选择">
                    <el-option label="全部" :key="-1" value="-1"></el-option>
                    <el-option
                    v-for="item in facOptions"
                    :key="item.factoryname"
                    :label="item.factoryname"
                    :value="item.factoryname">
                    </el-option>
                </el-select>
            </p>
            <p class="timep">
                <span class="select_title">时间</span>
                <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy/MM/dd" value-format="yyyy/MM/dd" @change="getDate">
                </el-date-picker>
            </p>
            
            <p>
                <span class="select_title">配电所</span>
                <el-select class='max_input' v-model="transValue" filterable placeholder="请选择">
                    <el-option label="全部" :key="-1" value="-1"></el-option>
                    <el-option
                    v-for="item in transOptions"
                    :key="item.transroom"
                    :label="item.transroom"
                    :value="item.transroom">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span class="select_title">总线</span>
                <el-select class='max_input' v-model="busValue" filterable placeholder="请选择">
                    <el-option label="全部" :key="-1" value="-1"></el-option>
                    <el-option
                    v-for="item in busOptions"
                    :key="item.busname"
                    :label="item.busname"
                    :value="item.busname">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span class="select_title">设备</span>
                <el-select class='max_input' v-model="devValue" filterable placeholder="请选择">
                    <el-option label="全部" :key="-1" value="-1"></el-option>
                    <el-option
                    v-for="item in devOptions"
                    :key="item.devname"
                    :label="item.devname"
                    :value="item.devname">
                    </el-option>
                </el-select>
            </p>
            <!-- <p>
                <span class="select_title">告警组</span>
                <el-select class='max_input' v-model="value" filterable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.CrmName"
                    :label="item.CrmName"
                    :value="item.CrmName">
                    </el-option>
                </el-select>
            </p> -->
            
            <p class="search_p search_flex">
                <span>
                    <span class="select_title">确认状况</span>
                    <el-radio v-model="radioText" label="1">全部</el-radio>
                    <el-radio v-model="radioText" label="2">已确认</el-radio>
                    <el-radio v-model="radioText" label="3">未确认</el-radio>
                </span>
                <span class="serch_btn" @click="selList">查找</span></p>
        </div>
        <div class="table_content" :style="'height:'+(mainData.length>12?'80%;':'auto;')" @scroll="scoll">
            <div class="posi_th" v-show="posithShow" :style="topPosi">
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
                        <td>{{item.evtTime}}</td>
                        <td>{{item.szAlarmMaticTime}}</td> 
                        <td>{{item.typename}}</td>
                        <td>{{item.alarmsLeveName}}</td> 
                        <td>{{item.cTypeName}}</td> 
                        <td>{{item.factoryName}}</td>
                        <td>{{item.transRoom}}</td>
                        <td>{{item.busName}}</td>
                        <td>{{item.devName}}</td>
                        <td>{{item.tagName}}</td>
                        <td>{{item.msgAlarmValue}}</td>
                        <td>{{item.optor}}</td>
                        <td :class='item.szConfirmStatus=="已确认"?"bluec":""'>{{item.szConfirmStatus?item.szConfirmStatus:'未确认'}}</td>
                        <td>{{item.szMaticAlarm?item.szMaticAlarm:(item.szAlarmMaticTime?'自动恢复':'未恢复')}}</td>
                        <td>{{item.szMaintanPerson}}</td> 
                        
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
            typeOptions:[],//类型
            leveOptions:[],//级别
            facOptions:[],//厂站
            transOptions:[],//配电所
            busOptions:[],//总线
            devOptions:[],//设备
            // typeOptions:[],
            // typeOptions:[],
            value:'',
            
            typeValue:'',
            leveValue:'',
            facValue:'',
            transValue:'',
            busValue:'',
            devValue:'',
            thList:[
                // '序号','时间','事件类型','事件级别','事件内容','所属厂站','配电所','总线','设备','变量名','报警值','操作员','处理过程','处理结果','备注'
                '序号','时间','恢复时间','事件类型','事件级别','事件内容','所属厂站','配电所','总线','设备','变量名','报警值','操作员','确认状况','解除方式','维护成员'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            date: [],
            mainData:[],
            listData:[],
            thWidthList:[],
            topPosi:'top:0;',
            posithShow:false,
            timer:null,
            radioText:'1',
        }
    },
    mounted(){
        // this.listData=new Array(100);
        let that=this;
        let refs=that.$refs;
        // console.log(refs)
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
        window.removeEventListener('resize', this.getWidth);
    },
    methods:{
        getDate(val){
            // console.log(val)
        },
        //条件列表
        selList(){
            let that=this;
            // console.log(that.date)
            if(!that.date){
                that.date=[this.getToday().replace(/-/g, '/'), this.getToday().replace(/-/g, '/')]
            }
            let params={
                "startTime": (new Date(Date.parse(that.date[0]+' 00:00:00')).getTime())/1000,
                "endTime": (new Date(Date.parse(that.date[1]+' 23:59:59')).getTime())/1000
            }

            if(that.typeValue&&parseInt(that.typeValue)!=-1){
                params.type=that.typeValue
            }
            if(that.leveValue&&parseInt(that.leveValue)!=-1){
                params.alarmsLeve=that.leveValue
            }
            if(that.facValue&&parseInt(that.facValue)!=-1){
                params.factoryName=that.facValue
            }
            if(that.transValue&&parseInt(that.transValue)!=-1){
                params.transRoom=that.transValue
            }
            if(that.busValue&&parseInt(that.busValue)!=-1){
                params.busName=that.busValue
            }
            if(that.devValue&&parseInt(that.devValue)!=-1){
                params.devName=that.devValue
            }
            // console.log(that.radioText)
            if(parseInt(that.radioText)==2){
                params.szConfirmStatus='已确认'
            }else if(parseInt(that.radioText)==3){
                params.szConfirmStatus='未确认'
            }
            // console.log(params)
            this.$api.getSellist(params).then(res=>{
                // console.log(res.data.Data)
                 that.listData=res.data.Data;
                //  console.log(that.listData)
                 that.mainData = that.listData.slice(0, that.pagination.size)
                 that.pagination.total=that.listData.length;
                 that.pagination.currentPage=1;
                 that.pagination.arr=that.$api.fiterArr(that.listData.length)
                that.getWidth()
            })
        },
        getList(){
            let that=this;
            this.$api.getlist().then(res=>{
                let data=res.data.data;
                if(!data){
                    // that.getList()
                }else{
                    that.listData=res.data.Data.warnLisst;
                    that.mainData = that.listData.slice(0, that.pagination.size)
                    that.getWidth()
                    that.pagination.total=that.listData.length;
                    that.pagination.arr=that.$api.fiterArr(that.listData.length)
                    that.leveOptions=res.data.Data.allLists[0];
                    that.typeOptions=res.data.Data.allLists[1];
                    that.transOptions=res.data.Data.allLists[2];
                    that.facOptions=res.data.Data.allLists[3];   
                    that.busOptions=res.data.Data.allLists[4];
                    that.devOptions=res.data.Data.allLists[5];
                }
                
            }).catch((error) => {
                // that.getList()
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
            this.getWidth()
        },
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
            this.getWidth()
        },
        scoll(event){
            let that=this;
            // this.timer=setTimeout(function(){
                that.topPosi='top:'+event.target.scrollTop+'px';
            // },1)
            
            // （滚动条滚动的距离 + 窗口的高度 = 文档的高度）
            // console.log(event.target.scrollTop)
        }
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
    .bluec{
        color: $tab_b;
        color: #0c9c64;
    }
    .alarm-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 14px 14px;
        min-width: 800px;
        // border: 2px solid #00ffff;
        .select_top{
            font-size: 0.07rem;
            // overflow: hidden;
            color: #fff;     
            width: 100%;
            input, select, textarea{
                color:#fff;
                background: none;
                border: 1;
                border:1px solid #426680;
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
                width: 12%;
                float: right;
                display: block;
                text-align: right;
            }
            .search_flex{
                display: flex;
                width: 34%;
                justify-content: space-between;
                .el-radio{
                    color: #fff;
                    vertical-align: middle;
                }
                .el-radio + .el-radio{
                    margin-left: 16px;
                    
                }
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