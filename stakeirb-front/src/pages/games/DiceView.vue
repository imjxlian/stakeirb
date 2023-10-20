<template>
  <div class="container">
    <div class="wrapper">
      <div class="card">
        <div class="card-left">
          <InputNumber
            class="bet-amount-input"
            :step="1"
            :min="1"
            :value="betAmount"
            :label="'Bet Amount'"
            :imageSrc="'../src/assets/images/icons/coineirb.png'"
            :disabled="false"
            :actions="[
              { value: '½', action: divideBy2 },
              { value: '2x', action: multiplyBy2 },
              { value: 'Max', action: maxBet }
            ]"
            @update:value="(newVal) => (betAmount = Number(newVal))"
          />
          <InputNumber
            :step="1"
            :min="0"
            :value="betAmount * 2"
            :label="'Win Amount'"
            :imageSrc="'../src/assets/images/icons/coineirb.png'"
            :disabled="true"
            :actions="[{ value: 'Copy' }]"
          />
          <InputButton
            class="bet-btn"
            :value="'Bet'"
            :type="'success'"
            :disabled="false"
            :action="
              () => {
                console.log('Bet')
              }
            "
          />
        </div>
        <div class="card-right">
          <DiceBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DiceBar from '../../components/DiceBar.vue'
import InputNumber from '../../components/inputs/InputNumber.vue'
import InputButton from '../../components/inputs/InputButton.vue'
import { ref } from 'vue'

let betAmount = ref(0)
const MAX_BET_AMOUNT = 1000000

const divideBy2 = () => {
  betAmount.value /= 2
}

const multiplyBy2 = () => {
  betAmount.value *= 2
}

const maxBet = () => {
  betAmount.value = MAX_BET_AMOUNT
}
</script>

<style scoped>
.bet-btn {
  margin-top: 1rem;
  padding: 1rem;
}

.card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  background-color: var(--color-background-dark);
  border-radius: 1px solid grey;
  gap: 0;
  border-radius: 0.5rem;
  overflow: hidden;
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
  margin: auto;
  padding: 3rem;
  width: 100%;
}

.bet-amount-input {
  min-width: 300px;
}
</style>
