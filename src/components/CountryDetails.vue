<template>
  <div>
    <h2>Item Details</h2>
    <p>Item ID: {{ itemId }}</p>
    <!-- rest of the content -->
  </div>
</template>

<script>
export default {
  name: "CountryDetails",
  props: {
    itemId: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log("Item ID:", this.itemId);
    // fetch the item details using the itemId
  },
};
</script>
