<template>
  <div class="dice-container">
    <div class="bets-history">
      <PreviousRoll :bet="bet" v-for="bet in lastBets" :key="bet" />
    </div>

    <div
      class="bar"
      :style="`background-color: ${
        isUnder ? 'var(--color-red-primary)' : 'var(--color-green-primary)'
      }`"
    >
      <div
        class="bar-inner"
        :style="`width: ${range}%; background-color: ${
          isUnder ? 'var(--color-green-primary)' : 'var(--color-red-primary)'
        }`"
      >
        <div class="dice" :style="`left: ${result}%`">
          <img
            src="../assets/images/games/dice/dice.svg"
            alt="Dice"
            class=""
            :style="`left: ${result}%;`"
          />
          <span
            :style="`color: ${win ? 'var(--color-green-primary)' : 'var(--color-red-primary)'}`"
            >{{ result }}</span
          >
        </div>
      </div>
      <input type="range" class="bar-range" step="0.01" min="2" max="98" v-model="range" />
    </div>

    <div class="bet-infos">
      <InputNumber
        :step="1"
        :min="0"
        :value="multiplier"
        :label="'Multiplier'"
        :imageSrc="'../src/assets/images/icons/x.svg'"
        :disabled="false"
        :actions="[]"
      />

      <InputNumber
        :step="1"
        :type="'submit'"
        :min="0"
        :value="range"
        :label="'Roll ' + textUnderOver"
        :imageSrc="'../src/assets/images/icons/double-arrows.svg'"
        :disabled="false"
        :onclick="changeSide"
        :actions="[]"
      />

      <InputNumber
        :step="1"
        :min="0"
        :value="probabilityOfWinning"
        :label="'Chance of Winning'"
        :imageSrc="'../src/assets/images/icons/percent.svg'"
        :disabled="false"
        :actions="[]"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import InputNumber from './inputs/InputNumber.vue'
import PreviousRoll from './PreviousRoll.vue'

let betsHistory = ref([
  { win: true, result: 13.32 },
  { win: false, result: 63.02 },
  { win: true, result: 29.1 },
  { win: true, result: 100.0 },
  { win: false, result: 23.32 },
  { win: true, result: 22.12 },
  { win: true, result: 23.32 },
  { win: false, result: 13.32 },
  { win: true, result: 2.12 }
])

let range = ref(50)
let isUnder = ref(true)
let result = ref((50.0).toFixed(2))

let win = computed(() =>
  isUnder.value
    ? parseFloat(result.value) <= parseFloat(range.value)
    : parseFloat(result.value) > parseFloat(range.value)
)
let textUnderOver = computed(() => (isUnder.value ? 'Under' : 'Over'))

let probabilityOfWinning = computed(() => {
  const value = isUnder.value ? parseFloat(range.value) : 100 - parseFloat(range.value)
  return value.toFixed(2)
})

let multiplier = computed(() => {
  return (100 / probabilityOfWinning.value).toFixed(2)
})

let lastBets = computed(() => {
  return betsHistory.value.slice(0, 5)
})

const changeSide = () => {
  isUnder.value = !isUnder.value
  result.value = (Math.random() * 100).toFixed(2)
}
</script>

<style scoped>
.dice-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 5rem;
}

.bar {
  height: 0.7rem;
  border: 0.7rem solid var(--grey-700);
  box-shadow: 0 0 0 0.9rem var(--grey-400);
  border-radius: 5rem;
  position: relative;
}

.bar-inner {
  height: 100%;
  border-radius: 0.5rem;
}

.bar-range {
  position: absolute;
  top: 0;
  left: 0;
  background: transparent !important;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 100%;
}

.bar-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 3rem;
  width: 3rem;
  border-radius: 0.5rem;
  background-color: var(--color-blue-primary);
  cursor: pointer;
  margin-top: -0.4rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-image: linear-gradient(var(--color-blue-secondary), var(--color-blue-secondary)),
    linear-gradient(var(--color-blue-secondary), var(--color-blue-secondary)),
    linear-gradient(var(--color-blue-secondary), var(--color-blue-secondary));
  background-size:
    0.2rem 40%,
    0.2rem 50%,
    0.2rem 40%;
  background-position:
    0.8rem 1rem,
    1.4rem 0.8rem,
    2rem 1rem;
  background-repeat: no-repeat;
}

.bar-range::-webkit-slider-thumb:hover {
  cursor: grab;
}

.bar-range::-webkit-slider-thumb:active {
  cursor: grabbing;
}

.bet-infos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background-color: var(--grey-500);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-top: auto;
}

.bet-infos > * {
  flex-grow: 1;
}

.flex-column {
  gap: 0.1rem;
}

.dice {
  position: absolute;
  height: 5rem;
  bottom: 50%;
}

.dice img {
  position: absolute;
  height: 5rem;
  top: 0;
  left: 0;
  transform: translate(-50%);
}

.dice span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  text-shadow: 0 1px 0 #fff;
}

.bets-history {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
  font-size: 0.7rem;
  margin-bottom: 3rem;
}
</style>
