// 来源：0-设备采购流程-V01.docx。未说明的金额区间不推定办理路径。
function equipmentSteps(level) {
  const step = (title, owner, channel, materials, note, phase) =>
    ({title, owner, channel, materials, note: note || "", system: channel, phase});
  const form = "设备购置申请审批表";
  const steps = [];
  if (level >= 2) {
    steps.push(step("血液制品研究院请示", "申请人", "OA", ["血液制品研究院请示处理筏", "请示文件"], "", "请示审批"));
    steps.push(step("蓉生经营类请示", "申请人", "OA", ["采购请示", "血液制品研究院请示"], "正文提供采购请示，并关联血液制品研究院请示。", "请示审批"));
  }
  if (level === 3) steps.push(step("天坛公司请示", "申请人", "OA", ["北京天坛生物制品股份有限公司部门（中心/大区）请示处理笺"], "", "请示审批"));
  steps.push(step("采购事项审批", "申请人", "OA", ["血液制品研究院采购事项审批表", ...(level >= 2 ? [level === 3 ? "三级请示" : "两级请示"] : [])], level >= 2 ? "附上前述全部层级的请示。" : "", "购置准备"));
  steps.push(step("填写设备购置申请", "申请人", "线下", [form], "", "购置准备"));
  if (level >= 1) steps.push(step("编写并登记 URS", "申请人 / 黄海", "线下", ["URS", form], "找黄海登记产生 URS 编号。强制项条款不超过全部条款的 15%；签字后附于设备购置申请审批表后。", "购置准备"));
  steps.push(
    step("课题及部门负责人审核", "预算对应课题负责人 / 部门负责人", "线下", [form], "先由预算对应的课题负责人审核，再提交部门负责人。", "购置审核"),
    step("预算复核与资产审核", "血制公司工程技术部", "线下", [form], "进行预算复核和资产审核。", "购置审核"),
    step("分管领导审核", "分管领导", "线下", [form], "", "购置审核"),
    step("质量保证部审核", "血制公司质量保证部", "线下", [form], "进行系统影响评估、检测设备分类、计量器具管控。", "购置审核"),
    step("安全管理部审核", "安全管理部", "线下", [form], "", "购置审核"),
    step("申请资产编号", "财务部 / 霍晓旭", "线下", [form], "根据设备购置申请审批表申请资产编号。", "采购申请"),
    step("SAP 录入采购申请", "部门物料管理员", "SAP", [], "录入“采购申请”，生成购置单号。文档未单列此步骤所需附件。", "采购申请"),
    step("提交生产管理部", "血制公司生产管理部", "线下", [], "文档流程到此结束，未说明此步材料及后续采购、验收、付款步骤。", "采购申请")
  );
  return steps;
}

const equipmentRoutes = [
  {id:"spares", label:"不涉及付款（备品备件）", range:"备品备件", summary:"生成物料号后，办理备品备件备料。", steps:[
    {title:"物料主数据维护申请",owner:"申请人",channel:"OA",system:"OA",materials:["物料主数据维护申请表"],note:"物料类型选择“备品备件”，生成物料号。",phase:"备品备件"},
    {title:"备品备件备料",owner:"申请人",channel:"OA",system:"OA",materials:["设备设施备品备件备料单"],note:"办理备料单，采购备品备件。",phase:"备品备件"}
  ]},
  {id:"under-20",label:"20 万元以内",range:"20 万元以内",summary:"采购事项审批后，完成设备购置申请审核、资产编号和 SAP 采购申请。",steps:equipmentSteps(0)},
  {id:"20-100",label:"20–100 万元",range:"20 万以上 100 万以内",summary:"增加 URS 编写、编号登记和签字，其余沿用 20 万以内流程。",steps:equipmentSteps(1)},
  {id:"100-500",label:"100–500 万元",range:"100 万以上 500 万以内",summary:"先完成研究院和蓉生两级请示，采购事项审批附两级请示，其余沿用 20–100 万元流程。",steps:equipmentSteps(2)},
  {id:"over-500",label:"500 万元以上",range:"500 万元以上",summary:"增加天坛公司请示，采购事项审批需附三级请示。",steps:equipmentSteps(3)}
];
