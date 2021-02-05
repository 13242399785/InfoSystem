/**
 *接口列表
 */
import base from './urlbase';
import axios from '@/request/http';
import qs from 'qs'; // 根据需求是否导入qs模块

// console.log(tt)
// var sid=localStorage.getItem('sessionIds');
let serverUrl=base.url;
if(process.env.NODE_ENV === 'production') {
  axios.get('./url.txt').then(function(res){
    serverUrl=res.data;
    // console.log(res)
  }).catch((error) => {
    console.error(error);
  });
}
const article={
  // sid:localStorage.getItem('sessionIds'),
  serverUrl:serverUrl,
  // 员工列表
  getlist(params){
    return axios.post(`${serverUrl}/api/Employee/GetEmployeesList`,params); 
  },
  // 新增员工
  addEmployees(params){
    return axios.post(`${serverUrl}/api/Employee/AddEmployee`,params); 
  },
  // 修改员工
  putEmployees(params){
    return axios.put(`${serverUrl}/api/Employee/PutEmployee`,params); 
  },
  // 删除员工
  delEmployees(params){
    return axios.delete(`${serverUrl}/api/Employee/DelEmployee?ids=${params}`); 
  },
  //获取历史
  getHistory(params){
    return axios.post(`${serverUrl}/api/History/GetHistoryList`,params)
  },
  //历史详情
  hisDetailshow(params){
    return axios.post(`${serverUrl}/api/History/GetHistoryInfoListById`,params)
  },

  getThreemenu(){
    return axios.get(`${serverUrl}/org/list`); 
  },
  getSellist(params){
    return axios.post(`${serverUrl}/optionLists`,params); 
  },
  Diskwork(){
    return axios.get(`${serverUrl}/cpu/diskWork`);   
  },
  getCpuwork(params){
    return axios.get(`${serverUrl}/cpu/cpuWork?startTime=${params.startTime}&endTime=${params.endTime}`,qs.stringify(params)); 
  },
  getEnergy(params){//用能
    return axios.post(`${serverUrl}/his/report`,params); 
  },
  getLedgerlist(data){//台账列表
    return axios.post(`${serverUrl}/DcRead`,data);   
  },
  addLedger(params){//新增台账信息
    return axios.post(`${serverUrl}/DcCreate`,params); 
  },
  setLedger(params){//修改台账信息
    return axios.post(`${serverUrl}/DcUpdate`,params); 
  },
  delLedger(params){//删除台账信息
    return axios.get(`${serverUrl}/DcDelete?id=`+params); 
  },
  getMrlist(params){//检修记录列表
    return axios.post(`${serverUrl}/MrRead`,params); 
  },
  addMr(params){//添加检修记录
    return axios.post(`${serverUrl}/MrCreate`,params); 
  },
  setMr(params){//修改检修记录
    return axios.post(`${serverUrl}/MrUpdate`,params); 
  },
  delMr(params){//删除检修记录
    return axios.get(`${serverUrl}/MrDelete?id=`+params); 
  },
  getState(params){//状态记录
    return axios.post(`${serverUrl}/DsRead`,params); 
  },
  getdeType(){
    return axios.get(`${serverUrl}/DevType`); 
  },
  getSoelist(){//soe记录
    return axios.get(`${serverUrl}/Soelists`); 
  },
  postSoelist(params){//soe条件查询记录
    return axios.post(`${serverUrl}/ConSoeList`,params); 
  },
  //登录接口
  login(params){
    return axios.post(`${serverUrl}/user/login`,params);
  },
  //公共页码
  fiterArr(num){
    let s=parseInt(num);
    if(s<=10){
      return [10] 
    }else if(s>10&&s<=20){
      return [10,20]
    }else if(s>20&&s<=50){
      return [10,20,50]
    }else if(s>50&&s<=100){
      return [10,20,50,100]
    }else if(s>100){
      return [10,20,50,100,200]
    }
  }
}

export default article;
