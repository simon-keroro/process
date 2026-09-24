const commonPaymentNote = "凡涉及付款的合同，后续材料均需附反商业贿赂承诺书。";
const s = (title, owner, channel, materials=[], note="", system="OA") => ({title, owner, channel, materials, note, system});
const routes = [
  {id:"no-pay",label:"不涉及付款",range:"无需付款",summary:"合同文本先经法务审核，再发起合同会签并完成备案。",steps:[
    s("合同文本预审与会签","申请人 / 黄海","OA",["合同文本（先发法务老师审核）","对方营业执照"],"OA 新建事项发黄海，仅走合同会签。"),
    s("打印会签单并备案","申请人","线下",["合同订立会签单"],"完成合同备案。","线下")
  ]},
  {id:"under-20",label:"20 万元以内",range:"涉及付款 · 20 万元以内",summary:"以询价为核心，完成采购审批、合同签订、付款审批与报账。",steps:[
    s("采购事项审批","申请人 / 血液制品研究院","OA",["血液制品研究院采购事项审批表"],"此金额区间不需要血液制品研究院审批。"),
    s("询价审批与供应商核验","申请人","OA",["三家报价单","各公司营业执照","关联方关系截图","采购事项审批表"],"检查供应商注册/准入；未完成时先走供应商注册、准入审批。信用信息在国家企业信用信息公示系统查询。"),
    s("合同会签","申请人 / 黄海","OA",["合同","乙方营业执照","采购事项审批表","询价审批单"],"询价审批单上传后即可联系 CRO 准备合同，并请唐玲老师协助审核。"),
    s("签字、签章与备案","梁总 / 申请人","线下",["询价审批单","合同订立会签单","反商业贿赂承诺书"],"梁总（409）签字；办公楼 2 楼盖章备案。填写签订日、终止期及备注，有效期早于签订期一天。","线下"),
    s("费用报销 / 支付审批","申请人 / 血液制品研究院","OA",["签章合同","采购事项审批表","成果交付确认表 PDF（如已有）"],"如已走成果交付结果确认表，无需重复上传报告。"),
    s("合同付款","申请人 / 黄海","OA",["签章合同电子版","乙方营业执照","费用报销 / 支付审批单"],commonPaymentNote),
    s("通用报销单付款","申请人 / 财务处","智慧报账",["合同付款单","签章合同","发票","可交付结果确认表（如已有）","支付审批单"],"勾选发票报销，打印封面与附件，交行政楼 3 楼财务处。","智慧报账")
  ]},
  {id:"20-50",label:"20–50 万元",range:"涉及付款 · 20 万以上 50 万以内",summary:"进入招议标流程，但无需血液制品研究院请示，采购事项审批选择“不需要血液制品研究院审批”。",steps:bidSteps(false)},
  {id:"50-100",label:"50–100 万元",range:"涉及付款 · 50 万以上 100 万以内",summary:"需要血液制品研究院请示并完成招议标、定标、经营类请示后再签合同。",steps:bidSteps(true)},
  {id:"100-500",label:"100–500 万元",range:"涉及付款 · 100 万以上 500 万以内",summary:"需要血制公司与血液制品研究院审批，并转入天坛集中采购和招标。",steps:[
    s("血液制品研究院请示","申请人 / 血液制品研究院","OA",["血液制品研究院请示处理笺","请示文件（附件 2）"]),
    s("蓉生经营类请示","申请人","OA",["蓉生经营类请示"]),
    s("采购事项审批","申请人 / 血液制品研究院","OA",["采购事项审批表","血液制品研究院请示处理笺","蓉生经营类请示"],"选择需要“血制公司审批”和“血液制品研究院审批”。"),
    s("血制公司集中采购申请","申请人","OA",["集中采购申请表","用户需求 Word","用户需求 PDF 签章版（蓝色笔签字）","前三项审批材料"],"需切换至蓉生 OA 系统。"),
    s("等待招标与中标通知","天坛 / 招采","外部等待",["中标通知"],"等待时间通常较长且不可控。","外部"),
    s("合同会签","申请人 / 黄海","OA",["合同","乙方营业执照","中标通知","血液制品研究院请示处理笺","蓉生经营类请示","采购事项审批表"]),
    s("合同签章与备案","申请人","线下",["蓉生经营类请示","合同订立会签单","反商业贿赂承诺书"],"办公楼 2 楼办理。","线下"),
    s("成果确认与支付审批","申请人 / 血液制品研究院","OA",["成果可交付确认表","签章版报告（按合同判断）","合同发票","签章合同","采购事项审批表"]),
    s("合同付款","申请人 / 黄海","OA",["签章合同电子版","电子版发票","乙方营业执照","支付审批单"],commonPaymentNote),
    s("智慧报账付款","申请人 / 财务处","智慧报账",["合同付款单","签章合同","发票","支付审批单"],"完成付款流程。","智慧报账")
  ]}
];

