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
    s("签字、签章与备案","血制公司研发分管领导 / 申请人","线下",["询价审批单","合同订立会签单","反商业贿赂承诺书"],"血制公司研发分管领导签字；办公楼 2 楼盖章备案。填写签订日、终止期及备注，有效期早于签订期一天。","线下"),
    s("可交付成果审批","申请人 / 血液制品研究院","OA",["成果可交付确认表","签章版报告（按合同判断）","合同发票","签章合同","采购事项审批表"],"先办理可交付成果审批，再办理费用报销 / 支付审批；关联采购事项审批表和成果可交付确认表。已完成成果确认的，上传确认表 PDF，无需重复上传报告。"),
    s("合同付款","申请人 / 黄海","OA",["签章合同电子版","乙方营业执照","费用报销 / 支付审批单"],commonPaymentNote),
    s("通用报销单付款","申请人 / 财务处","智慧报账",["合同付款单","签章合同","发票","可交付结果确认表（如已有）","支付审批单"],"勾选发票报销，打印封面与附件，交行政楼 3 楼财务处。","智慧报账")
  ]},
  {id:"20-50",label:"20–50 万元",range:"涉及付款 · 20 万以上 50 万以内",summary:"进入招议标流程，但无需血液制品研究院请示，采购事项审批选择“不需要血液制品研究院审批”。",steps:bidSteps(false)},
  {id:"50-100",label:"50–100 万元",range:"涉及付款 · 50 万以上 100 万以内",summary:"需要血液制品研究院请示并完成招议标、定标、经营类请示后再签合同。",steps:bidSteps(true)},
  {id:"100-500",label:"100–500 万元",range:"涉及付款 · 100 万以上 500 万以内",summary:"需要血制公司与血液制品研究院审批，并转入天坛集中采购和招标。",steps:[
    s("血液制品研究院请示","申请人 / 血液制品研究院","OA",["血液制品研究院请示处理笺","请示文件"]),
    s("蓉生经营类请示","申请人","OA",["蓉生经营类请示"]),
    s("采购事项审批","申请人 / 血液制品研究院","OA",["采购事项审批表","血液制品研究院请示处理笺","蓉生经营类请示"],"选择需要“血制公司审批”和“血液制品研究院审批”。"),
    s("血制公司集中采购申请","申请人","OA",["集中采购申请表","用户需求 Word","用户需求 PDF 签章版（蓝色笔签字）","前三项审批材料"],"需切换至蓉生 OA 系统。"),
    s("等待招标与中标通知","天坛 / 招采","外部等待",["中标通知"],"等待时间通常较长且不可控。","外部"),
    s("合同会签","申请人 / 黄海","OA",["合同","乙方营业执照","中标通知","血液制品研究院请示处理笺","蓉生经营类请示","采购事项审批表"]),
    s("合同签章与备案","申请人","线下",["蓉生经营类请示","合同订立会签单","反商业贿赂承诺书"],"办公楼 2 楼办理。","线下"),
    s("可交付成果审批","申请人 / 血液制品研究院","OA",["成果可交付确认表","签章版报告（按合同判断）","合同发票","签章合同","采购事项审批表"],"先办理可交付成果审批，再办理费用报销 / 支付审批；关联采购事项审批表和成果可交付确认表。"),
    s("合同付款","申请人 / 黄海","OA",["签章合同电子版","电子版发票","乙方营业执照","支付审批单"],commonPaymentNote),
    s("智慧报账付款","申请人 / 财务处","智慧报账",["合同付款单","签章合同","发票","支付审批单"],"完成付款流程。","智慧报账")
  ]}
];

