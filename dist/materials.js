// 金额按单个 SAP 号判断；不足 100 万走低金额路径，100 万及以上走高金额路径（仅研发使用）。
const materialPreparation = () => workflowStep("备料申请", "撰写《物料备料审批单》", "申请人", ["物料备料审批单（必须包含 SAP 号、货号、数量）"], "必须填写 SAP 号、货号、数量。");
const materialReservation = () => workflowStep("SAP 预留", "建立 SAP 预留", "物料管理员", [], "物料管理员登录 SAP，完成预留建立。", "SAP");
const materialRoutes = [
  {id:"material-under-100", label:"单个SAP号不足100万物料", range:"单个 SAP 号 · 不足 100 万", summary:"填写备料审批单，重点物料交生产管理部，再由物料管理员建立 SAP 预留。", steps:[
    materialPreparation(),
    workflowStep("备料申请", "重点物料提交生产管理部", "申请人 / 生产管理部", ["物料备料审批单"], "重点物料需要将《物料备料审批单》交到生产管理部，否则可能因 SAP 系统预留计算原因导致无法购买。非重点物料可直接进入预留建立步骤。"),
    materialReservation()
  ]},
  {id:"material-over-100", label:"单个SAP号100万及以上物料（仅研发使用）", range:"单个 SAP 号 · 100 万及以上 · 仅研发使用", summary:"研究院前置采购请示、采购事项审批后办理备料与 SAP 预留，再撰写 URS、发起集中采购申请。", steps:[
    workflowStep("采购审批", "研究院前置采购请示", "申请人 / 血液制品研究院", ["血液制品研究院前置采购请示"], "在 OA 发起血液制品研究院的前置采购请示。", "OA"),
    workflowStep("采购审批", "采购事项审批", "申请人", ["采购事项审批表"], "在 OA 发起《采购事项审批表》。", "OA"),
    materialPreparation(),
    workflowStep("备料申请", "提交生产管理部", "申请人 / 生产管理部", ["物料备料审批单"], "将《物料备料审批单》交到生产管理部，否则可能因 SAP 系统预留计算原因导致无法购买。"),
    materialReservation(),
    workflowStep("集中采购", "撰写 URS", "申请人", ["URS"], "完成 SAP 预留建立后，撰写 URS。"),
    workflowStep("集中采购", "发起集中采购申请", "申请人", ["北京天坛生物制品股份有限公司本部提报子公司集中采购申请表"], "在 OA 发起《北京天坛生物制品股份有限公司本部提报子公司集中采购申请表》。", "OA")
  ]}
];