function bidSteps(needsRequest){
  const arr=[];
  if(needsRequest) arr.push(s("血液制品研究院请示","申请人 / 血液制品研究院","OA",["血液制品研究院请示处理笺","请示文件（附件 2）"]));
  arr.push(
    s("采购事项审批","申请人 / 血液制品研究院","OA",["采购事项审批表"],needsRequest?"选择需要血液制品研究院审批。":"50 万以内选择不需要血液制品研究院审批。"),
    s("招议标审核登记","申请人 / 招采","OA",["招议标文件 Word（附件 3）","用户需求 Word 与 PDF 签章版（附件 4）","综合评分细则 Word（附件 5）","关联方关系截图"],"用户需求 PDF 需蓝色笔签字；仅一家供应商时可上传工商信息。"),
    s("提交评标材料并等待定标","田怡 / 招采","外部等待",["招议标审核登记表","URS","招议标文件","评分表","采购事项审批表",...(needsRequest?["请示"]:[]),"关联方截图"],"纸质材料交行政楼 304 田怡；等待评标及定标请示。项目名称须与 URS 一致。","线下"),
    s("蓉生经营类请示","申请人","OA",["采购请示（附件 6）","定标请示"],"关联田怡发送的定标请示；流程中由田怡附言添加中标通知书。"),
    s("合同会签","申请人 / 黄海","OA",["合同","乙方营业执照","中标通知",...(needsRequest?["血液制品研究院请示处理笺"]:[]),"采购事项审批表","蓉生经营类请示"]),
    s("合同签章与备案","申请人","线下",["蓉生经营类请示","合同订立会签单","反商业贿赂承诺书"],"办公楼 2 楼办理。","线下"),
    s("成果确认与支付审批","申请人 / 血液制品研究院","OA",["成果可交付确认表","签章版报告（按合同判断）","合同发票","签章合同","采购事项审批表"]),
    s("合同付款","申请人 / 黄海","OA",["签章合同电子版","电子版发票","乙方营业执照","支付审批单"],commonPaymentNote),
    s("智慧报账付款","申请人 / 财务处","智慧报账",["合同付款单","签章合同","发票","支付审批单"],"完成付款流程。","智慧报账")
  );
  return arr;
}