function bidSteps(needsRequest){
  const arr=[];
  if(needsRequest) arr.push(s("血液制品研究院请示","申请人 / 血液制品研究院","OA",["血液制品研究院请示处理笺","请示文件"]));
  arr.push(
    s("采购事项审批","申请人 / 血液制品研究院","OA",["采购事项审批表"],needsRequest?"选择需要血液制品研究院审批。":"50 万以内选择不需要血液制品研究院审批。"),
    s("招议标审核登记","申请人 / 招采","OA",["招议标文件 Word","用户需求 Word 与 PDF 签章版","综合评分细则 Word","关联方关系截图"],"用户需求 PDF 需蓝色笔签字；仅一家供应商时可上传工商信息。服务类由需求部门发起。" + (needsRequest ? "研究院请示和研究院采购事项审批后作为关联附件，发起招议标审核。" : "")),
    s("提交评标材料并等待定标","田怡 / 招采","外部等待",["招议标审核登记表","URS","招议标文件","评分表","采购事项审批表",...(needsRequest?["请示"]:[]),"关联方截图"],"纸质材料交行政楼 304 田怡；等待评标及定标请示。项目名称须与 URS 一致。","线下"),
    s("蓉生经营类请示","申请人","OA",["采购请示","定标请示"],"关联田怡发送的定标请示；流程中由田怡附言添加中标通知书。"),
    s("合同会签","申请人 / 黄海","OA",["合同","乙方营业执照","中标通知",...(needsRequest?["血液制品研究院请示处理笺"]:[]),"采购事项审批表","蓉生经营类请示"]),
    s("合同签章与备案","申请人","线下",["蓉生经营类请示","合同订立会签单","反商业贿赂承诺书"],"办公楼 2 楼办理。","线下"),
    s("可交付成果审批","申请人 / 血液制品研究院","OA",["成果可交付确认表","签章版报告（按合同判断）","合同发票","签章合同","采购事项审批表"],"先办理可交付成果审批，再办理费用报销 / 支付审批；关联采购事项审批表和成果可交付确认表。"),
    s("合同付款","申请人 / 黄海","OA",["签章合同电子版","电子版发票","乙方营业执照","支付审批单"],commonPaymentNote),
    s("智慧报账付款","申请人 / 财务处","智慧报账",["合同付款单","签章合同","发票","支付审批单"],"完成付款流程。","智慧报账")
  );
  return arr;
}

