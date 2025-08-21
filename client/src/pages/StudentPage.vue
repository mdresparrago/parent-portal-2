<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="my-card" flat bordered>
        <!-- Student Name and Course Details -->
        <div class="row flex flex-center">
          <q-card-section class="col-12 col-sm-7 text-center">
            <div class="gt-xs">
              <h2>{{ userStore.userLoginInfo.name }}</h2>
              <subtitle1 class="text-bold" style="color: #926c0b">{{
                userStore.userLoginInfo.collegeDesc
              }}</subtitle1>

              <subtitle2>{{ userStore.userLoginInfo.courseDesc }}</subtitle2>
            </div>
            <div class="lt-sm text-center q-pt-sm">
              <div class="text-h6 text-bold text-primary">{{ userStore.userLoginInfo.name }}</div>
              <div class="text-caption text-grey-7">{{ userStore.userLoginInfo.collegeDesc }}</div>
            </div>
          </q-card-section>
        </div>

        <q-tabs v-model="tab" class="text-grey-8">
          <q-tab label="ACADEMICS" name="two" />
          <q-tab label="GRADES" name="three" />
          <q-tab label="STUDENT LEDGER" name="four" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <!-- <q-tab-panel name="one">
            <StudentProfile />
          </q-tab-panel> -->

          <q-tab-panel name="two">
            <StudentAcademics />
          </q-tab-panel>

          <q-tab-panel name="three">
            <StudentGrades />
          </q-tab-panel>
          <q-tab-panel name="four">
            <StudentLedger />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useHelperStore } from 'src/stores/helper'
import StudentAcademics from 'src/components/students/StudentAcademics.vue'
import StudentGrades from 'src/components/students/StudentGrades.vue'
import StudentLedger from 'src/components/students/StudentLedger.vue'

export default defineComponent({
  name: 'StudentPage',
  components: { StudentAcademics, StudentGrades, StudentLedger },
  data() {
    return {
      tab: 'one',
      userStore: useUserStore(),
      helperStore: useHelperStore(),
      bools: {
        loginLoading: false,
        enableSubmit: false,
        showRecaptcha: true,
      },
      loadingMessage: '',
      loginInfo: {
        sn: null,
        password: null,
      },
      voices: [],
    }
  },
})
</script>

<style lang="scss" scoped>
.my-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a4393;
  line-height: 1.2;

  @media (max-width: 599px) {
    font-size: 1.5rem;
    margin-bottom: 4px;
  }
}

subtitle1 {
  display: block;
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 4px;

  @media (max-width: 599px) {
    font-size: 0.9rem;
    margin-bottom: 2px;
  }
}

.q-tabs {
  background-color: hsl(0, 0%, 89%);
}

.q-tab-panels {
  background-color: #c0c0c0;
}
</style>
