<template>
    <div class="ledger-wapper">
        <build @buildId="getBuildId"></build>
        <div class="content_right">
            <div class="select_top">
                <p>
                    <span class="select_title">设备状态</span>
                    <el-select class='max_input'  v-model='searchItem.DeviceStatus' filterable placeholder="请选择">
                        <el-option
                        v-for="item in stateList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p>
                    <span class="select_title">设备类型</span>
                    <el-select class='max_input'  v-model='searchItem.DeviceType' filterable placeholder="请选择">
                        <el-option
                        v-for="item in typeOptions"
                        :key="item.id"
                        :label="item.devType"
                        :value="item.devType">
                        </el-option>
                    </el-select>
                </p>
                <p>
                    <span class="select_title">供应商</span>
                    <el-input class='max_input' v-model='searchItem.Supplier'></el-input>
                </p>
                <p>
                    <span class="select_title">采购人</span>
                    <el-input class='max_input' v-model='searchItem.Purchaser'></el-input>
                </p>
                <p class="timep">
                    <span class="select_title">时间</span>
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </p>
                
                
                <p>
                    <span class="select_title">所属单位</span>
                    <el-input class='max_input' v-model="searchItem.Organization"></el-input>
                </p>
                <p>
                    <span class="select_title">责任人</span>
                    <el-input class='max_input' v-model="searchItem.PersonLiable"></el-input>
                </p>
                <p>
                    <span class="select_title">资产编号</span>
                    <el-input class='max_input' v-model="searchItem.AssetNumber"></el-input>
                </p>
                <p>  <span class="select_title"></span><el-button class="" @click="goService">检修记录<i class="el-icon-view el-icon--right"></i></el-button></p>
                <p class="timep">
                    <span class="select_title non_title"></span>
                    <el-button class="" @click="initGetlist">查找<i class="el-icon-search el-icon--right"></i></el-button>
                    <el-button class="" @click="exportTo">导出<i class="el-icon-share el-icon--right"></i></el-button>
                    <el-button class="" @click="addLedger">添加<i class="el-icon-plus el-icon--right"></i></el-button>
                </p>
            </div>
            <div class="table_content" :style="'height:'+(listData.length>15?'80%;':'auto;')">
                <div class="posi_th" v-show="posithShow">
                    <span v-for="(item,index) in thList" :key='index' :style="'width:'+(parseInt(thWidthList[index])+1)+'px'">{{item}}</span>
                </div>
                <div class="table_box">
                    <table class="my_table" id='tableId'>
                        <tbody>
                        <tr class="thref">
                            <th ref="thref" v-for="(item,index) in thList" :key='index'><span>{{item}}</span></th>
                        </tr>
                        <tr v-for="(item,index) in mainData" :key="index">
                            
                            <td>{{(pagination.currentPage-1)*(pagination.size)+index+1}}</td>
                            <td class="td_control">
                                <span title="查看状态记录"  @click="goState(item.DeviceName)">查看 
                                    <!-- <i class="el-icon-view"></i> -->
                                </span>
                                <span title="修改" @click="setLedgers(item)">修改 
                                    <!-- <i class="el-icon-edit"></i> -->
                                </span>
                                <span title="删除" @click="delItem(item.ID)">删除 
                                    <!-- <i class="el-icon-delete"></i> -->
                                </span>   
                            </td>
                            <td>{{item.DeviceName}}</td>
                            <td>{{item.DeviceType}}</td> 
                            <!-- <td>{{item.SubItem}}</td>  -->
                            <td>{{item.DeviceModel}}</td>
                            <td>{{stateControl(item.DeviceStatus)}}</td>
                            <td>{{item.strDeviceStatusTime}}</td>

                            <td>{{item.Supplier}}</td>
                            <td>{{item.Purchaser}}</td>
                            <td>{{item.strPurchaseDate}}</td>
                            <td>{{item.PurchasePrice}}</td>
                            <td>{{item.PurchaserType}}</td>
                            <td>{{item.AgeLimit}}{{item.AgeLimit?'个月':''}}</td>
                            <td>{{item.Organization}}</td>
                            <td>{{item.PersonLiable}}</td>
                            <td>{{item.AssetNumber}}</td>
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
                    <!-- <p><span class="lt">设备编号</span><el-input v-model="searchList.AssetNumber" placeholder="请输入内容"></el-input></p> -->
                    
                    <p><span class="lt">设备名称</span><el-input v-model="searchList.DeviceName" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">设备类型</span><el-input v-model="searchList.DeviceType" placeholder="请输入内容"></el-input></p>
                     <p><span class="lt">设备型号</span><el-input v-model="searchList.DeviceModel" placeholder="请输入内容"></el-input></p>
                    
                    <p><span class="lt">所属单位</span><el-input v-model="searchList.Organization" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">责任人  </span><el-input v-model="searchList.PersonLiable" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">设备状态</span>
                        <el-select class='max_input' v-model="searchList.DeviceStatus" filterable placeholder="请选择">
                            <el-option
                            v-for="item in stateList1"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p>
                        <span class="lt">状态改变时间</span>
                        <el-date-picker
                            v-model="searchList.strDeviceStatusTime"
                            format="yyyy/MM/dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </p>
                   
                    <p><span class="lt">资产编号</span><el-input v-model="searchList.AssetNumber" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">供应商</span><el-input v-model="searchList.Supplier" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">采购类型</span><el-input v-model="searchList.PurchaserType" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">采购价格</span><el-input type="number" v-model="searchList.PurchasePrice" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">采购人</span><el-input v-model="searchList.Purchaser" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">采购时间</span>
                        <el-date-picker
                            v-model="searchList.strPurchaseDate"
                            type="date"
                            format="yyyy/MM/dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                    <p><span class="lt">使用年限</span><el-input type="number" v-model="searchList.AgeLimit" placeholder="请输入月份"></el-input></p>

                    <p><span class="lt">备注</span>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="searchList.Remarks">
                        </el-input>
                    </p>
                    <!-- <p><span class="lt">检修记录</span>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="searchList.RepairRecords">
                        </el-input>
                    </p> -->
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveLedger">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import build from '@/components/build.vue';
export default {
    components: { build },
    data(){
        return{
            options:[
                {
                    'CrmName':12
                }
            ],
            typeOptions:[],
            co_id:'',
            value:'',
            thList:[
                '设备编号','操作','设备名称','设备类型','设备型号','设备状态','状态改变时间','供应商','采购人','采购时间','采购价格','采购类型','使用年限','所属单位','责任人','资产编号','备注'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            date:[],
            listData:[],
            thWidthList:[],
            posithShow:false,
            dialogVisible:false,
            stateList:[
                {name:'全部',value:null},
                {name:'正常',value:0},
                {name:'故障',value:1},
                {name:'维修',value:2},
                {name:'报废',value:3},
                {name:'遗失',value:4},
                {name:'未知',value:5},
            ],
            stateList1:[
                // {name:'全部',value:null},
                {name:'正常',value:0},
                {name:'故障',value:1},
                {name:'维修',value:2},
                {name:'报废',value:3},
                {name:'遗失',value:4},
                {name:'未知',value:5},
            ],
            devState:0,
            textarea:'',
            searchItem:{//查询条件
                'DeviceStatus':null, //设备状态
                'DeviceType':'全部',   //设备类型
                'Supplier':'',    //供应商
                'DeviceName':'',   //设备名称    
                'Purchaser':'',    //采购人
                'Organization':'', //所属单位
                'PersonLiable':'', //责任人
                'AssetNumber':'',  //资产编号
                // 'Remarks':'备注',      //备注
                // 'RepairRecords':'检修记录',//检修记录
                // 'SubItem':null,      //分类分项
                // 'DeviceStatusTime':null,//状态改变时间
                // 'PurchaseDate':null, //采购时间
                // 'PurchasePrice':0,//采购价格
                // 'PurchaserType':null,  //采购类型
                // 'AgeLimit':null,//使用年限
            },
            titleName:'设备信息',
            searchList:{
                'DeviceStatus':null, //设备状态
                // 'DeviceAddr':'设备地址',   //设备地址
                'DeviceType':null,   //设备类型
                'DeviceName':'设备名称',   //设备名称
                'Id':null,           //设备id
                'DeviceModel':'设备型号',  //设备型号
                'Supplier':'供应商',    //供应商
                'Purchaser':'采购人',    //采购人
                'Organization':'所属单位', //所属单位
                'PersonLiable':'责任人', //责任人
                'AssetNumber':'资产编号',  //资产编号
                'Remarks':'备注',      //备注
                'RepairRecords':'检修记录',//检修记录
                'SubItem':null,      //分类分项
                'DeviceStatusTime':'',//状态改变时间
                // 'AbnormalTime':null, //异常时间
                // 'NormalTime':null,   //恢复时间
                'PurchaseDate':null, //采购时间
                'PurchasePrice':null,//采购价格
                'PurchaserType':null,  //采购类型
                // 'InstallAddr':'安装地址',  //安装地址
                'AgeLimit':null,//使用年限
            },
            mainData:[
                // {
                //     'DeviceStatus':3, //设备状态
                //     'DeviceAddr':'设备地址',   //设备地址
                //     'DeviceType':'设备类型',   //设备类型
                //     'DeviceName':'设备名称',   //设备名称
                //     'Id':null,           //设备id
                //     'DeviceModel':'设备型号',  //设备型号
                //     'Supplier':'供应商',    //供应商
                //     'Purchaser':'采购人',    //采购人
                //     'Organization':'所属单位', //所属单位
                //     'PersonLiable':'责任人', //责任人
                //     'AssetNumber':'资产编号',  //资产编号
                //     'Remarks':'备注',      //备注
                //     'RepairRecords':'检修记录',//检修记录
                //     'DeviceStatusTime':null,//状态改变时间
                //     // 'SubItem':null,      //分类分项
                //     // 'AbnormalTime':null, //异常时间
                //     // 'NormalTime':null,   //恢复时间
                //     'PurchaseDate':'采购时间', //采购时间
                //     'PurchasePrice':0,//采购价格
                //     'PurchaserType':'采购类型',  //采购类型
                //     'InstallAddr':'安装地址',  //安装地址
                //     'AgeLimit':null,           //使用年限
                // }
            ]
            
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWidth);
    },
    mounted(){
        // this.mainData=new Array(180);
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
            }, 100);
            
        // })
         window.addEventListener('resize', this.getWidth);
        this.getTypelist();
    },
    methods:{
        getBuildId(id){
            this.co_id=id;
            this.getList();
        },
        cancel(){
            this.dialogVisible = false;
            this.getList();
        },
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
        getTypelist(){//获取设备类型
            let that=this;
            this.typeOptions=[{'devType':'全部'}]
            this.$api.getdeType().then(res=>{
                that.typeOptions=this.typeOptions.concat(res.data.Data);
                // console.log(res.data.Data)
            })      
        },
        
        goState(name){
            localStorage.setItem('devName',name)
            this.$router.push('state')
        },
        goService(){
            this.$router.push('service')
        },
        getToday(){
            var myDate = new Date(); //获取系统当前时间
            // 获取特定格式的时间：
            var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            var day = myDate.getDate(); //获取当前日(1-31)
            return year + "-" + month + "-" + day
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
        //添加
        addLedger(){
            this.titleName='添加设备信息';
            let params={
                'DeviceStatus':null, //设备状态
                // 'DeviceAddr':'',   //设备地址
                'DeviceType':null,   //设备类型
                'DeviceName':'',   //设备名称
                // 'Id':null,           //设备id
                'DeviceModel':'',  //设备型号
                'Supplier':'',    //供应商
                'Purchaser':'',    //采购人
                'Organization':'', //所属单位
                'PersonLiable':'', //责任人
                'AssetNumber':'',  //资产编号
                'Remarks':'',      //备注
                'RepairRecords':'',//检修记录
                'DeviceStatusTime':'',//状态改变时间
                // 'SubItem':null,      //分类分项
                // 'AbnormalTime':null, //异常时间
                // 'NormalTime':null,   //恢复时间
                'PurchaseDate':null, //采购时间
                'PurchasePrice':null,//采购价格
                'PurchaserType':null,  //采购类型
                'AgeLimit':null,
                // 'InstallAddr':'',  //安装地址
            }
            this.searchList=params;
            this.dialogVisible=true;
        },
        
        //更改
        setLedgers(item){
            this.titleName='更改设备信息';
            let data=item;
            
            this.searchList=data;
            this.dialogVisible=true;
            console.log( this.searchList.strDeviceStatusTime)
        },
        saveLedger(){
            let that=this;
            let params={
                "ParentID": this.co_id,
                "DeviceName": this.searchList.DeviceName,   //设备名称
                "DeviceType": this.searchList.DeviceType,   //设备类型
                "DeviceModel": this.searchList.DeviceModel,  //设备型号
                "DeviceStatus":this.searchList.DeviceStatus, //设备状态
                "DeviceStatusTime":this.searchList.strDeviceStatusTime,//状态改变时间
                "AgeLimit": this.searchList.AgeLimit,
                "Supplier": this.searchList.Supplier,    //供应商
                "Purchaser": this.searchList.Purchaser,    //采购人
                "PurchaseDate": this.searchList.strPurchaseDate, //采购时间
                "PurchasePrice": this.searchList.PurchasePrice,
                "PurchaserType": this.searchList.PurchaserType,
                "Organization": this.searchList.Organization, //所属单位
                "PersonLiable": this.searchList.PersonLiable, //责任人
                "AssetNumber": this.searchList.AssetNumber,  //资产编号
                "Remarks": this.searchList.Remarks,      //备注
            }
            
            if(!this.searchList.ID){//添加
                this.$api.addLedger(params).then(res=>{
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
                params.ID=this.searchList.ID;
                this.$api.setLedger(params).then(res=>{
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
                            message:res.data.Msg
                        });
                    }
                })   
            }
        },
        //删除
        delItem(id){
            let that=this;
            this.$confirm('确定删除当前台账信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$api.delLedger(id).then(res=>{
                        // console.log(res)
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
        initGetlist(){
            this.pagination.currentPage=1;
            this.getList();
        },
        //获取列表
        getList(){
            let that=this;
            // if(!this.date){
            //     this.date=[this.getToday(), this.getToday()]
            // }
            let params={
                "orgId": this.co_id,
            }
            // console.log(that.date,this.searchItem.DeviceType)
            // console.log(that.date)
            if(that.date&&that.date.length!=0){
               params.startTime=that.date[0]+' 00:00:00';
               params.endTime=that.date[1]+' 23:59:59';
            }
            if(this.searchItem.DeviceStatus!=null){
                params.DeviceStatus=this.searchItem.DeviceStatus
            }
            if(this.searchItem.Supplier){
                params.Supplier=this.searchItem.Supplier
            }
            if(this.searchItem.Supplier){
                params.Supplier=this.searchItem.Supplier
            }
            if(this.searchItem.Purchaser){
                params.Purchaser=this.searchItem.Purchaser
            }
            if(this.searchItem.Organization){
                params.Organization=this.searchItem.Organization
            }
            if(this.searchItem.PersonLiable){
                params.PersonLiable=this.searchItem.PersonLiable
            }
            if(this.searchItem.AssetNumber){
                params.AssetNumber=this.searchItem.AssetNumber
            }
            if(this.searchItem.DeviceType!='全部'){
                params.DeviceType=this.searchItem.DeviceType
            }
            this.$api.getLedgerlist(params).then(res=>{ 
                if(res.data.Code===0){
                    that.listData=res.data.Data;
                    that.mainData = that.listData.slice(0, that.pagination.size)
                    that.pagination.total=that.listData.length;
                    that.pagination.arr=that.$api.fiterArr(that.listData.length)
                    that.getWidth();
                }else{
                    that.getList()
                    that.$message.error(res.data.Msg)
                }
            }).catch((error) => {
                // that.getList()
                console.error(error);
            })  
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
        toTimemap(date){
            let d=new Date(date).getTime()/1000;
            return d; 
        },
        exportTo(){
            if(this.listData.length==0){
                this.$message.error('当前数据为空！');
                return false;
            }
            require('script-loader!xlsx/dist/xlsx.core.min'); 
            // console.log(this.listData)
            this.exportToExcel(this.listData)
        },
        exportToExcel(tab){
            //判断是否为IE浏览器
            // if (!!window.ActiveXObject || "ActiveXObject" in window){ 
            //     alert('yes') 
            // }
            // else {
            //     console('no')
            // }
            // return false
            let me=this; 
			require.ensure([], () => {
                
                let {
                    export_json_to_excel
                } = require('../../vendor/Export2Excel');
                
                let tHeader = ['设备名称','设备类型','设备型号','设备状态','状态改变时间','供应商','采购人','采购时间','采购价格','采购类型','使用年限','所属单位','责任人','资产编号','备注'];
                let filterVal;

                filterVal =['DeviceName', 'DeviceType', 'DeviceModel','DeviceStatus', 'strDeviceStatusTime', 'Supplier','Purchaser', 'strPurchaseDate', 'PurchasePrice','PurchaserType', 'AgeLimit', 'Organization','PersonLiable', 'AssetNumber', 'Remarks',]
				let data = this.formatJson(filterVal,tab)	 
				// console.log(data)
                let str ='设备台账信息';
                // alert(export_json_to_excel)
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
    
    .ledger-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 10px 14px;
        // border: 2px solid #00ffff;
        display: flex;
        .lookJ{
            color: #0aa4c5;
            cursor: pointer;
        }
        .select_top{
            font-size: 0.07rem;
            overflow: hidden;
            color: #fff;     
            input, select, textarea{
                color:#fff;
                background: none;
                border: 1;
                border:1px solid #426680;
            }
            p{
                width:19%;
                display: flex;
                float: left;
                align-items: center;
                margin-bottom: 14px;
                .select_title{
                    vertical-align: middle;
                    display: inline-block;
                    min-width: 70px;
                    margin-right: 4px;
                    text-align: right;
                }
            }
            .timep{
                width: 24%;
                .non_title{
                    min-width: 4px;
                    width: 20%;
                }
            }
            .search_p{
                // width: 12%;
                float: right;
                display: block;
                text-align: justify;
            }
            .serch_btn{
                vertical-align: middle;
                border-radius: 4px;
                display: inline-block;
                padding: 8px 26px;
                cursor: pointer;
                background:$btn_b;
            }
            .el-range-editor.el-input__inner{
                color: #fff;
                background:none;
                border:1px solid #426680;
                width: 100%;
                input{
                    border:none;
                }
            }
            .el-date-editor .el-range-separator,.el-date-editor .el-range-input{
                color:#fff;
            }
            .el-date-editor .el-range-separator{
                line-height: 26px;
            }
            .max_input{
                max-width: 217px;
            }
            .el-button{
                padding: 10px 3%;
                background: $btn_b;
                color: #fff;
                border: none;
            }
        }
        
    }
</style>