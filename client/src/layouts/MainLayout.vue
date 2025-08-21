<template>
  <q-layout view="hHh LpR fFf">
    <div class="gradient-bg">
      <div class="gradient-container"></div>
    </div>

    <q-header elevated class="modern-header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" size="lg" @click="toggleLeftDrawer" class="q-mr-sm" />
        <img
          src="../assets/uerm-logo.png"
          alt="UERM logo"
          class="logo"
          style="max-width: 80px; max-height: 60px"
        />

        <q-toolbar-title
          :class="{
            'text-h3': $q.screen.width >= 1023,
            'text-subtitle1': $q.screen.width < 1023,
          }"
          style="color: #0d47a1; font-weight: bold; padding: 5px"
        >
          PARENT PORTAL</q-toolbar-title
        >

        <!-- <q-btn icon="fa fa-calendar" class="button" flat /> // for academic calendar-->

        <ClockWidget
          :class="{ 'hidden-on-small-screens': $q.screen.width < 1023 }"
          style="margin-right: 5px; color: gray"
        />

        <q-btn round flat icon="person" size="lg" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      :width="300"
      :breakpoint="500"
      class="bg-white-1"
      style="margin-top: 5px"
      @click.capture="drawerClick"
    >
      <q-list separator>
        <EssentialLink
          v-for="link in helperStore.navLinks"
          :key="link.name"
          v-bind="link"
          @setCurrentRoute="setCurrentRoute"
          class="essential-link"
          :style="
            activeRoute(link)
              ? 'background: linear-gradient(135deg, #1a4393 0%, #1976d2 100%); font-weight: bold'
              : 'background'
          "
        />
      </q-list>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      :width="300"
      :breakpoint="500"
      class="bg-white-1"
      @click.capture="drawerClick"
    >
      <q-item class="bg-image">
        <q-item-section align="center">
          <div class="row justify-center items-center text-overline">
            <div class="col-12">
              <q-avatar size="120px" v-ripple class="shadow-5">
                <q-img
                  :src="`https://iehr.uerm.edu.ph/users/public-picture/${userStore.userLoginInfo.code}`"
                />
              </q-avatar>
            </div>
          </div>

          <div class="text-center q-mt-md">
            <div class="text-subtitle1 text-grey-7">{{ userStore.userLoginInfo.code }}</div>

            <!-- clickable name -->

            <h4
              no-caps
              class="text-weight-bold q-mt-xs text-center clickable-card"
              style="color: #1a4393"
              @click="openViewProfile"
              dense
            >
              {{ userStore.userLoginInfo.name }}
            </h4>

            <div class="text-body1 text-grey-8 q-mt-xs">
              Degree: {{ userStore.userLoginInfo.courseDesc }}
            </div>
            <div class="h2 text-grey-8 q-mt-xs">
              Year Level: {{ userStore.userLoginInfo.yearLevel }}
            </div>
          </div>
        </q-item-section>
      </q-item>

      <q-dialog v-model="viewProfileDialog" class="custom-dialog">
        <q-card class="view-profile-card">
          <q-card-section class="row">
            <div class="col-11 text-h5 text-center text-weight-bold" style="color: #0d47a1">
              STUDENT PROFILE
            </div>
            <q-btn icon="close" flat round dense v-close-popup class="col" />
          </q-card-section>

          <q-card-section>
            <q-scroll-area style="height: 70vh; padding-right: 15px">
              <div class="row justify-center q-mb-lg">
                <q-avatar size="150px">
                  <q-img
                    :src="`https://iehr.uerm.edu.ph/users/public-picture/${userStore.userLoginInfo.code}`"
                    spinner-color="primary"
                  >
                    <template v-slot:loading>
                      <q-spinner-dots color="primary" />
                    </template>
                  </q-img>
                </q-avatar>
              </div>

              <div
                class="text-subtitle1 text-center text-weight-bold q-mb-sm"
                style="color: #0d47a1"
              >
                PERSONAL DETAILS
              </div>
              <q-list bordered separator>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>Student Number</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.code }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Full Name</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.name }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Sex</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.sex }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Birth Date</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.birthDate }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Birth Place</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.birthPlace }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Civil Status</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.civilStatus }}</q-item-label>
                  </q-item-section>
                </q-item>

                <!-- <q-item>
                  <q-item-section>
                    <q-item-label caption>Citizenship</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.citizen }}</q-item-label>
                  </q-item-section>
                </q-item> -->

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Permanent Address</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.address1 }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Home Address</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.address2 }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Primary Telephone Number</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.tel_No1 }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Secondary Telephone Number</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.tel_No2 }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Mobile Number</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.mobileNo }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Contact Mobile Number</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.contactMobileNumber }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <div
                class="text-subtitle1 text-center text-weight-bold q-mt-md q-mb-sm"
                style="color: #0d47a1; margin-top: 25px"
              >
                ACADEMIC INFORMATION
              </div>
              <q-list bordered separator>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>College</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.collegeDesc }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>Degree Program</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.courseDesc }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Year Level</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.yearLevel }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>UERM Email</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.uermEmail }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Personal Email</q-item-label>
                    <q-item-label>{{ userStore.userLoginInfo.email }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-separator class="q-my-md" />

      <div class="row justify-start text-grey-8 q-mt-xs">
        <div class="info-item">
          <q-icon name="cake" class="q-mr-sm" /> Birthdate:
          {{ userStore.userLoginInfo.birthDate }}
        </div>

        <div class="info-item">
          <q-icon name="phone" class="q-mr-sm" /> Contact Number:
          {{ userStore.userLoginInfo.tel_No1 }}
        </div>
      </div>

      <div class="row flex flex-center">
        <q-btn
          label="Password"
          icon="lock"
          size="md"
          dense
          class="q-mt-md col-6"
          style="
            background: linear-gradient(135deg, #1a4393 0%, #1976d2 100%);
            color: white;
            font-weight: bold;
            border-radius: 15px;
          "
          @click="passwordResetInit()"
        />

        <q-btn
          label="Logout"
          icon="logout"
          size="md"
          class="q-mt-md col-5"
          dense
          style="
            background: linear-gradient(135deg, #ff0000 0%, #e60000 100%);
            color: white;
            font-weight: bold;
            margin-left: 5px;
            border-radius: 15px;
          "
          @click="inauthenticate()"
        />
      </div>

      <q-dialog
        v-if="this.userStore.userLoginInfo.isPwdChanged === 0"
        v-model="resetPasswordDialog"
        persistent
      >
        <q-card class="forgot">
          <q-form @submit.prevent="resetPassword()" class="q-gutter-md">
            <q-card-section class="bg-primary text-white text-center text-6 text-weight-bold">
              RESET PASSWORD
            </q-card-section>
            <q-card-section>
              New password
              <q-input
                v-model="posts.newPassword"
                outlined
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[requiredValidation]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              Confirm Password
              <q-input
                v-model="posts.confirmPassword"
                outlined
                :type="isPwd2 ? 'password' : 'text'"
                lazy-rules
                :rules="[requiredValidation, matchPasswords]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section class="text-center">
              <q-btn
                type="submit"
                color="primary"
                icon="key"
                label="RESET PASSWORD"
                class="full-width"
              />
            </q-card-section>
          </q-form>
        </q-card>
      </q-dialog>

      <q-dialog v-else v-model="resetPasswordDialog">
        <q-card class="forgot">
          <q-form @submit.prevent="resetPassword()" class="q-gutter-md">
            <q-card-section class="bg-primary text-white text-center text-6 text-weight-bold">
              RESET PASSWORD
            </q-card-section>
            <q-card-section>
              New password
              <q-input
                v-model="posts.newPassword"
                outlined
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[requiredValidation]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              Confirm Password
              <q-input
                v-model="posts.confirmPassword"
                outlined
                :type="isPwd2 ? 'password' : 'text'"
                lazy-rules
                :rules="[requiredValidation, matchPasswords]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section class="text-center">
              <q-btn
                type="submit"
                color="primary"
                icon="key"
                label="RESET PASSWORD"
                class="full-width"
              />
            </q-card-section>
          </q-form>
        </q-card>
      </q-dialog>
    </q-drawer>

    <!-- for privacy modal -->
    <q-dialog v-model="showPrivacyModal">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">COOKIES AGREEMENT</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>
            This website uses cookies. Necessary cookies help make this website usable by enabling
            basic functions like page navigation and access to secure areas. This website cannot
            function properly without cookies. Please Click here to view the UERM Patient Portal
            cookie policy.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="negative" @click="handleDecline" />
          <q-btn flat label="I Agree" color="primary" @click="handleAccept" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container class="main-page q-pa-md">
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="footer" style="background-color: white; color: grey">
      <div class="row text-xs">
        <div class="col-md-3 col-sm-12 text-center">
          For more inquiries please contact us:
          <a href="mailto:it@uerm.edu.ph">it@uerm.edu.ph</a>
        </div>
        <div class="col-md-6 col-sm-12 text-center">
          By logging in, you give consent for cookies to be used.
          <a href="https://www.uerm.edu.ph/home/uerm-privacy-notice/">Click here</a>
          to view the UERM Parent Portal cookie policy.
        </div>

        <div class="col-md-3 col-sm-12 text-center">
          <a href="https://www.uerm.edu.ph/" target="_blank"><u>UERMMMC </u></a>
          | Copyright © All Right Reserved 2025
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useHelperStore } from 'src/stores/helper'
import { Loading, QSpinnerCube } from 'quasar'
import * as utils from 'src/util'
import EssentialLink from 'components/EssentialLink.vue'
import ClockWidget from 'src/components/ClockWidget.vue'
import { usePasswordStore } from 'src/stores/passwordReset'
import { useRouter } from 'vue-router'
import { mapActions, mapState } from 'pinia'
// import DataPrivacyAct from 'src/components/Helpers/DataPrivacyAct.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
    ClockWidget,
    // DataPrivacyAct,
  },
  data() {
    return {
      userStore: useUserStore(),
      helperStore: useHelperStore(),
      passwordResetStore: usePasswordStore(),
      useRouter: useRouter(),
      showStudentProfile: false,
      leftDrawerOpen: this.$q.screen.width < 1023 ? false : true,
      rightDrawerOpen: this.$q.screen.width < 1023 ? false : true,
      viewProfileDialog: false,
      resetPasswordDialog: false,
      isPwd: true,
      isPwd2: true,
      posts: {
        newPassword: '',
        confirmPassword: '',
      },
      currentRouteDetails: null,
    }
  },
  created() {
    this.initStore()
  },

  computed: {
    ...mapState(useUserStore, ['hasAcceptedPrivacyAct', 'isAuthenticated']),

    showPrivacyModal: {
      get() {
        console.log('this is the user')
        return this.isAuthenticated && !this.hasAcceptedPrivacyAct
      },

      set() {},
    },
  },
  methods: {
    ...mapActions(useUserStore, ['setPrivacyAccepted', 'setLogout', 'setLoginStatus']),

    // for essential links
    activeRoute(route, routeDetails) {
      if (this.$route.fullPath === route.link) {
        this.$emit('setCurrentRoute', routeDetails)
        return true
      }
      return false
    },
    redirectRoute(route) {
      this.$router.push(route.link)
    }, //end of redirect route

    requiredValidation(val) {
      return (val && val.length > 0) || 'This field is required'
    },
    matchPasswords(val) {
      return val === this.posts.newPassword || 'The password confirmation does not match.'
    },
    drawerClick(e) {
      if (this.miniState) {
        this.miniState = false
        e.stopPropagation()
      }
    },

    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },

    openViewProfile() {
      this.viewProfileDialog = true
    },

    passwordResetInit() {
      this.resetPasswordDialog = true
      this.posts.newPassword = ''
      this.posts.confirmPassword = ''
    },
    async resetPassword() {
      if (this.posts.newPassword !== this.posts.confirmPassword) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Passwords do not match',
        })

        return
      }
      Loading.show({
        message: 'Resetting password...',
        spinner: QSpinnerCube,
        spinnerColor: 'primary',
        backgroundColor: 'blue-grey-1',
        messageColor: 'primary',
      })

      try {
        const response = await this.passwordResetStore.parentResetPassword(this.posts)

        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: response.message,
          icon: 'check_circle',
        })

        this.userStore.userLoginInfo.isPwdChanged = 1
        this.resetPasswordDialog = false
      } catch (error) {
        console.error('Password reste failed:', error)
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: error.response.data.error || 'Password reset failed. Please try again.',
          icon: 'report_problem',
        })
      } finally {
        Loading.hide()
      }
    },

    async inauthenticate() {
      this.$q
        .dialog({
          title: `<div class="text-overline">ARE YOU SURE YOU WANT TO LOGOUT?</div>`,
          ok: {
            push: true,
            color: 'primary',
            label: 'Yes, Logout',
          },
          cancel: {
            push: true,
            color: 'negative',
            label: 'Cancel',
          },
          html: true,
        })
        .onOk(async () => {
          Loading.show({
            message: 'Logging out...',
            spinner: QSpinnerCube,
            spinnerColor: 'primary',
            backgroundColor: 'blue-grey-1',
            messageColor: 'primary',
          })
          try {
            await this.userStore.inauthenticate()
            await utils.delay(1000)
            this.$router.push('/')
          } catch (error) {
            console.error('Logout failed:', error)
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Logout failed. Please try again.',
              icon: 'report_problem',
            })
          } finally {
            Loading.hide()
          }
        })
    },
    async initStore() {
      if (Object.keys(this.userStore.userLoginInfo).length === 0) {
        if (this.$router.currentRoute.path !== '/') {
          this.$router.push('/')
        }
        return
      }

      //initialization of the reset password upon login for the first time users
      if (this.userStore.userLoginInfo.isPwdChanged === 0) {
        this.passwordResetInit()
      }
    },

    setCurrentRoute(route) {
      this.currentRouteDetails = route
    },

    async handleAccept() {
      this.setPrivacyAccepted(true)
      this.$router.push(this.route)
    },

    async handleDecline() {
      this.setLogout()
      this.$router.push('/')
    },
  },
})
</script>

