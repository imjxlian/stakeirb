<template>
  <div class="container">
    <div class="wrapper">
      <h1>{{ user.username }}</h1>
      <RankBar class="rank-bar" :progress="user.rank_pts" />
      <div class="stats-container">
        <h2>Statistics</h2>
        <div class="stats-inner">
          <div>
            <h3>Total Bets</h3>
            <span>{{ totalBets }}</span>
          </div>
          <div>
            <h3>Total Wagered</h3>
            <div class="text-icon-flex">
              <span>{{ formattedTotalWagered }}</span>
              <CoinIcon />
            </div>
          </div>
          <div>
            <h3>Total Won</h3>
            <div class="text-icon-flex">
              <span :class="totalWon >= 0 ? 'color-green' : 'color-red'">{{
                formattedTotalWon
              }}</span>
              <CoinIcon />
            </div>
          </div>
        </div>
      </div>
      <h2>Last bets</h2>
      <table class="last-bets">
        <thead>
          <tr>
            <th>Game</th>
            <th>Bet Amount</th>
            <th>Multiplier</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bet in userBets" :key="bet.id">
            <td>{{ bet.Game.name }}</td>
            <td class="text-icon-flex">
              <span>{{ formattedBetAmount(bet.bet_amount) }}</span>
              <CoinIcon class="coin-icon" />
            </td>
            <td>{{ bet.multiplier }}x</td>
            <td>{{ formatDate(bet.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import RankBar from '../components/RankBar.vue'
import CoinIcon from '../components/CoinIcon.vue'
import { computed, onMounted, ref } from 'vue'
import { store } from '@/store'
import {getAllBetsFromUser} from "@/api/stakeirb-api";

const user = computed(() => store.getters.user)
const userBets = ref([]) // Utilisation de ref pour suivre les paris reçus

// Get all bets from user with a backend call
onMounted(async () => {
  userBets.value = await getAllBetsFromUser(user.value.uuid_user)
})

// Calcul du total des paris
const totalBets = computed(() => userBets.value.length)

// Calcul du total misé
const totalWagered = computed(() => userBets.value.reduce((acc, bet) => acc + bet.bet_amount, 0))
const formattedTotalWagered = computed(() => totalWagered.value.toLocaleString('en-US'))

// Calcul du total gagné
const totalWon = computed(
  () =>
    userBets.value.reduce((acc, bet) => acc + bet.bet_amount * bet.multiplier, 0) -
    totalWagered.value
)

const formattedTotalWon = computed(() => {
  const newTotalWon = parseInt(totalWon.value)
  return newTotalWon.toLocaleString('en-US')
})

const formattedBetAmount = (bet_amount) => {
  const newBetAmount = parseInt(bet_amount)
  return newBetAmount.toLocaleString('en-US')
}

// Fonction pour formater la date (vous pouvez ajuster cela en fonction de votre format préféré)
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}
</script>

<style scoped>
.container {
  padding: var(--padding-container);
}

.wrapper {
  width: 75%;
  background-color: var(--grey-700);
  max-width: var(--max-width);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  margin: 0 auto;
}

.rank-bar {
  margin: auto;
  width: 50%;
  margin-bottom: 2rem;
}

.stats-container {
  margin: 4rem 0;
}

.stats-inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-weight: 500;
}

.stats-inner > div {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--grey-500);
  margin: 0 1rem;
}

.stats-inner > div:first-of-type,
.stats-inner > div:last-of-type {
  margin: 0;
}

.stats-inner h3 {
  margin-top: 0;
}

.last-bets {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  text-align: center;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: var(--grey-500);
}

.last-bets th,
.last-bets td {
  padding: 1em 0.5em;
}

.last-bets td {
  font-weight: 500;
}

.last-bets tr:nth-child(2n) {
  background-color: var(--grey-700);
}

.text-icon-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.text-icon-flex img {
  margin-left: 0.4rem;
  width: fit-content;
}

.color-green {
  color: var(--green-500);
}

.color-red {
  color: var(--red-500);
}
</style>
