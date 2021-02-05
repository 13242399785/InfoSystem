<template>
    <div class="history-wapper">
        
        <div class="select_top">
            
            <div class="posi-inport">
                <p class="timep">
                    <span class="select_title">时间</span>
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-button class="" @click="initGetlist">查找<i class="el-icon-search el-icon--right"></i></el-button>
                </p>
                
            </div>
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
                        <td>{{timeStamp(toTimemap(item.CreateTime))}}</td>
                        <td class="caozuo">
                              
                            <el-popover
                                placement="right"
                                width="800"
                                height='500'
                                trigger="click">
                                <el-table :data="gridData">
                                    <el-table-column width="100" property="Name" label="职员姓名"></el-table-column>
                                    <el-table-column width="120" property="Phone" label="手机号码"></el-table-column>
                                    <el-table-column prop='isFinish' width="80" label="是否完成">
                                        <template slot-scope="scope">
                                            <div :class="scope.row.isFinish==1?'bluec':(scope.row.isFinish==2?'nore':'')">
                                                {{scope.row.isFinish==0?'未完成':(scope.row.isFinish==1?'完成':'失败')}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="250" property="Msg" label="内容"></el-table-column>
                                    <el-table-column width="200" property="CreateTime" label="时间" :formatter="timeFormat"></el-table-column>
                                </el-table>
                                <div class="pagecenter">
                                    <el-pagination v-show="paginationBath.total>0" @size-change="handleSizeChangeBath" @current-change="handleCurrentChangeBath" :current-page="paginationBath.currentPage" :page-sizes="paginationBath.arr" :page-size="paginationBath.size" layout="total, sizes, prev, pager, next, jumper" :total="paginationBath.total">
                                    </el-pagination>
                                </div>
                                <span class="bor1" slot="reference" title="查看" @click="lookDetail(item.Hid)">查看详情 
                                    <i class="el-icon-view"></i>
                                </span>
                                <!-- <el-button>click 激活</el-button> -->
                            </el-popover> 
                            
                        </td>

                    </tr>
                    </tbody>
                </table>
                <div class="nodatatext" v-show="parseInt(pagination.total)==0"> 
                    暂无数据
                </div>
            </div>
        </div>
        <!-- 弹出层 -->
        <!-- <el-dialog
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
        </el-dialog> -->
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
            titleName:'新增职员',
            thList:[
                '序号','时间','操作'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            paginationBath: {
                //分页参数
                arr: [8, 20, 30, 40, 50],
                size: 8,
                currentPage: 1,
                total:0
            },
            searchData:{
                "Name":'',
                "Phone":'',
            },
            date: [this.getToday(),this.getToday()],
            mainData:[],
            listData:[],
            thWidthList:[],
            topPosi:'top:0;',
            posithShow:false,
            timer:null,
            dialogVisible:false,
            gridData:[

            ],
            detailId:''
            
        }
    },
    watch:{

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
        window.removeEventListener('resize', this.getWidth);
    },
    methods:{
        finishFormat(row, column){
            // console.log(row,column)
            if (parseInt(row.isFinish) === 0) {
                return '未完成'
            }else if (parseInt(row.isFinish) === 1){
                return '完成'
            }else{
                return '失败'
            }
        },
        timeFormat(row, column){
             return this.timeStamp(this.toTimemap(row.CreateTime))
        },
        lookDetail(id){
            
            this.detailId=id;
            this.paginationBath.currentPage=1;
            this.paginationBath.size=8;
            this.detailList();
        },
        detailList(){
            let that=this;
            let params={
                "hid": this.detailId,
                "PageIndex": this.paginationBath.currentPage,
                "PageSize": this.paginationBath.size
            }
            that.gridData=[]
            this.$api.hisDetailshow(params).then(res=>{
                // let data=res.data.count;
                if(res.data.rst){
                    that.gridData=res.data.data.data;
                    // that.mainData = that.listData.slice(0, that.pagination.size)
                    that.getWidth()
                    that.paginationBath.total=res.data.data.count;
                    // that.paginationBath.arr=that.$api.fiterArr(that.listData.length)
                }else{
                    that.$message(res.data.err.msg)
                }
                
            }).catch((error) => {
                // that.getList()
                console.error(error);
            })
        },
        initGetlist(){
            this.pagination.size=20;
            this.pagination.currentPage=1;
            this.getList();
        },
        getList(){
            let that=this;
            let params={
                "PageIndex": this.pagination.currentPage,
                "PageSize": this.pagination.size
            }
            if(that.date&&that.date.length!=0){
               params.startTime=that.date[0]+' 00:00:00';
               params.endTime=that.date[1]+' 23:59:59';
            }else{
                params.startTime=this.getToday()+' 00:00:00';
                params.endTime=this.getToday()+' 23:59:59';
            }
            
            this.$api.getHistory(params).then(res=>{
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
            this.getList();
            // this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
            // this.getWidth()
        },
        handleCurrentChange(val) {
            //改变当前页
            this.pagination.currentPage = val;
            this.getList();
            // this.mainData=this.listData.slice((this.pagination.currentPage - 1) * this.pagination.size,this.pagination.currentPage * this.pagination.size);
            // this.getWidth()
        },
        handleSizeChangeBath(val) {
            //改变每页长度
            this.paginationBath.size = val;
            this.detailList();
        },
        handleCurrentChangeBath(val) {
            //改变当前页
            this.paginationBath.currentPage = val;
            this.detailList();
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
    .nore{
        color: #c72e2e;
    }
    .history-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 14px 14px;
        min-width: 800px;
        // border: 2px solid #00ffff;
        
        .pagecenter{
            width: 100%;
            text-align: center;
        }
        .select_top{
            z-index: 99;
            font-size: 0.07rem;
            color: #fff;     
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
                margin-left: 12px;
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
                width: 100%;
                margin-right: 12px;
                margin-bottom: 0;
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