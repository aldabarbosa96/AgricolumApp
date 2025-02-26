<template>
  <div class="toggle-container">
    <div
      v-for="option in options"
      :key="option"
      class="toggle-option"
      :class="{ active: option === modelValue }"
      @click="$emit('update:modelValue', option)"
    >
      {{ option }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'toggleButton',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.toggle-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.toggle-option {
  padding: 8px 16px;
  background-color: #f1f1f1;
  border-radius: 20px;
  margin: 0 8px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.toggle-option.active {
  background-color: #28a745;
  color: #fff;
}
</style>
