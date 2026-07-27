<template>
  <header class="header_screen">
    <button
      class="btn_back"
      type="button"
      :disabled="!canBack"
      aria-label="이전으로"
      @click="$emit('back')"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <div class="group_head_mid">
      <p v-if="label" class="label_head">{{ label }}</p>
      <p v-if="progress" class="progress_head">
        <b>{{ progress.current }}</b
        ><span>/{{ progress.total }}</span>
      </p>
    </div>
  </header>
</template>

<script setup>
defineProps({
  canBack: { type: Boolean, default: true },
  label: { type: String, default: '' },
  // { current, total } — 폼지 진행 표시
  progress: { type: Object, default: null },
})
defineEmits(['back'])
</script>

<style scoped lang="scss">
.btn_back {
  flex-shrink: 0;
  width: $tap-min;
  height: $tap-min;
  margin-left: -10px; // 아이콘 광학 정렬(터치 영역은 유지)
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: $espresso;
  transition:
    opacity 0.2s ease,
    background 0.2s ease;
}
.btn_back:disabled {
  opacity: 0.25;
}
.btn_back:active:not(:disabled) {
  background: $caramel-soft;
}

.group_head_mid {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 20px;
}

.label_head {
  font-family: $font-title;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: $caramel;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress_head {
  flex-shrink: 0;
  font-family: $font-title;
  font-size: 14px;
  color: $espresso-soft;
  letter-spacing: 0.04em;

  b {
    font-weight: 700;
    color: $espresso;
    font-size: 16px;
  }
}
</style>