let activeWorkflow="contract", activeRoutes=routes, activeRoute=routes[0],activeStep=0;
const originalRisks=document.querySelector(".risk-grid").innerHTML;
const originalSource=document.querySelector(".decision-main .section-heading p").textContent;
const tabs=document.querySelector("#routeTabs"),canvas=document.querySelector("#flowCanvas"),detail=document.querySelector("#detailPanel");
const workflowConfig = {
  contract: {routes, title:"选择合同金额", count:"金额种类", source:originalSource, footer:"依据《0-合同流程-V01》整理"},
  equipment: {routes:equipmentRoutes, title:"选择设备采购金额", count:"金额种类", source:"依据《0-设备采购流程-V01》", footer:"依据《0-设备采购流程-V01》整理"},
  acceptance: {routes:acceptanceRoutes, title:"设备验收", count:"办理情形", source:"", footer:"设备验收流程"},
  materials: {routes:materialRoutes, title:"选择物料采购情形", count:"采购情形", source:"", footer:"物料采购流程"},
  validation: {routes:validationRoutes, title:"选择验证情形", count:"验证情形", source:"", footer:"验证流程"},
  major: {routes:majorCategories, title:"选择事项类别", count:"事项类别", source:"", footer:"三重一大流程"}
};
let majorPath=[];
function selectMajorOption(depth,id){
  majorPath=majorPath.slice(0,depth);
  let options=majorCategories;
  for(const selected of majorPath) options=options.find(option=>option.id===selected).children;
  let node=options.find(option=>option.id===id);
  majorPath.push(node.id);
  while(node.children){node=node.children[0];majorPath.push(node.id);}
  const labels=[];
  options=majorCategories;
  for(const selected of majorPath){const option=options.find(item=>item.id===selected);labels.push(option.label);options=option.children;}
  activeRoute={...node,range:labels.join(" / "),summary:node.description||""};
  activeStep=0;
  [...tabs.children].forEach((button,i)=>button.setAttribute("aria-selected",majorCategories[i].id===majorPath[0]));
  const container=document.querySelector("#subrouteSelectors");
  container.innerHTML="";
  options=majorCategories.find(option=>option.id===majorPath[0]).children;
  let level=1;
  while(options){
    const row=document.createElement("div");row.className="subroute-row";row.role="group";row.setAttribute("aria-label",level===1?"办理事项":"临床项目范围");
    const selectedLevel=level;
    options.forEach(option=>{
      const button=document.createElement("button");button.type="button";button.className="route-tab subroute-option";
      button.setAttribute("aria-pressed",option.id===majorPath[level]);
      const title=document.createElement("span");title.textContent=option.label;button.appendChild(title);
      if(option.description){const description=document.createElement("small");description.textContent=option.description;button.appendChild(description);}
      button.onclick=()=>selectMajorOption(selectedLevel,option.id);row.appendChild(button);
    });
    container.appendChild(row);
    options=options.find(option=>option.id===majorPath[level]).children;level++;
  }
  container.hidden=!container.children.length;
  render();
}
function renderTabs(){
  tabs.innerHTML="";
  activeRoutes.forEach((route,i)=>{const b=document.createElement("button");b.className="route-tab";b.role="tab";b.textContent=route.label;b.setAttribute("aria-selected",i===0);b.onclick=()=>selectRoute(route.id);tabs.appendChild(b)});
}
function selectWorkflow(id){
  activeWorkflow=id;
  const config=workflowConfig[id];
  activeRoutes=config.routes;
  activeRoute=activeRoutes[0]; activeStep=0;
  document.querySelectorAll("[data-workflow]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.workflow===id));
  document.querySelector("#decision-title").textContent=config.title;
  tabs.setAttribute("aria-label",config.title);
  document.querySelector("#routeCount").nextElementSibling.textContent=config.count;
  document.querySelector("#routeCount").textContent=activeRoutes.length;
  document.querySelector(".decision-main .section-heading p").textContent=config.source;
  document.querySelector(".decision-panel").hidden=false;
  document.querySelector("#subrouteSelectors").hidden=true;
  document.querySelector("#subrouteSelectors").innerHTML="";
  document.querySelector("#routeSummary").classList.toggle("major-summary",id==="major");
  document.querySelector("#documentCount").parentElement.hidden=id==="major";
  document.querySelector(".risk-section").hidden=!["contract","equipment"].includes(id);
  document.querySelector(".legend").hidden=id==="major";
  document.querySelector(".legend .finance").parentElement.hidden=!["contract","equipment","materials"].includes(id);
  document.querySelector("#workflow-title").textContent=id==="major"?"三重一大流程":"办理流程";
  document.querySelector(".legend .finance").nextSibling.textContent=["equipment","materials"].includes(id)?"SAP":"智慧报账";
  document.querySelector(".risk-grid").innerHTML=id==="equipment"
    ? '<article><span>URS</span><h3>强制项不超过 15%</h3><p>URS 需找黄海登记编号，签字后附于设备购置申请审批表后。</p></article><article><span>请示材料</span><h3>集采设备附三级请示</h3><p>50–100 万元目录内、100–500 万元及 500 万元以上，均需研究院、蓉生经营类及天坛公司请示。</p></article>'
    :originalRisks;
  document.querySelector("footer").textContent=`${config.footer} · V9.2`;
  renderTabs();
  if(id==="major")selectMajorOption(0,majorCategories[0].id);else render();
}
document.querySelectorAll("[data-workflow]").forEach(b=>b.onclick=()=>selectWorkflow(b.dataset.workflow));

function selectRoute(id){if(activeWorkflow==="major"){selectMajorOption(0,id);return;}activeRoute=activeRoutes.find(r=>r.id===id);activeStep=0;[...tabs.children].forEach((b,i)=>b.setAttribute("aria-selected",activeRoutes[i].id===id));render()}
function phaseName(index,total){if(activeWorkflow!=="contract")return[activeRoute.steps[index].phase,""];if(index===0)return["发起准备","确认范围与审批"];if(index===total-1)return["付款归档","完成合同闭环"];if(index<Math.ceil(total*.55))return["采购审批","询价、招采与定标"];return["合同执行","会签、签章与支付"]}
function render(){
  const empty=!activeRoute;
  detail.hidden=empty;
  document.querySelector(".progress-track").hidden=empty;
  document.querySelector(".workflow-layout").classList.toggle("is-empty",empty);
  if(empty){canvas.innerHTML='<div class="empty-route"><h3>流程待补充</h3><p>具体办理步骤整理后更新。</p></div>';detail.innerHTML="";return;}
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
  appendRelatedWorkflow();
}
function renderDetail(){const step=activeRoute.steps[activeStep];detail.innerHTML=`<span class="detail-index">步骤 ${String(activeStep+1).padStart(2,"0")} / ${String(activeRoute.steps.length).padStart(2,"0")}</span><h3>${step.title}</h3><div class="detail-meta"><span class="pill">${step.owner}</span><span class="pill">${step.system}</span></div><h4>所需材料</h4>${step.materials.length?`<ul>${step.materials.map(x=>`<li>${x}</li>`).join("")}</ul>`:`<p>${step.materialsNote||"无额外材料"}</p>`}${step.note?`<div class="detail-note"><strong>办理提醒</strong><br>${step.note}</div>`:""}`}
function appendRelatedWorkflow(){
  const related=activeRoute.steps[activeStep].relatedWorkflow;
  if(related){const button=document.createElement("button");button.type="button";button.className="route-tab related-workflow";button.textContent="进入验证流程 →";button.onclick=()=>selectWorkflow(related);detail.appendChild(button);}
}
selectWorkflow("contract");
