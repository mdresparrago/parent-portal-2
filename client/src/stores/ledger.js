import { defineStore } from 'pinia'
import { useHelperStore } from './helper'
// import * as utils from 'src/util'

import { Cookies } from 'quasar'

export const useLedgerStore = defineStore('ledger', {
  state: () => ({
    helper: useHelperStore(),
    studentLedger: {},
    paymentSchedule: {},
  }),
  actions: {
    async getLedger(query) {
      const queryStr = this.helper.queryToStr(query)
      const accessToken = Cookies.get('access_token')

      return await this.helper.request({
        url: `${this.helper.apiHost}/parent/studentLedger${queryStr}`,
        method: 'get',
        detailed: true,
        headers: {
          authorization: `bearer ${accessToken}`,
        },
        handler: (data) => {
          this.studentLedger = data
        },
      })
    },

    async getPaymentSchedule(query) {
      const queryStr = this.helper.queryToStr(query)
      const accessToken = Cookies.get('access_token')

      return await this.helper.request({
        url: `${this.helper.apiHost}/parent/paymentSchedule${queryStr}`,
        method: 'get',
        detailed: true,
        headers: {
          authorization: `bearer ${accessToken}`,
        },
        handler: (data) => {
          this.paymentSchedule = data
        },
      })
    },
  },
})
