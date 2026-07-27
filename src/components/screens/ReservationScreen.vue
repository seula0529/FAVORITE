<template>
  <section class="section_common section_reservation" :class="screenClass">
    <ScreenHeader :can-back="canBack" label="Reservation" @back="$emit('back')" />

    <div class="cont_screen cont_rsv">
      <!-- 입력 4개: 이름 / 연락처 / 나이 / MBTI -->
      <div class="grid_rsv_fields">
        <label
          v-for="field in FIELDS"
          :key="field.key"
          class="field_rsv"
          :class="`field_rsv_${field.key}`"
        >
          <span class="label_rsv">{{ field.label }}</span>
          <input
            v-model="form[field.key]"
            class="inp_rsv"
            :type="field.type"
            :inputmode="field.inputmode"
            :autocomplete="field.autocomplete"
            :placeholder="field.placeholder"
            :maxlength="field.maxlength"
            @input="onInput(field.key)"
          />
        </label>
      </div>

      <!-- 개인정보 수집·이용 동의 -->
      <div class="wrap_rsv_consent">
        <p class="txt_rsv_consent_desc">{{ CONSENT.text }}</p>
        <label class="lbl_rsv_consent">
          <input
            v-model="agreed"
            type="checkbox"
            class="chk_rsv_consent"
          />
          <span>{{ CONSENT.label }}</span>
        </label>
      </div>
    </div>

    <footer class="footer_screen">
      <AppButton variant="primary" block :disabled="!canSend" @click="sendSms">
        문자로 보내기
      </AppButton>
    </footer>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import ScreenHeader from '@/components/common/ScreenHeader.vue'
import AppButton from '@/components/common/AppButton.vue'
import {
  CONSENT,
  EMPTY_MARK,
  FIELDS,
  TEMPLATE,
  TOKEN_MAP,
} from '@/data/reservation.js'

defineProps({
  screenClass: { type: String, default: '' },
  canBack: { type: Boolean, default: true },
})

defineEmits(['back'])

// 입력값은 로컬 상태로만 유지 — 서버 전송/저장 없음
const form = reactive({ name: '', phone: '', age: '', mbti: '' })
const agreed = ref(false)

function onInput(key) {
  if (key === 'phone') {
    const digits = form.phone.replace(/\D/g, '').slice(0, 11)
    form.phone = digits
      .replace(/^(\d{3})(\d{1,4})$/, '$1-$2')
      .replace(/^(\d{3})(\d{4})(\d{1,4})$/, '$1-$2-$3')
  }
  if (key === 'age') {
    form.age = form.age.replace(/\D/g, '').slice(0, 3)
  }
  if (key === 'mbti') {
    form.mbti = form.mbti.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4)
  }
}

// 템플릿 토큰 실시간 치환
const preview = computed(() =>
  Object.entries(TOKEN_MAP).reduce(
    (text, [key, token]) => text.split(token).join(form[key]?.trim() || EMPTY_MARK),
    TEMPLATE,
  ),
)

const canSend = computed(() => agreed.value && !!form.phone)

function sendSms() {
  if (!canSend.value) return

  const rawPhone = form.phone.replace(/-/g, '')
  const text = preview.value
  const encoded = encodeURIComponent(text)
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent)

  if (isIos) {
    // iOS: sms://번호?body=내용 (슬래시 두 개가 수신자 번호 인식에 필수)
    window.location.href = `sms://${rawPhone}?body=${encoded}`
  } else {
    // Android: smsto:번호:내용
    window.location.href = `smsto:${rawPhone}:${text}`
  }
}
</script>

<style scoped lang="scss">
.cont_rsv {
  padding-top: 4px;
  gap: 10px;
}

// ── 입력 ──
// 라벨을 별도 줄이 아니라 입력창 안쪽에 인라인으로 배치한다.
// → 세로 높이를 줄여 키보드가 올라와도 4개 입력이 모두 화면에 남는다.
.grid_rsv_fields {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.field_rsv_name,
.field_rsv_phone {
  grid-column: 1 / -1;
}

.field_rsv {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  // 터치 영역 최소 44px 이상 유지
  height: 48px;
  padding: 0 12px;
  border: 1px solid $espresso-line;
  border-radius: $r-md;
  background: rgba(250, 247, 242, 0.7);
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:focus-within {
    border-color: $caramel;
    background: $milk-foam;
  }
}

.label_rsv {
  flex-shrink: 0;
  min-width: 30px;
  font-family: $font-title;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: $espresso-soft;
}

.inp_rsv {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
  // iOS 자동 확대 방지 (16px 미만이면 포커스 시 줌인됨)
  font-size: 16px;
  line-height: 1.2;
  color: $espresso;
  outline: none;

  &::placeholder {
    color: rgba(61, 40, 32, 0.3);
  }
}

// ── 키보드가 올라온 동안의 컴팩트 모드 ──
// useVisualViewport 가 <html> 에 data-keyboard="open" 을 붙인다.
// 컨테이너가 줄어든 만큼 입력 영역도 조여서, 입력창이 잘리지 않게 한다.
html[data-keyboard='open'] {
  .grid_rsv_fields {
    gap: 6px;
  }
  .cont_rsv {
    gap: 6px;
    padding-top: 0;
  }
}

// ── 개인정보 동의 ──
.wrap_rsv_consent {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.txt_rsv_consent_desc {
  font-size: 10.5px;
  line-height: 1.45;
  color: $espresso-soft;
  word-break: keep-all;
}

.lbl_rsv_consent {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: $font-title;
  font-size: 12px;
  font-weight: 500;
  color: $espresso;
  cursor: pointer;
}

.chk_rsv_consent {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: $caramel;
  cursor: pointer;
}
</style>
