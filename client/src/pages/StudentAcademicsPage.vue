<template>
  <q-page class="q-pa-md schedule-page-container">
    <q-card class="modern-card">
      <q-card-section class="card-header">
        <div class="text-h4 text-weight-bold">CLASS SCHEDULE</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-8 text-grey-8 text-body1 text-left gt-sm">
            <div>
              CLASS SCHEDULE FOR:
              <span class="text-primary text-weight-bold">{{ selectedSemesterLabel }}</span>
            </div>
          </div>
        </div>

        <q-table
          :rows="processedClassSchedule"
          :columns="classScheduleColumns"
          row-key="uniqueId"
          flat
          bordered
          :pagination="{ rowsPerPage: 0 }"
          hide-bottom
          class="grades-table class-schedule-table"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                style="font-weight: bold; text-transform: uppercase"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <!-- Custom slot for rendering the merged schedule details -->
          <template v-slot:body-cell-scheduleDetails="props">
            <q-td :props="props">
              <div v-for="(schedule, index) in props.row.scheduleDetails" :key="index">
                <span class="text-weight-medium">{{ schedule.days }}</span>
                <span class="q-ml-xs">{{ schedule.time }}</span>
                <span v-if="schedule.room" class="q-ml-xs text-grey-7">({{ schedule.room }})</span>
              </div>
            </q-td>
          </template>

          <template v-slot:no-data>
            <div class="full-width row flex-center text-primary q-pa-md">
              <q-icon name="info" size="2em" />
              <span class="q-ml-sm text-subtitle1"
                >No schedule data available for this semester.</span
              >
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useAcademicsStore } from 'src/stores/academics'
import { useUserStore } from 'src/stores/user'
import { useConfigStore } from 'src/stores/config'

