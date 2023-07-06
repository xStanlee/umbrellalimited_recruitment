<template>
  <v-combobox
    @update:search="searchHandler"
    color="darkgreen"
    class="DataTableInput"
    :label="label"
    :items="items"
    variant="outlined"
  />
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["onChange"]);

const searchHandler = (val) => {
  const _items = props.items.filter((item) => item.includes(val.toUpperCase()));
  emit("onChange", _items);
};
</script>

<style scoped lang="scss">
.DataTableInput {
  width: 15rem;
}
</style>
