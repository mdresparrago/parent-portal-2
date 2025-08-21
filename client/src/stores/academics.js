import { defineStore } from 'pinia'
import { useHelperStore } from './helper'
// import * as utils from 'src/util'

import { Cookies } from 'quasar'
// import decodeJWT from 'jwt-decode'

export const useAcademicsStore = defineStore('academics', {
  state: () => ({
    helper: useHelperStore(),
    studentSchedule: {},
  }),
  actions: {
    async getSchedule(query) {
      const queryStr = this.helper.queryToStr(query)
      const accessToken = Cookies.get('access_token')

      return await this.helper.request({
        url: `${this.helper.apiHost}/parent/studentAcademics${queryStr}`,
        method: 'get',
        detailed: true,
        headers: {
          authorization: `bearer ${accessToken}`,
        },
        handler: (data) => {
          return (this.studentSchedule = data)
        },
      })
    },
  },
})
