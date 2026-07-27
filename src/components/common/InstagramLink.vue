<template>
  <!--
    position: fixed 를 쓰지 않는다.
    .wrap_app(position: relative) 기준 absolute 로 우측 상단에 고정.
  -->
  <a
    class="link_insta"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="인스타그램 열기"
  >
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  </a>
</template>

<script setup>
defineProps({
  href: { type: String, required: true },
})
</script>

<style scoped lang="scss">
.link_insta {
  position: absolute;
  top: max(#{$gutter-y}, env(safe-area-inset-top));
  right: $gutter-x;
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
.link_insta:active {
  transform: scale(0.93);
  background: $caramel-soft;
}
</style>
