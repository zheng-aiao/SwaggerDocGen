const otherRoutesConfig = {
  irs: {
    useIframe: false, // 作业巡检默认使用component的配置;改为true时嵌入iframe，使用下面配置的地址
    workList: ':10052/specialWorkInspection/workList?isHiddenHeader=true&isHiddenMenu=true',
    modelConfig: ':10052/specialWorkInspection/modelConfig?isHiddenHeader=true&isHiddenMenu=true',
    deviceBinding:
      ':10052/specialWorkInspection/deviceBinding?isHiddenHeader=true&isHiddenMenu=true',
    workAlarm: ':10052/specialWorkInspection/workAlarm?isHiddenHeader=true&isHiddenMenu=true',
    modelManagement:
      ':10052/specialWorkInspection/modelManagement?isHiddenHeader=true&isHiddenMenu=true'
  }
}
window.globalSrmRoutesConfig = [
  // 安全基础
  {
    path: '/safeManage',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/safeManage/basicInfo',
    meta: { title: '安全基础', authCode: '500001' },
    children: [
      // 基础信息
      {
        path: 'basicInfo',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/safeManage/basicInfo/statistics',
        meta: { title: '基础信息', authCode: '500001001', icon: '&#xe74e;' },
        children: [
          {
            path: 'statistics',
            component: 'views/safeManage/basicInfo/statistics/Index.vue',
            meta: { title: '园区信息统计', authCode: '500001001001' }
          },
          {
            path: 'parkBaseInfo',
            component: 'views/safeManage/basicInfo/parkBaseInfo/Index.vue',
            meta: { title: '园区基本信息', authCode: '500001001002' }
          },
          {
            path: 'parkPlanInfo',
            component: 'views/safeManage/basicInfo/parkPlanInfo/Index.vue',
            meta: { title: '园区规划信息', authCode: '500001001003' }
          },
          {
            path: 'prohibitionAndRestrictionControl',
            component: 'views/safeManage/basicInfo/prohibitionAndRestrictionControl/Index.vue',
            meta: { title: '禁限控目录', authCode: '500001001004' }
          },
          {
            path: 'archives',
            component: 'views/safeManage/basicInfo/archivesIndex/Index.vue',
            meta: { title: '一企一档', authCode: '500001001005' }
          },
          {
            path: 'corporatePortrait',
            component: 'views/safeManage/basicInfo/corporatePortrait/Index.vue',
            meta: { title: '企业画像', authCode: '500001001006' }
          },
          {
            path: 'licensing',
            component: 'views/safeManage/basicInfo/licensing/Index.vue',
            meta: { title: '行政许可', authCode: '500001001007' }
          },
          {
            path: 'majorHazardSources',
            component: 'views/disaste/twoFocusOneMajor/majorHazardSource/Index.vue',
            meta: { title: '重大危险源', authCode: '500001001008' }
          },
          {
            path: 'productionCraft',
            component: 'views/disaste/twoFocusOneMajor/keySupervisedProcess/Index.vue',
            meta: { title: '重点监管工艺', authCode: '500001001009' }
          },
          {
            path: 'dangerousChemical',
            component: 'views/disaste/twoFocusOneMajor/keySupervisedChemicals/Index.vue',
            meta: { title: '重点监管危化品', authCode: '500001001010' }
          },
          {
            path: 'regionManage',
            component: 'views/safeManage/basicInfo/regionManage/Index.vue',
            meta: { title: '区域管理', authCode: '500001001011' },
            operations: [
              { name: '新增', key: 'add' },
              { name: '修改', key: 'edit' },
              { name: '删除', key: 'del' },
              { name: '详情', key: 'details' }
            ]
          },
          {
            path: 'personManage',
            component: 'views/safeManage/basicInfo/personManage/Index.vue',
            meta: { title: '人员管理', authCode: '500001001012' }
          },
          {
            path: 'scheduling',
            component: 'views/safeManage/basicInfo/scheduling/Index.vue',
            meta: { title: '企业排班', authCode: '500001001013' }
          },
          {
            path: 'accidentEvents',
            component: 'views/safeManage/basicInfo/accidentEvents/Index.vue',
            meta: { title: '企业事故事件', authCode: '500001001014' }
          },
          {
            path: 'evaluationReport',
            component: 'views/safeManage/basicInfo/evaluationReport/Index.vue',
            meta: { title: '评价报告', authCode: '500001001015' }
          }
        ]
      },
      // 安全管理体系
      {
        path: 'safetyManagementSystem',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/safeManage/safetyManagementSystem/organizations',
        meta: { title: '安全管理体系', authCode: '500001002', icon: '&#xe75d;' },
        children: [
          {
            path: 'organizations',
            component: 'views/safeManage/safetyManagementSystem/organizations/Index.vue',
            meta: { title: '园区机构', authCode: '500001002001' }
          },
          {
            path: 'policies',
            component: 'views/safeManage/safetyManagementSystem/policies/Index.vue',
            meta: { title: '管理制度', authCode: '500001002002' }
          },
          {
            path: 'personnel',
            component: 'views/safeManage/safetyManagementSystem/personnel/Index.vue',
            meta: { title: '管理人员', authCode: '500001002003' }
          }
        ]
      },
      // 安全生产许可
      {
        path: 'safetyProductionLicense',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/safeManage/safetyProductionLicense/constructionProject',
        meta: { title: '安全生产许可', authCode: '500001003', icon: '&#xe75e;' },
        children: [
          {
            path: 'constructionProject',
            component: 'views/safeManage/safetyProductionLicense/constructionProject/Index.vue',
            meta: { title: '建设项目三同时', authCode: '500001003001' }
          },
          {
            path: 'hazardousChemicalsLicense',
            component:
              'views/safeManage/safetyProductionLicense/hazardousChemicalsLicense/Index.vue',
            meta: { title: '危化品许可证', authCode: '500001003002' }
          },
          {
            path: 'constructionProjectStatistics',
            component:
              'views/safeManage/safetyProductionLicense/constructionProjectStatistics/Index.vue',
            meta: { title: '建设项目统计', authCode: '500001003003' }
          },
          {
            path: 'auditProcessConfig',
            component: 'views/safeManage/safetyProductionLicense/auditProcessConfig/Index.vue',
            meta: { title: '审核流程配置', authCode: '500001003004' }
          }
        ]
      },
      // 开停车和大检修
      {
        path: 'plantOperation',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/safeManage/plantOperation/startupShutdownManagement',
        meta: { title: '开停车和大检修', authCode: '500001004', icon: '&#xe743;' },
        children: [
          {
            path: 'startupShutdownManagement',
            component: 'views/safeManage/plantOperation/startupShutdownManagement/Index.vue',
            meta: { title: '开停车管理', authCode: '500001004001' }
          },
          {
            path: 'majorMaintenanceManagement',
            component: 'views/safeManage/plantOperation/majorMaintenanceManagement/Index.vue',
            meta: { title: '大检修管理', authCode: '500001004002' }
          },
          {
            path: 'startupShutdownStatistics',
            component: 'views/safeManage/plantOperation/startupShutdownStatistics/Index.vue',
            meta: { title: '开停车统计分析', authCode: '500001004003' }
          }
        ]
      },
      // 行政执法
      {
        path: 'administrativeEnforcement',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/safeManage/administrativeEnforcement/enforcementPlan',
        meta: { title: '行政执法', authCode: '500001005', icon: '&#xe72c;' },
        children: [
          {
            path: 'enforcementPlan',
            component: 'views/safeManage/administrativeEnforcement/enforcementPlan/Index.vue',
            meta: { title: '执法计划', authCode: '500001005001' }
          },
          {
            path: 'enforcementInspection',
            component: 'views/safeManage/administrativeEnforcement/enforcementInspection/Index.vue',
            meta: { title: '执法检查', authCode: '500001005002' }
          },
          {
            path: 'enforcementHazard',
            component: 'views/safeManage/administrativeEnforcement/enforcementHazard/Index.vue',
            meta: { title: '执法隐患', authCode: '500001005003' }
          },
          {
            path: 'enforcementPersonnel',
            component: 'views/safeManage/administrativeEnforcement/enforcementPersonnel/Index.vue',
            meta: { title: '执法人员', authCode: '500001005004' }
          },
          {
            path: 'inspectionStandard',
            component: 'views/safeManage/administrativeEnforcement/inspectionStandard/Index.vue',
            meta: { title: '检查标准', authCode: '500001005005' }
          },
          {
            path: 'inspectionForm',
            component: 'views/safeManage/administrativeEnforcement/inspectionForm/Index.vue',
            meta: { title: '检查表', authCode: '500001005006' }
          },
          {
            path: 'documentTemplate',
            component: 'views/safeManage/administrativeEnforcement/documentTemplate/Index.vue',
            meta: { title: '文书模板', authCode: '500001005007' }
          },
          {
            path: 'documentRecordManagement',
            component:
              'views/safeManage/administrativeEnforcement/documentRecordManagement/Index.vue',
            meta: { title: '文书记录管理', authCode: '500001005008' }
          },
          {
            path: 'enforcementCaseManagement',
            component:
              'views/safeManage/administrativeEnforcement/enforcementCaseManagement/Index.vue',
            meta: { title: '执法案件管理', authCode: '500001005009' }
          },
          {
            path: 'legalDocument',
            component: 'views/safeManage/administrativeEnforcement/legalDocument/Index.vue',
            meta: { title: '法律文件', authCode: '500001005010' }
          },
          {
            path: 'lawsRegulationsStandards',
            component:
              'views/safeManage/administrativeEnforcement/lawsRegulationsStandards/Index.vue',
            meta: { title: '法律法规标准', authCode: '500001005011' }
          },
          {
            path: 'typicalEnforcementCase',
            component:
              'views/safeManage/administrativeEnforcement/typicalEnforcementCase/Index.vue',
            meta: { title: '典型执法案例', authCode: '500001005012' }
          },
          {
            path: 'statisticalAnalysis',
            component: 'views/safeManage/administrativeEnforcement/statisticalAnalysis/Index.vue',
            meta: { title: '统计分析', authCode: '500001005013' }
          }
        ]
      },
      // 园区布局
      {
        path: 'parkLayout',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/safeManage/parkLayout/regionInfo',
        meta: { title: '园区布局', authCode: '500001006', icon: '&#xe724;' },
        children: [
          {
            path: 'regionInfo',
            component: 'views/safeManage/parkLayout/regionInfo/Index.vue',
            meta: { title: '区域信息', authCode: '500001006001' }
          },
          {
            path: 'regionPlanning',
            component: 'views/safeManage/parkLayout/regionPlanning/Index.vue',
            meta: { title: '区域规划', authCode: '500001006002' }
          },
          {
            path: 'sensitivePoint',
            component: 'views/safeManage/parkLayout/sensitivePoint/Index.vue',
            meta: { title: '敏感点', authCode: '500001006003' }
          }
        ]
      },
      // 园区其他
      {
        path: 'parkOther',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/safeManage/parkOther/evaluationAnalysisReport',
        meta: { title: '园区其他', authCode: '500001007', icon: '&#xe728;' },
        children: [
          {
            path: 'evaluationAnalysisReport',
            component: 'views/safeManage/parkOther/evaluationAnalysisReport/Index.vue',
            meta: { title: '评价分析报告', authCode: '500001007001' }
          },
          {
            path: 'layoutPlan',
            component: 'views/safeManage/parkOther/layoutPlan/Index.vue',
            meta: { title: '平面布置', authCode: '500001007002' }
          },
          {
            path: 'industryGuidance',
            component: 'views/safeManage/parkOther/industryGuidance/Index.vue',
            meta: { title: '产业指引', authCode: '500001007003' }
          },
          {
            path: 'powerSupplyInfo',
            component: 'views/safeManage/parkOther/powerSupplyInfo/Index.vue',
            meta: { title: '供电信息', authCode: '500001007004' }
          },
          {
            path: 'heatingInfo',
            component: 'views/safeManage/parkOther/heatingInfo/Index.vue',
            meta: { title: '供热信息', authCode: '500001007005' }
          },
          {
            path: 'waterSupplyInfo',
            component: 'views/safeManage/parkOther/waterSupplyInfo/Index.vue',
            meta: { title: '供水信息', authCode: '500001007006' }
          },
          {
            path: 'gasSupplyInfo',
            component: 'views/safeManage/parkOther/gasSupplyInfo/Index.vue',
            meta: { title: '供气信息', authCode: '500001007007' }
          },
          {
            path: 'pipelineNetworkDiagram',
            component: 'views/safeManage/parkOther/pipelineNetworkDiagram/Index.vue',
            meta: { title: '管道管网图', authCode: '500001007008' }
          },
          {
            path: 'solidHazardousWasteCenter',
            component: 'views/safeManage/parkOther/solidHazardousWasteCenter/Index.vue',
            meta: { title: '固危废处理中心', authCode: '500001007009' }
          },
          {
            path: 'trainingCenter',
            component: 'views/safeManage/parkOther/trainingCenter/Index.vue',
            meta: { title: '实训中心', authCode: '500001007010' }
          },
          {
            path: 'waterIntakeWharf',
            component: 'views/safeManage/parkOther/waterIntakeWharf/Index.vue',
            meta: { title: '取水码头', authCode: '500001007011' }
          },
          {
            path: 'specialServiceStation',
            component: 'views/safeManage/parkOther/specialServiceStation/Index.vue',
            meta: { title: '特勤站', authCode: '500001007012' }
          }
        ]
      },
      // 园区设备
      {
        path: 'parkEquipment',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/safeManage/parkEquipment/safetyMonitoringEquipment',
        meta: { title: '园区设备', authCode: '500001008', icon: '&#xe71a;' },
        children: [
          {
            path: 'safetyMonitoringEquipment',
            component: 'views/safeManage/parkEquipment/safetyMonitoringEquipment/Index.vue',
            meta: { title: '安全监控设备', authCode: '500001008001' }
          },
          {
            path: 'atmosphericMonitoringStation',
            component: 'views/safeManage/parkEquipment/atmosphericMonitoringStation/Index.vue',
            meta: { title: '大气监测站', authCode: '500001008002' }
          },
          {
            path: 'waterEnvironmentMonitoringStation',
            component: 'views/safeManage/parkEquipment/waterEnvironmentMonitoringStation/Index.vue',
            meta: { title: '水环境监测站', authCode: '500001008003' }
          },
          {
            path: 'noiseMonitoringStation',
            component: 'views/safeManage/parkEquipment/noiseMonitoringStation/Index.vue',
            meta: { title: '噪音监测站', authCode: '500001008004' }
          },
          {
            path: 'mobileMonitoringEquipment',
            component: 'views/safeManage/parkEquipment/mobileMonitoringEquipment/Index.vue',
            meta: { title: '移动监测设备', authCode: '500001008005' }
          }
        ]
      }
    ]
  },
  // 重大危险源
  {
    path: '/disaste',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/disaste/hazardSourceStatistics',
    meta: { title: '重大危险源', authCode: '500002' },
    children: [
      {
        path: 'hazardSourceStatistics',
        component: 'views/disaste/hazardSourceStatistics/Index.vue',
        meta: { title: '危险源统计', authCode: '500002001', icon: '&#xe72e;' }
      },
      {
        path: 'safetyCommitment',
        component: 'views/disaste/safetyCommitment/Index.vue',
        meta: { title: '安全承诺', authCode: '500002002', icon: '&#xe760;' }
      },
      {
        path: 'regionManagement',
        component: 'views/safeManage/basicInfo/regionManage/Index.vue',
        meta: { title: '区域管理', authCode: '500002003', icon: '&#xe762;' }
      },
      {
        path: 'twoFocusOneMajor',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/disaste/twoFocusOneMajor/majorHazardSource',
        meta: { title: '两重点一重大', authCode: '500002004', icon: '&#xe73c;' },
        children: [
          {
            path: 'majorHazardSource',
            component: 'views/disaste/twoFocusOneMajor/majorHazardSource/Index.vue',
            meta: { title: '重大危险源', authCode: '500002004001' }
          },
          {
            path: 'keySupervisedProcess',
            component: 'views/disaste/twoFocusOneMajor/keySupervisedProcess/Index.vue',
            meta: { title: '重点监管工艺', authCode: '500002004002' }
          },
          {
            path: 'keySupervisedChemicals',
            component: 'views/disaste/twoFocusOneMajor/keySupervisedChemicals/Index.vue',
            meta: { title: '重点监管危化品', authCode: '500002004003' }
          },
          {
            path: 'msds',
            component: 'views/disaste/twoFocusOneMajor/msds/Index.vue',
            meta: { title: 'MSDS', authCode: '500002004004' }
          }
        ]
      },
      {
        path: 'responsibilitySystem',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/disaste/responsibilitySystem/responsibilityPerformance',
        meta: { title: '包保责任制', authCode: '500002005', icon: '&#xe75a;' },
        children: [
          {
            path: 'responsibilityPerformance',
            component: 'views/disaste/responsibilitySystem/responsibilityPerformance/Index.vue',
            meta: { title: '包保责任履职情况', authCode: '500002005001' }
          },
          {
            path: 'performanceStatistics',
            component: 'views/disaste/responsibilitySystem/performanceStatistics/Index.vue',
            meta: { title: '履职统计', authCode: '500002005002' }
          }
        ]
      },
      {
        path: 'evaluationReport',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/disaste/evaluationReport/evaluationReportList',
        meta: { title: '评价评估报告', authCode: '500002006', icon: '&#xe761;' },
        children: [
          {
            path: 'evaluationReportList',
            component: 'views/disaste/evaluationReport/evaluationReportList/Index.vue',
            meta: { title: '评价评估报告', authCode: '500002006001' }
          },
          {
            path: 'threeEntryInspectionTask',
            component: 'views/disaste/evaluationReport/threeEntryInspectionTask/Index.vue',
            meta: { title: '"三录入"检查任务', authCode: '500002006002' }
          },
          {
            path: 'inspectionItem',
            component: 'views/disaste/evaluationReport/inspectionItem/Index.vue',
            meta: { title: '检查项', authCode: '500002006003' }
          },
          {
            path: 'scoringRules',
            component: 'views/disaste/evaluationReport/scoringRules/Index.vue',
            meta: { title: '评分细则', authCode: '500002006004' }
          },
          {
            path: 'threeEntryHazardInfo',
            component: 'views/disaste/evaluationReport/threeEntryHazardInfo/Index.vue',
            meta: { title: '"三录入"隐患信息', authCode: '500002006005' }
          },
          {
            path: 'hazardRectification',
            component: 'views/preventDanger/hazardInvestigation/hazardRectification/Index.vue',
            meta: { title: '隐患整改', authCode: '500002006006' }
          }
        ]
      },
      {
        path: 'enterpriseClassification',
        component: 'views/disaste/enterpriseClassification/Index.vue',
        meta: { title: '企业分类监管', authCode: '500002007', icon: '&#xe72d;' }
      }
    ]
  },
  // 双重预防
  {
    path: '/preventDanger',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/preventDanger/dualPreventionMechanism',
    meta: { title: '双重预防', authCode: '500003' },
    children: [
      {
        path: 'dualPreventionMechanism',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/preventDanger/dualPreventionMechanism/riskRegion',
        meta: { title: '双预防建设机制', authCode: '500003001', icon: '&#xe72f;' },
        children: [
          {
            path: 'riskRegion',
            component: 'views/safeManage/basicInfo/regionManage/Index.vue',
            meta: { title: '风险区域', authCode: '500003001001' }
          },
          {
            path: 'riskGradingObject',
            component: 'views/preventDanger/dualPreventionMechanism/riskGradingObject/Index.vue',
            meta: { title: '风险分级对象', authCode: '500003001002' }
          },
          {
            path: 'riskAnalysisUnit',
            component: 'views/preventDanger/dualPreventionMechanism/riskAnalysisUnit/Index.vue',
            meta: { title: '风险分析单元', authCode: '500003001003' }
          },
          {
            path: 'riskGradingEvent',
            component: 'views/preventDanger/dualPreventionMechanism/riskGradingEvent/Index.vue',
            meta: { title: '风险分级事件', authCode: '500003001004' }
          },
          {
            path: 'riskControlMeasures',
            component: 'views/preventDanger/dualPreventionMechanism/riskControlMeasures/Index.vue',
            meta: { title: '风险管控措施', authCode: '500003001005' }
          },
          {
            path: 'hazardInvestigationList',
            component:
              'views/preventDanger/dualPreventionMechanism/hazardInvestigationList/Index.vue',
            meta: { title: '隐患排查清单', authCode: '500003001006' }
          },
          {
            path: 'riskGradingControlList',
            component:
              'views/preventDanger/dualPreventionMechanism/riskGradingControlList/Index.vue',
            meta: { title: '风险分级管控清单', authCode: '500003001007' }
          },
          {
            path: 'dualPreventionEvaluationModel',
            component:
              'views/preventDanger/dualPreventionMechanism/dualPreventionEvaluationModel/Index.vue',
            meta: { title: '双预防评估模型', authCode: '500003001008' }
          }
        ]
      },
      {
        path: 'hazardInvestigation',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/preventDanger/hazardInvestigation/investigationTask',
        meta: { title: '隐患排查', authCode: '500003002', icon: '&#xe710;' },
        children: [
          {
            path: 'investigationTask',
            component: 'views/preventDanger/hazardInvestigation/investigationTask/Index.vue',
            meta: { title: '隐患排查任务', authCode: '500003002001' }
          },
          {
            path: 'investigationRecord',
            component: 'views/preventDanger/hazardInvestigation/investigationRecord/Index.vue',
            meta: { title: '隐患排查记录', authCode: '500003002002' }
          },
          {
            path: 'investigationInfo',
            component: 'views/preventDanger/hazardInvestigation/investigationInfo/Index.vue',
            meta: { title: '隐患排查信息', authCode: '500003002003' }
          },
          {
            path: 'hazardRectification',
            component: 'views/preventDanger/hazardInvestigation/hazardRectification/Index.vue',
            meta: { title: '隐患整改', authCode: '500003002004' }
          },
          {
            path: 'rectificationSupervision',
            component: 'views/preventDanger/hazardInvestigation/rectificationSupervision/Index.vue',
            meta: { title: '整改督办', authCode: '500003002005' }
          }
        ]
      },
      {
        path: 'dualPreventionSampling',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/preventDanger/dualPreventionSampling/riskStatistics',
        meta: { title: '双预防建设抽检', authCode: '500003003', icon: '&#xe723;' },
        children: [
          {
            path: 'riskStatistics',
            component: 'views/preventDanger/dualPreventionSampling/riskStatistics/Index.vue',
            meta: { title: '风险统计', authCode: '500003003001' }
          },
          {
            path: 'hazardStatistics',
            component: 'views/preventDanger/dualPreventionSampling/hazardStatistics/Index.vue',
            meta: { title: '隐患统计', authCode: '500003003002' }
          },
          {
            path: 'smsRecord',
            component: 'views/preventDanger/dualPreventionSampling/smsRecord/Index.vue',
            meta: { title: '短信记录', authCode: '500003003003' }
          }
        ]
      }
    ]
  },
  // 特殊作业
  {
    path: '/operation',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/operation/workStatistics',
    meta: { title: '特殊作业', authCode: '500004' },
    children: [
      {
        path: 'yqworkStatistics',
        component: 'views/operation/yqworkStatistics/Index.vue',
        meta: { title: '作业统计', authCode: '500004009', icon: '&#xe70a;' }
      },
      {
        path: 'workReport',
        component: 'views/operation/workReport/Index.vue',
        meta: { title: '作业报备', authCode: '500004010', icon: '&#xe711;' }
      },
      {
        path: 'qyworkStatistics',
        component: 'views/operation/qyworkStatistics/Index.vue',
        meta: { title: '作业统计', authCode: '500004001', icon: '&#xe70a;' }
      },
      {
        path: 'workList',
        component: 'views/operation/workList/Index.vue',
        meta: { title: '作业列表', authCode: '500004002', icon: '&#xe717;' }
      },
      {
        path: 'appointmentWork',
        component: 'views/operation/appointmentWork/Index.vue',
        meta: { title: '预约作业', authCode: '500004003', icon: '&#xe709;' }
      },
      {
        path: 'workApplication',
        component: 'views/operation/workApplication/Index.vue',
        meta: { title: '作业申请', authCode: '500004004', icon: '&#xe70b;' }
      },
      {
        path: 'workSignature',
        component: 'views/operation/workSignature/Index.vue',
        meta: { title: '作业签字', authCode: '500004005', icon: '&#xe716;' }
      },
      {
        path: 'onSiteWork',
        component: 'views/operation/onSiteWork/Index.vue',
        meta: { title: '现场作业', authCode: '500004006', icon: '&#xe720;' }
      },
      {
        path: 'archivedWork',
        component: 'views/operation/archivedWork/Index.vue',
        meta: { title: '归档作业', authCode: '500004007', icon: '&#xe737;' }
      },
      {
        path: 'workConfig',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/operation/workConfig/gasLibrary',
        meta: { title: '作业配置', authCode: '500004008', icon: '&#xe715;' },
        children: [
          {
            path: 'gasLibrary',
            component: 'views/operation/workConfig/gasLibrary/Index.vue',
            meta: { title: '气体库', authCode: '500004008001' }
          },
          {
            path: 'personnelCertificate',
            component: 'views/operation/workConfig/personnelCertificate/Index.vue',
            meta: { title: '人员证件', authCode: '500004008002' }
          },
          {
            path: 'safetyMeasures',
            component: 'views/operation/workConfig/safetyMeasures/Index.vue',
            meta: { title: '安全措施', authCode: '500004008003' }
          },
          {
            path: 'workConfigSettings',
            component: 'views/operation/workConfig/workConfigSettings/Index.vue',
            meta: { title: '作业配置', authCode: '500004008004' }
          }
        ]
      }
    ]
  },
  // 特殊作业巡检
  {
    path: '/specialWorkInspection',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/specialWorkInspection/workList',
    meta: { title: '特殊作业巡检', authCode: '800', icon: '&#xe731;' },
    children: [
      {
        path: 'workList',
        meta: {
          title: '作业列表',
          authCode: '800001',
          query: {
            baseUrl: otherRoutesConfig.irs.useIframe ? otherRoutesConfig.irs.workList : '',
            type: 'IRS_workList',
            link: false,
            notPreload: false
          }
        },
        component: 'views/operation/specialWorkInspection/workList/Index.vue'
      },
      {
        path: 'modelConfig',
        meta: {
          title: '模型配置',
          authCode: '800002',
          query: {
            baseUrl: otherRoutesConfig.irs.useIframe ? otherRoutesConfig.irs.modelConfig : '',
            type: 'IRS_modelConfig',
            link: false,
            notPreload: false
          }
        },
        component: 'views/operation/specialWorkInspection/modelConfig/Index.vue'
      },
      {
        path: 'deviceBinding',
        meta: {
          title: '设备绑定',
          authCode: '800003',
          query: {
            baseUrl: otherRoutesConfig.irs.useIframe ? otherRoutesConfig.irs.deviceBinding : '',
            type: 'IRS_deviceBinding',
            link: false,
            notPreload: false
          }
        },
        component: 'views/operation/specialWorkInspection/deviceBinding/Index.vue'
      },
      {
        path: 'workAlarm',
        meta: {
          title: '作业告警',
          authCode: '800004',
          query: {
            baseUrl: otherRoutesConfig.irs.useIframe ? otherRoutesConfig.irs.workAlarm : '',
            type: 'IRS_workAlarm',
            link: false,
            notPreload: false
          }
        },
        component: 'views/operation/specialWorkInspection/workAlarm/Index.vue'
      },
      {
        path: 'modelManagement',
        meta: {
          title: '模型管理',
          authCode: '800005',
          query: {
            baseUrl: otherRoutesConfig.irs.useIframe ? otherRoutesConfig.irs.modelManagement : '',
            type: 'IRS_modelManagement',
            link: false,
            notPreload: false
          }
        },
        component: 'views/operation/specialWorkInspection/modelManagement/Index.vue'
      }
    ]
  },
  // 在线监测
  {
    path: '/monitor',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/monitor/deviceManagement',
    meta: { title: '在线监测', authCode: '500005', icon: '&#xe69e;' },
    children: [
      {
        path: 'deviceManagement',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/monitor/deviceManagement/monitorDevice',
        meta: { title: '设备管理', authCode: '500005001', icon: '&#xe722;' },
        children: [
          {
            path: 'monitorDevice',
            component: 'views/monitor/deviceManagement/monitorDevice/Index.vue',
            meta: { title: '监测设备', authCode: '500005001001' }
          },
          {
            path: 'monitorPoint',
            component: 'views/monitor/deviceManagement/monitorPoint/Index.vue',
            meta: { title: '监测点位', authCode: '500005001002' }
          }
        ]
      },
      {
        path: 'deviceAlarm',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/monitor/deviceAlarm/monitorAlarm',
        meta: { title: '设备告警', authCode: '500005002', icon: '&#xe733;' },
        children: [
          {
            path: 'monitorAlarm',
            component: 'views/monitor/deviceAlarm/monitorAlarm/Index.vue',
            meta: { title: '监测告警', authCode: '500005002001' }
          },
          {
            path: 'alarmStatistics',
            component: 'views/monitor/deviceAlarm/alarmStatistics/Index.vue',
            meta: { title: '告警统计', authCode: '500005002002' }
          }
        ]
      },
      {
        path: 'alarmNotification',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/monitor/alarmNotification/notificationConfig',
        meta: { title: '告警通知', authCode: '500005003', icon: '&#xe746;' },
        children: [
          {
            path: 'notificationConfig',
            component: 'views/monitor/alarmNotification/notificationConfig/Index.vue',
            meta: { title: '通知配置', authCode: '500005003001' }
          },
          {
            path: 'notificationRecord',
            component: 'views/monitor/alarmNotification/notificationRecord/Index.vue',
            meta: { title: '通知记录', authCode: '500005003002' }
          }
        ]
      }
    ]
  },
  // 承包商管理
  {
    path: '/contractor',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/contractor/contractorInfo',
    meta: { title: '承包商管理', authCode: '500006' },
    children: [
      {
        path: 'contractorInfo',
        component: 'views/contractor/contractorInfo/Index.vue',
        meta: { title: '承包商信息', authCode: '500006001', icon: '&#xe756;' }
      },
      {
        path: 'contractProject',
        component: 'views/contractor/contractProject/Index.vue',
        meta: { title: '承包商项目', authCode: '500006002', icon: '&#xe750;' }
      },
      {
        path: 'qualificationManagement',
        component: 'views/contractor/qualificationManagement/Index.vue',
        meta: { title: '资质管理', authCode: '500006003', icon: '&#xe714;' }
      },
      {
        path: 'personnelInfo',
        component: 'views/contractor/personnelInfo/Index.vue',
        meta: { title: '人员信息', authCode: '500006004', icon: '&#xe742;' }
      },
      {
        path: 'equipmentManagement',
        component: 'views/contractor/equipmentManagement/Index.vue',
        meta: { title: '器具管理', authCode: '500006005', icon: '&#xe73b;' }
      },
      {
        path: 'accidentInfo',
        component: 'views/contractor/accidentInfo/Index.vue',
        meta: { title: '事故信息', authCode: '500006006', icon: '&#xe739;' }
      },
      {
        path: 'rewardPunishmentManagement',
        component: 'views/contractor/rewardPunishmentManagement/Index.vue',
        meta: { title: '奖惩管理', authCode: '500006007', icon: '&#xe734;' }
      },
      {
        path: 'evaluationStandard',
        component: 'views/contractor/evaluationStandard/Index.vue',
        meta: { title: '评价标准', authCode: '500006008', icon: '&#xe73e;' }
      },
      {
        path: 'evaluationManagement',
        component: 'views/contractor/evaluationManagement/Index.vue',
        meta: { title: '评价管理', authCode: '500006009', icon: '&#xe738;' }
      },
      {
        path: 'personnelBlacklist',
        component: 'views/contractor/personnelBlacklist/Index.vue',
        meta: { title: '人员黑名单', authCode: '500006010', icon: '&#xe735;' }
      }
    ]
  },
  // 智能巡检
  {
    path: '/inspection',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/inspection/inspectionStatistics',
    meta: { title: '智能巡检', authCode: '500007', icon: '&#xe69e;' },
    children: [
      {
        path: 'inspectionStatistics',
        component: 'views/inspection/inspectionStatistics/Index.vue',
        meta: { title: '巡检统计', authCode: '500007001', icon: '&#xe71b;' }
      },
      {
        path: 'inspectionPlan',
        component: 'views/inspection/inspectionPlan/Index.vue',
        meta: { title: '巡检计划', authCode: '500007002', icon: '&#xe70e;' }
      },
      {
        path: 'inspectionTask',
        component: 'views/inspection/inspectionTask/Index.vue',
        meta: { title: '巡检任务', authCode: '500007003', icon: '&#xe744;' }
      },
      {
        path: 'abnormalRecord',
        component: 'views/inspection/abnormalRecord/Index.vue',
        meta: { title: '异常记录', authCode: '500007004', icon: '&#xe713;' }
      },
      {
        path: 'inspectionPointConfig',
        component: 'views/inspection/inspectionPointConfig/Index.vue',
        meta: { title: '巡检点配置', authCode: '500007005', icon: '&#xe727;' }
      },
      {
        path: 'inspectionGeneralConfig',
        component: 'views/inspection/inspectionGeneralConfig/Index.vue',
        meta: { title: '巡检通用化配置', authCode: '500007006', icon: '&#xe712;' }
      }
    ]
  },
  // 培训考核
  {
    path: '/training',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/training/onlineStudy/courseList',
    meta: { title: '培训考核', authCode: '500008', icon: '&#xe69e;' },
    children: [
      {
        path: 'onlineStudy',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/training/onlineStudy/courseList',
        meta: { title: '在线学习', authCode: '500008001', icon: '&#xe718;' },
        children: [
          {
            path: 'courseList',
            component: 'views/training/onlineStudy/courseList/Index.vue',
            meta: { title: '课程列表', authCode: '500008001001' }
          },
          {
            path: 'plannedStudy',
            component: 'views/training/onlineStudy/plannedStudy/Index.vue',
            meta: { title: '计划学习', authCode: '500008001002' }
          }
        ]
      },
      {
        path: 'liveCourse',
        component: 'views/training/liveCourse/Index.vue',
        meta: { title: '直播课', authCode: '500008002', icon: '&#xe721', showDEV: true }
      },
      {
        path: 'examManagement',
        component: 'views/training/examManagement/Index.vue',
        meta: { title: '考试管理', authCode: '500008003', icon: '&#xe74d;' }
      },
      {
        path: 'questionBankManagement',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/training/questionBankManagement/questionManagement',
        meta: { title: '题库管理', authCode: '500008004', icon: '&#xe71d;' },
        children: [
          {
            path: 'questionManagement',
            component: 'views/training/questionBankManagement/questionManagement/Index.vue',
            meta: { title: '题目管理', authCode: '500008004001' }
          },
          {
            path: 'testPaperManagement',
            component: 'views/training/questionBankManagement/testPaperManagement/Index.vue',
            meta: { title: '试卷库管理', authCode: '500008004002' }
          }
        ]
      },
      {
        path: 'categoryManagement',
        component: 'views/training/categoryManagement/Index.vue',
        meta: { title: '分类管理', authCode: '500008005', icon: '&#xe703;' }
      }
    ]
  },
  {
    // 系统维护
    path: '/system',
    component: 'vue/layout/ChildLayout.vue',
    redirect: '/system/dictManagement',
    meta: { title: '系统维护', authCode: '500009', icon: '&#xe83b;' },
    children: [
      {
        path: 'dictManagement',
        component: 'views/system/dictManagement/Index.vue',
        meta: { title: '资源字典', authCode: '500009001', icon: '&#xe6e3;' }
      },
      {
        path: 'sysDict',
        component: 'views/system/sysDict/Index.vue',
        meta: { title: '业务字典', authCode: '500009002', icon: '&#xe6df;' }
      },
      {
        path: 'development',
        component: 'vue/layout/ChildLayout.vue',
        redirect: '/system/development/demo',
        meta: { title: '开发demo', icon: '&#xe820;', showDEV: true },
        children: [
          {
            path: 'demo',
            component: 'views/demo/Index.vue',
            meta: { title: '组件模板', icon: '&#xe69e;' }
          },
          {
            path: 'IconPreview',
            component: 'views/demo/IconPreview.vue',
            meta: { title: '图标库', icon: '&#xe69e;' }
          },
          {
            path: 'layoutDemo',
            component: 'views/demo/LayoutDemo.vue',
            meta: { title: '左右布局模板', icon: '&#xe69e;' }
          }
        ]
      }
    ]
  }
]
