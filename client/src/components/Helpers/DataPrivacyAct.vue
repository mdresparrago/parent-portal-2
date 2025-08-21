<template>
  <q-dialog v-model="showPrivacyModal">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">COOKIE CONSENT</div>
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
</template>

<script>
import { useUserStore } from 'src/stores/user'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'DataPrivacyAct',
  data() {
    return {
      userStore: useUserStore(),
      useRouter: useRouter(),
    }
  },

  computed: {
    showPrivacyModal: {
      get() {
        return !this.useUserStore.hasAcceptedPrivacyAct
      },

      set(value) {
        console.log('attempted to show the privacy modal:', value)
      },
    },
  },

  methods: {
    async handleAccept() {
      this.userStore.setPrivacyAccepted(true)
      this.$router.push('/home')
    },

    async handleDecline() {
      this.userStore.inauthenticate()
      this.$router.push('/')
    },
  },
})
</script>
