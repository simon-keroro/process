// 三重一大：children 为下级选项，steps 为最终办理流程。
const majorChangeDescription = "研究目标、技术路线发生调整，关键节点任务延期超过6个月，合作方案或转让方案调整、项目总预算调整超过20%";
const generalChangeDescription = "关键节点任务延期超过3个月，科研项目总预算调整不超过20%，项目负责人变更，承接单位变更";
function majorSteps(groupAction) {
  const step = (title, owner, channel) => ({
    phase: "审议办理", title, owner, channel, system: channel, materials: [],
    materialsNote: "材料要求待补充", note: ""
  });
  const steps = [step("天坛总经理办公会审批", "天坛总经理办公会", "审批")];
  if (groupAction === "equipment") {
    steps.push(step("天坛党委会前置研究", "天坛党委会", "前置研究"));
    steps.push(step("天坛董事会审批", "天坛董事会", "审批"));
    steps.push(step("国药集团备案", "国药集团", "备案"));
  } else if (groupAction) {
    steps.push(step(`国药集团${groupAction}`, "国药集团", groupAction));
  }
  return steps;
}
const majorCategories = [
  {id:"major-equipment", label:"1000万以上的设备购置", steps:majorSteps("equipment")},
  {id:"general-project", label:"国药一般/重点类科研项目", children:[
    {id:"general-major-change", label:"立项、结/停题、重大变更", description:majorChangeDescription, steps:majorSteps("备案")},
    {id:"general-change", label:"一般变更", description:generalChangeDescription, steps:majorSteps("备案")}
  ]},
  {id:"major-project", label:"国药重大类别科研项目", children:[
    {id:"major-major-change", label:"立项、结/停题、重大变更", description:majorChangeDescription, steps:majorSteps("审批")},
    {id:"major-general-change", label:"一般变更", description:generalChangeDescription, steps:majorSteps("备案")}
  ]},
  {id:"capitalization", label:"科研费用资本化", steps:majorSteps()},
  {id:"clinical", label:"科研项目开展临床研究", children:[
    {id:"clinical-i", label:"启动Ⅰ期临床试验", steps:majorSteps("备案")},
    {id:"clinical-ii-iii", label:"启动Ⅱ期和Ⅲ期临床试验", children:[
      {id:"clinical-approval", label:"重大项目、非重大项目", description:"不含已上市血源类血液制品、不含增加适应症", steps:majorSteps("审批")},
      {id:"clinical-marketed", label:"非重大项目的已上市血源类血液制品、增加适应症", steps:majorSteps("备案")},
      {id:"clinical-other", label:"不在集团要求范围内的其他项目", steps:majorSteps("备案")}
    ]}
  ]}
];
