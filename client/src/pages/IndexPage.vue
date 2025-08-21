<template>
  <q-layout view="hHh lpR fFf">
    <!-- <q-header elevated> -->
    <!-- this is not primary but white becuase of UERM's Logo -->
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" /> -->
          </q-avatar>
          UERM PARENT PORTAL
        </q-toolbar-title>
        <q-btn class="q-ml-sm" icon="fas fa-right-from-bracket" round flat @click="inauthenticate">
          <q-tooltip> LOGOUT </q-tooltip>
        </q-btn>
      </q-toolbar>

      <!-- make this appealing to the eyes -->
      <div>
        <q-tabs align="center">
          <EssentialLink v-for="link in this.helperStore.navLinks" :key="link.name" v-bind="link" />
        </q-tabs>
      </div>
    </q-header>
    <!-- nakaabang for growth -->

    <!-- <q-toolbar class="text-secondary">
        <q-toolbar-title>
          <span class="text-overline text-uppercase" style="font-size: 14px">
            UERM ParentPortal
          </span>
        </q-toolbar-title>
        <q-space> </q-space>

        <span v-if="Object.keys(this.userStore.userLoginInfo).length > 0">
          <q-icon name="fa fa-user" size="23px" class="q-pb-xs q-pr-sm"></q-icon
        ></span>

        <span
          v-if="Object.keys(this.userStore.userLoginInfo).length > 0"
          class="column justify-center text-uppercase"
        >
          <span class="text-overline" style="line-height: 1 !important"
            >{{ this.userStore.userLoginInfo.name }} - {{ this.userStore.userLoginInfo.code }}
          </span>
          <span class="text-caption">
            {{ this.userStore.userLoginInfo.posDesc }} -
            {{ this.userStore.userLoginInfo.deptDesc }}
          </span>
        </span>
        <span v-if="Object.keys(this.userStore.userLoginInfo).length > 0">
          <span
            v-if="
              this.userStore.userLoginInfo.module_code !== undefined &&
              Object.keys(this.helperStore.modulesHashMap).length > 0
            "
          >
            <q-btn
              class="q-ml-sm"
              icon="fas fa-server"
              v-if="this.userStore.userLoginInfo.other_modules_code !== undefined"
              rounded
              flat
              @click="bools.moduleDialog = true"
              :label="this.helperStore.modulesHashMap[this.userStore.userLoginInfo.module_code].app"
            >
              <q-tooltip> CHANGE MODULE </q-tooltip>
            </q-btn>
          </span>

          <span
            v-if="
              this.userStore.userLoginInfo.currentCounter !== undefined &&
              Object.keys(this.queueCounterStore.queueCounters).length > 0
            "
          >
            <q-btn
              class="q-ml-sm"
              icon="fas fa-chalkboard-user"
              v-if="this.userStore.userLoginInfo.currentCounter !== undefined"
              rounded
              flat
              @click="bools.counterDialog = true"
              :label="
                this.queueCounterStore.queueCountersHashMap[
                  this.userStore.userLoginInfo.currentCounter
                ].name
              "
            >
              <q-tooltip> CHANGE COUNTER </q-tooltip>
            </q-btn>
          </span>
        </span> -->

    <!-- <q-btn
          class="q-ml-xs"
          icon="fas fa-bars"
          @click="bools.drawer = !bools.drawer"
          round
          flat
        ></q-btn>
      </q-toolbar>
    </q-header> -->

    <!-- <q-drawer
      v-model="bools.drawer"
      side="right"
      class="drawer bg-primary rounded-borders-all text-secondary"
      :breakpoint="768"
      show-if-above
    > -->
    <!-- Logo and Header Section -->
    <!-- <div
        class="row items-center justify-center q-col-gutter-x-sm q-px-lg q-pb-lg q-pt-md text-h6"
      > -->
    <!-- <span class="col">
          <q-img :src="this.uermLogo" alt="" height="60px" width="60px"></q-img>
        </span> -->
    <!-- <span class="col-12">
          <div class="row fit text-center">
            <span class="col-12">UERM ParentPortal</span>
          </div>
        </span>
      </div>

      <div class="drawer-content-wrapper">
        <q-list class="text-uppercase text-secondary q-px-md">
          <EssentialLink v-for="link in this.helperStore.navLinks" :key="link.name" v-bind="link" />
        </q-list>
      </div> -->

    <!-- Footer Buttons -->
    <!-- <div class="drawer-bottom q-pa-md">
        <div class="row justify-evenly">
          <q-btn
            :label="this.userLoginInfo.name"
            color="secondary"
            text-color="primary"
            class="rounded-borders-all"
            size="sm"
            icon="fa fa-user"
          ></q-btn>
          <q-btn
            color="secondary"
            text-color="primary"
            size="sm"
            icon="fa fa-power-off"
            round
          >
            <q-tooltip class="bg-secondary text-primary"> LOG OUT </q-tooltip>
          </q-btn>
        </div>
      </div> -->
    <!-- </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useHelperStore } from 'src/stores/helper'
import { Loading } from 'quasar'
import * as utils from 'src/util'
import EssentialLink from 'components/EssentialLink.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
  },
  data() {
    return {
      userStore: useUserStore(),
      helperStore: useHelperStore(),
      bools: {
        drawer: false,
      },
    }
  },
  created() {
    this.initStore()
  },
  methods: {
    async inauthenticate() {
      this.$q
        .dialog({
          title: `<div class="text-overline">ARE YOU SURE YOU WANT TO LOGOUT?<div>`,
          ok: {
            push: true,
          },
          cancel: {
            push: true,
            color: 'negative',
          },
          html: true,
        })
        .onOk(async () => {
          Loading.show({
            message: 'Logging out...',
          })
          await this.userStore.inauthenticate()
          await utils.delay(1500)
          Loading.hide()
          this.$router.push('/')
        })
    },
    async initStore() {
      if (Object.keys(this.userStore.userLoginInfo).length === 0) {
        this.$router.push('/')
        return
      }
    },
  },
})
</script>
