import { defineStore } from 'pinia'
import { useHelperStore } from './helper' // Import the other store
// import * as utils from 'src/util'

import { Cookies } from 'quasar'
import decodeJWT from 'jwt-decode'

export const useUserStore = defineStore('user', {
  state: () => ({
    helper: useHelperStore(),
    userLoginInfo: {},
    hasAcceptedPrivacyAct: false,
    isAuthenticated: false,
    name: null,
  }),
  actions: {
    async authenticate(payload) {
      return await this.helper.request({
        url: `${this.helper.apiHost}/parent/login`,
        method: 'post',
        detailed: true,
        data: payload,

        handler: (data) => {
          if (!data) {
            return
          }

          Cookies.set('access_token', data.userAccessToken)
          const decodedJWT = decodeJWT(data.userAccessToken) //as the token that you are throwing from the backend is object
          Cookies.set('user_details', decodedJWT)
          decodedJWT.userToken = data

          this.userLoginInfo = decodedJWT
          this.isAuthenticated = true
        },
      })
    },

    async inauthenticate(payload) {
      // const cookieValue = Cookies.get('user_details')
      const accessToken = Cookies.get('access_token')
      Cookies.remove('user_details')
      // Cookies.remove('access_token')

      return await this.helper.request({
        url: `${this.helper.apiHost}/parent/logout`,
        method: 'post',
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
        detailed: true,
        data: payload,
        handler: () => {
          this.helper.logoffUser = false
          this.userLoginInfo = {}
        },
      })
    },

    async setUserCookies() {
      const cookieValue = Cookies.get('user_details')
      this.userLoginInfo = cookieValue
      this.isAuthenticated = true
    },

    // async getSubtypes(query) {
    //   const queryStr = this.helper.queryToStr(query)

    //   return await this.helper.request({
    //     url: `${this.helper.apiHost}/types/subtypes${queryStr}`,
    //     method: 'get',
    //     detailed: true,
    //     handler: (data) => {
    //       if (Object.keys(data.data).length > 0) {
    //         this.subTypes = data.data
    //         this.subTypesHashMap = utils.buildHashTable(data.data, 'code')
    //         this.subTypesOptions = utils.buildOptionsArray(data.data, 'name', 'code')
    //       }
    //     },
    //   })
    // },

    // async cancelQueue(payload) {
    //   const code = payload.code
    //   return await this.helper.request({
    //     url: `${this.helper.apiHost}/queues/cancel/${code}`,
    //     method: 'put',
    //     detailed: true,
    //     data: payload,
    //     handler: () => {},
    //   })
    // },
    // async setLoginStatus(status, user = null) {
    //   this.isAuthenticated = status
    //   this.userLoginInfo = user
    // },

    async setPrivacyAccepted(status) {
      this.hasAcceptedPrivacyAct = status
    },

    async setLogout() {
      this.hasAcceptedPrivacyAct = false
      this.isAuthenticated = false
      this.userLoginInfo = null
    },
  },

  //for data privacy act
  persist: {
    key: 'app_user_session',
    paths: ['hasAcceptedPrivacyAct', 'isAuthenticated', 'userLoginInfo'],
    //define the cookie storage
    storage: {
      getItem: (accessToken) => {
        const value = Cookies.get(accessToken)
        return value ? JSON.parse(value) : null
      },

      setItem: (accessToken, value) => {
        ;(Cookies.set(accessToken, JSON.stringify(value)),
          {
            expires: 1,
            path: '/',
          })
      },

      removeItem: (accessToken) => {
        Cookies.remove(accessToken)
      },
    },
  },
})
