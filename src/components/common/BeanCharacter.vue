<template>
  <!--
    캐릭터 그래픽.
    이미지 에셋이 준비되면 데이터의 image 값만 채우면 <img> 로 자동 교체된다.
    그 전까지는 SCSS 도형 기반 placeholder 가 같은 자리를 차지한다.
  -->
  <figure class="char" :class="{ 'char_light': light }">
    <img v-if="image" class="img_char" :src="image" :alt="alt" />
    <div v-else class="ph_wrap" aria-hidden="true">
      <span class="ph_bean">
        <span class="ph_crease" />
        <span class="ph_eye ph_eye_left" />
        <span class="ph_eye ph_eye_right" />
        <span class="ph_blush ph_blush_left" />
        <span class="ph_blush ph_blush_right" />
        <span class="ph_mouth" />
      </span>
      <span class="ph_shadow" />
    </div>
  </figure>
</template>

<script setup>
defineProps({
  image: { type: String, default: '' },
  alt: { type: String, default: '' },
  // 어두운 배경 위에 올릴 때
  light: { type: Boolean, default: false },
})
</script>

<style scoped lang="scss">
.char {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img_char {
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
}

// ── SCSS 도형 placeholder ──
.ph_wrap {
  position: relative;
  height: 100%;
  aspect-ratio: 1 / 1;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ph_bean {
  position: relative;
  width: 68%;
  aspect-ratio: 1 / 1.16;
  border-radius: 50% 50% 48% 48% / 46% 46% 54% 54%;
  background: linear-gradient(150deg, $caramel 0%, $espresso 92%);
  box-shadow: inset -6px -10px 18px rgba(33, 24, 21, 0.28);
}

.ph_crease {
  position: absolute;
  inset: 8% 47% 8% 47%;
  border-radius: $r-pill;
  background: rgba(33, 24, 21, 0.34);
}

.ph_eye {
  position: absolute;
  top: 42%;
  width: 8%;
  aspect-ratio: 1 / 1.35;
  border-radius: 50%;
  background: $roasted-black;
  opacity: 0.85;
}
.ph_eye_left {
  left: 27%;
}
.ph_eye_right {
  right: 27%;
}

.ph_blush {
  position: absolute;
  top: 55%;
  width: 12%;
  aspect-ratio: 1 / 0.62;
  border-radius: 50%;
  background: rgba(217, 118, 78, 0.55);
}
.ph_blush_left {
  left: 17%;
}
.ph_blush_right {
  right: 17%;
}

.ph_mouth {
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translateX(-50%);
  width: 11%;
  aspect-ratio: 1 / 0.5;
  border-bottom: 2px solid rgba(33, 24, 21, 0.7);
  border-radius: 0 0 50% 50%;
}

.ph_shadow {
  position: absolute;
  bottom: 4%;
  left: 50%;
  transform: translateX(-50%);
  width: 52%;
  height: 6%;
  border-radius: 50%;
  background: rgba(33, 24, 21, 0.14);
  filter: blur(2px);
}

// 어두운 카드 위 버전
.char_light .ph_bean {
  background: linear-gradient(150deg, rgba(250, 247, 242, 0.96) 0%, $caramel 100%);
  box-shadow: inset -6px -10px 18px rgba(61, 40, 32, 0.2);
}
.char_light .ph_crease {
  background: rgba(61, 40, 32, 0.28);
}
.char_light .ph_shadow {
  background: rgba(250, 247, 242, 0.18);
}
</style>
