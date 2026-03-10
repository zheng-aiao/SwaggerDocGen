import { formatTime } from '@/utils/publicMethod'

export const formMode = {
  Insert: '新增',
  Update: '编辑',
  View: '查看',
  Delete: '删除'
}
export const themeEnum = {
  dark: 'dark',
  light: 'light'
}
export const themeColorMap = {
  color: '71, 164, 255'
}

export const listClassArr = [
  { label: 'biz-blue', listClass: 'biz-blue' },
  { label: 'biz-success', listClass: 'biz-success' },
  { label: 'biz-red', listClass: 'biz-red' },
  { label: 'biz-warning', listClass: 'biz-warning' },
  { label: 'biz-yellow', listClass: 'biz-yellow' },
  { label: 'biz-grey', listClass: 'biz-grey' }
]

export const dictFieldTypeArr = [
  { label: 'String', value: 'String' },
  { label: 'Number', value: 'Number' },
  { label: 'Boolean', value: 'Boolean' }
]

export const fileExtensionToMimeTypeMap = {
  // 文档文件
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  rtf: 'application/rtf',
  odt: 'application/vnd.oasis.opendocument.text',

  // 图片文件
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  bmp: 'image/bmp',
  svg: 'image/svg+xml',
  tiff: 'image/tiff',
  tif: 'image/tiff',
  webp: 'image/webp',

  // 音频文件
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  aac: 'audio/aac',
  flac: 'audio/flac',
  ogg: 'audio/ogg',

  // 视频文件
  mp4: 'video/mp4',
  avi: 'video/x-msvideo',
  mkv: 'video/x-matroska',
  mov: 'video/quicktime',
  wmv: 'video/x-ms-wmv',

  // 压缩文件
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
  '7z': 'application/x-7z-compressed',
  gz: 'application/gzip',
  tar: 'application/x-tar',

  // 表格文件
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',

  // 演示文稿文件
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  odp: 'application/vnd.oasis.opendocument.presentation',

  // 数据库文件
  mdb: 'application/vnd.ms-access',
  sql: 'application/sql',
  db: 'application/x-sqlite3',

  // 网页文件
  html: 'text/html',
  htm: 'text/html',
  css: 'text/css',
  js: 'text/javascript',

  // 代码文件
  c: 'text/x-c',
  cpp: 'text/x-c',
  java: 'text/x-java-source',
  py: 'text/x-python',
  php: 'text/x-php',

  // 配置文件
  ini: 'text/plain',
  json: 'application/json',
  xml: 'application/xml',
  yaml: 'text/x-yaml'
}

