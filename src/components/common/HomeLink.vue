<template>
  <!--
    상단 우측 '첫 화면으로 이동' 버튼.
    인스타 버튼과 같은 방식으로 .wrap_app 기준 absolute, 인스타 버튼 왼쪽에 나란히 위치.
    커버 화면에서는 App.vue 에서 렌더링 자체를 하지 않는다.
  -->
  <button
    class="link_home"
    type="button"
    aria-label="첫 화면으로 이동"
    @click="$emit('click')"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.8V19a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V9.8" />
    </svg>
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped lang="scss">
.link_home {
  position: absolute;
  top: max(#{$gutter-y}, env(safe-area-inset-top));
  right: calc(#{$gutter-x} + #{$tap-min} + 8px);
  z-index: 30;
  width: $tap-min;
  height: $tap-min;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: $espresso;
  background: rgba(250, 247, 242, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition:
    background 0.2s ease,
    transform 0.12s ease;
}
.link_home:active {
  transform: scale(0.93);
  background: $caramel-soft;
}
</style>
