<template>
    <div class="alarm-wapper">
        
        <div class="select_top">
            <p>
                <span class="select_title">职员姓名</span>
                <el-input class='max_input' v-model="searchData.Name"></el-input>
            </p>
            <p>
                <span class="select_title">电话号码</span>
                <el-input class='max_input'  v-model="searchData.Phone"></el-input>
            </p>
            <p class="unnouse">
                <span class="select_title">是否禁用</span>
                <el-select class='max_input' v-model="unUse" filterable placeholder="请选择">
                    <!-- <el-option label="全部" :key="-1" value="-1"></el-option> -->
                    <el-option
                    v-for="item in useList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="" @click="initGetlist">查找<i class="el-icon-search el-icon--right"></i></el-button>
            </p>
            
            <div class="posi-inport">
                <el-button class="import-btn"  title="导入">导入<i class="el-icon-share el-icon--right"></i></el-button>
                <el-upload
                    class="upload-wapper"
                    :action="uploadUrl"
                    :on-success='handleSuccess'
                    :on-error='handleError'
                    :show-file-list='false'
                    >
                     <el-button class="import-btn"  title="导入">导入<i class="el-icon-share el-icon--right"></i></el-button>
                </el-upload>
                <el-button class="posi-btn" @click="downMu" title="下载模板文件">下载<i class="el-icon-share el-icon-download"></i></el-button>
            </div>
            <el-button @click="addEmployees">添加<i class="el-icon-plus el-icon--right"></i></el-button>
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
                        <!-- <td>{{(pagination.currentPage-1)*(pagination.size)+index+1}}</td> -->
                        <td>{{item.EmpNo}}</td>
                        <td class="caozuo">
                            <span class="bor1" title="修改" @click="setEm(item)">修改 
                                <i class="el-icon-edit"></i>
                            </span>
                            <span class="bor1" title="删除" @click="delEm(item.Id)">删除 
                                <i class="el-icon-delete"></i>
                            </span>   
                        </td>
                        <td>{{item.Name}}</td> 
                        <td>{{item.Phone}}</td>
                        <td>{{item.Email}}</td>
                        <td>{{item.Department}}</td> 
                        <td>{{timeStamp(toTimemap(item.CreateTime))}}</td> 
                        <td>{{timeStamp(toTimemap(item.UpdateTime))}}</td>
                        <td>{{item.Remark}}</td>
                        <td :class="item.Enabled==0?'':'nore'">{{item.Enabled==0?'否':'已禁用'}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="nodatatext" v-show="parseInt(pagination.total)==0"> 
                    暂无数据
                </div>
            </div>
        </div>
        <!-- 弹出层 -->
        <el-dialog
            v-dialogDrag
            :title="titleName"
            :visible.sync="dialogVisible"
            width="44%"
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                    <p><span class="lt">职员姓名</span><el-input v-model="nowData.Name"  placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">工号</span><el-input v-model="nowData.EmpNo" placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">手机号码</span><el-input v-model="nowData.Phone"  placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">部门</span><el-input v-model="nowData.Department"  placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">邮箱地址</span><el-input v-model="nowData.Email"  placeholder="请输入内容"></el-input></p>
                    <p><span class="lt">备注</span>
                        <el-input
                            type="textarea"
                            :rows="2"
                             v-model="nowData.Remark" 
                            placeholder="请输入内容"
                           >
                        </el-input>
                    </p>
                    <p> 
                        <span class="lt">是否禁用</span>
                        <el-checkbox v-model="enabled">禁用</el-checkbox>
                    </p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveEm">确 定</el-button>
            </span>
        </el-dialog>

        <div class="pagination-box">
            <el-pagination v-show="pagination.total>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.arr" :page-size="pagination.size" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
        </div>
        <!-- 弹出层 -->
        <el-dialog
            v-dialogDrag
            title="导入错误详情"
            :visible.sync="inportVisible"
            width="40%"
            :close-on-click-modal='false'
            >
            <div class="dialog-wapper">
                <div class="dialog-list">
                   <el-table
                    :data="inportData"
                    style="width: 100%"
                    height="300">
                    <el-table-column
                    fixed
                    prop="Name"
                    label="职员姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="Phone"
                    label="手机号码"
                    width="250">
                    </el-table-column>
                    <el-table-column
                    prop="Remark"
                    label="内容"
                    width="300">
                    </el-table-column>
                </el-table>
                </div>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveEm">确 定</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>
<script>
export default {

    data(){
        return{
            titleName:'新增职员',
            thList:[
                // '序号','时间','事件类型','事件级别','事件内容','所属厂站','配电所','总线','设备','变量名','报警值','操作员','处理过程','处理结果','备注'
                '工号','操作','职员姓名','手机号码','邮箱','部门','创建时间','更新时间','备注','是否禁用'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            searchData:{
                "Name":'',
                "Phone":'',
            },
            date: [],
            mainData:[],
            listData:[],
            thWidthList:[],
            topPosi:'top:0;',
            posithShow:false,
            timer:null,
            dialogVisible:false,
            controlData:{},
            nowData:{
                "Name": "",
                "Phone": "",
                "Email": "",
                "EmpNo": "",
                "Department": "",
                "CreateTime": "",
                "Remark":"",
                "Enabled":0,
            },
            unUse:'',
            useList:[
                {label:'全部',value:''},
                {label:'否',value:'0'},
                {label:'已禁用',value:'1'},
            ],
            enabled:false,
            inportData:[],
            inportVisible:false,
            uploadUrl:this.$api.serverUrl+'/api/Employee/ImportEmployeeInfo'
        }
    },
    watch:{
        'nowData.Enabled':function(){
            if(this.nowData.Enabled==1){
                this.enabled=true
            }else{
                this.enabled=false
            }
        },
        'enabled':function(){
            if(this.enabled){
                this.nowData.Enabled=1
            }else{
                this.nowData.Enabled=0
            }
        }
    },
    mounted(){
        // this.listData=new Array(100);
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
        //  this.$notify({
        //   title: '提示',
        //   message: '这份哈市的飞机啦福建师范类卡加斯的；副驾驶撒旦激发射精东风路计算机的发阿斯利康剪短发卡加斯',
        //   duration: 0,
        //   type:'success'
        // });
        this.getList();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWidth);
    },
    methods:{
        downMu(){
            window.location.href=this.$api.serverUrl+'/files/职员导入模板.xls'
        },
        handleSuccess(data){
            let that=this;
            this.getList();
            if(data.rst){
                that.$message.success('职员导入成功!')
            }else{
                this.inportData=data.data;
                this.inportVisible=true;
                 that.$message(data.err.msg)
            }
            console.log('成功导入')
        },
        handleError(data){
            this.getList();
            that.$message.error('职员导入失败!')
            console.log('导入失败')
        },
        //新增
        addEmployees(){
            this.titleName='新增职员';
            this.dialogVisible=true;
            this.nowData={
                "Name": "",
                "Phone": "",
                "Email": "",
                "EmpNo": "",
                "Department": "",
                "CreateTime": "",
                "Remark":"",
                "Enabled":0,
            }
            // console.log(this.nowData)
        },
        //修改
        setEm(item){
            this.titleName='修改职员信息';
            this.dialogVisible=true;
            this.controlData={
                "Id":item.Id,
                "Name": item.Name,
                "Phone": item.Phone,
                "Email":item.Email,
                "EmpNo": item.EmpNo,
                "Department": item.Department,
                "CreateTime": item.CreateTime,
                "Remark":item.Remark,
                "Enabled":item.Enabled,
            };

            this.nowData=this.controlData;
            // console.log(item)
        },
        saveEm(){
            let that=this;
            if(this.nowData.Name==""){
                this.$message.error('职员姓名不能为空！');
                return false
            }
            if(this.nowData.Phone==""){
                this.$message.error('手机号码不能为空！');
                return false
            }
            // if(this.nowData.Enabled==true){
            //     this.nowData.Enabled=1
            // }else if(this.nowData.Enabled==false){
            //     this.nowData.Enabled=0
            // }
            // console.log(this.nowData)
            let myDate = new Date();
            let nowTime=this.timeStamp(this.toTimemap(myDate));
            // console.log(nowTime)
            // console.log(this.timeStamp(this.toTimemap(myDate)))
            if(!this.nowData.Id){//新增
                this.nowData.CreateTime=nowTime
                this.nowData.UpdateTime=nowTime
                this.$api.addEmployees(this.nowData).then(res=>{
                    if(res.data.rst){
                        that.$message({
                            type: 'success',
                            message: '新增成功!'
                        });
                        that.getList();
                        that.dialogVisible=false;
                    }else{
                        that.$message(res.data.err.msg);
                    }
                    // console.log(res)
                }).catch((error) => {
                    //  that.$message(res.data.err.msg);
                    // that.getList()
                }) 
            }else{//修改
                this.nowData.UpdateTime=nowTime
                this.$api.putEmployees(this.nowData).then(res=>{
                    if(res.data.rst){
                        that.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        that.getList();
                        that.dialogVisible=false;
                    }else{
                        that.$message(res.data.err.msg);
                    }
                    // console.log(res)
                }).catch((error) => {
                    console.error(error);
                })
            }
        },
        delEm(id){
            let that=this;
            this.$confirm('确认删除当前职员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // console.log('三处asd')
                this.$api.delEmployees(id).then(res=>{
                    if(res.data.rst){
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.getList();
                    }else{
                        that.$message(res.data.err.msg);
                    }
                    // console.log(res)
                }).catch((error) => {
                    // that.getList()
                    console.error(error);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        initGetlist(){
            this.pagination.size=20;
            this.pagination.currentPage=1;
            this.getList();
        },
        getList(){
            let params={
                "PageIndex": this.pagination.currentPage,
                "PageSize": this.pagination.size
            }
            if(this.unUse!=''){
                params.Enabled=parseInt(this.unUse);
            }
            if(this.searchData.Name!=''){
                params.Name=this.searchData.Name;
            }
            if(this.searchData.Phone!=''){
                params.Phone=this.searchData.Phone;
            }
            let that=this;
            this.$api.getlist(params).then(res=>{
                // console.log(res)
                let data=res.data.count;
                if(res.data.rst){
                    that.mainData=res.data.data.data;
                    // that.mainData = that.listData.slice(0, that.pagination.size)
                    that.getWidth()
                    that.pagination.total=res.data.data.count;
                    that.pagination.arr=that.$api.fiterArr(that.pagination.total)
                }else{
                    that.$message(res.data.err.msg)
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
        
        toTimemap(date){
            let d=new Date(date).getTime()/1000;
            return d; 
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
            this.getList()
            // this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
            // this.getWidth()
        },
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.getList()
            // this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
            // this.getWidth()
        },
        scoll(event){
            let that=this;
            // this.timer=setTimeout(function(){
                that.topPosi='top:'+event.target.scrollTop+'px';
            // },1)
        }
    }
}
</script>
<style lang="scss">
    @import "../../../static/scss/common";
    .bluec{
        color: $tab_b;
        color: #0c9c64;
    }
    .dialog-wapper{
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
    }
    .alarm-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 14px 14px;
        min-width: 800px;
        // border: 2px solid #00ffff;
        .nore{
            color: #c72e2e;
        }
        .select_top{
            z-index: 99;
            font-size: 0.07rem;
            color: $text_c;     
            width: 100%;
            text-align: right;
            .unnouse{
                width: 30%;
                button{
                    margin-left: 14px;
                }
            }
            .posi-inport{
                position: relative;
                display: inline-block;
                // margin-right: 6px;
                .posi-btn{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 0;
                    transition: all ease 0.5s;
                    background: #ccc;
                    opacity: 0;
                    z-index: -1;
                }
                .import-btn{
                     z-index:2;
                }
                .upload-wapper{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .posi-inport:hover .posi-btn{
                 top: 38px;
                 left: 0;
                 opacity: 1;
                 z-index: 99;
            }
            .el-button{
                background: #0aa4c5;
                color: #fff;
                border: none;
            }
            .el-button:hover{
                 background: #49cae7;
            }
            input, select, textarea{
                color:$text_c;
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
                    color: $text_c;
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
                color: $text_c;
                background:none;
                border:1px solid #426680;
                width: 100%;
                input{
                    border: none;
                }
            }
            
            .el-date-editor .el-range-separator,.el-date-editor .el-range-input{
                color:$text_c;
                line-height: 26px;
            }
        }
    }
</style>