// 业务字典值映射
export const dictKeyMapper = {
  /** 公共基础 start *********************/
  sysDictWhether: 'sys_dict_whether', // 是否判断
  sysDictWhetherNumber: 'sys_dict_whether_number', // 是否判断
  sysDictWhetherBoolean: 'sys_dict_whether_boolean', // 字典是否
  sysDictWhetherReverse: 'sys_dict_whether_reverse', // 字典是否（字符串-相反版）
  sysDictWhetherNumberReverse: 'sys_dict_whether_number_reverse', //字典是否（number相反版）
  sysDictServiceType: 'sys_dict_service_type', // 字典服务分类
  sysDictStatus: 'sys_dict_status', // 字典状态
  sysAreaType: 'sys_area_type', // 区域类型
  sysSmsStatus: 'sys_dict_sms_status', // 短信状态
  sysHaveNot: 'sys_have_not', // 字典有无
  sysControlShowType: 'sys_control_show_type', // 通用化组件显示类型
  sysPassReject: 'sys_pass_reject', // 通过/驳回
  /** 安全基础 start *********************/
  sysEnterpriseEvaluateLevel: 'sys_enterprise_evaluate_level', //企业评价等级
  sysEnterpriseStatus: 'sys_enterprise_status', //企业状态
  sysEnterpriseType: 'sys_enterprise_type', //企业类型
  sysEnterpriseBusinessType: 'sys_enterprise_business_type', //企业经营二级分类
  sysEnterpriseImportType: 'sys_enterprise_import_type', //企业进口二级分类
  sysEnterpriseScale: 'sys_enterprise_scale', //企业规模
  sysEnterpriseSchedulingUserType: 'sys_enterprise_scheduling_user_type', // 企业排班-人员类型
  sysEnterpriseSchedulingOrgType: 'sys_enterprise_scheduling_org_type', // 企业排班-组织机构类型
  sysEnterpriseSchedulingOnJobStatus: 'sys_enterprise_scheduling_on_job_status', // 企业排班-在岗状态
  sysEnterpriseSafetyStandardGrade: 'sys_enterprise_safety_standard_grade', //企业安全生产标准化等级
  sysRiskLevel: 'sys_risk_level', //风险等级（包含未定级，用于列表）
  sysRiskLevelSelect: 'sys_risk_level_select', //风险等级2
  sysRiskLevelString: 'sys_risk_level_string', //风险等级（字符串）
  riskEventType: 'sys_risk_event_type', // 风险事件类型
  riskEventDamageMode: 'sys_risk_event_damage_mode', // 风险事件伤害方式类型
  sysManageOrgType: 'sys_manage_org_type', // 安全管理体系/园区机构 - 园区机构类型
  sysManagePoliceCategory: 'sys_manage_police_category', // 安全管理体系/管理制度 - 制度类型
  sysManagePoliceType: 'sys_manage_police_type', // 安全管理体系/管理制度 - 管理制度类型
  sysManagePoliceStatus: 'sys_manage_police_status', // 安全管理体系/管理制度 - 状态
  sysVehicleStartShutStatus: 'sys_vehicle_start_shut_status', // 安全管理体系/开停车大检修/开停车管理 - 状态
  sysVehicleStartShutCurrentStatus: 'sys_vehicle_start_shut_current_status', // 安全管理体系/开停车大检修/开停车管理 - 当前状态（开车 or 停车）
  sysVehicleStartShutWhetherRemove: 'sys_vehicle_start_shut_whether_remove', // 安全管理体系/开停车大检修/开停车管理  - 是否摘除联锁
  sysParkOtherPipeCategory: 'sys_park_other_pipeline_category', // 安全基础/园区其他/管道管网图 - 管道类别
  sysParkOtherPipeType: 'sys_park_other_pipeline_type', // 安全基础/园区其他/管道管网图 - 管道类型
  sysParkOtherWaterSourceType: 'sys_park_other_water_source_type', // 水安全基础 /园区其他 /供水信息 - 水源类型
  sysParkDetectionStationStatus: 'sys_park_detection_station_status', // 安全管理体系/园区设备/检测站 - 状态（启用 or 停用）
  sysParkDetectionStationControlLevel: 'sys_park_detection_station_control_level ', // 安全管理体系/园区设备/检测站 - 管控级别
  sysParkDetectionStationVerityType: 'sys_park_detection_station_verity_type ', // 安全管理体系/园区设备/检测站 - 校验类型
  sysParkAtmosphericDetectionStationType: 'sys_park_air_detection_station_type', // 安全管理体系/园区设备/大气检测站 - 站点类型
  sysParkWaterEnvironmentStationType: 'sys_park_water_environment_station_type', // 安全管理体系/园区设备/水环境检测站 -站点类型
  sysParkNoiseEnvironmentStationType: 'sys_park_noise_environment_station_type', // 安全管理体系/园区设备/噪音检测站 - 站点类型
  sysParkMobileMonitoringStationType: 'sys_park_mobile_monitoring_station_type', // 安全管理体系/园区设备/移动检测设备 - 站点类型
  sysRiskControlMeasuresDataSrc: 'sys_risk_control_measures_dataSrc', //风险管控措施-管控方式
  sysRiskControlMeasuresLevel: 'sys_risk_control_measures_level', //风险管控措施-管控级别
  sysRiskControlMeasuresClassify1: 'sys_risk_control_measures_classify1', //风险管控措施-一级分类
  sysSafeProductionProjectType: 'sys_safe_production_project_type', // 安全生产许可/建设项目三同时-项目类型
  sysSafeProductionProjectReviewState: 'sys_safe_production_project_review_state', // 安全生产许可/建设项目三同时-项目审核状态
  sysSafeProductionProjectStage: 'sys_safe_production_project_stage', // 安全生产许可/建设项目三同时-项目阶段
  sysSafeProductionProjectIsAudit: 'sys_safe_production_project_is_audit', // 安全生产许可/建设项目三同时-项目阶段
  sysSafeProductionCertificateReviewState: 'sys_safe_production_certificate_review_state', // 安全生产许可/危化品证书-证书审核状态
  sysSafeProductionCertificateType: 'sys_safe_production_certificate_type', // 安全生产许可/危化品证书-证书类型
  sysHazardInvestigationTaskWorkDayType: 'sys_hazard_investigation_task_workDayType', // 隐患排查任务-工作日类型
  sysHazardInvestigationTaskWorkType: 'sys_hazard_investigation_task_workType', // 隐患排查任务-工作类型
  sys_hazard_investigation_task_workType1: 'sys_hazard_investigation_task_workType-1', // 隐患排查任务-工作类型
  sys_hazard_investigation_task_workType2: 'sys_hazard_investigation_task_workType-2', // 隐患排查任务-工作类型
  sys_hazard_investigation_task_workType3: 'sys_hazard_investigation_task_workType-3', // 隐患排查任务-工作类型
  sysHazardInvestigationTaskInvestigationCycleUnit:
    'sys_hazard_investigation_task_investigationCycleUnit',
  sysHazardInvestigationInfoHazardLevel: 'sys_hazard_investigation_info_hazardLevel', // 隐患排查信息-隐患等级
  sysHazardInvestigationInfoHazardSrc: 'sys_hazard_investigation_info_hazardSrc', // 隐患排查信息-隐患来源
  sysHazardInvestigationInfoRectificationStatus:
    'sys_hazard_investigation_info_rectificationStatus', // 隐患排查信息-整改状态
  sysHazardInvestigationInfoOriginType: 'sys_hazard_investigation_info_originType', // 隐患排查信息-隐患标识
  sysHazardInvestigationInfoManagerType: 'sys_hazard_investigation_info_managerType', // 隐患排查信息-治理类型
  sysHazardInvestigationInfoHazardType: 'sys_hazard_investigation_info_hazardType', // 隐患排查信息-隐患类型
  sysHazardInvestigationInfoHazardCategory: 'sys_hazard_investigation_info_hazardCategory', // 隐患排查信息-隐患类型
  sysHazardInvestigationInfoSuperviseStatus: 'sys_hazard_investigation_info_superviseStatus', // 隐患排查信息-督办状态
  sysHazardInvestigationRecordCheckStatus: 'sys_hazard_investigation_record_checkStatus', // 隐患排查记录-排查结果
  sysDualPreventionEvaluationModelEresult: 'sys_dual_prevention_evaluation_model_eresult', // 双重预防-双预防建设机制-双预防评估模型-运行效果
  sysProhibitionAndRestrictionControlProductType:
    'sys_prohibition_and_restriction_control_productType', // 安全基础-基础信息-禁限控目录-产品类型
  sysProhibitionAndRestrictionControlCatalogType:
    'sys_prohibition_and_restriction_control_catalogType', // 安全基础-基础信息-禁限控目录-目录类型
  sysKeySupervisedProcessCraftType: 'sys_key_supervised_process_craftType', // 安全基础-基础信息-重点监管工艺-工艺类型
  sysKeySupervisedProcessUserType: 'sys_key_supervised_process_userType', // 安全基础-基础信息-重点监管工艺-人员类型
  sysPersonManageUserGender: 'sys_person_manage_userGender', // 安全基础-基础信息-人员管理-用户性别
  riskLevel: 'sys_risk_level', // 风险等级（列表）
  riskLevelSelect: 'sys_risk_level_select', // 风险等级
  sysChemicalCategory: 'sys_chemical_category', //化学品类型
  sysFunctionType: 'sys_function_type', //功能类型
  sysCaseType: 'sys_case_type', // 执法案件管理-案件类型
  sysCaseSource: 'sys_case_source', // 执法案件管理-案件来源
  sysRiskRank: 'sys_risk_rank', //风险分级
  sysLawCheckType: 'sys_law_check_type', // 执法检查-检查类型
  sysLawStatus: 'sys_law_status', // 执法检查-检查状态
  sysDocumentsTemplate: 'sys_documents_template', // 执法检查-文书模板
  sysEnforcementPlanType: 'sys_enforcement_plan_type', // 执法计划-检查类型
  sysEnforcementPlanStatus: 'sys_enforcement_plan_status', // 执法计划-检查状态
  sysDictWhetherEnforcement: 'sys_dict_whether_enforcement', // 是否判断(1,2版)安全基础-行政执法-执法计划
  sysTroubleLevel: 'sys_trouble_level', // 执法隐患-隐患级别
  sysTroubleStatus: 'sys_trouble_status', // 执法隐患-隐患状态
  sysTroubleTypes: 'sys_trouble_types', // 执法隐患-隐患类型
  sysmonth: 'sys_month', // 行政执法-检查标准-月份字典
  sysParkPlanInfoFile: 'sys_park_plan_info_file', // 安全基础-基础信息-园区规划信息-规划文件
  sysParkPlanInfoFileFolder: 'sys_park_plan_info_fileFolder', // 安全基础-基础信息-园区规划信息-规划文件目录
  sysAccidentEventsAccidentLevel: 'sys_accident_events_accidentLevel', // 安全基础-基础信息-企业事故事件-事故等级
  sysAccidentEventsAccidentSource: 'sys_accident_events_accidentSource', // 安全基础-基础信息-企业事故事件-事故来源
  sysAccidentEventsDispositionStatus: 'sys_accident_events_dispositionStatus', // 安全基础-基础信息-企业事故事件-处置状态
  sysAccidentEventsRegistrationStatus: 'sys_accident_events_registrationStatus', // 安全基础-基础信息-企业事故事件-上报状态
  sysMSDSDangerTag: 'sys_MSDS_danger_tag', // 安全基础-MSDS-危险类型标签
  sysRegionalAdoptType: 'sys_regional_adoptType', // 安全基础-园区布局-区域信息-车辆通行类型
  sysRegionalIsAdopt: 'sys_regional_isAdopt', // 安全基础-园区布局-区域信息-是否允许车辆通行类型
  sysEnterpriseClassificationControlLevel: 'sys_enterprise_classification_controlLevel', // 重大危险源-企业分类监管-管控级别
  sysUserStatus: 'sys_user_status', // 基础信息-人员管理-状态
  sysThreeEntryHazardInfoHazardLevel: 'sys_three_entry_hazard_level', // 三录入隐患信息-隐患级别
  sysThreeEntryHazardInfoHazardType: 'sys_three_entry_hazard_type', // 三录入隐患信息-隐患类型
  /** 特殊作业 start *********************/
  sysWorkStatus: 'sys_work_status', // 作业状态
  sysFireMode: 'sys_fire_mode', // 动火方式
  sysGasType: 'sys_gas_type', // 气体类型
  sysGasUnit: 'sys_gas_unit', // 气体单位
  sysSignType: 'sys_sign_type',
  sysWorkInspectionModelState: 'sys_work_inspection_model_state', //特殊作业模型状态
  sysWorkAlarmStatus: 'sys_work_alarm_status', // 特殊作业告警状态
  sysHazardCheckType: 'sys_hazard_check_type', //隐患检查类型
  sysThreeHazardRectificationStatus: 'sys_three_hazard_rectification_status', //隐患状态
  sysInspectionTaskType: 'sys_inspection_task_type', // 检查项任务类型
  sysWorkInspectionStatus: 'sys_work_inspection_status', // 特殊作业巡检状态
  sysWorkDeviceStatus: 'sys_work_device_status', // 作业设备状态
  sysWorkReportStatus: 'sys_work_report_status', // 作业报备状态
  sysWorkFeedbackType: 'sys_work_feedback_type', // 作业反馈类型
  sysPreventiveMeasure: 'sys_preventive_measure', // 危害辨识
  sysInvolvedType: 'sys_involved_type', // 是否涉及
  sysBlindPlateType: 'sys_blind_plate_type', // 盲板类型
  sysOverhaulLevel: 'sys_overhaul_level', // 检修等级
  sysUnitType: 'sys_unit_type', // 作业区划类别
  sysWorkPlanType: 'sys_work_plan_type', // 特殊作业-是否计划性
  /** 智能巡检 start *********************/
  sysInspectionType: 'sys_inspection_type', // 巡检类型
  sysInspectionCheckMethod: 'sys_inspection_check_method', // 巡检检查方式
  sysInspectionCheckStatus: 'sys_inspection_check_status', // 巡检检查状态
  sysInspectionCheckCategory: 'sys_inspection_check_category', // 巡检检查类别
  sysInspectionCheckFrequency: 'sys_inspection_check_frequency', // 巡检检查频次
  sysInspectionStatus: 'sys_inspection_status', // 巡检状态
  sysInspectionRectifyStatus: 'sys_inspection_rectify_status', // 巡检整改状态
  sysInspectionRiskLevel: 'sys_inspection_risk_level', // 巡检风险等级
  /** 在线监测 start *********************/
  sysAlarmType: 'sys_alarm_type', // 告警类型
  sysAlarmGrade: 'sys_alarm_grade', // 告警等级
  sysAlarmNoticPriority: 'sys_alarm_notic_priority', // 优先级
  sysAlarmNoticType: 'sys_alarm_notic_type', // 通知方式
  sysDeviceStatus: 'sys_device_status', // 设备状态
  sysAlarmStatus: 'sys_alarm_status', // 告警状态
  sysReasonStatus: 'sys_reason_status', // 原因状态
  /** 承包商  start  *********************/
  sysContractorBlacklist: 'sys_contractor_blacklist', // 承包商是否黑名单（状态）
  sysContractorCardtype: 'sys_contractor_cardtype', //承包商资质证件类型
  sysContractorReviewStatus: 'sys_contractor_review_status', //审核状态
  sysContractorRPType: 'sys_contractor_RP_type', //奖惩类型
  sysContractorPassStatus: 'sys_contractor_pass_status', //是否合格
  sysContractorPersonBlackList: 'sys_contractor_person_blacklist', //人员黑名单
  sysContractorAccidentType: 'sys_contractor_accident_type', //  事故类型
  /** 培训考核 start *********************/
  sysExamType: 'sys_exam_type', // 考试类型
  sysExamStatus: 'sys_exam_status', // 考试状态
  sysQuestionType: 'sys_question_type', // 题目类型
  sysPersonExamStatus: 'sys_person_exam_status', // 考试状态
  sysExamCondition: 'sys_exam_condition' // 考试条件
}

