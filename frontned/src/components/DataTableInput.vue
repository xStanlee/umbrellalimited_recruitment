<template>
  <v-combobox
    @update:model-value="(event) => $emit('onChange', event)"
    class="DataTableInput"
    :label="label"
    :items="items"
    variant="outlined"
  />
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
defineEmits(["onChange"]);
</script>

<style scoped lang="scss">
.DataTableInput {
  &:not(:last-of-type) {
    margin-right: 2rem;
  }
}
</style>
