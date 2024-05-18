<template>
  <Navbar />
  <Hero />
  <Bio />
  <Services @showContactModal="showContactModal" />
  <ContactModal @hideContactModal="hideContactModal" v-if="renderContactModal"/>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./Navbar.vue";
import Hero from "./Hero.vue";
import Bio from "./Bio/Bio.vue";
import Services from "./Services/Services.vue";
import Footer from "./Footer/Footer.vue";
import ContactModal from "./ContactModal/ContactModal.vue";

export default defineComponent({
  components: { Navbar, Hero, Bio, Services, Footer, ContactModal },

  data() {
    return {
      renderContactModal: false,
    };
  },
  methods: {
    showContactModal() {
      this.renderContactModal = true;
    },
    hideContactModal() {
      this.renderContactModal = false;
    },
  },
  });
</script>
