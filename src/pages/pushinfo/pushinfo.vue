<template>
    <div class="push-wapper" v-loading="pushLoad"
    element-loading-text="正在推送中，请稍后..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="push-top">
            <el-upload
                class="upload-demo"
                ref="upload"
                :action="uploadUrl"
                :on-change="handleChange"
                :on-success='handleSuccess'
                :on-error='handleError'
                :show-file-list="false"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false">
                <div class="posiup">
                    <el-button class="upmu" type="primary" title="上传">{{mainData.length>0?'重新上传':'上传'}}模板<i class="el-icon-share el-icon--right"></i></el-button>
                    <el-button class="posi-btn" @click.stop.prevent="downMu" title="下载模板文件">下载<i class="el-icon-share el-icon-download"></i></el-button>
                </div>
                <!-- <el-button class="upmu" size="small" type="primary" title="上传" @click.stop.prevent="submitUpload">发起推送<i class="el-icon-share el-icon--right"></i></el-button> -->
                <div slot="tip" class="el-upload__tip">注：只 能 上 传 xlsx / xls 文 件</div>
            </el-upload>
             <div class="push-month">
                <span class="demonstration">推送月份</span>
                <el-date-picker
                v-model="pushDate"
                format="yyyy-MM" value-format="yyyy-MM"
                type="month"
                placeholder="选择月">
                </el-date-picker>
            </div>
        </div>
        
        <div class="table_content" v-if="mainData.length>0" :style="'height:'+(mainData.length>12?'80%;':'auto;')" @scroll="scoll">
            <div class="posi_th" v-show="posithShow" :style="topPosi">
                <span v-for="(item,index) in thList" :key='index' :style="'width:'+(parseInt(thWidthList[index])+1)+'px'">{{item}}</span>
            </div>
            <div class="table_box">
                <table class="my_table" id='tableId1'>
                    <tbody>
                    <tr>
                        <th ref="threfs" style="min-width:40px;" v-for="(item,index) in thList" :key='index'>{{item}}</th>
                    </tr>
                    <tr v-for="(item,index) in mainData" :key="index">
                        <td v-for="(th,index1) in thList" :key="index1">{{item[th]}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="nodatatext" v-show="parseInt(pagination.total)==0"> 
                    暂无数据
                </div>
            </div>
        </div>
        <div class="commitsure" v-if="mainData.length>0">
           
            <el-button class="upmu" @click="commitPush">确认发送</el-button>
        </div>
        <el-dialog
            v-dialogDrag
            title="推送详情"
            :visible.sync="inportVisible"
            width="50%"
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
                    prop="Msg"
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
import XLSX from 'xlsx'
export default {
    data(){
        return{
            fileList:[],
            mainData:[],
            listData:[],
            thWidthList:[],
            topPosi:'top:0;',
            posithShow:false,
            thList:[
                '职员姓名','手机号码','上班天数','加班时数','基本工资','岗位津贴','岗位津贴(扣公积金)','绩效工资','绩效评分','请假扣款','出勤工资','加班','工龄','出差补贴','福利补助','其他','扣款','应发工资','扣除','代扣税','个人社保','个人公积','实发工资','社保','住房公积金','累计专项附加扣除','导出个税'
            ],
            pagination: {
                //分页参数
                arr: [10, 20, 30, 40, 50],
                size: 20,
                currentPage: 1,
                total:0
            },
            timer:null,
            pushDate:'',
            uploadUrl:'',
            pushLoad:false,
            inportData:[],
            inportVisible:false

        }
    },
    mounted(){
        let that=this;
        this.pushDate=this.getPremonth(this.getToday())
        window.addEventListener('resize', this.getWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWidth);
    },
    methods:{
        downMu(){
            window.location.href=this.$api.serverUrl+'/files/工资推送模板.xls'
        },
        commitPush(){
            let that=this;
            
            if(this.mainData.length==0){
                this.$message.error('当前模板暂无数据！');
            }else if(!this.pushDate){
                this.$message.error('请选择当前推送月份！');
            }else{
                this.uploadUrl=this.$api.serverUrl+'/api/Employee/SendYdSmsContent?month='+this.pushDate.substr(this.pushDate.indexOf('-')+1,this.pushDate.length)
                setTimeout(function(){
                    that.$refs.upload.submit();
                    that.pushLoad=true
                },200)
            }
            console.log(this.$refs.upload)
            // 
        },
        handleChange(file,fileList){
            // console.log(file,fileList)
            let files={0:file.raw};
            this.readExcel(files);
            this.fileList = fileList.slice(-1);
        },
        handleSuccess(data){
            let that=this;
            // console.log(data)
            that.pushLoad=false
            if(data.rst){
                that.$message.success('推送成功!')
                that.mainData=[];
            }else{
                this.inportData=data.data
                this.inportVisible=true;
                that.$message(data.err.msg)
            }
            // console.log('推送成功')
        },
        handleError(data){
            // console.log(data)
            this.pushLoad=false
            that.$message.error('推送失败!')
            console.log('推送失败')
        },
        readExcel(files) {//表格导入
            var that = this;
            // console.log(files);
            if(files.length<=0){//如果没有文件名
                return false;
            }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
                this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
                return false;
            }
    
            const fileReader = new FileReader();
            // 如果IE 浏览器 不支持FileReader
            // const File_Status = FileReader.prototype.readAsBinaryString;
            // File_Status ? fileReader.readAsBinaryString(files[0]) : fileReader.readAsArrayBuffer(files[0]);
            if (fileReader.readAsBinaryString === undefined) {
                FileReader.prototype.readAsBinaryString = function (fileData) { //解决ie11 大文件堆栈溢出的问题（for arrayBufferToString）
                    var binary = "";
                    var pt = this;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        pt.content = binary;
                        //console.log("binary length:" + binary.length);
                        pt.onload(pt); //页面内data取pt.content文件内容
                    }
                    reader.readAsArrayBuffer(fileData);
                }
            }
            fileReader.onload = (ev) => {
                // console.log(JSON.stringify(ev))
                try {
                    const data = ev.content||ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    
                    const wsname = workbook.SheetNames[0];//取第一张表
                    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
                    that.mainData=ws;
                    that.pagination.total=ws.length
                    // console.log(ws);
                    // that.peopleArr = [];//清空接收数据
                    // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == "" && that.peopleArr[0].enLine == ""){
                    //     that.peopleArr = [];
                    // }
                    //重写数据
                    // try{
                        
                    // }catch(err){
                    //     console.log(err)
                    // }
                    
                    this.$refs.upload.value = '';
        
                } catch (e) {
        
                    return false;
                }
            };
            
            fileReader.readAsBinaryString(files[0]);
            setTimeout(function(){
                that.getWidth();
            },200)
            
        },
        arrayBufferToString(buffer) {
            var array = new Uint8Array(buffer);
            return binaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(array)));
        },
        scoll(event){
            let that=this;
            that.topPosi='top:'+event.target.scrollTop+'px';
        },
        getToday(){
            var myDate = new Date(); //获取系统当前时间
            var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            // var day = myDate.getDate(); //获取当前日(1-31)
            return year + "-" + month
        },
        getPremonth(date){
            let arr = date.split('-'),
                year = arr[0], //获取当前日期的年份
                month = arr[1], //获取当前日期的月份
                days = new Date(year, month, 0);
                days = days.getDate(); //获取当前日期中月的天数
            let year2 = year;
            let month2 = parseInt(month) - 1;
            if (month2 == 0) {//如果是1月份，则取上一年的12月份
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
             var t2 = year2 + '-' + month2;
            return t2;   
        },
        //动态设定模拟表头宽度
        getWidth(){
            let that=this;
            let refs={threfs:that.$refs.threfs};
            // console.log(refs)

            this.$nextTick(()=>{
                that.thWidthList=[];
                for(let key in refs){//必须先获取
                    for(let i=0;i<that.thList.length;i++){
                        this.thWidthList.push(refs[key][i].clientWidth)
                    }
                }
                that.posithShow=true;
            })
        },
        handleRemove(){

        }
    }
}
</script>
<style lang="scss">
    @import "../../../static/scss/common";
    .push-wapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        background: $bg_1;
        padding: 14px 14px;
        min-width: 800px;
        .push-top{
            display: flex;
            justify-content: space-between;
            .push-month{
                color:$text_c;
                font-size: 14px;
                input{
                    color: $text_c;
                    background: none;
                    border: 1;
                    border: 1px solid #426680;
                }
            }
        }
        .el-button{
            background: #0aa4c5;
            color: #fff;
            border: none;
        }
        .el-button:hover{
                background: #49cae7;
        }
        .commitsure{
            text-align: center;
            margin: 20px 0;
        }
        .upload-demo{
            margin-bottom: 14px;
            // text-align: center;
        }
        .el-upload__tip{
            color: red;
        }
        .posiup{
            position: relative;
            display: inline-block;
            .upmu{
                background: #0aa4c5;
                color: #fff;
                border: none;
            }
            .posi-btn{
                position: absolute;
                background: #ccc;
                padding: 0;
                color: #fff;
                left:0;
                opacity: 0;
                top: 0;
                transition:all ease 0.6s;
                width: 100%;
                height: 100%;
                margin-left: 0;
            }
            .upmu:hover + .posi-btn{
                left:100%;
                opacity: 1;
            }
        }
        .posiup:hover .posi-btn{
            left: 100%;
            opacity: 1;
        }
    }
</style>