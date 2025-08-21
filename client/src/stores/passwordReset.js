import { defineStore } from 'pinia'
import { useHelperStore } from './helper' // Import the other store
// import * as utils from 'src/util'

import { Cookies } from 'quasar'

export const usePasswordStore = defineStore('password', {
  state: () => ({
    helper: useHelperStore(),
    resetPassword: {},
  }),
  actions: {
    async parentResetPassword(payload) {
      const accessToken = Cookies.get('access_token')

      return await this.helper.request({
        url: `${this.helper.apiHost}/parent/resetPassword`,
        method: 'post',
        detailed: true,
        data: payload,
        headers: {
          authorization: `bearer ${accessToken}`,
        },

        handler: (data) => {
          if (!data) {
            return
          }

          return (this.resetPassword = data)
        },
      })
    },
  },
})
