export const URL_PREFIX_ABS = '/srm/abs/api/api'
export const URL_PREFIX_SEBS = '/srm/sebs/api/api'
export const URL_PREFIX_DWS = '/srm/dws/api/api'
export const URL_PREFIX_STS = '/srm/sts/api/api'
export const URL_PREFIX_OLMS = '/srm/olms/api/api'
export const URL_PREFIX_ILS = '/srm/ils/api/api'
export const URL_PREFIX_CTS = '/srm/cts/api/api'

export const URL_DOWNLOAD = {
  RESOURCE_CLASSIFY: `${URL_PREFIX_ABS}/v2/resourceClassify/downloadTemplate`, // 字典
  HAZARD_MEASURE: `${URL_PREFIX_SEBS}/v2/hazard/measure/downloadExcel`, // 风险管控措施
  HAZARD_UNIT: `${URL_PREFIX_SEBS}/v2/hazard/downloadExcel`, // 风险单元
  HAZARD_EVENT: `${URL_PREFIX_SEBS}/v2/hazard/event/downloadExcel`, // 风险事件
  ENTERPRISE_DUTY: `${URL_PREFIX_SEBS}/v2/enterprise/duty_info/downloadTemplate`, // 企业排班
  DOCUMENT_RECORD: `${URL_PREFIX_SEBS}/v2/documentsRecord/downloadDocx`, // 文书记录
  TRAINING_CENTER: `${URL_PREFIX_SEBS}/v2/training/center/exportDataFile`, // 实训中心
  WATER_INTAKE: `${URL_PREFIX_SEBS}/v2/intake/wharf/exportDataFile`, // 取水码头
  GAS_SUPPLY: `${URL_PREFIX_SEBS}/v2/gas/supply/info/exportDataFile`, // 供气信息
  PIPELINE_NETWORK_DIAGRAM: `${URL_PREFIX_SEBS}/v2/pipe/net/diagram/exportDataFile`, // 管道管网图
  WATER_SUPPLY: `${URL_PREFIX_SEBS}/v2/water/supply/info/exportDataFile`, // 供水信息
  POWER_SUPPLY: `${URL_PREFIX_SEBS}/v2/power/supply/info/exportDataFile`, // 供电信息
  HEATING_SUPPLY: `${URL_PREFIX_SEBS}/v2/heat/supply/info/downloadExcel`, // 供热信息
  SOLID_HAZARDOUS_WASTE: `${URL_PREFIX_SEBS}/v2/shwt/center/downloadExcel`, // 固危废处理中心
  SAFETY_MONITORING_EQUIPMENT: `${URL_PREFIX_SEBS}/v2/safety/monitoring/equipment/downloadExcel`, // 安全监控设备
  AIR_MONITORING_STATION: `${URL_PREFIX_SEBS}/v2/air/monitoring/station/downloadExcel`, // 大气监测站
  WATER_ENV_MONITORING_STATION: `${URL_PREFIX_SEBS}/v2/water/env/monitoring/station/downloadExcel`, // 水环境监测站
  NOISE_MONITORING_STATION: `${URL_PREFIX_SEBS}/v2/noise/monitoring/station/downloadExcel`, // 噪音监测站
  MOBILE_MONITORING_DEVICE: `${URL_PREFIX_SEBS}/v2/mobile/monitoring/device/downloadExcel`, // 移动监测设备
  SECRET_SERVICE_STATION: `${URL_PREFIX_SEBS}/v2/secret/service/station/downloadExcel`, // 特勤站
  QUESTION_WORD: `${URL_PREFIX_STS}/v2/question/downloadWordTemplate`, // 试题文档模板
  QUESTION_EXCEL: `${URL_PREFIX_STS}/v2/question/downloadTemplate`, // 试题表格模板
  CONTRACTOR_APPLIANCE: `${URL_PREFIX_CTS}/v2/toolManage/downloadExcel`, // 承包商器具管理
  WORK_REPORT: `${URL_PREFIX_DWS}/v2/special/ticket/downloadTemplate`, // 作业报备
  SPECIAL_WORK_TICKET: (id) => `${URL_PREFIX_DWS}/v2/specialWork/exportSpecial/${id}`, // 作业票下载
  EXPORT_SIGN_USERS: (id) => `${URL_PREFIX_DWS}/v2/reservationSpecialWork/download/${id}` // 导出签字人员
}

