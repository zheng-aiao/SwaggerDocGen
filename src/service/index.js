import Vue from 'vue'
import { apiInitializer, bizInitializer, init } from '@rdapp/web-biz-service'
import bizUtils from '@rdapp/web-biz-service/src/utils'
import store from '@/store'
import callbackBizNames from '@/service/callbackBizNames'

class BizService {
  constructor() {
    this.perPage = 100
    this.pageSize = 1000
    this.postConfig = {
      getAllPage: true,
      pageInfo: { pageKey: 'pageIndex', perPageKey: 'pageSize' }
    }
    this.getConfig = {
      getAllPage: true
    }
    window.rdapp = { dataflow: () => ({}) }
  }
  /**
   * 初始化服务层
   */
  init() {
    // 业务api初始化，构建各个业务api
    const biz = init({
      token: () => store.state.token,
      bizServerConfig: {
        requestDebug: false,
        responseDebug: true,
        maxRequestTimeout: 60000,
        cache: {
          max: 20,
          maxAge: 60,
          open: true,
          cacheAllGetMethods: false
        },
        extendCallbackBizNames: callbackBizNames
      },
      injectBizApi: this.extendApi
    })
    Vue.prototype.$cancel = biz.cancel

    this.cancel = biz.cancel

    // api层挂载
    this.apiInitializer = apiInitializer
    // 业务层挂载
    this.bizInitializer = bizInitializer

    // 业务库biz模块挂载
    this.setBizModule()
  }

