// 新增流程的步骤、材料与提醒在本文件维护。
const workflowStep = (phase, title, owner, materials, note, channel = "线下") =>
  ({phase, title, owner, materials, note, channel, system: channel});

const acceptanceRoutes = [{
  id: "new-equipment", label: "新到设备", range: "设备验收",
  summary: "安装试运行 → 评估并完成验证（如需）→ 移交资料、填写验收单。",
  steps: [
    workflowStep("安装试运行", "厂家安装与试运行", "厂家 / 使用部门", [], "新到设备由厂家进行安装、试运行。"),
    {...workflowStep("验证评估", "评估是否需要验证", "使用部门", [], "若新设备附带厂家验证服务，需评估是否仍要按血液制品研究院流程验证。需要时，进入验证流程，实验部分由厂家配合完成；无需验证时，试运行完成后办理验收。"), relatedWorkflow: "validation"},
    workflowStep("验收归档", "移交随箱资料", "使用部门 / 王晋", ["随箱说明书", "合格证等随箱资料"], "验证 / 试运行完成后，将随箱资料交至生产管理部王晋处。"),
    workflowStep("验收归档", "填写设备验收单", "使用部门", ["设备验收单"], "移交随箱资料的同时填写设备验收单，完成设备验收。")
  ]
}];

function validationSteps(revalidation, sterilization) {
  const scope = revalidation ? "OQ、PQ" : "IQ、OQ、PQ";
  const experiments = sterilization
    ? (revalidation ? "灭菌设备再验证：空载、负载各进行 1 次实验。" : "灭菌设备首次验证：空载、负载各进行 3 次实验。")
    : "按审核后的方案开展验证实验。";
  return [
    workflowStep("计量准备", "申请计量编号（如需）", "使用部门 / QA", ["QA 计量编号申请表：使用部门、设备名称、使用班组"], "新设备若有温度探头、CO₂ 探头、压力表、减压阀等需计量的备件，先申请计量编号。无此类计量需求时进入验证准备。"),
    workflowStep("计量准备", "申请校检并完成检验（如需）", "使用部门 / QA", ["QA-S7.1.5Y-003-F002 计量器具校准（检定）工作需求单"], "需计量的备件取得计量编号后再申请校检；检验完成后方可开启验证流程。"),
    workflowStep("验证准备", "确定验证范围与实验次数", "使用部门", [], `${revalidation ? "再验证" : "新设备首次验证"}包括 ${scope}。${experiments}`),
    workflowStep("验证准备", "起草验证方案与记录", "起草人", ["RDC-3C-030-F01 北京天坛生物制品股份有限公司研发中心验证（确认）方案", "RDC-3C-030-F01 北京天坛生物制品股份有限公司研发中心验证（确认）记录"], "按模板起草验证方案和记录，随后发起 OA 审核。"),
    workflowStep("方案审批", "OA 审核方案与记录", "起草人 / 审核人员", ["验证方案", "验证记录模板"], "审核顺序：部门负责人 → 赵佳佳、黄捷 → QC（此次验证需要 QC 部门配合时）→ QC 部门负责人 → 科研质量部负责人。", "OA"),
    workflowStep("方案审批", "打印签字并盖章", "申请人 / 赵佳佳", ["OA 审核后的验证方案、记录"], "OA 审核通过后打印方案和记录，完成签字后找赵佳佳盖章，之后启动验证。"),
    workflowStep("验证实施", "开展验证实验", "使用部门 / 配合部门", ["已签字盖章的验证方案、记录"], `验证范围：${scope}。${experiments}若新设备附带厂家验证服务，实验部分由厂家配合完成。`),
    workflowStep("验证归档", "完成验证记录与报告", "申请人", ["验证记录", "验证报告"], "验证实验结束后，完成验证记录与验证报告的填写。"),
    workflowStep("验证归档", "提交资料并领取验证签", "申请人 / 赵佳佳", ["验证方案", "验证记录", "验证报告"], "将全部填写完成的方案、记录、报告交至赵佳佳处，领取验证签。")
  ];
}
const validationRoutes = [
  {id: "initial", label: "新设备验证", range: "新设备 · IQ / OQ / PQ", summary: "需计量的备件先完成校检，再办理方案审核、验证实验和归档。", steps: validationSteps(false, false)},
  {id: "repeat", label: "再验证", range: "再验证 · OQ / PQ", summary: "按方案审核、验证实验和归档顺序办理。", steps: validationSteps(true, false)},
  {id: "sterilizer-initial", label: "灭菌设备首次验证", range: "首次验证 · IQ / OQ / PQ", summary: "空载、负载各进行 3 次实验。", steps: validationSteps(false, true)},
  {id: "sterilizer-repeat", label: "灭菌设备再验证", range: "再验证 · OQ / PQ", summary: "空载、负载各进行 1 次实验。", steps: validationSteps(true, true)}
];