export const URL_EXPORT = {
  RESOURCE_CLASSIFY: `${URL_PREFIX_ABS}/v2/resourceClassify/exportDataFile?source=`, // 字典数据导出
  ENTERPRISE_DUTY: `${URL_PREFIX_SEBS}/v2/enterprise/duty_info/exportDutyInfoDataFile`, // 企业排班导出
  TRAINING_CENTER: `${URL_PREFIX_SEBS}/v2/training/center/exportDataFile`, // 实训中心数据导出
  WATER_INTAKE: `${URL_PREFIX_SEBS}/v2/intake/wharf/exportDataFile`, // 取水码头数据导出
  GAS_SUPPLY: `${URL_PREFIX_SEBS}/v2/gas/supply/info/exportDataFile`, // 供气信息导出
  PIPELINE_NETWORK_DIAGRAM: `${URL_PREFIX_SEBS}/v2/pipe/net/diagram/exportDataFile`, // 管道管网图导出
  WATER_SUPPLY: `${URL_PREFIX_SEBS}/v2/water/supply/info/exportDataFile`, // 供水信息导出
  POWER_SUPPLY: `${URL_PREFIX_SEBS}/v2/power/supply/info/exportDataFile`, // 供电信息导出
  HEATING_SUPPLY: `${URL_PREFIX_SEBS}/v2/heat/supply/info/exportDataFile`, // 供热信息导出
  SOLID_HAZARDOUS_WASTE: `${URL_PREFIX_SEBS}/v2/shwt/center/exportDataFile`, // 固危废处理中心导出
  SECRET_SERVICE_STATION: `${URL_PREFIX_SEBS}/v2/secret/service/station/exportDataFile`, // 特勤站数据导出
  SAFETY_MONITORING_EQUIPMENT: `${URL_PREFIX_SEBS}/v2/safety/monitoring/equipment/exportDataFile`, // 安全监控设备导出
  AIR_MONITORING_STATION: `${URL_PREFIX_SEBS}/v2/air/monitoring/station/exportDataFile`, // 大气监测站导出
  WATER_ENV_MONITORING_STATION: `${URL_PREFIX_SEBS}/v2/water/env/monitoring/station/exportDataFile`, // 水环境监测站导出
  NOISE_MONITORING_STATION: `${URL_PREFIX_SEBS}/v2/noise/monitoring/station/exportDataFile`, // 噪音监测站导出
  MOBILE_MONITORING_DEVICE: `${URL_PREFIX_SEBS}/v2/mobile/monitoring/device/exportDataFile`, // 移动监测设备导出
  HAZARD_MEASURE: `${URL_PREFIX_SEBS}/v2/hazard/measure/exportDataFile`, // 风险管控措施导出
  HAZARD_UNIT: `${URL_PREFIX_SEBS}/v2/hazard/exportDataFile`, // 风险单元导出
  HAZARD_EVENT: `${URL_PREFIX_SEBS}/v2/hazard/event/exportDataFile`, // 风险事件导出
  CONTRACTOR_CARD: `${URL_PREFIX_CTS}/v2/contractorCard/download`, // 承包商资质导出
  CONTRACTOR: `${URL_PREFIX_CTS}/v2/contractor/download`, // 承包商信息导出
  WORK_REPORT: `${URL_PREFIX_DWS}/v2/special/ticket/exportDataFile` // 作业报备导出
}

/**
 * URL_IMPORT
 * @param {service}  - 导入数据所对应对应服务
 * @param {verifyFn} - 校验表格请求方法
 * @param {errorFn} - 下载错误文件请求方法名
 * @param {importFn} - 导入数据请求方法
 */
