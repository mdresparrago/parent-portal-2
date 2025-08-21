import { defineStore } from 'pinia'
// import { Screen } from 'quasar'
import axios from 'axios'
import * as utils from 'src/util'
import { useConfigStore } from './config'

export const useHelperStore = defineStore('helper', {
  state: () => ({
    apiHost: process.env.DEV ? process.env.DEV_HOST : process.env.API_HOST,
    currentScreen: 'Screen.name',
    currentScreenProperty: 'Screen',
    darkMode: false,
    logoffUser: false,
    appLoading: false,
    configStore: useConfigStore(),
    notification: {
      displayNotify: false,
      message: '',
      type: '',
    },
    scrollAreaThumbStyle: {
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#0d47a1',
      width: '5px',
      opacity: 0.75,
    },
    scrollAreaBarStyle: {
      right: '2px',
      borderRadius: '9px',
      backgroundColor: '#0d47a1',
      width: '9px',
      opacity: 0.2,
    },

    navLinks: [
      {
        link: '/home',
        altName: 'home',
        name: 'home',
        label: 'HOME',
        icon: 'fa fa-home',
      },
      {
        link: '/academics',
        altName: 'academics',
        name: 'academics',
        label: 'ACADEMICS',
        icon: 'leaderboard',
      },
      {
        link: '/grades',
        altName: 'garades',
        name: 'grades',
        label: 'GRADES',
        icon: 'dashboard',
      },
      {
        link: '/ledger',
        altName: 'ledger',
        name: 'ledger',
        label: 'LEDGER',
        icon: 'receipt_long',
      },
    ],
  }),
  actions: {
    setLogoffUser(payload) {
      this.logoffUser = payload
    },
    setNotification(payload) {
      this.notification = payload
    },
    queryToStr(query) {
      if (query === null || query === undefined) {
        return ''
      }
      return `?${Object.entries(query)
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join('&')}`
    },
    async request(arg) {
      const { url, method, headers = {}, data, handler, detailed, displayNotif = true } = arg

      const config = {
        timeout: process.env.HTTP_REQ_TIMEOUT,
        // withCredentials: true,
        headers: {
          ...headers,
          ...(process.env.NGROKTESTING && { 'ngrok-skip-browser-warning': true }),
        },
      }

      // `process.env` vars which evaluate to `true` are tree-shaked during build/compilation
      if (process.env.DEV) console.log(`[${method.toUpperCase()}] ${url} :`, data)

      try {
        // const response = await axios[method](url, ...args);
        let response = ''
        if (['get', 'delete'].includes(method)) {
          response = await axios[method](url, config)
        } else {
          response = await axios[method](url, data, config)
        }

        // HTTP payload is automatically parsed by axios into JS object
        // HTTP Status Code 400 and up are error codes
        if (response.status >= 400) throw `HTTP Error code received: ${response.status}`

        if (process.env.DEV) console.log('Response data: ', response.data)

        if (handler.constructor.name === 'AsyncFunction') {
          await handler(response.data)
        } else {
          handler(response.data)
        }
        if (detailed) {
          if (['get', 'delete'].includes(method)) {
            return response.data.data !== undefined ? response.data.data : response.data
          } else {
            return response.data
          }
        }
      } catch (err) {
        if (process.env.DEV) console.log(err)
        if (detailed) {
          if (err.response !== undefined) {
            if (err.response.data.status === 'error') {
              if (displayNotif) {
                let notifPayload = {
                  displayNotify: true,
                  message: err.response.data.message,
                  type: 'negative',
                }

                this.notification = notifPayload
                await utils.delay(1500)
                const notifInitPayload = {
                  displayNotify: false,
                  message: '',
                  type: '',
                }
                this.notification = notifInitPayload
                return false
              }
            }

            if (err.response.data.error.tokenError !== undefined) {
              this.logoffUser = true
              return false
            }

            if (displayNotif) {
              let notifPayload = {
                displayNotify: true,
                message: err.response.data.error,
                type: 'negative',
              }

              this.notification = notifPayload
              await utils.delay(1500)
              const notifInitPayload = {
                displayNotify: false,
                message: '',
                type: '',
              }
              this.notification = notifInitPayload
              return false
            }
          }
          if (displayNotif) {
            let notifPayload = {
              displayNotify: true,
              message: `${err}`,
              type: 'negative',
            }

            this.notification = notifPayload

            await utils.delay(1500)
            const notifInitPayload = {
              displayNotify: false,
              message: '',
              type: '',
            }
            this.notification = notifInitPayload
            return false
          }

          return err.response.data !== undefined ? err.response.data : ''
        }
        return false
      }

      return true
    },
    async initStores() {},
    async initStoresWithoutAuth() {
      if (this.configStore.semesters.length === 0) {
        await this.configStore.getSemester()
      }
    },
  },
})
