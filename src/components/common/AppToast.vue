<template>
  <Transition name="toast">
    <div v-if="show" class="toast" role="status" aria-live="polite">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false },
  message: { type: String, default: '' },
})
</script>

<style scoped lang="scss">
// .wrap_app(relative) 기준 absolute — fixed 미사용
.toast {
  position: absolute;
  left: 50%;
  bottom: calc(#{$bar-h} + 20px);
  transform: translateX(-50%);
  z-index: 60;
  max-width: calc(100% - #{$gutter-x * 4});
  padding: 10px 18px;
  border-radius: $r-pill;
  background: rgba(33, 24, 21, 0.92);
  color: $milk-foam;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
</style>
