<template>
    <div class="service-wapper">
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
            <p class="timep">
                <span class="select_title">检修时间</span>
                <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy/MM/dd" value-format="yyyy/MM/dd">
                </el-date-picker>
            </p>
            
            
            <p class="search_p">
                <el-button @click="addLedger">添加<i class="el-icon-plus el-icon--right"></i></el-button>
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
                        <td class="td_control">
                            <span title="修改" @click="setLedger(item)">修改 
                                <!-- <i class="el-icon-edit"></i> -->
                            </span>
                            <span title="删除" @click="delItem(item.ID)">删除 
                                <!-- <i class="el-icon-delete"></i> -->
                            </span>   
                        </td>
                        <td>{{item.DeviceName}}</td>
                        <td>{{item.DevicePos}}</td> 
                        <td>{{item.RepairPerson}}</td> 
                        <td>{{item.StartTime}}</td> 
                        <td>{{item.EndTime}}</td>
                        <td>{{item.RepairContent}}</td>
                        <td>{{item.Remarks}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="nodatatext" v-show="mainData.length==0"> 
                    暂无数据
                </div>
            </div>
        </div>
        <div class="pagination-box">
            <el-pagination v-show="pagination.total>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.arr" :page-size="pagination.size" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
        </div>
        <!-- 弹出层 -->
        <el-dialog
            :title="titleName"
            :visible.sync="dialogVisible"
            width="44%"
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                    <p><span class="lt">设备名称</span><el-input v-model="searchList.DeviceName" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">检修人员</span><el-input v-model="searchList.RepairPerson" placeholder="请输入内容"></el-input></p>
                    
                    <p><span class="lt">检修时间</span>
                        <el-date-picker
                            v-model="searchList.StartTime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期">
                        </el-date-picker>
                        <!-- <el-date-picker v-model="dateTimeB" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy-MM-dd" value-format="yyyy/MM/dd">
                </el-date-picker> -->
                    </p>
                    <p><span class="lt">结束时间</span>
                        <el-date-picker
                            v-model="searchList.EndTime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                    <p><span class="lt">地点</span><el-input v-model="searchList.DevicePos" placeholder="请输入内容"></el-input></p>
                    
                    <p><span class="lt">备注</span>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="searchList.Remarks">
                        </el-input>
                    </p> 
                    <p><span class="lt">维修内容</span>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="searchList.RepairContent">
                        </el-input>
                    </p> 
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveMr">确 定</el-button>
            </span>
        </el-dialog>
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
            titleName:'',
            typeValue:'',
            leveValue:'',
            facValue:'',
            transValue:'',
            busValue:'',
            devValue:'',
            thList:[
                '序号','操作','设备名称','地点','检修人员','检修时间','结束时间','内容','备注'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
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
            listData:[
            ],
            thWidthList:[],
            typeOptions:[],
            posithShow:false,
            dialogVisible:false,
            searchList:{},
            searchItem:{
                'DeviceName':'',
            },
        }
    },
     beforeDestroy() {
        window.removeEventListener('resize', this.getWidth);
    },
    mounted(){
        let that=this;
        let refs=that.$refs;
        //首次赋值宽度
        this.$nextTick(()=>{
            setTimeout(() => {
               that.thWidthList=[];
                for(let key in refs){//必须先获取
                    for(let i=0;i<that.thList.length;i++){
                        that.thWidthList.push(refs[key][i].clientWidth)
                    }
                }  
                that.posithShow=true;
            }, 1000);
            
        })
        window.addEventListener('resize', this.getWidth);
        this.getList();
    },
    methods:{
        cancel(){
            this.dialogVisible = false;
            this.getList();
        },
         //添加
        addLedger(){
            this.titleName='添加维修记录';
            let params={
                "DeviceName": "",
                "DevicePos": "",
                "RepairPerson": "",
                "StartTime": "",
                "EndTime": "",
                "RepairContent": "",
                "Remarks": ""
            }
            this.searchList=params;
            this.dialogVisible=true;
        },
        //修改
        setLedger(item){
            this.titleName='修改维修记录';
            let data=item;
            this.searchList=data;
            console.log(data)
            this.dialogVisible=true;
        },
        saveMr(){//保存
            let that=this;
            if(!this.searchList.ID){//添加
                this.$api.addMr(this.searchList).then(res=>{
                    if(res.data.Code==0){
                        that.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                        that.dialogVisible = false;
                        that.getList()
                    }else{
                        that.$message({
                            type: 'error',
                            message: res.data.Msg
                        });
                    }
                })    
            }else{//修改
                // console.log(this.searchList)
                this.$api.setMr(this.searchList).then(res=>{
                    if(res.data.Code==0){
                        that.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        that.dialogVisible = false;
                        that.getList()
                    }else{
                        that.$message({
                            type: 'error',
                            message: res.data.Msg
                        });
                    }
                })   
            }
        },
         //删除
        delItem(id){
            let that=this;
            this.$confirm('确定删除当前记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$api.delMr(id).then(res=>{
                        if(res.data.Code==0){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.getList()
                        }else{
                            that.$message({
                                type: 'error',
                                message: res.data.Msg
                            });
                        }
                        
                    })  
                    
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        goLedger(){
            this.$router.push('ledger')
        },
        initGetlist(){
            this.pagination.currentPage=1;
            this.getList();
        },
        getList(){
            let that=this;
            let params={
                // "startTime": (new Date(Date.parse(that.date[0]+' 00:00:00')).getTime())/1000,
                // "endTime": (new Date(Date.parse(that.date[1]+' 23:59:59')).getTime())/1000
            }
            if(that.date){
                params.startTime=that.date[0]+' 00:00:00';
                params.endTime=that.date[1]+' 23:59:59';
                // params.startTime=(new Date(Date.parse(that.date[0]+' 00:00:00')).getTime())/1000
                // params.endTime=(new Date(Date.parse(that.date[1]+' 23:59:59')).getTime())/1000
            }
            if(this.searchItem.DeviceName){
                params.DeviceName=this.searchItem.DeviceName
            }
            this.$api.getMrlist(params).then(res=>{
                let data=res.data.Data;
                if(res.data.Code==0){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    that.listData=data;
                    that.mainData = that.listData.slice(0, that.pagination.size);
                    that.pagination.total=that.listData.length;
                    that.pagination.arr=that.$api.fiterArr(that.listData.length)
                    that.getWidth()
                }else{
                    that.$message.error(res.data.Msg)
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
    
    .service-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 14px 14px;
        // border: 2px solid #00ffff;
        .select_top{
            font-size: 0.07rem;
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
                width: 43%;
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