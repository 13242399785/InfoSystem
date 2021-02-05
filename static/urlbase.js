/**
 *接口域名管理
 */
const tt={
  stName:'华北电力大学智能制造实验平台网络商城',//系统名称
  stNameK:'华北电力大学智能制造实验室•MES制造执行系统',//看板系统名称
  menuList:[//菜单管理  child表示二级菜单
    {title:'生产管理',url:'/',show:true,hover:1,icon:'&#xe623;',child:[{title:'订单下达',url:'/orders',}]},
    {title:'看板管理',url:'billboard',show:true,hover:1,icon:'&#xe60c;',now:'_blank',child:[{title:'看板',url:'billboard',now:'_blank'}]}
  ],
  prodectName:'变压器模型',
  prodectName1:'变压器',
  deviceName:['双臂组装设备','检测设备','码垛装盒设备'],
  lianxiName:'广东雅达电子与华电博瑞联合研制'
}
// export default base;