let activeWorkflow="contract", activeRoutes=routes, activeRoute=routes[0],activeStep=0;
const originalRisks=document.querySelector(".risk-grid").innerHTML;
const originalSource=document.querySelector(".decision-main .section-heading p").textContent;
const tabs=document.querySelector("#routeTabs"),canvas=document.querySelector("#flowCanvas"),detail=document.querySelector("#detailPanel");
function renderTabs(){
  tabs.innerHTML="";
  activeRoutes.forEach((route,i)=>{const b=document.createElement("button");b.className="route-tab";b.role="tab";b.textContent=route.label;b.setAttribute("aria-selected",i===0);b.onclick=()=>selectRoute(route.id);tabs.appendChild(b)});
}
function selectWorkflow(id){
  activeWorkflow=id;
  activeRoutes=id==="equipment"?equipmentRoutes:routes;
  activeRoute=activeRoutes[0]; activeStep=0;
  document.querySelectorAll("[data-workflow]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.workflow===id));
  document.querySelector("#decision-title").textContent=id==="equipment"?"选择设备采购金额":"选择合同金额";
  tabs.setAttribute("aria-label",id==="equipment"?"设备采购情形":"合同情形");
  document.querySelector("#routeCount").textContent=activeRoutes.length;
  document.querySelector(".decision-main .section-heading p").textContent=id==="equipment"?"依据《0-设备采购流程-V01》":originalSource;
  document.querySelector(".legend .finance").nextSibling.textContent=id==="equipment"?"SAP":"智慧报账";
  document.querySelector(".risk-grid").innerHTML=id==="equipment"
    ? '<article><span>URS</span><h3>强制项不超过 15%</h3><p>URS 需找黄海登记编号，签字后附于设备购置申请审批表后。</p></article><article><span>请示材料</span><h3>按金额附相应请示</h3><p>100 万以上 500 万以内附两级请示；500 万以上附三级请示。</p></article><article><span>文档范围</span><h3>止于提交生产管理部</h3><p>设备流程未说明后续验收、付款等步骤，需另行确认。</p></article>'
    :originalRisks;
  document.querySelector("footer").textContent=`依据《0-${id==="equipment"?"设备采购":"合同"}流程-V01》整理 · V4.0`;
  renderTabs(); render();
}
document.querySelectorAll("[data-workflow]").forEach(b=>b.onclick=()=>selectWorkflow(b.dataset.workflow));

function selectRoute(id){activeRoute=activeRoutes.find(r=>r.id===id);activeStep=0;[...tabs.children].forEach((b,i)=>b.setAttribute("aria-selected",activeRoutes[i].id===id));render()}
function phaseName(index,total){if(activeWorkflow==="equipment")return[activeRoute.steps[index].phase,""];if(index===0)return["发起准备","确认范围与审批"];if(index===total-1)return["付款归档","完成合同闭环"];if(index<Math.ceil(total*.55))return["采购审批","询价、招采与定标"];return["合同执行","会签、签章与支付"]}
function render(){
  const docs=new Set(activeRoute.steps.flatMap(x=>x.materials));
  document.querySelector("#stepCount").textContent=activeRoute.steps.length;document.querySelector("#documentCount").textContent=docs.size;
  document.querySelector("#routeSummary").innerHTML=`<strong>${activeRoute.range}</strong><span>${activeRoute.summary}</span>`;
  document.querySelector("#progressBar").style.width=activeRoute.steps.length?`${((activeStep+1)/activeRoute.steps.length)*100}%`:"0%";
  if(!activeRoute.steps.length){
    canvas.innerHTML='<div class="empty-route"><h3>该金额区间流程待确认</h3><p>请先联系流程负责人确认办理路径。</p></div>';
    detail.innerHTML='<h3>源文档未提供规则</h3><p>暂不展示推测的审批步骤。</p>';
    return;
  }
  canvas.innerHTML="";let currentPhase="",group;
  activeRoute.steps.forEach((step,i)=>{const [name,desc]=phaseName(i,activeRoute.steps.length);if(name!==currentPhase){currentPhase=name;group=document.createElement("section");group.className="phase";group.innerHTML=`<div class="phase-label"><strong>${name}</strong><span>${desc}</span></div><div class="phase-nodes"></div>`;canvas.appendChild(group)}const wrap=document.createElement("div");wrap.className="node-wrap";wrap.innerHTML=`<button class="flow-node ${i===activeStep?"active":""}" data-channel="${step.channel}" aria-label="查看第 ${i+1} 步 ${step.title}"><span class="node-top"><span class="node-index">${String(i+1).padStart(2,"0")}</span><span>${step.channel}</span></span><h3>${step.title}</h3><p>${step.owner}</p></button>`;wrap.querySelector("button").onclick=()=>{activeStep=i;render()};group.querySelector(".phase-nodes").appendChild(wrap)});
  renderDetail();
}
function renderDetail(){const step=activeRoute.steps[activeStep];detail.innerHTML=`<span class="detail-index">步骤 ${String(activeStep+1).padStart(2,"0")} / ${String(activeRoute.steps.length).padStart(2,"0")}</span><h3>${step.title}</h3><div class="detail-meta"><span class="pill">${step.owner}</span><span class="pill">${step.system}</span></div><h4>所需材料</h4>${step.materials.length?`<ul>${step.materials.map(x=>`<li>${x}</li>`).join("")}</ul>`:"<p>无额外材料</p>"}${step.note?`<div class="detail-note"><strong>办理提醒</strong><br>${step.note}</div>`:""}`}
selectWorkflow("contract");