// 资源字典字典值映射
export const resourceMapper = {
  enterpriseEconomicType: 'enterpriseEconomicType', //企业经济类型
  cardType: 'personCardName', // 证件类型
  riskType: 'hidden', // 风险分类
  keyAreasProcessType: 'keyAreasProcessType', // 重点监管工艺工艺类型
  reactionType: 'reactionType', // 重点监管工艺反应类型
  materialForm: 'materialForm', // 重点监管工艺中间产品物质形态
  technicalSources: 'technicalSources', // 重点监管工艺技术来源
  trainingTicket: 'trainingTicket', // 培训考核分类
  event: 'event', // 突发事件
  contractorEvaluation: 'contractorEvaluation', //评价标准考核内容
  sensitivePointsType: 'sensitivePointsType', //园区布局-敏感点类型
  regionalPlanInfo: 'regionalPlanInfo', //区域规划-信息类型
  assessmentReportType: 'assessmentReportType' //园区其他-评价分析报告-报告类型
}

// 文件上传字典映射
export const fileUploadMapper = {
  SRM: 'srm', // SRM根目录
  STORAGE: 'storage', // 存储
  TEMP_FOLDER: 'temp_folder', // 临时文件夹，存储上传分析的excel文件，可清除
  DESTROY_MONITOR: 'destroy_monitor', // 破坏监测图片
  HIDDEN_DANGER: 'hidden_danger', // 隐患风险图片
  SIGNATURE: 'signature', // 电子签章
  COURSEWARE: 'courseware', // 培训考核课件
  LAY_REGULATION: 'lay_regulation', // 法律法规
  CONTRACTOR: 'contractor', // 第三方单位营业执照
  PARK_SECURITY_AREA: 'park_security_area', // 电子档案
  SPECIAL_WORK: 'special_work', // 特殊作业
  ALARM_REASON: 'alarm_reason', // 告警原因附件
  KEY_AREAS: 'key_areas', // 区域设备
  THREE_CARDS: 'three_cards', // 两单三卡
  TANK_FARM_MANAGEMENT: 'tank_farm_management', // 罐区管理
  RESERVOIR_MANAGEMENT: 'reservoir_management', // 库区管理
  MAJOR_HAZARD_SOURCES: 'major_hazard_sources', // 重大危险源
  DETECT_RECORD: 'detect_record', // 隐患排查记录
  PERSON_MANAGEMENT: 'person_management', // 人员管理附件
  ENTERPRISE_RECTIFICATION: 'enterprise_rectification', // 企业问题整改附件
  SAFETY_LABEL_SPECIFICATION: 'safety_label_specification', // 安全标签和说明书
  EQUIPMENT_FAULT: 'equipment_fault', // 设备故障文件
  EQUIPMENT_MAINTENANCE: 'equipment_maintenance', // 设备维养
  EQUIPMENT_INSPECTION: 'equipment_inspection', // 设备检验
  SPECIAL_EQUIPMENT: 'special_equipment', // 特种设备文件
  CONTRACTOR_PERSON: 'contractor_person', // 第三方单位人员证件
  SPECIAL_WORK_SIGNATURE: 'special_work_signature', // 特殊作业签字
  EDUCATION_PERSON: 'education_person', // 人员证件文件
  SIGN_IN_RECORD: 'sign_in_record', // 三级教育签到签退文件
  EDUCATION_REVIEW: 'education_review', // 三级教育审核人签字文件
  SAFETY_COMMOT: 'safety_commot', // 安全承诺签字
  EDUCATION_FEED: 'education_feed', // 教育反馈
  TRAINING_SYSTEM_EVALUATE: 'training_system_evaluate', // 人员评级
  OFFLINE_TRAINNING: 'offline_trainning', // 线下培训现场图片
  OFFLINE_QR_CODE: 'offline_qr_code', // 线下培训二维码图片
  OFFLINE_USER_SIGN: 'offline_user_sign', // 线下培训签到签字文件
  COVER_FILE: 'cover_file', // 培训体系封面图
  TRAINING_COURSE_COVER: 'training_course_cover', // 培训封面图
  DOCUMENTS: 'documents', // 执法文书
  LAW_ENFORCEMENT: 'law_enforcement', // 行政执法
  DANGER_RECTIFY: 'danger_rectify', // 隐患整改
  DANGER_RECORD: 'danger_record', // 隐患记录
  LICENSING_APPROVAL: 'licensing_approval', // 化工园区建设审批文件
  LICENSING_ANNOUNCEMENT: 'licensing_announcement', // 化工园区建设审批文件
  LICENSING_SANDING: 'licensing_sanding', // 当地人民政府明确承担园区安全生产和应管理职责机构的"三定"方案批复文件
  PARK_PLANNING_OVERALL: 'park_planning_overall', // 化工园区总体规划图
  PARK_PLANNING_SPACE: 'park_planning_space', // 化工园区所在地区国土空间规划图
  PARK_PLANNING_UPGRADE: 'park_planning_upgrade', // 化工园区转型升级发展规划图
  PARK_PLANNING_INDUSTRY: 'park_planning_industry', // 化工园区产业规划图
  PARK_PLANNING_SAFETY: 'park_planning_safety', // 化工园区安全发展规划图
  PARK_PLANNING_FIREFIGHTING: 'park_planning_firefighting', // 化工园区消防专项规划图
  PARK_PLANNING_TERRITORIAL: 'park_planning_territorial', // 国土规划文件
  PARK_PLANNING_TRANSFORMATION: 'park_planning_transformation', // 转型发展规划文件
  PARK_PLANNING_INDUSTRIAL_PLAN: 'park_planning_industrial_plan', // 产业规划文件
  PARK_PLANNING_SAFETY_DEVELOPMENT: 'park_planning_safety_development', // 安全发展规划文件
  PARK_PLANNING_FIRE_PROTECTION: 'park_planning_fire_protection', // 消防专项规划文件
  PARK_PLANNING_RECEIPT: 'park_planning_receipt', // 化工园区土地规划控制线报送和接收证明材料
  ANALYSIS_REPORT: 'analysis_report', // 评价分析报告
  PLAN_LAYOUT: 'plan_layout', // 平面布置
  INDUSTRY_GUIDELINES: 'industry_guidelines', // 产业指引
  GOVERNMENT: 'government', // 管理机构-红头文件
  MANAGEMENT_SYSTEM: 'management_system', // 管理制度-制度文件
  ADMINISTRATOR: 'administrator', // 管理人员-照片文件
  ENTERPRISE_VIEW: 'enterprise_view', // 企业平面图
  ENTERPRISE_CERTIFICATE: 'enterprise_certificate', // 企业证书
  ENTERPRISE_ASSESSMENT_REPORT: 'enterprise_assessment_report', // 企业评价报告
  ENTERPRISE_MANAGEMENT_CERT: 'enterprise_management_cert', // 企业管理体系认证
  PROJECT_THREE_SIMULTANEOUS: 'project_three_simultaneous', // 建设项目三同时
  PARKING_MANAGE_FILE: 'parking_manage_file', // 开停车管理-应急预案
  SERVICE_FILE: 'service_file', // 三方单位-服务记录文件
  DANGER_RECTIFICATION: 'danger_rectification', // 检查项
  CONTRACTOR_PROJECT: 'contractor_project', // 承包商文件
  INTELLIGENT_INSPECTION: 'intelligent_inspection' // 智能巡检
}