export default defineComponent({
  name: 'StudentAcademics',

  data() {
    return {
      academicsStore: useAcademicsStore(),
      userStore: useUserStore(),
      configStore: useConfigStore(),

      semesters: [],
      semesterOptions: [],
      selectedSemester: null,
      selectedSemesterLabel: 'N/A',

      classSchedule: [],
      processedClassSchedule: [],

      classScheduleColumns: [
        {
          name: 'subjectCode',
          label: 'Subject Code',
          field: 'subjectCode',
          align: 'left',
          classes: 'font-mono',
        },
        {
          name: 'subject',
          label: 'Description',
          field: 'subject',
          align: 'left',
          style: 'width: 35%',
        },
        { name: 'units', label: 'Units', field: 'units', align: 'center' },
        {
          name: 'scheduleDetails',
          label: 'Schedule',
          field: 'scheduleDetails',
          align: 'left',
          sortable: false,
        },

        {
          name: 'section',
          label: 'Section',
          field: 'section',
          align: 'left',
        },
      ],
    }
  },

  mounted() {
    this.initPageData()
  },

  watch: {
    selectedSemester(newVal, oldVal) {
      if (newVal !== oldVal && newVal) {
        this.fetchSchedule(newVal)
        const selectedOption = this.semesterOptions.find((opt) => opt.value === newVal)
        this.selectedSemesterLabel = selectedOption ? selectedOption.label : 'N/A'
      }
    },
    classSchedule: {
      handler(newVal) {
        this.processScheduleData(newVal)
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    async initPageData() {
      await this.initSemesterOptions()
      if (this.selectedSemester) {
        await this.fetchSchedule(this.selectedSemester)
      }
    },

    async initSemesterOptions() {
      try {
        const availableSemesters = await this.configStore.getSemester()
        console.log('thse as the available semesters:', availableSemesters)

        if (availableSemesters && availableSemesters.length > 0) {
          this.semesters = availableSemesters

          this.semesterOptions = this.semesters.map((sem) => ({
            label: sem.label,
            value: sem.value,
          }))

          const userCurrentSemesterCode = this.userStore.userLoginInfo?.semester[0]
          console.log('this is the user current semester code,', userCurrentSemesterCode)
          const defaultSemesterOption = this.semesterOptions.find(
            (opt) => opt.value === userCurrentSemesterCode,
          )
          console.log(
            'this is the default semester options:',
            defaultSemesterOption,
            this.semesterOptions,
          )

          if (defaultSemesterOption) {
            console.log('this is the selected semester', this.selectedSemester)
            console.log('this is the selected semester label', this.selectedSemesterLabel)
            this.selectedSemester = defaultSemesterOption.value
            this.selectedSemesterLabel = defaultSemesterOption.label
          } else if (this.semesterOptions.length > 0) {
            this.selectedSemester = this.semesterOptions[0].value
            this.selectedSemesterLabel = this.semesterOptions[0].label
          }
        } else {
          console.warn('No available semesters fetched.')
          this.semesterOptions = []
          this.selectedSemester = null
          this.selectedSemesterLabel = 'N/A'
        }
      } catch (error) {
        console.error('Error fetching available semesters:', error)
        this.semesterOptions = []
        this.selectedSemester = null
        this.selectedSemesterLabel = 'N/A'
      }
    },

    async fetchSchedule(semesterCode) {
      if (!this.userStore.userLoginInfo || !this.userStore.userLoginInfo.code || !semesterCode) {
        console.log(
          'this is the user store usre loginInfo',
          this.userStore.userStore,
          this.userStore.userLoginInfo,
          semesterCode,
        )
        console.warn('Cannot fetch schedule: User info or semester code incomplete.')
        this.classSchedule = []
        return
      }

      const query = {
        sn: this.userStore.userLoginInfo.code,
        semester: semesterCode,
      }

      try {
        const fetchedSchedule = await this.academicsStore.getSchedule(query)
        this.classSchedule = Array.isArray(fetchedSchedule) ? fetchedSchedule : [fetchedSchedule]
      } catch (error) {
        console.error('Error in fetchSchedule:', error)
        this.classSchedule = []
      }
    },

    /**
     * @param {Array} rawSchedule
     */
    processScheduleData(rawSchedule) {
      const grouped = {}
      rawSchedule.forEach((item) => {
        const key = `${item.subjectCode}-${item.description}-${item.section}`

        if (!grouped[key]) {
          grouped[key] = {
            uniqueId: key,
            subjectCode: item.subjectCode,
            subject: item.description,
            section: item.section,
            units: item.units,
            scheduleDetails: [],
          }
        }
        grouped[key].scheduleDetails.push({
          days: item.dAYS,
          room: item.room,
          time: item.tIME,
        })
      })

      this.processedClassSchedule = Object.values(grouped)
    },
  },
})
</script>

<style lang="scss">
.schedule-page-container {
  @media (max-width: 767px) {
    padding: 16px;
    border-radius: 0;
  }
}

.modern-card {
  border-radius: 12px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(170, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow:
      0 6px 18px rgba(0, 0, 0, 0.12),
      0 3px 6px rgba(0, 0, 0, 0.08);
  }
}

.card-header {
  background: linear-gradient(135deg, #1a4393 0%, #1976d2 100%);
  color: white;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Inter', sans-serif;
}

.grades-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;

  .q-table__container {
    border-radius: 8px;
  }

  .q-th {
    background-color: #f0f8ff;
    color: #0d47a1;
    font-weight: 700;
    text-transform: uppercase;
    padding: 12px 16px;
    font-size: 0.85rem;
    border-bottom: 2px solid #a7d9f7;
  }

  .q-td {
    padding: 10px 16px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.95rem;
  }

  tbody tr:last-child .q-td {
    border-bottom: none;
  }
}
.class-schedule-table {
  tbody tr:nth-child(even) {
    background-color: #f7fcff;
  }
}

.modern-select.q-field--filled .q-field__control {
  background-color: #f8faff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease-in-out;

  &:before {
    border-bottom: none !important;
  }
  &:after {
    transform: scaleX(0) !important;
  }
}

.modern-select.q-field--focused .q-field__control {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
}

.modern-select .q-field__label {
  color: #555;
}

.modern-select .q-item__label {
  font-size: 0.95rem;
}

@media (max-width: 767px) {
  .class-schedule-table {
    overflow-x: auto;
    display: block;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  .class-schedule-table .q-table__container {
    min-width: 650px;
  }
}
</style>
