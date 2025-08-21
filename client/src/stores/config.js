import { defineStore } from 'pinia'
import { useHelperStore } from './helper' // Import the other store
import * as utils from 'src/util'

export const useConfigStore = defineStore('config', {
  state: () => ({
    helper: useHelperStore(),
    semesters: [],
    semestersHashMap: {},
    semestersOptions: [],
  }),
  actions: {
    async getSemester(query) {
      const queryStr = this.helper.queryToStr(query)

      return await this.helper.request({
        url: `${this.helper.apiHost.replace('parent-portal', 'admission')}/semesters${queryStr}`,
        method: 'get',
        detailed: true,
        handler: (data) => {
          if (data.length > 0) {
            this.semesters = data
            this.semestersHashMap = utils.buildHashTable(data, 'semester')
            this.semestersOptions = utils.buildOptionsArray(data, 'semesterName', 'semester')
          }
        },
      })
    },
  },
})
