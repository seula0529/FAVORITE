<template>
  <button
    class="btn"
    :class="[`btn_${variant}`, { 'btn_block': block }]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | ghost | subtle
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})
defineEmits(['click'])
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  // 터치 영역 최소 44px 확보
  min-height: $tap-min + 4px;
  min-width: $tap-min;
  padding: 0 20px;
  border-radius: $r-pill;
  font-family: $font-title;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.12s ease;

  @include small-device {
    font-size: 14px;
    padding: 0 16px;
  }
}

.btn_block {
  width: 100%;
}

.btn:active:not(:disabled) {
  transform: scale(0.975);
}

.btn:disabled {
  opacity: 0.32;
}

.btn_primary {
  background: $espresso;
  color: $milk-foam;
}

.btn_ghost {
  background: transparent;
  color: $espresso;
  border: 1px solid $espresso-line;
}

.btn_subtle {
  background: $caramel-soft;
  color: $espresso;
}
</style>
