<template>
  <q-page class="schedule-page-container q-pa-md q-pa-lg-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-3 order-xs-1 order-md-2">
        <q-card class="modern-card q-mb-md text-center payment-methods-card">
          <q-card-section>
            <div class="text-h6 text-bold q-mb-md text-primary">OUTSTANDING BALANCE</div>
            <div class="text-h4 text-weight-bold q-mb-lg text-green-8 animate-scale">
              {{
                transactions.length > 0
                  ? formatCurrency(transactions[transactions.length - 1].balance)
                  : '₱0.00'
              }}
            </div>
            <q-btn
              color="green-8"
              icon="payments"
              label="PAYMENT"
              class="full-width q-py-md payment-btn"
              href="https://hub.uerm.edu.ph/apps/epayments/#/academe"
              target="_blank"
              rounded
            >
              <q-tooltip class="bg-primary text-white" anchor="bottom middle" self="top middle">
                Proceed to UERM ePayments Portal
              </q-tooltip>
            </q-btn>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h6 text-bold q-mb-sm text-grey-8">PAYMENT SCHEDULE</div>
            <q-table
              :rows="paymentSchedule"
              :columns="paymentScheduleColumns"
              row-key="id"
              flat
              bordered
              :pagination="{ rowsPerPage: 0 }"
              hide-bottom
              class="grades-table payment-schedule-table"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="month" :props="props" class="text-left">
                    {{ props.row.month }}
                  </q-td>
                  <q-td key="sCHED_TOTAL" :props="props" class="text-right">
                    {{ formatCurrency(props.row.sCHED_TOTAL) }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>

          <q-card-section>
            <q-btn
              label="Other Payment Options"
              color="primary"
              text-color="primary"
              class="full-width q-mt-sm text-weight-bold other-payment-btn"
              @click="openPaymentOption()"
              outline
              rounded
            />
            <q-btn
              label="VIEW OFFICIAL RECEIPTS"
              color="yellow-9"
              text-color="dark"
              class="full-width q-mt-sm text-weight-bold view-or-btn"
              @click="openStudentOR()"
              rounded
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-9 order-xs-2 order-md-1">
        <q-card class="modern-card ledger-table-card">
          <q-card-section class="cardheader">
            <div class="text-h6 text-bold">STUDENT LEDGER</div>
          </q-card-section>

          <div class="flex flex-center" v-if="loading">
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 150px 0;
              "
            >
              <q-spinner-cube color="primary" size="100px" />
              <div class="text-primary q-mt-md text-h6">Loading Ledger Data...</div>
            </div>
          </div>

          <q-card-section v-else>
            <q-table
              :rows="transactions"
              :columns="ledgerColumns"
              row-key="id"
              flat
              bordered
              :pagination="{ rowsPerPage: 0 }"
              hide-bottom
              class="grades-table ledger-main-table"
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
                  <q-td key="sY" :props="props">
                    {{ props.row.sY }}
                  </q-td>
                  <q-td key="semster" :props="props">
                    {{ props.row.semster || '-1' }}
                  </q-td>
                  <q-td key="dateTrans" :props="props">
                    {{ props.row.dateTrans }}
                  </q-td>
                  <q-td key="item" :props="props">
                    {{ props.row.item }}
                  </q-td>
                  <q-td key="reference" :props="props">
                    {{ props.row.reference }}
                  </q-td>
                  <q-td key="debit" :props="props" class="text-right text-green-7">
                    {{ formatCurrency(props.row.debit) }}
                  </q-td>
                  <q-td key="credit" :props="props" class="text-right text-red-7">
                    {{ formatCurrency(props.row.credit) }}
                  </q-td>
                  <q-td key="balance" :props="props" class="text-right text-bold text-primary">
                    {{ formatCurrency(props.row.balance) }}
                  </q-td>
                </q-tr>
              </template>
              <template v-slot:no-data>
                <div class="full-width row flex-center text-primary q-pa-md">
                  <q-icon name="info" size="2em" />
                  <span class="q-ml-sm text-subtitle1">No ledger data available.</span>
                </div>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Payment Option Dialog -->
    <q-dialog v-model="paymentOption" full-height full-width maximized class="modern-dialog">
      <q-card class="fit">
        <q-card-section
          class="text-white q-py-sm dialog-header"
          style="
            background: linear-gradient(135deg, #2b6cb0 0%, #4299e1 100%);
            position: relative;
            overflow: hidden;
            padding: 16px;
          "
        >
          <div class="row justify-between items-center">
            <span class="text-h6 text-uppercase"> OTHER PAYMENT OPTIONS </span>
            <span>
              <q-btn icon="close" color="white" round flat v-close-popup></q-btn>
            </span>
          </div>
        </q-card-section>
        <div
          v-if="!paymentLoading"
          class="row justify-center items-center bg-grey-2 full-height full-width"
        >
          <q-card-section class="q-pa-none flex flex-center" style="max-height: 90vh">
            <img
              src="../assets/payment.jpeg"
              style="max-width: 100%; max-height: 100%; object-fit: contain"
              alt="Payment Options"
            />
          </q-card-section>
        </div>
        <q-inner-loading
          :showing="paymentLoading"
          label-class="text-primary"
          label-style="font-size: 1.2em"
        >
          <q-spinner-cube size="100px" color="primary" />
          <div class="text-h6 q-mt-md text-primary">Loading Content...</div>
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useLedgerStore } from 'src/stores/ledger'

export default defineComponent({
  name: 'StudentLedgerComponent',
  data() {
    return {
      ledgerStore: useLedgerStore(),
      userStore: useUserStore(),
      transactions: [],
      paymentSchedule: [],
      paymentOption: false,
      paymentLoading: true,
      // loading: 'load',
      ledgerColumns: [
        {
          name: 'sY',
          required: true,
          label: 'SCHOOL YEAR',
          align: 'left',
          field: 'sY',
          sortable: false,
        },
        {
          name: 'semster',
          required: true,
          label: 'SEMESTER',
          align: 'left',
          field: 'semster',
          sortable: false,
        },
        {
          name: 'dateTrans',
          required: true,
          label: 'TRANSACTION DATE',
          align: 'left',
          field: 'dateTrans',
          sortable: false,
        },
        {
          name: 'item',
          required: true,
          label: 'PARTICULAR',
          align: 'left',
          field: 'item',
          sortable: false,
        },
        {
          name: 'reference',
          required: true,
          label: 'REFERENCE',
          align: 'left',
          field: 'reference',
          sortable: false,
        },
        {
          name: 'debit',
          required: true,
          label: 'PAYMENT',
          align: 'right',
          field: 'debit',
          sortable: false,
        },
        {
          name: 'credit',
          required: true,
          label: 'ASSESSMENT',
          align: 'right',
          field: 'credit',
          sortable: false,
        },
        {
          name: 'balance',
          required: true,
          label: 'BALANCE',
          align: 'right',
          field: 'balance',
          sortable: false,
        },
      ],
      paymentScheduleColumns: [
        {
          name: 'month',
          required: true,
          label: 'MONTH',
          align: 'left',
          field: 'month',
          sortable: false,
        },
        {
          name: 'sCHED_TOTAL',
          required: true,
          label: 'AMOUNT',
          align: 'right',
          field: 'sCHED_TOTAL',
          sortable: false,
        },
      ],
    }
  },

  mounted() {
    this.fetchedStudentLedger()
    this.fetchedPaymentSchedule()
  },

  methods: {
    async fetchedStudentLedger() {
      const query = {
        sn: this.userStore.userLoginInfo.code,
      }

      try {
        const fetchedLedger = await this.ledgerStore.getLedger(query)

        if (fetchedLedger) {
          this.transactions = Array.isArray(fetchedLedger) ? fetchedLedger : [fetchedLedger]
        } else {
          this.transactions = []
        }
      } catch (error) {
        console.error('Error fetching student ledger:', error)
      }
    },

    async fetchedPaymentSchedule() {
      const query = {
        sn: this.userStore.userLoginInfo.code,
      }

      try {
        const fetchedPaymentDetails = await this.ledgerStore.getPaymentSchedule(query)
        this.paymentSchedule = Array.isArray(fetchedPaymentDetails)
          ? fetchedPaymentDetails
          : [fetchedPaymentDetails]
      } catch (error) {
        console.error('Error fetching transaction details:', error)
      }
    },

    formatCurrency(amount) {
      const numAmount = Number(amount)
      if (isNaN(numAmount)) {
        return '₱N/A'
      }
      return `₱${numAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    },

    openPaymentOption() {
      this.paymentOption = true
      this.paymentLoading = true
      setTimeout(() => {
        this.paymentLoading = false
      }, 1500)
    },

    openStudentOR() {
      console.log('Opening Student Official Receipts')
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

// Reused modern card styles
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

// Reused table styles
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

.ledger-main-table {
  tbody tr:nth-child(even) {
    background-color: #f7fcff;
  }
}

.payment-schedule-table {
  .q-th {
    background-color: #e0f7fa;
    color: #00796b;
  }
  tbody tr:nth-child(odd) {
    background-color: #f5fafd;
  }
  .q-td.text-right {
    font-weight: 600;
    color: #00796b;
  }
}

// Payment Methods Card Styling
.payment-methods-card {
  padding: 16px;
  .q-btn {
    margin-bottom: 12px;
  }
  .payment-btn {
    background: linear-gradient(135deg, #28a745 0%, #218838 100%) !important;
    font-size: 1rem;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.2);
  }
  .other-payment-btn {
    border: 2px solid #4299e1;
    color: #4299e1;
    background-color: #ebf8ff;
    &:hover {
      background-color: #4299e1;
      color: white;
      box-shadow: 0 4px 8px rgba(66, 153, 225, 0.2);
    }
  }
  .view-or-btn {
    background-color: #ffc107;
    color: #333;
    &:hover {
      background-color: #e0a800;
      box-shadow: 0 4px 8px rgba(255, 193, 7, 0.2);
    }
  }
}

// Outstanding Balance Display
.text-green-8 {
  color: #1976d2; // Using the primary blue for balance
}

// Payment Option Dialog
.modern-dialog .q-card {
  border-radius: 12px;
}

.dialog-header {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: linear-gradient(
    135deg,
    #2b6cb0 0%,
    #4299e1 100%
  ) !important; // Consistent header gradient
}

// Animations for a touch of dynamism
.animate-scale {
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
