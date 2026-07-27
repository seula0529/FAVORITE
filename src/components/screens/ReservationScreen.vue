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

      <!-- 실시간 치환 프리뷰 -->
      <div class="group_rsv_preview_head">
        <span class="label_rsv_preview txt_label">문자 미리보기</span>
        <span class="desc_rsv_notice">{{ NOTICE }}</span>
      </div>
      <div class="box_rsv_preview" aria-live="polite">
        <pre class="txt_rsv_preview">{{ preview }}</pre>
      </div>
    </div>

    <footer class="footer_screen">
      <AppButton variant="primary" block @click="handleCopy">
        문자 내용 복사하기
      </AppButton>
    </footer>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue'
import ScreenHeader from '@/components/common/ScreenHeader.vue'
import AppButton from '@/components/common/AppButton.vue'
import { useClipboard } from '@/composables/useClipboard.js'
import {
  EMPTY_MARK,
  FIELDS,
  NOTICE,
  TEMPLATE,
  TOKEN_MAP,
} from '@/data/reservation.js'

defineProps({
  screenClass: { type: String, default: '' },
  canBack: { type: Boolean, default: true },
})

const emit = defineEmits(['back', 'toast'])

// 입력값은 로컬 상태로만 유지 — 서버 전송/저장 없음
const form = reactive({ name: '', phone: '', age: '', mbti: '' })

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

const { copy } = useClipboard()

async function handleCopy() {
  const ok = await copy(preview.value)
  emit('toast', ok ? '문자 내용이 복사되었어요' : '복사에 실패했어요. 길게 눌러 복사해 주세요')
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

// ── 프리뷰 ──
.group_rsv_preview_head {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.label_rsv_preview {
  flex-shrink: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $caramel;
}

// 320px 폭에서도 잘리지 않도록 말줄임 대신 줄바꿈을 허용한다
.desc_rsv_notice {
  min-width: 0;
  font-size: 10px;
  line-height: 1.3;
  color: rgba(61, 40, 32, 0.42);
}

.box_rsv_preview {
  flex: 1;
  min-height: 0;
  border: 1px solid $espresso-line;
  border-radius: $r-md;
  background: rgba(200, 138, 88, 0.08);
  padding: 12px;
  // 문자 원문이 길 수 있어 내부에서만 터치 스크롤을 허용하되,
  // 스크롤바 자체는 노출하지 않는다.
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

// ── 키보드가 올라온 동안의 컴팩트 모드 ──
// useVisualViewport 가 <html> 에 data-keyboard="open" 을 붙인다.
// 컨테이너가 줄어든 만큼 입력 영역도 조여서, 입력창이 잘리지 않게 한다.
html[data-keyboard='open'] {
  .grid_rsv_fields {
    gap: 6px;
  }
  .group_rsv_preview_head {
    display: none;
  }
  .cont_rsv {
    gap: 6px;
    padding-top: 0;
  }
}

.txt_rsv_preview {
  margin: 0;
  font-family: $font-body;
  font-size: 12px;
  line-height: 1.62;
  color: $espresso;
  white-space: pre-wrap;
  word-break: break-word;

  @include small-device {
    font-size: 11.5px;
    line-height: 1.5;
  }
}
</style>