export const URL_IMPORT = {
  // 资源字典
  RESOURCE_CLASSIFY: {
    service: 'srmAbsBiz',
    verifyFn: 'uploadResourceClassifyExcelForAnalysis',
    errorFn: 'downloadResourceErrorFile',
    importFn: 'importResourceClassifyExcelData'
  },
  // 实训中心数据导入
  TRAINING_CENTER: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzeTrainingCenterFile',
    errorFn: 'downloadTrainingCenterErrorFile',
    importFn: 'importTrainingCenterData'
  },
  // 取水码头数据导入
  WATER_INTAKE: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzeWaterIntakeWharfFile',
    errorFn: 'downloadWaterIntakeWharfErrorFile',
    importFn: 'importWaterIntakeWharfsFromExcel'
  },
  // 供气信息导入
  GAS_SUPPLY: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzeGasSupplyFile',
    errorFn: 'downloadErrorPromptFile',
    importFn: 'importGasSupplyInfoFromExcel'
  },
  // 管道管网图导入
  PIPELINE_NETWORK_DIAGRAM: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadPipelineDiagramForAnalysis',
    errorFn: 'downloadPipeNetDiagramErrorFile',
    importFn: 'importPipelineNetworkDiagramsFromExcel'
  },
  // 供水信息导入
  WATER_SUPPLY: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadWaterSupplyInfoForAnalysis',
    errorFn: 'downloadWaterSupplyErrorFile',
    importFn: 'importWaterSupplyDataFromExcel'
  },
  // 供电信息导入
  POWER_SUPPLY: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzePowerSupplyInfoFile',
    errorFn: 'downloadPowerSupplyErrorFile',
    importFn: 'importPowerSupplyData'
  },
  // 供热信息
  HEATING_SUPPLY: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadHeatingInfoAnalysisFile',
    errorFn: 'downloadHeatSupplyErrorFile',
    importFn: 'importHeatSupplyInfoFromExcel'
  },
  // 固危废处理中心
  SOLID_HAZARDOUS_WASTE: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzeHazardousWasteCenterFile',
    errorFn: 'downloadHazardousWasteErrorFile',
    importFn: 'importHazardousWasteData'
  },
  // 企业排班导入
  ENTERPRISE_DUTY: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadDutyInfoExcelFile',
    errorFn: 'downloadDutyInfoErrorFile',
    importFn: 'importDutyInfoFromExcel'
  },
  // 风险单元导入
  RISK_UNIT: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadRiskUnitForAnalysis',
    errorFn: 'downloadHazardErrorFile',
    importFn: 'importRiskUnitExcelData'
  },
  // 风险事件导入
  RISK_EVENT: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzeRiskEventFile',
    errorFn: 'downloadHazardEventErrorFile',
    importFn: 'importRiskEventsFromExcel'
  },
  // 风险管控措施
  RISK_CONTROL_MEASURES: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadRiskControlMeasuresFile',
    errorFn: 'downloadControlMeasureErrorFile',
    importFn: 'importControlMeasuresFromExcel'
  },
  // 题目管理
  QUESTION_MANAGE: {
    service: 'srmStsBiz',
    verifyFn: 'uploadQuestionExcelForAnalysis',
    errorFn: 'downloadQuestionErrorFile',
    importFn: 'importQuestionDataFromExcel'
  },
  // 承包商器具
  CONTRACTOR_EQUIPMENT: {
    service: 'srmCtsBiz',
    verifyFn: 'uploadAndAnalyzeContractorToolExcel',
    errorFn: 'downloadToolManageErrorFile',
    importFn: 'importControlMeasuresFromExcel'
  },
  // 作业票导入
  WORK_REPORT: {
    service: 'srmDwsBiz',
    verifyFn: 'uploadSpecialWorkTicketExcel',
    errorFn: 'downloadSpecialWorkTicketErrorFile',
    importFn: 'importSpecialOperationDataFromExcel'
  },
  // 特勤站
  SECRET_SERVICE_STATION: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzeSpecialServiceStationFile',
    errorFn: 'downloadSecretServiceStationErrorFile',
    importFn: 'importSpecialServiceStationsFromExcel'
  },
  // 安全监控设备
  SAFETY_MONITORING_EQUIPMENT: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadSafetyMonitoringEquipmentFile',
    errorFn: 'downloadSafetyMonitoringErrorFile',
    importFn: 'importSafetyMonitoringEquipmentData'
  },
  // 大气监测站
  AIR_MONITORING_STATION: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadAirMonitoringFile',
    errorFn: 'downloadAirMonitoringPromptFile',
    importFn: 'importAirMonitoringStationData'
  },
  // 水环境监测站
  WATER_ENV_MONITORING_STATION: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzeWaterMonitoringStationFile',
    errorFn: 'downloadMonitoringStationErrorFile',
    importFn: 'importWaterMonitoringStationData'
  },
  // 噪音监测站
  NOISE_MONITORING_STATION: {
    service: 'srmSebsBiz',
    verifyFn: 'uploadNoiseMonitoringStationFile',
    errorFn: 'downloadNoiseMonitoringErrorFile',
    importFn: 'importNoiseMonitoringStationData'
  },
  // 移动监测设备
  MOBILE_MONITORING_DEVICE: {
    service: 'srmSebsBiz',
    verifyFn: 'analyzeMobileMonitoringDeviceFile',
    errorFn: 'downloadMonitoringDeviceErrorFile',
    importFn: 'importMobileMonitoringDeviceData'
  }
}
