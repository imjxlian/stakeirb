<template>
  <div class="container">
    <div class="wrapper">
      <div class="card">
        <div class="card-left">
          <InputNumber
            class="bet-amount-input"
            :step="1"
            :min="1"
            :value="betAmount.toFixed(0)"
            label="Bet Amount"
            imageSrc="../src/assets/images/icons/coineirb.png"
            :disabled="false"
            :actions="inputActions"
            @update:value="updateBetAmount"
          />
          <InputNumber
            :step="1"
            :min="0"
            :value="(betAmount * multiplier).toFixed(0)"
            label="Win Amount"
            imageSrc="../src/assets/images/icons/coineirb.png"
            :disabled="true"
            :actions="[{ value: 'Copy' }]"
          />
          <InputButton class="bet-btn" value="Bet" type="success" :disabled="false" :action="bet" />
        </div>
        <div class="card-right">
          <DiceBar
            :range="range"
            :isUnder="isUnder"
            :result="result"
            :multiplier="multiplier"
            :betsHistory="betsHistory"
            :hideDice="hideDice"
            :diceScale="diceScale"
            @update-isUnder="toggleIsUnder"
            @update-range="updateRange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DiceBar from '../../components/DiceBar.vue'
import InputNumber from '../../components/inputs/InputNumber.vue'
import InputButton from '../../components/inputs/InputButton.vue'
import { computed, ref } from 'vue'
import axios from 'axios'

const MAX_BET_AMOUNT = 1000000
const MAX_BETS_HISTORY = 5

let betAmount = ref(0)
let range = ref((50.0).toFixed(2))
let isUnder = ref(true)
let result = ref((0.0).toFixed(2))
let betsHistory = ref([])
let hideDice = ref(true)
let diceScale = ref(0.95)

const multiplier = computed(() =>
  isUnder.value ? (100 / range.value).toFixed(2) : (100 / (100 - range.value)).toFixed(2)
)

const inputActions = [
  { value: '½', action: divideBy2 },
  { value: '2x', action: multiplyBy2 },
  { value: 'Max', action: maxBet }
]

function updateBetAmount(newVal) {
  betAmount.value = Number(newVal)
}

function divideBy2() {
  betAmount.value = Math.floor(betAmount.value / 2)
}

function multiplyBy2() {
  if (betAmount.value * 2 > MAX_BET_AMOUNT || betAmount.value == 0) {
    betAmount.value = betAmount.value === 0 ? 1 : MAX_BET_AMOUNT
    return
  }
  betAmount.value = Math.floor(betAmount.value * 2)
}

function maxBet() {
  betAmount.value = MAX_BET_AMOUNT
}

function toggleIsUnder() {
  isUnder.value = !isUnder.value
  range.value = (100 - parseFloat(range.value)).toFixed(2)
}

function updateRange(newVal) {
  playSound('../src/assets/sounds/tick.mp3')
  range.value = parseFloat(newVal).toFixed(2)
}

let hideTimer = null

async function bet() {
  playSound('../src/assets/sounds/bet.mp3')
  await sleep(200)

  // Make a call with axios
  let res = await axios.post('http://localhost:3000/games/dice', {
    is_under: isUnder.value,
    target: range.value,
    bet_amount: betAmount.value,
    uuid_user: 'f7e727c6-257d-4f40-8017-52c31f1f82ca' // TODO: Replace by the user id
  })

  // TODO: Handle errors
  if (res.data.error) {
    console.log(res.data.error)
    return
  }

  try {
    result.value = res.data.data.result
    result.value = parseFloat(result.value).toFixed(2)
  } catch (e) {
    console.log(e)
    return
  }

  const won = checkWin()
  const newBet = { id: Date.now(), win: won, result: parseFloat(result.value) }
  betsHistory.value.push(newBet)

  if (betsHistory.value.length > MAX_BETS_HISTORY) {
    betsHistory.value.shift()
  }

  playSound('../src/assets/sounds/rolling.mp3')

  if (won) setTimeout(() => playSound('../src/assets/sounds/win.mp3'), 300)

  animateDiceRoll()
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function playSound(src) {
  const audio = new Audio(src)
  audio.play()
}

function checkWin() {
  return (
    (isUnder.value && parseFloat(result.value) <= parseFloat(range.value)) ||
    (!isUnder.value && parseFloat(result.value) > parseFloat(range.value))
  )
}

function animateDiceRoll() {
  clearTimeout(hideTimer)

  hideDice.value = false
  diceScale.value = 0.95

  setTimeout(() => {
    diceScale.value = 1.15
    setTimeout(() => {
      diceScale.value = 1
      hideTimer = setTimeout(() => (hideDice.value = true), 3000)
    }, 100)
  }, 300)
}
</script>

<style scoped>
.container {
  padding: var(--padding-container);
}

.container .wrapper .card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  background-color: var(--color-background-dark);
  border-radius: 0.5rem;
  gap: 0;
  overflow: hidden;
}

.wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
}

.card-left {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 2rem;
  gap: 1rem;
  background-color: var(--grey-500);
}

.card-right {
  padding: 3rem 5rem;
  margin: auto;
  width: calc(100% - 10rem);
}

.bet-btn {
  margin-top: 1rem;
  padding: 1rem;
}

.bet-amount-input {
  min-width: 300px;
}

@media (max-width: 1000px) {
  .card {
    flex-direction: column-reverse !important;
    justify-content: flex-start !important;
  }

  .card-right {
    padding: 3rem 2rem !important;
    width: calc(100% - 4rem) !important;
  }
}
</style>