// 系统数据来源接口
export const SYSTEM_DATA_SOURCE = {
  // 短信通知
  smsNotice: {
    service: 'srmAbsBiz',
    urlName: 'getSmsPage',
    tableColumns: [
      { label: '通知内容', prop: 'content' },
      { label: '通知时间', prop: 'createTime' },
      { label: '通知方式', prop: 'areaTypeName' },
      { label: '通知人', prop: 'recipient' },
      { label: '通知结果', prop: 'state' }
    ]
  },
  // 区域管理
  areaManage: {
    service: 'srmAbsBiz',
    urlName: 'getAreaPage',
    tableColumns: [
      { label: '区域名称', prop: 'name' },
      { label: '所属区划', prop: 'areaName' },
      { label: '区域类型', prop: 'areaTypeName' }
    ]
  },
  // 风险分级对象
  hazardApplication: {
    service: 'srmSebsBiz',
    urlName: 'paginateRiskObjects',
    tableColumns: [
      { label: '名称', prop: 'name' },
      { label: '类型', prop: 'typeName' },
      { label: '地址', prop: 'address' }
    ]
  },
  // 风险分析单元
  hazardUnit: {
    service: 'srmSebsBiz',
    urlName: 'paginateRiskUnits',
    tableColumns: [
      { label: '名称', prop: 'riskUnitName' },
      { label: '分类', prop: 'typeName' },
      { label: '责任人', prop: 'hazardLiablePerson' }
    ]
  },
  // 风险事件
  riskEvent: {
    service: 'srmSebsBiz',
    urlName: 'queryRiskEventsByPage',
    tableColumns: [
      { label: '事件名称', prop: 'riskEventName' },
      { label: '所属区划', prop: 'areaName' },
      { label: '类别', prop: 'hazardEventType' },
      { label: '伤害方式', prop: 'damageWay' }
    ]
  },
  // 管控措施
  controlMeasure: {
    service: 'srmSebsBiz',
    urlName: 'queryControlMeasuresByPage',
    tableColumns: [
      { label: '管控措施', prop: 'riskMeasureDesc' },
      {
        label: '管控方式',
        prop: 'dataSrc',
        type: 'dict',
        dictKey: dictKeyMapper.sysRiskControlMeasuresDataSrc
      },
      {
        label: '级别',
        prop: 'level',
        type: 'dict',
        dictKey: dictKeyMapper.sysRiskControlMeasuresLevel
      },
      {
        label: '分类',
        prop: 'classify1',
        type: 'dict',
        dictKey: dictKeyMapper.sysRiskControlMeasuresClassify1
      },
      {
        label: '管控方式',
        prop: 'dataSrc',
        type: 'dict',
        dictKey: dictKeyMapper.sysRiskControlMeasuresDataSrc
      },
      {
        label: '级别',
        prop: 'level',
        type: 'dict',
        dictKey: dictKeyMapper.sysRiskControlMeasuresLevel
      },
      {
        label: '分类',
        prop: 'classify1',
        type: 'dict',
        dictKey: dictKeyMapper.sysRiskControlMeasuresClassify1
      },
      { label: '排查内容', prop: 'troubleShootContent' }
    ]
  },
  // 巡检点
  inspectionPoint: {
    service: 'srmIlsBiz',
    urlName: 'searchInspectionPoints',
    tableColumns: [
      { label: '巡检点名称', prop: 'name' },
      { label: '区域', prop: 'areaName' }
    ]
  },
  // 监测设备
  monitoringEquipment: {
    service: 'srmAbsBiz',
    urlName: 'getAreaTerminalsPage',
    tableColumns: [
      { label: '设备名称', prop: 'terminalsName' },
      { label: '设备类型', prop: 'typeName' }
    ]
  },
  // 监测设备
  areaMonitoringEquipment: {
    service: 'srmAbsBiz',
    urlName: 'getAreaAssociatedTerminalsPage',
    tableColumns: [
      { label: '设备名称', prop: 'terminalsName' },
      { label: '设备类型', prop: 'typeName' }
    ]
  },
  monitorDeviceRegion: {
    service: 'srmAbsBiz',
    urlName: 'getAreaPage',
    tableColumns: [
      { label: '区域名称', prop: 'name' },
      { label: '地址', prop: 'address' },
      { label: '所属区划', prop: 'areaName' }
    ]
  },
  // 项目阶段信息-安全预评价报告
  fullPreEvaluationReport: {
    service: 'srmSebsBiz',
    urlName: 'queryAssessmentReportByPage',
    tableColumns: [
      { label: '报告名称', prop: 'reportName' },
      { label: '所属区划', prop: 'areaName' },
      { label: '编制单位', prop: 'compiledUnit' },
      { label: '编制日期', prop: 'hazardFacilityName' },
      { label: '项目负责人', prop: 'responsiblePerson' }
    ]
  },
  // 管理人员 -> 园区机构
  manageParkOrgs: {
    service: 'srmSebsBiz',
    urlName: 'queryManagementOrgsByPage',
    tableColumns: [
      { label: '上级机构名称', prop: 'nameOfSuperiorOrg' },
      { label: '机构名称', prop: 'institutionName' },
      { label: '管理职责', prop: 'managementDuty' }
    ]
  },
  // 作业列表
  workList: {
    service: 'srmDwsBiz',
    urlName: 'aiWorkPage',
    tableColumns: [
      { label: '作业名称', prop: 'workName' },
      { label: '作业类型', prop: 'workTypeName' },
      { label: '作业时间', prop: 'workStartTime', format: (value) => formatTime(value) },
      { label: '作业部门', prop: 'workDepartment' }
    ]
  },
  // 气体库
  gasLibrary: {
    service: 'srmDwsBiz',
    urlName: 'queryCommonGasesByPage',
    tableColumns: [
      { label: '气体名称', prop: 'name' },
      {
        label: '气体类型',
        prop: 'type',
        type: 'dict',
        dictKey: dictKeyMapper.sysGasType
      },
      { label: '合格标准', prop: 'confinedWorkDensity' }
    ]
  },
  // 作业设备列表
  workDeviceList: {
    service: 'srmDwsBiz',
    urlName: 'pageDeviceInfo',
    tableColumns: [
      { label: '设备名称', prop: 'deviceName' },
      { label: '设备编号', prop: 'deviceCode' },
      {
        label: '设备状态',
        prop: 'deviceStatus',
        type: 'dict',
        dictKey: dictKeyMapper.sysWorkDeviceStatus
      }
    ]
  },
  // 视频识别模型
  workVideoModel: {
    service: 'srmDwsBiz',
    urlName: 'getVideoModel',
    tableColumns: [{ label: '模型名称', prop: 'aiModelName' }]
  },
  // 数据监测模型
  workDataModel: {
    service: 'srmDwsBiz',
    urlName: 'getDataModel',
    tableColumns: [
      { label: '模型名称', prop: 'modelName' },
      { label: '下限', prop: 'minValue', format: (value, row) => value + row.unit },
      { label: '上限', prop: 'maxValue', format: (value, row) => value + row.unit }
    ]
  },
  // 重大危险源
  majorHazard: {
    service: 'srmSebsBiz',
    urlName: 'queryMajorHazardSourcesByPage',
    tableColumns: [
      { label: '名称', prop: 'hazardName' },
      {
        label: '类型',
        prop: 'hazardFacility',
        type: 'dict',
        dictKey: dictKeyMapper.sysAreaType
      },
      {
        label: '级别',
        prop: 'riskWarningLevel',
        type: 'dict',
        dictKey: dictKeyMapper.sysRiskLevelString
      }
    ]
  },
  // 行政执法-执法计划-执法检查单位
  enforcementUnit: {
    service: 'srmSebsBiz',
    urlName: 'queryManagementOrgsByPage',
    tableColumns: [
      { label: '机构名称', prop: 'institutionName' },
      { label: '编制人数', prop: 'numberOfStaffMembers' },
      { label: '上级组织名称', prop: 'nameOfSuperiorOrg' }
    ]
  },
  // 行政执法-执法计划-关联检查表
  enforcementUnitRelated: {
    service: 'srmSebsBiz',
    urlName: 'getLawStandardContentPage',
    tableColumns: [
      { label: '检查表名称', prop: 'name' },
      { label: '是否通用', prop: 'currency', format: (value) => (value ? '是' : '否') },
      {
        label: '适用月份',
        prop: 'month',
        format: (currency, item) =>
          item.currency ? '全年' : item.month ? item.month.toString() : ''
      }
    ]
  },
  //  执法检查-文书模板
  checkDocTemplate: {
    service: 'srmSebsBiz',
    urlName: 'queryDocumentTemplatesByCondition',
    tableColumns: [
      { label: '名称', prop: 'title' },
      { label: '备案号', prop: 'recordCode' }
    ]
  },
  //  执法检查-执法计划
  checkLawPlans: {
    service: 'srmSebsBiz',
    urlName: 'queryLawEnforcementPlansByPage',
    tableColumns: [
      { label: '计划名称', prop: 'title' },
      { label: '检查单位', prop: 'enforcementUnitInfo.institutionName' },
      {
        label: '计划类型',
        prop: 'enforcementType',
        type: 'dict',
        dictKey: dictKeyMapper.sysEnforcementPlanType
      },
      {
        label: '检查状态',
        prop: 'lawEnTaskStatus',
        type: 'dict',
        dictKey: dictKeyMapper.sysEnforcementPlanStatus
      },
      { label: '发起人姓名', prop: 'initiatorName' },
      { label: '发起时间', prop: 'initiatorTime' }
    ]
  },
  // 执法检查-执法人员
  checkLawPerson: {
    service: 'srmSebsBiz',
    urlName: 'queryLawEnforcersByPage',
    tableColumns: [
      { label: '执法人员姓名', prop: 'personName' },
      { label: '执法部门', prop: 'unit' },
      { label: '职务', prop: 'job' },
      { label: '执法证号', prop: 'lawEnforcementNumber' }
    ]
  },
  // 检查表-选择检查标准
  inspectionStandard: {
    service: 'srmSebsBiz',
    urlName: 'queryLawStandardsByPage',
    tableColumns: [
      { label: '标准名称', prop: 'name' },
      { label: '是否通用', prop: 'currency', format: (value) => (value ? '是' : '否') },
      {
        label: '适用月份',
        prop: 'month',
        format: (currency, item) =>
          item.currency ? '全年' : item.month ? item.month.toString() : ''
      },
      { label: '是否必查', prop: 'mustChecked', format: (value) => (value ? '是' : '否') }
    ]
  },
  // 巡检项
  inspectionItems: {
    service: 'srmSebsBiz',
    urlName: 'queryCheckItemsByPage',
    tableColumns: [
      { label: '检查名称', prop: 'checkName' },
      { label: '检查任务', prop: 'taskName' },
      { label: '检查内容', prop: 'checkContent' },
      { label: '检查方式', prop: 'checkWay' }
    ]
  },
  chemicalsData: {
    service: 'srmSebsBiz',
    urlName: 'listChemicalBasicAll',
    tableColumns: [
      { label: '名称', prop: 'name' },
      { label: '别名', prop: 'alias' },
      { label: 'CAS号', prop: 'casNum' }
    ]
  }, //危化品名称

  /* ********************* 承包商模块 start *********************/
  // 承包商信息
  contractor: {
    service: 'srmCtsBiz',
    urlName: 'getContractorPageListByQuery',
    tableColumns: [
      { label: '承包商名称', prop: 'name' },
      { label: '经营能力', prop: 'operatingCapacity' },
      { label: '主要负责人', prop: 'representative' }
    ]
  },
  //   承包商人员信息
  contractorPerson: {
    service: 'srmCtsBiz',
    urlName: 'getBasicPersonnelPageList',
    tableColumns: [
      { label: '姓名', prop: 'name' },
      { label: '承包商名称', prop: 'contractor' },
      { label: '电话', prop: 'phone' }
    ]
  },
  // 诚信规则（评价标准）
  contractorEvaluationStandard: {
    service: 'srmCtsBiz',
    urlName: 'getContractorEvaluationStandardPageList',
    tableColumns: [{ label: '规则名称', prop: 'name' }]
  },
  // 承包商黑名单记录
  contractorBlacklistPageList: {
    service: 'srmCtsBiz',
    urlName: 'getContractorBlacklistPageList',
    tableColumns: [
      { label: '拉黑原因', prop: 'reason' },
      { label: '拉黑起始日期', prop: 'startDate', type: 'date' },
      { label: '拉黑结束日期', prop: 'endDate', type: 'date' },
      { label: '拉黑天数', prop: 'days' },
      { label: '拉黑状态', prop: 'status' },
      { label: '拉黑状态', prop: 'status' }
    ]
  },
  // 支持过滤的区域管理
  filterAreaManage: {
    service: 'srmSebsBiz',
    urlName: 'getAreaFilterPage',
    tableColumns: [
      { label: '区域名称', prop: 'name' },
      { label: '区域面积', prop: 'regionalArea' },
      { label: '负责人', prop: 'directorName' }
    ]
  },
  // 评估报告
  evaluationReport: {
    service: 'srmSebsBiz',
    urlName: 'queryAssessmentReportByPage',
    tableColumns: [
      { label: '报告名称', prop: 'reportName' },
      { label: '编制单位', prop: 'compiledUnit' },
      { label: '编制时间', prop: 'compiledDate' },
      { label: '项目负责人', prop: 'responsiblePerson' }
    ]
  },
  // 检查项
  inspectionTask: {
    service: 'srmSebsBiz',
    urlName: 'queryInspectionTasksByPage',
    tableColumns: [
      { label: '任务名称', prop: 'taskName' },
      { label: '任务开始时间', prop: 'taskStartTime' },
      { label: '任务结束时间', prop: 'taskEndTime' },
      {
        label: '任务类型',
        prop: 'taskType',
        type: 'dict',
        dictKey: dictKeyMapper.sysInspectionTaskType
      }
    ]
  },
  //   执法检查记录
  lawEnforcementInspectionRecord: {
    service: 'srmSebsBiz',
    urlName: 'queryLawInspectionsPage',
    tableColumns: [
      { label: '检查标题', prop: 'title' },
      { label: '排查区划', prop: 'areaName' }
    ]
  },
  //   执法隐患
  lawEnforcementDangers: {
    service: 'srmSebsBiz',
    urlName: 'getLawDangersByPage',
    tableColumns: [
      { label: '隐患标题', prop: 'name' },
      { label: '排查区划', prop: 'areaName' }
    ]
  },
  //   执法人员
  lawEnforcementPersonnel: {
    service: 'srmSebsBiz',
    urlName: 'queryLawEnforcersByPage',
    tableColumns: [
      { label: '姓名', prop: 'personName' },
      { label: '执法部门', prop: 'unit' },
      { label: '职务', prop: 'job' },
      { label: '执法证号', prop: 'lawEnforcementNumber' }
    ]
  },
  //   文件列表（fss）
  getFiles: {
    service: 'fssBiz',
    urlName: 'getFiles',
    tableColumns: [
      { label: '文件名称', prop: 'name' },
      { label: '上传时间', prop: 'uploadTime' }
    ]
  },
  // 重大危险源
  hazardCheckRecord: {
    service: 'srmSebsBiz',
    urlName: 'queryHazardDetectionRecordsByPage',
    tableColumns: [
      { label: '排查内容', prop: 'checkTask.troubleShootContent' },
      {
        label: '任务周期',
        prop: 'checkTask.checkCycle',
        format: (value, row) => value + row.checkTask.checkCycleUnit
      },
      { label: '排查时间', prop: 'checkTime' }
    ]
  }, // 隐患排查记录
  hazardDetectionInfo: {
    service: 'srmSebsBiz',
    urlName: 'queryHazardDetectionInfoByPage',
    tableColumns: [
      { label: '隐患名称', prop: 'dangerName' },
      {
        label: '隐患等级',
        prop: 'dangerLevel',
        type: 'dict',
        dictKey: dictKeyMapper.sysHazardInvestigationInfoHazardLevel
      },
      {
        label: '隐患状态',
        prop: 'dangerState',
        type: 'dict',
        dictKey: dictKeyMapper.sysHazardInvestigationInfoRectificationStatus
      }
    ]
  }, // 隐患排查任务
  hazardDetectionTask: {
    service: 'srmSebsBiz',
    urlName: 'queryHazardDetectionTasksByPage',
    tableColumns: [
      { label: '排查内容', prop: 'troubleShootContent' },
      {
        label: '任务类型',
        prop: 'workType',
        type: 'dict',
        dictKey: dictKeyMapper.sysHazardInvestigationTaskWorkType
      },
      { label: '开始时间', prop: 'workStartTime', type: 'time' },
      { label: '结束时间', prop: 'workEndTime', type: 'time' }
    ]
  },
  //  题目管理
  questionList: {
    service: 'srmStsBiz',
    urlName: 'getQuestionBankByCategoryAndPage',
    tableColumns: [
      { label: '题干', prop: 'questionStem' },
      { label: '分类', prop: 'typeName' },
      { label: '题型', prop: 'quType', type: 'dict', dictKey: dictKeyMapper.sysQuestionType }
    ]
  },
  // 课程列表
  courseList: {
    service: 'srmStsBiz',
    urlName: 'getCoursesByCondition',
    tableColumns: [
      { label: '课程名称', prop: 'name' },
      { label: '课程分类', prop: 'typeName' },
      { label: '内容时长', prop: 'courseMinutes' }
    ]
  },
  // 未被绑定过的考试列表
  examList: {
    service: 'srmStsBiz',
    urlName: 'getUnboundExaminationPage',
    tableColumns: [
      { label: '题干', prop: 'title' },
      {
        label: '考试时间',
        prop: 'examinationTimeStr',
        format: (value, row) => {
          if (value === 0 && row.examinationTimeEnd === 9999999999999) {
            return '--'
          } else {
            if (value === 1) {
              return '永久'
            } else if (value !== 1 && row.examinationTimeEnd === 9999999999999) {
              return formatTime(value) + '-- 永久'
            } else if (value !== 1 && row.examinationTimeEnd !== 9999999999999) {
              return formatTime(value) + '--' + formatTime(row.examinationTimeEnd)
            }
          }
        }
      },
      {
        label: '考试时长',
        prop: 'limitTime',
        format: (value, row) => {
          const hours = Math.floor(value / 60)
          const minutes = value % 60
          return (
            (hours >= 10 ? hours : '0' + hours) +
            ':' +
            (minutes >= 10 ? minutes : '0' + minutes) +
            ':' +
            '00'
          )
        }
      },
      {
        label: '及格分/总分',
        prop: 'passScore',
        format: (value, row) => value + '/' + row.totalScore
      }
    ]
  },
  planList: {
    service: 'srmStsBiz',
    urlName: 'trainingPlanList',
    tableColumns: [
      { label: '计划名称', prop: 'name' },
      { label: '计划分类', prop: 'typeName' },
      {
        label: '计划时间',
        prop: 'startTime',
        format: (value, row) =>
          formatTime(row.startTime, 'YYYY/MM/DD') + '-' + formatTime(row.endTime, 'YYYY/MM/DD')
      }
    ]
  },
  enterpriseList: {
    service: 'gdsBiz',
    urlName: 'searchFacilitiesWithPermissionV2', // 数据请求
    tableColumns: [
      { label: '企业名称', prop: 'dynamicExtension.name' },
      { label: '企业编码', prop: 'dynamicExtension.address-areaCode' },
      { label: '企业负责人', prop: 'dynamicExtension.contact' },
      { label: '负责人手机号', prop: 'dynamicExtension.ipPhone' }
    ],
    echoUrlName: 'getFacilitiesByIds' //回显请求
  },
  //园区布局-区域信息
  regionalInfo: {
    service: 'srmSebsBiz',
    urlName: 'queryParkRegionalInfoByPage',
    tableColumns: [
      { label: '区域名称', prop: 'name' },
      { label: '管理人员', prop: 'administrator' },
      { label: '地址', prop: 'address' }
    ]
  },
  hazardousChemicals: {
    service: 'srmSebsBiz',
    urlName: 'queryEnterpriseHazardousChemicalsByPage',
    tableColumns: [
      { label: '危化品名称', prop: 'chemicalName' },
      { label: 'cas号', prop: 'cas' },
      { label: '分类', prop: 'chemicalTypeName' }
    ]
  }
}
