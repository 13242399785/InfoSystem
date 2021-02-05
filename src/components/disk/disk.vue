<template>
    <div class="analyze-box">
        <div class="analyze-box-w analyze-box-t">
            <div class="analyze-title">主磁盘实时使用情况</div>     
            <div class="disk-box">
                <div class="disk-echart" id="disko"></div>
                <div class="disk-posi">
                    磁盘C
                    <p>(共{{(ALLdisk.cdata)}}GB)</p>
                </div>
            </div>
            <div class="disk-box">
                <div class="disk-echart" id="disko1"></div>
                <div class="disk-posi">
                    磁盘D
                    <p>(共{{(ALLdisk.ddata)}}GB)</p>
                </div>
            </div>
            <div class="disk-box">
                <div class="disk-echart" id="disko2"></div>
                <div class="disk-posi">
                    磁盘E
                    <p>(共{{(ALLdisk.edata)}}GB)</p>
                </div>
            </div>
            <div class="disk-box">
                <div class="disk-echart" id="disko3"></div>
                <div class="disk-posi">
                    磁盘F
                    <p>(共{{(ALLdisk.fdata)}}GB)</p>
                </div>
            </div>
            <!-- 告警 -->
            <!-- <div class="report_o" :class="reportT?'report_h':''">
                <i v-show="!reportT" class="el-icon-warning" @click="reportT=true"></i>
                <i v-show="reportT" class="el-icon-error" @click="reportT=false"></i>
                <p>这是条告警信息</p>
            </div> -->
        </div>
        <!-- 备用 -->
        <div class="analyze-box-w analyze-box-b">
            <div class="analyze-title">备用磁盘实时使用情况</div>
            <div class="disk-box">
                <div class="disk-echart" id="bdisko"></div>
                <div class="disk-posi">
                    磁盘C
                    <p>(共{{(ALLbdisk.cdata)}}GB)</p>
                </div>
            </div>
            <div class="disk-box">
                <div class="disk-echart" id="bdisko1"></div>
                <div class="disk-posi">
                    磁盘D
                    <p>(共{{(ALLbdisk.ddata)}}GB)</p>
                </div>
            </div>
            <div class="disk-box">
                <div class="disk-echart" id="bdisko2"></div>
                <div class="disk-posi">
                    磁盘E
                    <p>(共{{(ALLbdisk.edata)}}GB)</p>
                </div>
            </div>
            <div class="disk-box">
                <div class="disk-echart" id="bdisko3"></div>
                <div class="disk-posi">
                    磁盘F
                    <p>(共{{(ALLbdisk.fdata)}}GB)</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    props:['nowindex'],
    data(){
        return{
            reportT:false,
            diskOption:null,
            mianDisk:[
                {
                cTatal: 0,
                cUnuse: 0,
                dTatal: 0,
                dUnuse: 0,
                eTatal: 0,
                eUnuse: 0,
                fTatal: 0,
                fUnuse: 0,
                gTatal: 0,
                gUnuse: 0,
            }
            ],//主磁盘
            backDisk:[{
                cTatal: 0,
                cUnuse: 0,
                dTatal: 0,
                dUnuse: 0,
                eTatal: 0,
                eUnuse: 0,
                fTatal: 0,
                fUnuse: 0,
                gTatal: 0,
                gUnuse: 0,
            }
            ],//备用磁盘
            ALLdisk:{
                cdata:0,
                ddata:0,
                edata:0,
                fdata:0,
            },
            ALLbdisk:{
                cdata:0,
                ddata:0,
                edata:0,
                fdata:0,
            },
            colorList:{
                ccolor:'#e19a47',
                dcolor:'#e19a47',
                ecolor:'#e19a47',
                fcolor:'#e19a47',
            },
            colorbList:{
                ccolor:'#e19a47',
                dcolor:'#e19a47',
                ecolor:'#e19a47',
                fcolor:'#e19a47',
            },
            timerG:null
        }
    },
    beforeDestroy() {
        clearInterval(this.timerG)
    },
    mounted(){
        let that=this;
        // console.log(this.nowindex)
        window.onresize = function() {
            setTimeout(function() { 
                that.diskOption.resize();
            }, 100);
        };
        // setTimeout(function(){
        //     that.getOption()
        // },10)
        this.getDiskwork()
        this.timerG=setInterval(function(){//一分钟请求一次
            that.getDiskwork();
        },60000)
    },
    methods:{
        //获取磁盘信息
        getDiskwork(){
            let that=this;
            this.$api.Diskwork().then(res=>{
                // console.log(res.data)
                that.mianDisk=res.data.Data.mianDisk;
                
                if(that.mianDisk.length==0){
                    that.mianDisk=[{
                        cTatal: 0,
                        cUnuse: 0,
                        dTatal: 0,
                        dUnuse: 0,
                        eTatal: 0,
                        eUnuse: 0,
                        fTatal: 0,
                        fUnuse: 0,
                        gTatal: 0,
                        gUnuse: 0,
                        }
                    ]
                }else{
                    that.backDisk=res.data.Data.backDisk;
                    that.ALLdisk.cdata=that.mianDisk[that.mianDisk.length-1].cTatal;
                    that.ALLdisk.ddata=that.mianDisk[that.mianDisk.length-1].dTatal;
                    that.ALLdisk.edata=that.mianDisk[that.mianDisk.length-1].eTatal;
                    that.ALLdisk.fdata=that.mianDisk[that.mianDisk.length-1].fTatal;
                }
                that.getOption()
                that.getOption1()
                that.getOption2()
                that.getOption3()
                // 备用
                if(that.backDisk.length==0){
                    that.backDisk=[{
                        cTatal: 0,
                        cUnuse: 0,
                        dTatal: 0,
                        dUnuse: 0,
                        eTatal: 0,
                        eUnuse: 0,
                        fTatal: 0,
                        fUnuse: 0,
                        gTatal: 0,
                        gUnuse: 0,
                        }
                    ]
                }else{
                    that.ALLbdisk.cdata=that.backDisk[that.backDisk.length-1].cTatal||0;
                    that.ALLbdisk.ddata=that.backDisk[that.backDisk.length-1].dTatal||0;
                    that.ALLbdisk.edata=that.backDisk[that.backDisk.length-1].eTatal||0;
                    that.ALLbdisk.fdata=that.backDisk[that.backDisk.length-1].fTatal||0;
                       
                }
                that.getbOption()
                that.getbOption1()
                that.getbOption2()
                that.getbOption3()  
            }).catch((error) => {
                console.error(error);
            })
        },
        //主c
        getOption(){
            let that=this;
            // console.log((that.mianDisk[that.mianDisk.length-1].cTatal-that.mianDisk[that.mianDisk.length-1].cUnuse)/that.mianDisk[that.mianDisk.length-1].cTatal)
            if(((that.mianDisk[that.mianDisk.length-1].cTatal-that.mianDisk[that.mianDisk.length-1].cUnuse)/that.mianDisk[that.mianDisk.length-1].cTatal)>0.9){
                that.colorList.ccolor='#d95656'
            }
            
            this.diskOption=echarts.init(document.getElementById('disko'));
            this.diskOption.setOption({
                tooltip: {
                    trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend:{ 
                orient: 'vertical',
                x: 'center',
                y: '80%',
                formatter: function(name){//修改方法显示名称+值
                    let index=0;
                    var clientName = ['已用空间','剩余空间'];
                    var clientValue=[that.mianDisk[that.mianDisk.length-1].cTatal-that.mianDisk[that.mianDisk.length-1].cUnuse,that.mianDisk[that.mianDisk.length-1].cUnuse]
                        clientName.forEach(function(v,i){
                        if(v==name){
                            index=i
                        }
                        })
                    return name+' : '+clientValue[index]+'GB'
                },
                data: [
                    {name:'已用空间',icon:'circle'},
                    {name:'剩余空间',icon:'circle'},
                ],
                // color:['#2db7f5','#ff6600','#808bc6','#ff6600','#808bc6'],      
                padding:[0,0,0,0],
                orient: 'vertical',//垂直显示
                textStyle:{
                    fontSize: 14,//字体大小
                    color: '#fff'//字体颜色
                },
                },
                
                series: [

                    {   
                        name:'磁盘概况',
                        type:'pie',
                        center: ['50%','40%'],//调整图位置
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label:{
                        normal:{
                            show:false,
                            position:'inner', //标签的位置
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:'{d}%'     
                        }
                        },
                        data:[
                        {value: that.mianDisk[that.mianDisk.length-1].cTatal-that.mianDisk[that.mianDisk.length-1].cUnuse, name: '已用空间'},
                        {value: that.mianDisk[that.mianDisk.length-1].cUnuse, name: '剩余空间'},
                        ],
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        that.colorList.ccolor, '#32c1a1', '#d95656', '#00fff3', '#FF0000', '#FE8463',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            }
        )},
        //主d
        getOption1(){
            let that=this;
            if(((that.mianDisk[that.mianDisk.length-1].dTatal-that.mianDisk[that.mianDisk.length-1].dUnuse)/that.mianDisk[that.mianDisk.length-1].dTatal)>0.9){
                that.colorList.dcolor='#d95656'
            }
            this.diskOption=echarts.init(document.getElementById('disko1'));
            this.diskOption.setOption({
                tooltip: {
                    trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend:{ 
                orient: 'vertical',
                x: 'center',
                y: '80%',
                formatter: function(name){//修改方法显示名称+值
                    let index=0;
                    var clientName = ['已用空间','剩余空间'];
                    var clientValue=[that.mianDisk[that.mianDisk.length-1].dTatal-that.mianDisk[that.mianDisk.length-1].dUnuse,that.mianDisk[that.mianDisk.length-1].dUnuse]
                        clientName.forEach(function(v,i){
                        if(v==name){
                            index=i
                        }
                        })
                    return name+' : '+clientValue[index]+'GB'
                },
                data: [
                    {name:'已用空间',icon:'circle'},
                    {name:'剩余空间',icon:'circle'},
                ],
                color:['#2db7f5','#ff6600','#808bc6','#ff6600','#808bc6'],      
                padding:[0,0,0,0],
                orient: 'vertical',//垂直显示
                textStyle:{
                    fontSize: 14,//字体大小
                    color: '#fff'//字体颜色
                },
                },
                
                series: [

                    {   
                        name:'磁盘概况',
                        type:'pie',
                        center: ['50%','40%'],//调整图位置
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label:{
                        normal:{
                            show:false,
                            position:'inner', //标签的位置
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:'{d}%'     
                        }
                        },
                        data:[
                        {value: that.mianDisk[that.mianDisk.length-1].dTatal-that.mianDisk[that.mianDisk.length-1].dUnuse, name: '已用空间'},
                        {value: that.mianDisk[that.mianDisk.length-1].dUnuse, name: '剩余空间'},
                        ],
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        that.colorList.dcolor, '#32c1a1', '#d95656', '#00fff3', '#FF0000', '#FE8463',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            }
        )},
        //主e
        getOption2(){
            let that=this;
            if(((that.mianDisk[that.mianDisk.length-1].eTatal-that.mianDisk[that.mianDisk.length-1].eUnuse)/that.mianDisk[that.mianDisk.length-1].eTatal)>0.9){
                that.colorList.ecolor='#d95656'
            }
            this.diskOption=echarts.init(document.getElementById('disko2'));
            // console.log(that.mianDisk[that.mianDisk.length-1].eUnuse)
            this.diskOption.setOption({
                tooltip: {
                    trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend:{ 
                orient: 'vertical',
                x: 'center',
                y: '80%',
                formatter: function(name){//修改方法显示名称+值
                    let index=0;
                    var clientName = ['已用空间','剩余空间'];
                    var clientValue=[that.mianDisk[that.mianDisk.length-1].eTatal-that.mianDisk[that.mianDisk.length-1].eUnuse,that.mianDisk[that.mianDisk.length-1].eUnuse]
                        clientName.forEach(function(v,i){
                        if(v==name){
                            index=i
                        }
                        })
                    return name+' : '+clientValue[index]+'GB'
                },
                data: [
                    {name:'已用空间',icon:'circle'},
                    {name:'剩余空间',icon:'circle'},
                ],
                color:['#2db7f5','#ff6600','#808bc6','#ff6600','#808bc6'],      
                padding:[0,0,0,0],
                orient: 'vertical',//垂直显示
                textStyle:{
                    fontSize: 14,//字体大小
                    color: '#fff'//字体颜色
                },
                },
                
                series: [

                    {   
                        name:'磁盘概况',
                        type:'pie',
                        center: ['50%','40%'],//调整图位置
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label:{
                        normal:{
                            show:false,
                            position:'inner', //标签的位置
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:'{d}%'     
                        }
                        },
                        data:[
                        {value: that.mianDisk[that.mianDisk.length-1].eTatal-that.mianDisk[that.mianDisk.length-1].eUnuse, name: '已用空间'},
                        {value: that.mianDisk[that.mianDisk.length-1].eUnuse, name: '剩余空间'},
                        ],
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        that.colorList.ecolor, '#32c1a1', '#d95656', '#00fff3', '#FF0000', '#FE8463',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            }
        )},
        //主f
        getOption3(){
            let that=this;
            if(((that.mianDisk[that.mianDisk.length-1].fTatal-that.mianDisk[that.mianDisk.length-1].fUnuse)/that.mianDisk[that.mianDisk.length-1].fTatal)>0.9){
                that.colorList.fcolor='#d95656'
            }
            this.diskOption=echarts.init(document.getElementById('disko3'));
            this.diskOption.setOption({
                tooltip: {
                    trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend:{ 
                orient: 'vertical',
                x: 'center',
                y: '80%',
                formatter: function(name){//修改方法显示名称+值
                    let index=0;
                    var clientName = ['已用空间','剩余空间'];
                    var clientValue=[that.mianDisk[that.mianDisk.length-1].fTatal-that.mianDisk[that.mianDisk.length-1].fUnuse,that.mianDisk[that.mianDisk.length-1].fUnuse]
                        clientName.forEach(function(v,i){
                        if(v==name){
                            index=i
                        }
                        })
                    return name+' : '+clientValue[index]+'GB'
                },
                data: [
                    {name:'已用空间',icon:'circle'},
                    {name:'剩余空间',icon:'circle'},
                ],
                color:['#2db7f5','#ff6600','#808bc6','#ff6600','#808bc6'],      
                padding:[0,0,0,0],
                orient: 'vertical',//垂直显示
                textStyle:{
                    fontSize: 14,//字体大小
                    color: '#fff'//字体颜色
                },
                },
                
                series: [

                    {   
                        name:'磁盘概况',
                        type:'pie',
                        center: ['50%','40%'],//调整图位置
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label:{
                        normal:{
                            show:false,
                            position:'inner', //标签的位置
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:'{d}%'     
                        }
                        },
                        data:[
                        {value: that.mianDisk[that.mianDisk.length-1].fTatal-that.mianDisk[that.mianDisk.length-1].fUnuse, name: '已用空间'},
                        {value: that.mianDisk[that.mianDisk.length-1].fUnuse, name: '剩余空间'},
                        ],
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        that.colorList.fcolor, '#32c1a1', '#d95656', '#00fff3', '#FF0000', '#FE8463',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            }
        )},
        // 备用
        //备c
        getbOption(){
            let that=this;
            // console.log(that.backDisk)
            // console.log((that.backDisk[that.backDisk.length-1].cTatal-that.backDisk[that.backDisk.length-1].cUnuse)/that.backDisk[that.backDisk.length-1].cTatal)
            if(((that.backDisk[that.backDisk.length-1].cTatal-that.backDisk[that.backDisk.length-1].cUnuse)/that.backDisk[that.backDisk.length-1].cTatal)>0.9){
                that.colorbList.ccolor='#d95656'
            }
            
            this.diskOption=echarts.init(document.getElementById('bdisko'));
            this.diskOption.setOption({
                tooltip: {
                    trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend:{ 
                orient: 'vertical',
                x: 'center',
                y: '80%',
                formatter: function(name){//修改方法显示名称+值
                    let index=0;
                    var clientName = ['已用空间','剩余空间'];
                    var clientValue=[that.backDisk[that.backDisk.length-1].cTatal-that.backDisk[that.backDisk.length-1].cUnuse,that.backDisk[that.backDisk.length-1].cUnuse]
                        clientName.forEach(function(v,i){
                        if(v==name){
                            index=i
                        }
                        })
                    return name+' : '+clientValue[index]+'GB'
                },
                data: [
                    {name:'已用空间',icon:'circle'},
                    {name:'剩余空间',icon:'circle'},
                ],
                // color:['#2db7f5','#ff6600','#808bc6','#ff6600','#808bc6'],      
                padding:[0,0,0,0],
                orient: 'vertical',//垂直显示
                textStyle:{
                    fontSize: 14,//字体大小
                    color: '#fff'//字体颜色
                },
                },
                
                series: [

                    {   
                        name:'磁盘概况',
                        type:'pie',
                        center: ['50%','40%'],//调整图位置
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label:{
                        normal:{
                            show:false,
                            position:'inner', //标签的位置
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:'{d}%'     
                        }
                        },
                        data:[
                        {value: that.backDisk[that.backDisk.length-1].cTatal-that.backDisk[that.backDisk.length-1].cUnuse, name: '已用空间'},
                        {value: that.backDisk[that.backDisk.length-1].cUnuse, name: '剩余空间'},
                        ],
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        that.colorbList.ccolor, '#32c1a1', '#d95656', '#00fff3', '#FF0000', '#FE8463',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            }
        )},
        //备d
        getbOption1(){
            let that=this;
            if(((that.backDisk[that.backDisk.length-1].dTatal-that.backDisk[that.backDisk.length-1].dUnuse)/that.backDisk[that.backDisk.length-1].dTatal)>0.9){
                that.colorbList.dcolor='#d95656'
            }
            this.diskOption=echarts.init(document.getElementById('bdisko1'));
            this.diskOption.setOption({
                tooltip: {
                    trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend:{ 
                orient: 'vertical',
                x: 'center',
                y: '80%',
                formatter: function(name){//修改方法显示名称+值
                    let index=0;
                    var clientName = ['已用空间','剩余空间'];
                    var clientValue=[that.backDisk[that.backDisk.length-1].dTatal-that.backDisk[that.backDisk.length-1].dUnuse,that.backDisk[that.backDisk.length-1].dUnuse]
                        clientName.forEach(function(v,i){
                        if(v==name){
                            index=i
                        }
                        })
                    return name+' : '+clientValue[index]+'GB'
                },
                data: [
                    {name:'已用空间',icon:'circle'},
                    {name:'剩余空间',icon:'circle'},
                ],
                color:['#2db7f5','#ff6600','#808bc6','#ff6600','#808bc6'],      
                padding:[0,0,0,0],
                orient: 'vertical',//垂直显示
                textStyle:{
                    fontSize: 14,//字体大小
                    color: '#fff'//字体颜色
                },
                },
                
                series: [

                    {   
                        name:'磁盘概况',
                        type:'pie',
                        center: ['50%','40%'],//调整图位置
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label:{
                        normal:{
                            show:false,
                            position:'inner', //标签的位置
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:'{d}%'     
                        }
                        },
                        data:[
                        {value: that.backDisk[that.backDisk.length-1].dTatal-that.backDisk[that.backDisk.length-1].dUnuse, name: '已用空间'},
                        {value: that.backDisk[that.backDisk.length-1].dUnuse, name: '剩余空间'},
                        ],
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        that.colorbList.dcolor, '#32c1a1', '#d95656', '#00fff3', '#FF0000', '#FE8463',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            }
        )},
        //备e
        getbOption2(){
            let that=this;
            if(((that.backDisk[that.backDisk.length-1].eTatal-that.backDisk[that.backDisk.length-1].eUnuse)/that.backDisk[that.backDisk.length-1].eTatal)>0.9){
                that.colorbList.ecolor='#d95656'
            }
            this.diskOption=echarts.init(document.getElementById('bdisko2'));
            this.diskOption.setOption({
                tooltip: {
                    trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend:{ 
                orient: 'vertical',
                x: 'center',
                y: '80%',
                formatter: function(name){//修改方法显示名称+值
                    let index=0;
                    var clientName = ['已用空间','剩余空间'];
                    var clientValue=[that.backDisk[that.backDisk.length-1].eTatal-that.backDisk[that.backDisk.length-1].eUnuse,that.backDisk[that.backDisk.length-1].eUnuse]
                        clientName.forEach(function(v,i){
                        if(v==name){
                            index=i
                        }
                        })
                    return name+' : '+clientValue[index]+'GB'
                },
                data: [
                    {name:'已用空间',icon:'circle'},
                    {name:'剩余空间',icon:'circle'},
                ],
                color:['#2db7f5','#ff6600','#808bc6','#ff6600','#808bc6'],      
                padding:[0,0,0,0],
                orient: 'vertical',//垂直显示
                textStyle:{
                    fontSize: 14,//字体大小
                    color: '#fff'//字体颜色
                },
                },
                
                series: [

                    {   
                        name:'磁盘概况',
                        type:'pie',
                        center: ['50%','40%'],//调整图位置
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label:{
                        normal:{
                            show:false,
                            position:'inner', //标签的位置
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:'{d}%'     
                        }
                        },
                        data:[
                        {value: that.backDisk[that.backDisk.length-1].eTatal-that.backDisk[that.backDisk.length-1].eUnuse, name: '已用空间'},
                        {value: that.backDisk[that.backDisk.length-1].eUnuse, name: '剩余空间'},
                        ],
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        that.colorbList.ecolor, '#32c1a1', '#d95656', '#00fff3', '#FF0000', '#FE8463',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            }
        )},
        //备f
        getbOption3(){
            let that=this;
            if(((that.backDisk[that.backDisk.length-1].fTatal-that.backDisk[that.backDisk.length-1].fUnuse)/that.backDisk[that.backDisk.length-1].fTatal)>0.9){
                that.colorbList.fcolor='#d95656'
            }
            this.diskOption=echarts.init(document.getElementById('bdisko3'));
            this.diskOption.setOption({
                tooltip: {
                    trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend:{ 
                orient: 'vertical',
                x: 'center',
                y: '80%',
                formatter: function(name){//修改方法显示名称+值
                    let index=0;
                    var clientName = ['已用空间','剩余空间'];
                    var clientValue=[that.backDisk[that.backDisk.length-1].fTatal-that.backDisk[that.backDisk.length-1].fUnuse,that.backDisk[that.backDisk.length-1].fUnuse]
                        clientName.forEach(function(v,i){
                        if(v==name){
                            index=i
                        }
                        })
                    return name+' : '+clientValue[index]+'GB'
                },
                data: [
                    {name:'已用空间',icon:'circle'},
                    {name:'剩余空间',icon:'circle'},
                ],
                color:['#2db7f5','#ff6600','#808bc6','#ff6600','#808bc6'],      
                padding:[0,0,0,0],
                orient: 'vertical',//垂直显示
                textStyle:{
                    fontSize: 14,//字体大小
                    color: '#fff'//字体颜色
                },
                },
                
                series: [

                    {   
                        name:'磁盘概况',
                        type:'pie',
                        center: ['50%','40%'],//调整图位置
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label:{
                        normal:{
                            show:false,
                            position:'inner', //标签的位置
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:'{d}%'     
                        }
                        },
                        data:[
                        {value: that.backDisk[that.backDisk.length-1].fTatal-that.backDisk[that.backDisk.length-1].fUnuse, name: '已用空间'},
                        {value: that.backDisk[that.backDisk.length-1].fUnuse, name: '剩余空间'},
                        ],
                        itemStyle: {
                            normal:{
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        that.colorbList.fcolor, '#32c1a1', '#d95656', '#00fff3', '#FF0000', '#FE8463',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                ]
            }
        )},
    }
}
</script>
<style lang="scss">
    .disk-box{
        height: 100%;
        width: 22%;
        padding: 20px ;
        position: relative;
        color: #fff;
        min-width: 180px;
        .disk-echart{
            height: 100%;
            width: 100%;
            
        }
        .disk-posi{
            position: absolute;
            left: 50%;
            text-align: center;
            top:42%;
            transform: translate(-50%,-50%);
            
        }
    }
</style>