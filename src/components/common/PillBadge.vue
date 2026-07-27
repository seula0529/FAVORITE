<template>
  <span class="pill" :class="`pill_on_${ink}`">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  // 배지가 올라갈 면의 글자색 계열. 원두 카드의 bean.ink 를 그대로 넘긴다.
  //  'default' — 크림 배경 위 (기본)
  //  'dark'    — 밝은 그라데이션 카드 위 (카드 글자가 어두움)
  //  'light'   — 어두운 그라데이션 카드 위 (카드 글자가 밝음)
  ink: { type: String, default: 'default' },
})
</script>

<style scoped lang="scss">
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 4px 9px;
  border-radius: $r-pill;
  font-family: $font-body;
  font-size: 10.5px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @include small-device {
    font-size: 10px;
    padding: 4px 8px;
  }
}

.pill_on_default {
  background: $caramel-soft;
  color: $espresso;
}

// 밝은 카드 위 — 흰 알약 + 어두운 글자
.pill_on_dark {
  background: rgba(250, 247, 242, 0.86);
  color: $roasted-black;
  border: 1px solid rgba(33, 24, 21, 0.08);
}

// 어두운 카드 위 — 어두운 알약 + 밝은 글자
.pill_on_light {
  background: rgba(33, 24, 21, 0.34);
  color: $milk-foam;
  border: 1px solid rgba(250, 247, 242, 0.22);
}
</style>