<style scoped>
.modern-header {
  background-color: white;
  color: #1a4393;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modern-header .q-toolbar {
  padding-left: 32px;
  padding-right: 32px;
}

.uerm-logo-avatar {
  background-color: white;
  width: 180px;
  height: 100px;
}

.q-toolbar-title-responsive {
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 3rem;
  font-weight: bold;
}

.welcome-message-responsive {
  font-size: 1rem;
}

.logout-btn {
  color: #ff0000;
  transition: transform 0.2s ease-in-out;
}
.logout-btn:hover {
  transform: scale(1.1);
}

.modern-tabs-container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.modern-tabs {
  max-width: 1200px;
  margin: 0 auto;
}

:deep(.q-tab__indicator) {
  height: 4px;
  background-color: #2c5282;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
:deep(.q-tab--active) {
  color: #2c5282 !important;
  font-weight: bold;
}
:deep(.q-tab:hover .q-tab__content) {
  color: #2c5282;
}

.q-page-container {
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.student-profile-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 8px !important;
}

/* Tablet adjustments */
@media (min-width: 601px) and (max-width: 1023px) {
  .modern-header .q-toolbar {
    padding-left: 20px;
    padding-right: 20px;
  }
  .uerm-logo-avatar {
    width: 56px;
    height: 56px;
    font-size: 56px;
  }
  .q-toolbar-title-responsive {
    font-size: 1.25rem;
  }
  .welcome-message-responsive {
    font-size: 0.9rem;
  }
}

/* Mobile adjustments */
@media (max-width: 600px) {
  .modern-header .q-toolbar {
    padding-left: 16px;
    padding-right: 16px;
  }
  .uerm-logo-avatar {
    width: 48px;
    height: 48px;
    font-size: 48px;
  }
  .q-toolbar-title-responsive {
    font-size: 1rem;
  }
  .modern-header .gt-xs {
    display: none;
  }
  .modern-tabs-container {
    padding-bottom: 0;
  }

  .custom-dialog .q-card {
    margin-left: 8px;
    margin-right: 8px;
    max-width: 100vw;
  }
}

.avatar-image {
  height: 127px !important;
}

.info-item {
  padding: 8px 8px;
  font-size: 14px;
}

.bg-image {
  color: black;
  margin-top: 10px;
}

.custom-dialog .q-card {
  margin-left: 24px;
  margin-right: 24px;
  width: 100vw;
  border-radius: 15px;
}

.clickable-card:hover {
  cursor: pointer;
}

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  margin: 0;
  padding-left: 0;
  box-sizing: border-box;
}

.forgot {
  min-width: 300px;
}

.hidden-on-small-screens {
  display: none;
}
</style>
