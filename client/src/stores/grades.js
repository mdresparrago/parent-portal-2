import { defineStore } from 'pinia'
import { useHelperStore } from './helper'
// import * as utils from 'src/util'

import { Cookies } from 'quasar'
// import decodeJWT from 'jwt-decode'

export const useGradesStore = defineStore('grades', {
  state: () => ({
    helper: useHelperStore(),
    studentGrades: {},
    studentGradingSystem: {},
  }),
  actions: {
    async getGrades(query) {
      const queryStr = this.helper.queryToStr(query)
      const accessToken = Cookies.get('access_token')

      return await this.helper.request({
        url: `${this.helper.apiHost}/parent/studentGrades${queryStr}`,
        method: 'get',
        detailed: true,
        headers: {
          authorization: `bearer ${accessToken}`,
        },
        handler: (data) => {
          if (data.length > 0) {
            for (const list of data) {
              list.grade = /\d/.test(list.grade) ? Number(list.grade) : list.grade
            }
          }
          return (this.studentGrades = data)
        },
      })
    },

    async getGradingSystem(query) {
      const queryStr = this.helper.queryToStr(query)
      const accessToken = Cookies.get('access_token')

      return await this.helper.request({
        url: `${this.helper.apiHost}/parent/studentGradingSystem${queryStr}`,
        method: 'get',
        detailed: true,
        headers: {
          authorization: `bearer ${accessToken}`,
        },
        handler: (data) => {
          return (this.studentGradingSystem = data)
        },
      })
    },
  },
})
