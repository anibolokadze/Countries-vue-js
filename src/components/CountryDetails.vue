<template>
  <div>
    <header>
      <!-- Header content here -->
    </header>

    <h2>Country Detail</h2>
    <p>{{ greeting }} {{ country }}</p>
    <!-- Other content -->

    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    country() {
      return this.name;
    },
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