  // 挂载 biz
  setBizModule() {
    this.dasBiz = this.bizInitializer.dasBiz
    this.rrsBiz = this.bizInitializer.rrsBiz
    this.aggsBiz = this.bizInitializer.aggsBiz
    this.aptsBiz = this.bizInitializer.alertsPlatformBiz
    this.gdsBiz = this.bizInitializer.geoDataBiz
    this.assetBiz = this.bizInitializer.assetBiz
    this.dcsBiz = this.bizInitializer.dcsBiz
    this.vfsBiz = this.bizInitializer.videoFusionServiceBiz
    this.orgsBiz = this.bizInitializer.orgsBiz
    this.authBiz = this.bizInitializer.authBiz
    this.mmtBiz = this.bizInitializer.mmtBiz
    this.fssBiz = this.bizInitializer.fileStorageBiz
    this.gasBiz = this.bizInitializer.geoAnalysisBiz
    this.edmsBiz = this.bizInitializer.edmsBiz
    this.msgBiz = this.bizInitializer.msgBiz
    this.vcsBiz = this.bizInitializer.vcsBiz
    this.resourceBiz = this.bizInitializer.resourceBiz
    this.laisBiz = this.bizInitializer.laisBiz
    this.metsBiz = this.bizInitializer.metsBiz
    this.srmAbsBiz = this.bizInitializer.srmApplicationBaseBiz
    this.srmSebsBiz = this.bizInitializer.srmSecureBaseBiz
    this.srmDwsBiz = this.bizInitializer.srmDangerWorkBiz
    this.srmStsBiz = this.bizInitializer.srmSafeTrainingBiz
    this.srmOlmsBiz = this.bizInitializer.srmOnlineMonitoringBiz
    this.srmIlsBiz = this.bizInitializer.srmInspectionBiz
    this.srmCtsBiz = this.bizInitializer.srmContractorBiz
    this.pemsBiz = this.bizInitializer.pemsBiz
  }
  extendApi(api) {
    api.addApi('geoDataBizApi', {
      searchLayerConfigs: (data, configInfo = {}) => ({
        url: '/gds/api/api/Layers/children',
        method: 'post',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      addFacilities: (data, configInfo = {}) => ({
        url: '/gds/api/api/Facilities',
        method: 'post',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      putFacilities: (data, configInfo = {}) => ({
        url: `/gds/api/api/Facilities/${data.id}`,
        method: 'put',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      updateLayerV2: (data) => ({
        url: `/gds/api/api/Layers/${data.id}`,
        method: 'put',
        data,
        headers: { 'X-version': '2' }
      }),
      addGoodsBatch: (data) => ({
        url: '/gds/api/api/Goods/batch',
        method: 'post',
        data
      }),
      getGoodsCategoryByFacility: (data) => ({
        url: '/gds/api/api/Goods/search',
        method: 'post',
        data,
        headers: { 'X-version': '2' }
      }),
      exportFacility: (data, configInfo) => ({
        url: '/gds/api/api/Facilities/export/excel',
        method: 'post',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      exportDynamicFormFacility: (params, configInfo) => ({
        url: '/gds/api/api/DynamicFormFacility/export',
        method: 'get',
        params,
        headers: { 'X-version': '3' },
        ...configInfo
      }),
      importFacilityExcel: (data, configInfo) => ({
        url: '/gds/api/api/Facilities/import/excel',
        method: 'post',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      exportFacilityTemplate: (data, configInfo) => ({
        url: '/gds/api/api/Facilities/export/excel/template',
        method: 'get',
        params: data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      searchDistricts: (params) => ({
        url: '/gds/api/api/Districts/search',
        data: params,
        method: 'post'
      }),
      // 用聚合业务区域码
      getBusinessMerge: (params) => ({
        url: '/gds/api/api/Districts/business/merge',
        data: params,
        headers: { 'X-version': '2' },
        method: 'get'
      }),
      exportGoodsExcelTemplate: (data, configInfo) => ({
        url: '/gds/api/api/GoodsCategories/export/excel/template',
        method: 'get',
        params: data,
        ...configInfo
      }),
      importGoodsExcelTemplate: (data, configInfo) => ({
        url: '/gds/api/api/GoodsCategories/import/excel',
        method: 'post',
        data,
        ...configInfo
      }),
      queryFacilitiesV2: (data, configInfo) => ({
        url: '/gds/api/api/Facilities/search',
        method: 'post',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      exportProductFacility: (data, configInfo) => ({
        url: '/gds/api/api/Facilities/export',
        method: 'get',
        params: data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      importProductFacility: (data, configInfo) => ({
        url: '/gds/api/api/Facilities/import',
        method: 'post',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      goodsOperationRecord: (data, configInfo) => ({
        url: '/gds/api/api/Goods/operation_record',
        method: 'post',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      goodsOperationRecordHistory: (data, configInfo) => ({
        url: '/gds/api/api/Goods/operation_record/initialization',
        method: 'post',
        data,
        headers: { 'X-version': '2' },
        ...configInfo
      }),
      getGoodsOperationRecord: (params, configInfo) => ({
        url: `/gds/api/api/Goods/${params.id}/operation_record`,
        method: 'get',
        params,
        headers: { 'X-version': '2' },
        ...configInfo
      })
    })

    // 培训考核biz上传接口参数有误，暂时先用这里的覆盖biz
    bizInitializer.addBiz('srmSafeTrainingBiz', {
      async uploadTrainWordData(params, configInfo) {
        try {
          const { data = {} } = await api.srmSafeTrainingBizApi.uploadWordQuestions(
            params,
            configInfo
          )
          return data
        } catch (error) {
          return bizUtils.formatError('uploadWordQuestions', error)
        }
      }
    })

    bizInitializer.addBiz('geoDataBiz', {
      async searchLayerConfigs(params, configInfo) {
        try {
          const { data = {} } = await api.geoDataBizApi.searchLayerConfigs(params, configInfo)
          return data
        } catch (error) {
          return bizUtils.formatError('searchLayerConfigs', error)
        }
      },
      async addFacilities(params, configInfo) {
        try {
          const { data = {} } = await api.geoDataBizApi.addFacilities(params, configInfo)
          return data
        } catch (error) {
          return bizUtils.formatError('addFacilities', error)
        }
      },
      async putFacilities(params, configInfo) {
        try {
          const { data = {} } = await api.geoDataBizApi.putFacilities(params, configInfo)
          return data
        } catch (error) {
          return bizUtils.formatError('putFacilities', error)
        }
      },
      async updateLayerV2(params) {
        try {
          const { data = {} } = await api.geoDataBizApi.updateLayerV2(params)
          return data
        } catch (error) {
          return bizUtils.formatError('updateLayerV2', error)
        }
      },
      async addGoodsBatch(params) {
        try {
          const { data = {} } = await api.geoDataBizApi.addGoodsBatch(params)
          return data
        } catch (error) {
          return bizUtils.formatError('addGoodsBatch', error)
        }
      },
      async getGoodsCategoryByFacility(params) {
        try {
          const { data = {} } = await api.geoDataBizApi.getGoodsCategoryByFacility(params)
          return data
        } catch (error) {
          return bizUtils.formatError('getGoodsCategoryByFacility', error)
        }
      },
      async exportFacility(params, configInfo) {
        try {
          const result = await api.geoDataBizApi.exportFacility(params, configInfo)
          return result
        } catch (error) {
          return bizUtils.formatError('exportFacility', error)
        }
      },
      async importFacilityExcel(params, configInfo) {
        try {
          const result = await api.geoDataBizApi.importFacilityExcel(params, configInfo)
          return result
        } catch (error) {
          return bizUtils.formatError('importFacilityExcel', error)
        }
      },
      async exportFacilityTemplate(params, configInfo) {
        try {
          const result = await api.geoDataBizApi.exportFacilityTemplate(params, configInfo)
          return result
        } catch (error) {
          return bizUtils.formatError('exportFacilityTemplate', error)
        }
      },
      async exportDynamicFormFacility(params, configInfo) {
        try {
          return await api.geoDataBizApi.exportDynamicFormFacility(params, configInfo)
        } catch (error) {
          return bizUtils.formatError('exportDynamicFormFacility', error)
        }
      },
      async searchDistricts(params) {
        try {
          const result = await api.geoDataBizApi.searchDistricts(params)
          console.log('result: ', result)
          return result
        } catch (error) {
          return bizUtils.formatError('searchDistricts', error)
        }
      },
      async getBusinessMerge(params) {
        try {
          const { data } = await api.geoDataBizApi.getBusinessMerge(params)
          return data
        } catch (error) {
          return bizUtils.formatError('getBusinessMerge', error)
        }
      },
      async exportGoodsExcelTemplate(params, configInfo) {
        try {
          const result = await api.geoDataBizApi.exportGoodsExcelTemplate(params, configInfo)
          return result
        } catch (error) {
          return bizUtils.formatError('exportGoodsExcelTemplate', error)
        }
      },
      async importGoodsExcelTemplate(params, configInfo) {
        try {
          const result = await api.geoDataBizApi.importGoodsExcelTemplate(params, configInfo)
          return result
        } catch (error) {
          return bizUtils.formatError('importGoodsExcelTemplate', error)
        }
      },
      async queryFacilitiesV2(params, configInfo) {
        try {
          const { data = {} } = await api.geoDataBizApi.queryFacilitiesV2(params, configInfo)
          return data
        } catch (error) {
          return bizUtils.formatError('queryFacilitiesV2', error)
        }
      },
      async exportProductFacility(params, configInfo) {
        try {
          const result = await api.geoDataBizApi.exportProductFacility(params, configInfo)
          return result
        } catch (error) {
          return bizUtils.formatError('exportProductFacility', error)
        }
      },
      async importProductFacility(params, configInfo) {
        try {
          const result = await api.geoDataBizApi.importProductFacility(params, configInfo)
          return result
        } catch (error) {
          return bizUtils.formatError('importProductFacility', error)
        }
      },
      async goodsOperationRecord(params, configInfo) {
        try {
          return await api.geoDataBizApi.goodsOperationRecord(params, configInfo)
        } catch (error) {
          return bizUtils.formatError('goodsOperationRecord', error)
        }
      },
      async goodsOperationRecordHistory(params, configInfo) {
        try {
          return await api.geoDataBizApi.goodsOperationRecordHistory(params, configInfo)
        } catch (error) {
          return bizUtils.formatError('goodsOperationRecordHistory', error)
        }
      },
      async getGoodsOperationRecord(params, configInfo) {
        try {
          const { data } = await api.geoDataBizApi.getGoodsOperationRecord(params, configInfo)
          return data
        } catch (error) {
          return bizUtils.formatError('getGoodsOperationRecord', error)
        }
      }
    })
  }
}

export default new BizService()
