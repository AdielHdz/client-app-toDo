<template>
  <div>
    <label :for="label">
      <h5 class="font-semibold text-sm">{{ label }}</h5>
      <input
        :id="label"
        @input="$emit('handleChange', $event)"
        :type="type"
        :name="name"
        :value="value"
        :placeholder="`escribe tu ${label.toLowerCase()}...`"
        class="w-full h-[46px] mt-1 border rounded outline-pink-500 px-3 placeholder:text-sm"
      />
    </label>
    <p
      :class="[
        'text-xs text-red-500 mt-1',
        {
          'text-transparent select-none': !existError,
        },
      ]"
    >
      {{ error }}
    </p>
  </div>
</template>
<script setup>
defineProps({
  name: String,
  type: String,
  existError: Boolean,
  label: String,
  error: String,
  value: String,
})

defineEmits(['handleChange'])
</script>
