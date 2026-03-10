export const riskDictionary = {
  // 风险单元涉及字典
  HazardAssessment: {
    LS: '风险矩阵分析法(LS)',
    LEC: '作业条件危险性分析法(LEC)',
    MES: '风险程度分析法(MES)',
    L: '事故发生的可能性(L)',
    S: '事故发生的严重性(S)',
    R: '风险度(R=L*S)',
    E: '暴露于危险环境的频繁程度(E)',
    C: '发生事故事件偏差产生的后果严重性(C)',
    RiskValue: '风险值(R=L*E*C)',
    M: '控制措施的状态（M）',
    BodyE: '人体暴露或危险状态出现频繁程度（E）',
    Accident: '事故的可能后果（S）',
    Risk: '风险度（R=M*E*S）',
    NameSize: '名称长度1~20',
    LevelStandard: '分级标准',
    LowRisk: '低风险',
    HigherRisk: '较大风险',
    CommonlyRisk: '一般风险',
    MajorRisk: '重大风险',
    RiskR: '风险程度（R）分级标准',
    RiskD: '风险值（D）分级标准',
    RiskLevel: '风险等级'
  },

  // 弹窗配置
  matrixDialog: {
    title: '风险矩阵分析法(LS)',
    calResultKey: 'riskMatrixR',
    riskLevelKey: 'riskMatrixRiskLevel',
    content: [
      {
        label: '事故发生的可能性(L)',
        type: 'radio',
        key: 'riskMatrixL',
        desc: {
          title: '事故发生的可能性(L)判定准则',
          tableHeader: '事故发生的可能性(L)判定准则',
          column: [
            '分值',
            '偏差发生率',
            '安全检查',
            '操作规程',
            '员工胜任程度（意识、技能、经验)',
            '控制措施（监控、联锁、报警、应急措施）'
          ],
          content: [
            [
              '5',
              '每次作业或每月发生',
              '无检查(作业)标准或不按标准检查(作业)',
              '无操作规程或从不执行操作规程',
              '不胜任(无上岗资格证、无任何培训、无操作技能)',
              '无任何监控措施或有措施从未投用、无应急措施'
            ],

            [
              '4',
              '每季度都有发生',
              '检查(作业)标准不完善或很少检查(作业)',
              '操作规程不完善或很少执行',
              '不胜任(有上岗资格证但未接受有效培训、无操作技能)',
              '有监控措施但不能满足控制要求，部分投用或有时投用；有应急措施但不完善或未演练'
            ],
            [
              '3',
              '每年发生',
              '变更后检查(作业)标准未及时修订或大多数情况不按标准检查(作业)',
              '变更后操作规程未及时修订或大多数操作不执行',
              '一般胜任(有上岗资格证，但经验、技能不足，重复出错)',
              '有应急措施但变更未及时修订或操作人员不清楚'
            ],
            [
              '2',
              '每年发生或已发生',
              '标准完善但偶尔不按标准检查作业',
              '操作规程完善但偶尔不执行',
              '胜任(有上岗资格证，经过有效培训，有经验技能，但偶尔出错)',
              '监控措施能满足控制要求，但电源联锁偶尔失电或误操作；有应急措施但每年仅演练一次'
            ],
            [
              '1',
              '从未发生',
              '标准完善，按标准检查作业',
              '操作规程完善，严格执行并记录',
              '高度胜任(有上岗资格证，经过有效培训，经验丰富，技能强，安全意识强)',
              '监控措施能满足控制要求，电源联锁从未失电或误操作；应急措施每年至少演练两次'
            ]
          ]
        },
        data: [
          { label: '5分：每次作业或每月发生', value: 5 },
          { label: '4分：每季度都有发生', value: 4 },
          { label: '3分：每年都有发生', value: 3 },
          { label: '2分：每年都有发生或曾经发生过', value: 2 },
          { label: '1分：从未发生过', value: 1 }
        ]
      },
      {
        label: '事故发生的严重性（S）',
        type: 'radio',
        desc: {
          title: '事故发生的严重性（S）判定准则',
          tableHeader: '事故发生的严重性（S）判定准则',
          column: [
            '分值',
            '人员伤害情况',
            '财产损失设备设施损坏',
            '法律法规符合性',
            '环境破坏',
            '声誉影响'
          ],
          content: [
            [
              '1',
              '通常无伤害',
              '事故的直接经济损失小于5000元',
              '完全符合',
              '基本无影响',
              '本岗位或作业地点'
            ],
            [
              '2',
              '1至2人轻伤',
              '事故的直接经济损失为5,000元及以上且小于10,000元',
              '不符合公司规章制度',
              '影响设备、设施周围',
              '无公众影响'
            ],
            [
              '3',
              '造成1至2人重伤或3至6人轻伤',
              '事故的直接经济损失为10,000元及以上且小于100,000元',
              '不符合分部的程序要求',
              '影响操作点范围内',
              '引起省级媒体报道，造成一定范围内公众影响'
            ],
            [
              '4',
              '1至2人死亡、3至6人重伤或严重职业病',
              '事故的直接经济损失超过10万元且小于100万元',
              '潜在不符合法律法规要求',
              '造成操作区域环境破坏',
              '引起国家主流媒体关注报道'
            ],
            [
              '5',
              '3人及以上死亡、7人及以上重伤',
              '事故的直接经济损失超过100万元',
              '违反法律法规要求',
              '破坏周边环境',
              '引起国际主流媒体关注报道'
            ]
          ]
        },
        key: 'riskMatrixS',
        data: [
          { label: '1分：一般无损伤', value: 1 },
          { label: '2分：1至2人轻伤', value: 2 },
          { label: '3分：造成1至2人重伤3至6人轻伤', value: 3 },
          { label: '4分：1至2人死亡3至6人重伤或严重职业病', value: 4 },
          { label: '5分：3人及以上死亡7人及以上重伤', value: 5 }
        ]
      },
      {
        label: '风险评价表',
        type: 'table',
        desc: {
          title: '风险程度（R）分级标准',
          tableHeader: '风险程度（R=L*S）分级标准',
          column: ['序号', '风险值', '风险程度（等级）'],
          content: [
            ['1', 'R=L×S=17～25', '关键风险（I级)，需要立即停止作业'],
            ['2', 'R=L×S=11～16', '重要风险（II级），需要消减的风险'],
            ['3', 'R=L×S=5～10', '中度风险（III级），需要特别控制的风险'],
            ['4', 'R=L×S=1～4', '低度风险（IV级)，需要关注的风险']
          ],
          cellHeaderStyleFun: null,
          cellStyleFun: function getClass({ row, column, rowIndex, columnIndex }) {
            if (column.property === 'column2') {
              // 2. 根据业务逻辑设置颜色
              const STATUS_COLOR_MAP = {
                1: { color: '#f54545' },
                2: { color: '#ff7200' },
                3: { color: '#ffd253' },
                4: { color: '#54c5ff' }
              }
              return STATUS_COLOR_MAP[row?.column0]
            }
            return {}
          }
        },
        tableHeader: '事故发生的严重性(S)',
        leftColumn: true,
        leftColumnLabel: '事故发生的可能性(L)',
        columnItem: [
          { label: '1级', prop: 'column1', class: 'red' },
          { label: '2级', prop: 'column2', class: 'red' },
          { label: '3级', prop: 'column3', class: 'red' },
          { label: '4级', prop: 'column4', class: 'red' },
          { label: '5级', prop: 'column5', class: 'red' }
        ],
        data: [
          { leftColumn: '1级', column1: 1, column2: 2, column3: 3, column4: 4, column5: 5 },
          { leftColumn: '2级', column1: 2, column2: 4, column3: 6, column4: 8, column5: 10 },
          { leftColumn: '3级', column1: 3, column2: 6, column3: 9, column4: 12, column5: 15 },
          { leftColumn: '4级', column1: 4, column2: 8, column3: 12, column4: 16, column5: 20 },
          { leftColumn: '5级', column1: 5, column2: 10, column3: 15, column4: 20, column5: 25 }
        ],
        cellStyleFun: function getClass({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) return
          const cellClass = [
            {
              range: [1, 4],
              class: { color: '#24a6f0', backgroundColor: 'rgba(36, 166, 240, 0.1)' }
            },
            {
              range: [5, 10],
              class: { color: '#ffcf4a', backgroundColor: 'rgba(229, 34, 34, 0.1)' }
            },
            {
              range: [11, 16],
              class: { color: '#ff7200', backgroundColor: 'rgba(255, 114, 0, 0.3)' }
            },
            {
              range: [17, 25],
              class: { color: '#E52222', backgroundColor: 'rgba(229, 34, 34, 0.1)' }
            }
          ]
          const value = parseInt(row[column.property])
          const matchedRange = cellClass?.find((item) => {
            const [min, max] = item.range
            return value >= min && value <= max
          })
          return matchedRange?.class ?? {}
        }
      }
    ],
    levelClass: [
      {
        range: [1, 4],
        label: '低风险',
        value: 4,
        class: { color: '#24a6f0', backgroundColor: 'rgba(36, 166, 240, 0.1)' }
      },
      {
        range: [5, 10],
        label: '一般风险',
        value: 3,
        class: { color: '#dbdb09', backgroundColor: 'rgba(229, 34, 34, 0.1)' }
      },
      {
        range: [11, 16],
        label: '较大风险',
        value: 2,
        class: { color: '#ff7200', backgroundColor: 'rgba(255, 114, 0, 0.3)' }
      },
      {
        range: [17, 25],
        label: '重大风险',
        value: 1,
        class: { color: '#E52222', backgroundColor: 'rgba(229, 34, 34, 0.1)' }
      }
    ]
  },
  levelDialog: {
    title: '作业条件危险性分析法(LEC）',
    calResultKey: 'workConditionRiskName',
    riskLevelKey: 'workConditionRiskLevel',
    content: [
      {
        label: '事故发生的可能性(L)',
        type: 'radio',
        key: 'workConditionL',
        desc: {
          title: '事故发生的可能性(L)',
          tableHeader: '事故发生的可能性(L)',
          column: ['分值', '事故发生的可能性', '分值', '事故发生的可能性'],
          content: [
            ['10', '完全预料到', '0.5', '可以设想、极不可能'],
            ['6', '相当可能', '0.2', '极少可能'],
            ['3', '可能、但不经常', '0.1', '实际上不可能'],
            ['1', '完全意外、极少可能', '-', '-']
          ]
        },
        data: [
          { label: '10分：完全会被预料到', value: 10 },
          { label: '6分：想当可能', value: 6 },
          { label: '3分:可能，但不经常', value: 3 },
          { label: '1分:可以设想，很不可能', value: 1 },
          { label: '0.5分:想当可能', value: 0.5 },
          { label: '0.2分: 极不可能', value: 0.2 },
          { label: '0.1分：实际上不可能', value: 0.1 }
        ]
      },
      {
        label: '暴露于危险环境的频繁程度(E)',
        type: 'radio',
        key: 'workConditionE',
        desc: {
          title: '暴露于危险环境的频繁程度(E)',
          tableHeader: '暴露于危险环境的频繁程度(E)',
          column: ['分值', '暴露于危险环境的频繁程度', '分值', '暴露于危险环境的频繁程度'],
          content: [
            [10, '连续暴露', 2, '每月暴露几次'],
            [6, '每天工作时间内暴露', 1, '每年暴露几次'],
            [3, '每周一次或偶然暴露', 0.5, '非常罕见暴露']
          ]
        },
        data: [
          { label: '10分：连续暴露', value: 10 },
          { label: '6分：每天工作时间内暴露', value: 6 },
          { label: '3分：每周一次或偶然暴露', value: 3 },
          { label: '2分：每月暴露几次', value: 2 },
          { label: '1份：每年暴露几次', value: 1 },
          { label: '0.5分：非常罕见地暴露', value: 0.5 }
        ]
      },
      {
        label: '发生事故事件偏差产生的后果严重性(C)',
        type: 'radio',
        key: 'workConditionC',
        desc: {
          title: '发生事故事件偏差产生的后果严重性(C)',
          tableHeader: '发生事故事件偏差产生的后果严重性(C)',
          column: ['分值', '事故造成的结果', '分值', '事故造成的结果'],
          content: [
            [100, '十人以上死亡', 7, '严重伤残'],
            [40, '数人死亡', 3, '有伤残'],
            [15, '有一人死亡', 1, '轻伤，需救护']
          ]
        },
        data: [
          { label: '100分：十人以上死亡', value: 100 },
          { label: '40分：数人死亡  ', value: 40 },
          { label: '15分：有一人死亡', value: 15 },
          { label: '7分：严重伤残', value: 7 },
          { label: '3分：有伤残', value: 3 },
          { label: '1分：轻伤，需救护', value: 1 }
        ]
      },
      {
        label: '风险值（D）分级标准',
        type: 'table',
        tableHeader: '风险值（D = L * E * C）分级标准',
        leftColumn: false,
        columnItem: [
          { label: '序号', prop: 'column1' },
          { label: '风险值', prop: 'column2' },
          { label: '风险级别', prop: 'column3' }
        ],
        data: [
          { column1: 1, column2: 'D>= 320', column3: 'A（红色）' },
          { column1: 2, column2: '160<=D<320', column3: 'B（橙色）' },
          { column1: 3, column2: '70<=D<160', column3: 'C（黄色）' },
          { column1: 4, column2: 'D<70', column3: 'D（蓝色）' }
        ],
        cellHeaderStyleFun: null,
        cellStyleFun: function getClass({ row, column, rowIndex, columnIndex }) {
          if (column.property === 'column3') {
            // 2. 根据业务逻辑设置颜色
            const STATUS_COLOR_MAP = {
              1: { color: '#f54545' },
              2: { color: '#ff7200' },
              3: { color: '#ffd253' },
              4: { color: '#54c5ff' }
            }
            return STATUS_COLOR_MAP[row.column1]
          }
          return {}
        }
      }
    ],
    levelClass: [
      {
        range: [0, 69.999999],
        label: '低风险',
        value: 4,
        class: { color: '#24a6f0', backgroundColor: 'rgba(36, 166, 240, 0.1)' }
      },
      {
        range: [70, 159.999999],
        label: '一般风险',
        value: 3,
        class: { color: '#dbdb09', backgroundColor: 'rgba(229, 34, 34, 0.1)' }
      },
      {
        range: [160, 319.999999],
        label: '较大风险',
        value: 2,
        class: { color: '#ff7200', backgroundColor: 'rgba(255, 114, 0, 0.3)' }
      },
      {
        range: [320, 10000],
        label: '重大风险',
        value: 1,
        class: { color: '#E52222', backgroundColor: 'rgba(229, 34, 34, 0.1)' }
      }
    ]
  },
  degreeDialog: {
    title: '风险程度分析法(MES）',
    calResultKey: 'riskDegreeRisk',
    riskLevelKey: 'riskDegreeRiskLevel',
    content: [
      {
        label: '控制措施状态M',
        type: 'radio',
        key: 'riskDegreeM',
        desc: {
          title: '控制措施状态M',
          tableHeader: '控制措施状态M',
          column: ['分值', '	事故发生的可能性'],
          content: [
            [1, '有预防措施，如机器防护装置等，且保证有效'],
            [3, '有减轻后果的应急措施，如警报系统、个体防护用品'],
            [5, '	无控制措施']
          ]
        },
        data: [
          { label: '1分：有预防措施，如机器防护装置等，且保证有效', value: 1 },
          { label: '3分：有减轻后果的应急措施，如警报系统、个体防护用品', value: 3 },
          { label: '5分：无控制措施', value: 5 }
        ]
      },
      {
        label: '人体暴露或危险状态出现频繁程度（E）',
        type: 'radio',
        key: 'riskDegreeBodyE',
        desc: {
          title: '人体暴露或危险状态出现频繁程度（E）',
          tableHeader: '人体暴露或危险状态出现频繁程度（E）',
          column: ['分值', '暴露于危险环境的频繁程度', '分值', '暴露于危险环境的频繁程度'],
          content: [
            [10, '连续暴露', 2, '每月暴露几次'],
            [6, '每天工作时间内暴露', 1, '每年暴露几次'],
            [3, '每天工作时间内暴露', 0.5, '非常罕见地暴露']
          ]
        },
        data: [
          { label: '10分：连续暴露', value: 10 },
          { label: '6分:每天工作时间内暴露', value: 6 },
          { label: '3分:每周一次或偶然暴露', value: 3 },
          { label: '2分:每月暴露几次', value: 2 },
          { label: '1分:每年暴露几次', value: 1 },
          { label: '0.5分：非常罕见地暴露', value: 0.5 }
        ]
      },
      {
        label: '事故的可能后果（S）',
        type: 'radio',
        key: 'riskDegreeAccident',
        desc: {
          title: '事故的可能后果（S）',
          tableHeader: '事故的可能后果（S）',
          column: ['分值', '伤害', '职业相关病症', '设备、财产损失', '环境影响'],
          content: [
            [10, '有多人死亡', '————', '> 1亿', '有重大环境影响的不可控排放'],
            [8, '有一人死亡', '职业病（多人）', '1千万~一亿', '有中等环境影响的不可控排放'],
            [4, '永久失能', '职业病（一人）', '100万~1000万', '有较轻环境影响的不可控排放'],
            [2, '需要治疗，缺工', '职业性多发病', '10万~100万', '有局部环境影响的可控排放'],
            [1, '轻微，仅需急救', '职业因素引起的身体不适', '< 3万', '无环境影响']
          ]
        },
        data: [
          { label: '10分：有够多人死亡', value: 10 },
          { label: '8分：有一人死亡', value: 8 },
          { label: '4分：永久失能', value: 4 },
          { label: '2分：需要治疔，缺工', value: 2 },
          { label: '1分：轻微，仅需急救', value: 1 }
        ]
      },
      {
        label: '风险程度（R）分级标准',
        type: 'table',
        tableHeader: '风险程度（R = M * E * S）分级标准',
        leftColumn: false,
        columnItem: [
          { label: '序号', prop: 'column1' },
          { label: '风险值', prop: 'column2' },
          { label: '风险级别', prop: 'column3' }
        ],
        data: [
          { column1: 1, column2: 'D>= 180', column3: '一级' },
          { column1: 2, column2: '80<=D<180', column3: '二级' },
          { column1: 3, column2: '50<=D<90', column3: '三级' },
          { column1: 4, column2: 'D<50', column3: '四级' }
        ],
        cellHeaderStyleFun: null,
        cellStyleFun: function getClass({ row, column, rowIndex, columnIndex }) {
          if (column.property === 'column3') {
            // 2. 根据业务逻辑设置颜色
            const STATUS_COLOR_MAP = {
              1: { color: '#f54545' },
              2: { color: '#ff7200' },
              3: { color: '#ffd253' },
              4: { color: '#54c5ff' }
            }
            return STATUS_COLOR_MAP[row.column1]
          }
          return {}
        }
      }
    ],
    levelClass: [
      {
        range: [0, 49.99999],
        label: '低风险',
        value: 4,
        class: { color: '#24a6f0', backgroundColor: 'rgba(36, 166, 240, 0.1)' }
      },
      {
        range: [50, 89.999999],
        label: '一般风险',
        value: 3,
        class: { color: '#dbdb09', backgroundColor: 'rgba(229, 34, 34, 0.1)' }
      },
      {
        range: [90, 189.99999],
        label: '较大风险',
        value: 2,
        class: { color: '#ff7200', backgroundColor: 'rgba(255, 114, 0, 0.3)' }
      },
      {
        range: [180, 10000],
        label: '重大风险',
        value: 1,
        class: { color: '#E52222', backgroundColor: 'rgba(229, 34, 34, 0.1)' }
      }
    ]
  },

  // 评估标准
  gradeStandard: {
    matrixDialog: {
      title: '风险程度（R）分级标准',
      tableHeader: '风险程度（R=L*S）分级标准',
      column: [
        { label: '序号', prop: 'seq' },
        { label: '风险值', prop: 'riskValue' },
        { label: '风险程度（等级）', prop: 'riskLevel' }
      ],
      content: [
        { seq: 1, riskValue: 'R=L×S=17～25', riskLevel: '关键风险（I级)，需要立即停止作业' },
        { seq: 2, riskValue: 'R=L×S=11～16', riskLevel: '重要风险（II级），需要消减的风险' },
        { seq: 3, riskValue: 'R=L×S=5～10', riskLevel: '中度风险（III级），需要特别控制的风险' },
        { seq: 4, riskValue: 'R=L×S=1～4', riskLevel: '低度风险（IV级)，需要关注的风险' }
      ],
      cellHeaderStyleFun: null,
      cellStyleFun: function getClass({ row, column, rowIndex, columnIndex }) {
        if (column.property === 'riskLevel') {
          // 2. 根据业务逻辑设置颜色
          const STATUS_COLOR_MAP = {
            1: { color: '#f54545' },
            2: { color: '#ff7200' },
            3: { color: '#ffd253' },
            4: { color: '#54c5ff' }
          }
          return STATUS_COLOR_MAP[row.seq]
        }
        return {}
      }
    },
    levelDialog: {
      title: '风险值（D）分级标准',
      tableHeader: '风险值（D = L * E * C）分级标准',
      column: ['序号', '风险值', '风险程度（等级）'],
      content: [
        ['1', 'D>= 320', 'A（红色）'],
        ['2', '160<=D<320', 'B（橙色）'],
        ['3', '70<=D<160', 'C（黄色）'],
        ['4', 'D<70', 'D（蓝色）']
      ],
      cellHeaderStyleFun: null,
      cellStyleFun: function getClass({ row, column, rowIndex, columnIndex }) {
        if (column.property === 'column2') {
          // 2. 根据业务逻辑设置颜色
          const STATUS_COLOR_MAP = {
            1: { color: '#f54545' },
            2: { color: '#ff7200' },
            3: { color: '#ffd253' },
            4: { color: '#54c5ff' }
          }
          return STATUS_COLOR_MAP[row?.column0]
        }
        return {}
      }
    },
    degreeDialog: {
      title: '风险程度（R）分级标准',
      tableHeader: '风险程度（R = M * E * S）分级标准',
      column: ['序号', '风险值', '风险程度（等级）'],
      content: [
        [1, 'D>= 180', '一级'],
        [2, '80<=D<180', '二级'],
        [3, '50<=D<80', '三级'],
        [4, 'D<50', '四级']
      ],
      cellHeaderStyleFun: null,
      cellStyleFun: function getClass({ row, column, rowIndex, columnIndex }) {
        if (column.property === 'column2') {
          // 2. 根据业务逻辑设置颜色
          const STATUS_COLOR_MAP = {
            1: { color: '#f54545' },
            2: { color: '#ff7200' },
            3: { color: '#ffd253' },
            4: { color: '#54c5ff' }
          }
          return STATUS_COLOR_MAP[row?.column0]
        }
        return {}
      }
    }
  }
}
