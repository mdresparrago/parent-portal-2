<template>
  <q-page class="q-pa-md q-pa-lg-md schedule-page-container">
    <!-- GRADING SYSTEM & REMARKS/REFERENCE -->
    <q-card class="q-mb-md modern-card">
      <q-card-section class="cardheader">
        <div class="text-h6 text-weight-bold">GRADING SYSTEM</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-lg items-start">
          <!-- Grading System Table -->
          <div class="col-12 col-md-8">
            <q-markup-table flat bordered class="grading-table grades-table">
              <thead>
                <tr class="text-center text-weight-bold">
                  <td>POINT</td>
                  <td>PERCENTAGE</td>
                  <td>POINT</td>
                  <td>PERCENTAGE</td>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr>
                  <td>1.00</td>
                  <td>97–100</td>
                  <td>2.25</td>
                  <td>83–84</td>
                </tr>
                <tr>
                  <td>1.25</td>
                  <td>94–96</td>
                  <td>2.50</td>
                  <td>80–82</td>
                </tr>
                <tr>
                  <td>1.50</td>
                  <td>91–93</td>
                  <td>2.75</td>
                  <td>77–79</td>
                </tr>
                <tr>
                  <td>1.75</td>
                  <td>88–90</td>
                  <td>3.00</td>
                  <td>75–76</td>
                </tr>
                <tr>
                  <td>2.00</td>
                  <td>85–87</td>
                  <td>5.00</td>
                  <td>Below 75</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>

          <!-- GRADE REMARKS AND REFERENCE -->
          <div class="col-12 col-md-4">
            <q-tabs
              v-model="tab"
              dense
              class="text-grey-7"
              align="justify"
              narrow-indicator
              active-color="primary"
              indicator-color="primary"
            >
              <q-tab label="Grade Remarks" name="remarks" />
              <q-tab label="Reference" name="reference" />
            </q-tabs>

            <q-separator class="q-mb-md" />

            <q-tab-panels v-model="tab" animated class="q-pa-none">
              <q-tab-panel name="remarks" class="q-pa-sm">
                <q-markup-table flat dense bordered class="remarks-table grades-table">
                  <tbody>
                    <tr>
                      <td class="text-center text-weight-medium">X</td>
                      <td>Absent from Examination</td>
                    </tr>
                    <tr>
                      <td class="text-center text-weight-medium">W</td>
                      <td>Dropped without credit</td>
                    </tr>
                    <tr>
                      <td class="text-center text-weight-medium">LOA</td>
                      <td>Leave of Absence</td>
                    </tr>
                    <tr>
                      <td class="text-center text-weight-medium">GW</td>
                      <td>Grade Withheld</td>
                    </tr>
                    <tr>
                      <td class="text-center text-weight-medium">FA</td>
                      <td>Failed due to Absences</td>
                    </tr>
                    <tr>
                      <td class="text-center text-weight-medium">IP</td>
                      <td>In Progress (1st part of a year-long subject)</td>
                    </tr>
                    <tr>
                      <td class="text-center text-weight-medium">FAILED</td>
                      <td>Failed</td>
                    </tr>
                    <tr>
                      <td class="text-center text-weight-medium">PASSED</td>
                      <td>Passed</td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-tab-panel>

              <q-tab-panel name="reference" class="q-pa-sm">
                <q-markup-table flat dense bordered class="reference-table grades-table">
                  <tbody>
                    <tr>
                      <td class="text-weight-bold">SWA:</td>
                      <td>Semester Weighted Average</td>
                    </tr>
                    <tr>
                      <td class="text-weight-bold">YWA:</td>
                      <td>Year Level Weighted Average</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Weighted average for academic year (1st sem, 2nd sem, summer)</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <i>Used for scholarship/academic excellence</i>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-weight-bold">GWA:</td>
                      <td>General Weighted Average</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        Cumulative average from 1st term to final enrollment in the degree program
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- ACADEMIC SUMMARY -->
    <div class="row q-mb-md">
      <q-card class="col-12 col-md-9 modern-card summary-left-card">
        <q-card-section class="cardheader">
          <div class="text-h6 text-bold">ACADEMIC SUMMARY</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-8 text-bold q-mb-xs">Current Semester</div>
              <div class="text-h5 text-primary text-weight-medium animate-scale">
                {{ currentSemesterLabel || 'N/A' }}
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-8 text-bold q-mb-xs">Academic Year</div>
              <div class="text-h5 text-primary text-weight-medium animate-scale">
                {{ currentAcademicYearLabel || 'N/A' }}
              </div>
            </div>
          </div>

          <q-separator class="q-my-lg" />

          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-8 q-mb-xs">Semestral Weighted Average</div>
              <div class="summary-value text-primary text-weight-bold animate-scale">
                {{ SWA }}
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-8 q-mb-xs">Year Level Weighted Average</div>
              <div class="summary-value text-primary text-weight-bold animate-scale">
                {{ YWA }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-2 modern-card summary-right-card flex flex-center text-center">
        <q-card-section>
          <div>
            <div class="text-h5 text-grey-8 q-mb-sm">General Weighted Average</div>
            <div class="gwa-value text-primary text-weight-bold animate-scale">
              {{ GWA }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- CURRENT SEMESTER GRADES -->
    <q-card class="q-mb-md modern-card">
      <q-card-section class="cardheader">
        <div class="text-h6 text-bold">CURRENT SEMESTER</div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table
          :rows="currentGrades"
          :columns="gradeColumns"
          row-key="subjectCode"
          flat
          bordered
          :pagination="{ rowsPerPage: 0 }"
          hide-bottom
          class="grades-table current-grades-table"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="grades-table-header"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- PREVIOUS SEMESTER GRADES -->
    <q-card class="q-mb-md modern-card">
      <q-card-section class="cardheader">
        <div class="text-h6 text-bold">PREVIOUS SEMESTER</div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item
          group="semgroup"
          v-for="semester in groupedSemesters"
          :key="semester.semesterLabel"
          :label="semester.semesterLabel"
          :caption="semester.SWA"
          expand-separator
          header-class="text-primary text-weight-bold q-py-md semester-expansion-header"
          expand-icon-class="text-primary"
          class="semester-item"
        >
          <q-table
            :rows="semester.grades"
            :columns="gradeColumns"
            row-key="id"
            flat
            bordered
            hide-bottom
            :pagination="{ rowsPerPage: 0 }"
            class="grades-table previous-semester-grades-table"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="grades-table-header"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="subjectCode" :props="props">{{ props.row.subjectcode }}</q-td>
                <q-td key="description" :props="props">{{ props.row.description }}</q-td>
                <q-td key="grade" :props="props">
                  <span v-if="props.row.ledgerBalanceSemester">
                    {{ formatGrade(props.row.grade) }}
                    <q-icon name="account_balance" color="orange-8" size="xs" class="q-ml-xs">
                      <q-tooltip>Pending balance</q-tooltip>
                    </q-icon>
                  </span>
                  <span v-else>
                    {{ formatGrade(props.row.grade) }}
                  </span>
                </q-td>
                <q-td key="reex" :props="props">{{ props.row.reex }}</q-td>
                <q-td key="units" :props="props">{{ props.row.pUnit }}</q-td>
              </q-tr>
            </template>
          </q-table>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useGradesStore } from 'src/stores/grades'
import * as utils from 'src/util'

export default defineComponent({
  name: 'StudentGrades',
  data() {
    return {
      tab: 'remarks',
      userStore: useUserStore(),
      gradesStore: useGradesStore(),
      groupedSemesters: [],
      currentGrades: [],
      currentSemesterLabel: '',
      currentAcademicYearLabel: '',
      SWA: '0.0000',
      YWA: '0.0000',
      GWA: '0.0000',
      gradeColumns: [
        {
          name: 'subjectCode',
          required: true,
          label: 'Subject Code',
          align: 'left',
          field: 'subjectcode',
          sortable: false,
        },
        {
          name: 'description',
          label: 'Description',
          align: 'left',
          field: 'description',
          sortable: false,
        },
        {
          name: 'grade',
          label: 'Grade',
          align: 'center',
          field: 'grade',
          sortable: false,
        },
        {
          name: 'reex',
          label: 'Re-ex',
          align: 'center',
          field: 'reex',
          sortable: false,
        },
        {
          name: 'units',
          label: 'Units',
          align: 'center',
          field: 'pUnit',
          sortable: false,
        },
      ],
    }
  },

  mounted() {
    this.fetchAndGroupGrades()
  },

  methods: {
    calculateWeightedAverage(grades) {
      let sumGradeXUnits = 0
      let sumUnits = 0

      grades.forEach((item) => {
        const gradeValue = parseFloat(item.grade)
        const unitsValue = parseFloat(item.pUnit)

        if (!isNaN(gradeValue) && !isNaN(unitsValue) && unitsValue > 0) {
          sumGradeXUnits += gradeValue * unitsValue
          sumUnits += unitsValue
        }
      })

      if (sumUnits > 0) {
        return (sumGradeXUnits / sumUnits).toFixed(4)
      }
      return '0.0000'
    },

    formatGrade(grade) {
      const numGrade = Number(grade)
      if (isNaN(numGrade)) {
        return 'N/A'
      }
      return numGrade.toFixed(2)
    },

    /**
     * @param {string} semCode
     * @returns {string}
     */
    getAcademicYearFromSemester(semCode) {
      if (!semCode || typeof semCode !== 'string' || semCode.length < 5) return null

      const year = parseInt(semCode.substring(0, 4), 10)
      if (isNaN(year)) return null

      return `${year}-${year + 1}`
    },

    async fetchAndGroupGrades() {
      const query = {
        sn: this.userStore.userLoginInfo.code,
      }
      try {
        const fetchedGrades = await this.gradesStore.getGrades(query)

        if (fetchedGrades && fetchedGrades.length > 0) {
          const groupedBySemester = utils.groupBy(fetchedGrades, 'sem')
          const semesterKeysSortedAsc = Object.keys(groupedBySemester).sort((a, b) => {
            const yearA = parseInt(a.substring(0, 4), 10)
            const typeA = a.substring(4)
            const yearB = parseInt(b.substring(0, 4), 10)
            const typeB = b.substring(4)

            if (yearA !== yearB) return yearA - yearB
            const semTypeOrder = { 1: 1, 2: 2, S: 0, 3: 3, 4: 4, 5: 5 }
            return (semTypeOrder[typeA] || 0) - (semTypeOrder[typeB] || 0)
          })

          const currentSemesterKey = semesterKeysSortedAsc[semesterKeysSortedAsc.length - 1]

          if (currentSemesterKey) {
            this.currentGrades = groupedBySemester[currentSemesterKey]
            this.currentSemesterLabel =
              this.currentGrades[0]?.semester || `Semester ${currentSemesterKey}`
            this.SWA = this.calculateWeightedAverage(this.currentGrades)

            const academicYearMatch = this.currentSemesterLabel.match(
              /S\.Y\.\s*(\d{4}\s*-\s*\d{4})/,
            )
            this.currentAcademicYearLabel = academicYearMatch
              ? academicYearMatch[1].replace(/\s/g, '')
              : 'N/A'
          } else {
            this.currentGrades = []
            this.currentSemesterLabel = 'N/A'
            this.SWA = '0.0000'
            this.currentAcademicYearLabel = 'N/A'
          }

          this.GWA = this.calculateWeightedAverage(fetchedGrades)
          const previousSemesterKeysAsc = semesterKeysSortedAsc.slice(
            0,
            semesterKeysSortedAsc.length - 1,
          )

          this.groupedSemesters = previousSemesterKeysAsc
            .map((key) => {
              const gradesForSemester = groupedBySemester[key]
              const swaForPrevSemester = this.calculateWeightedAverage(gradesForSemester)

              return {
                semesterLabel: gradesForSemester[0]?.semester || `Semester ${key}`,
                grades: gradesForSemester,
                SWA: `SWA: ${swaForPrevSemester}`,
              }
            })
            .reverse()
          const gradesGroupedByAcademicYear = {}
          fetchedGrades.forEach((grade) => {
            const academicYear = this.getAcademicYearFromSemester(grade.sem)

            if (academicYear) {
              if (!gradesGroupedByAcademicYear[academicYear]) {
                gradesGroupedByAcademicYear[academicYear] = []
              }
              gradesGroupedByAcademicYear[academicYear].push(grade)
            }
          })

          if (
            this.currentAcademicYearLabel &&
            gradesGroupedByAcademicYear[this.currentAcademicYearLabel]
          ) {
            this.YWA = this.calculateWeightedAverage(
              gradesGroupedByAcademicYear[this.currentAcademicYearLabel],
            )
          } else {
            this.YWA = '0.0000'
          }
        } else {
          this.currentGrades = []
          this.groupedSemesters = []
          this.currentSemesterLabel = 'N/A'
          this.currentAcademicYearLabel = 'N/A'
          this.SWA = '0.0000'
          this.YWA = '0.0000'
          this.GWA = '0.0000'
        }
      } catch (error) {
        console.error('Error in fetchAndGroupGrades:', error)
        this.currentGrades = []
        this.groupedSemesters = []
        this.currentSemesterLabel = 'N/A'
        this.currentAcademicYearLabel = 'N/A'
        this.SWA = '0.0000'
        this.YWA = '0.0000'
        this.GWA = '0.0000'
      }
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
    0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow:
      0 6px 18px rgba(0, 0, 0, 0.12),
      0 3px 6px rgba(0, 0, 0, 0.08);
  }
}

.cardheader {
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
    color: #2c5282;
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
.grading-table {
  tbody tr:nth-child(even) {
    background-color: #f7fcff;
  }
}

.remarks-table,
.reference-table {
  tbody tr:nth-child(odd) {
    background-color: #f5fafd;
  }
}

// Academic Summary Cards
.summary-left-card {
  .text-h5,
  .text-h4 {
    color: #3182ce;
    font-weight: 700;
  }
  .q-separator {
    background-color: #c7c7c7;
  }
}

.summary-right-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-left: 15px;
  max-width: 100px;
  .gwa-value {
    font-size: 48px;

    @media (max-width: 1023px) {
      font-size: 40px;
    }

    @media (max-width: 599px) {
      font-size: 36px;
      color: #fff99e;
    }
  }
  .text-h5 {
    color: #2d3748;
  }
}

.summary-value {
  font-size: 36px;
  @media (max-width: 1023px) {
    font-size: 30px;
  }
  @media (max-width: 599px) {
    font-size: 28px;
  }
}

.semester-item {
  border: 1px solid #d1e0e6;
  border-radius: 10px;
  margin-bottom: 15px;
  background-color: white;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .semester-expansion-header {
    background-color: #f7fcfd;
    border-bottom: 1px solid #e0e0e0;
    .q-item__section--side {
      padding-right: 12px;
    }
  }
}
.animate-fade {
  animation: fadeIn 0.8s ease-out;
}

.animate-scale {
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
