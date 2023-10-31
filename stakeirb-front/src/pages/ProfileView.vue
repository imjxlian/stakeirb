<template>
  <div class="container">
    <div class="wrapper">
      <h1>Swarton1</h1>
      <RankBar class="rank-bar" :progress="progress" />
      <div class="stats-container">
        <h2>Statistics</h2>
        <div class="stats-inner">
          <div>
            <h3>Total Bets</h3>
            <span>4,573</span>
          </div>
          <div>
            <h3>Total Wagered</h3>
            <div class="text-icon-flex">
              <span>409,200</span>
              <CoinIcon />
            </div>
          </div>
          <div>
            <h3>Total Won</h3>
            <div class="text-icon-flex">
              <span :class="amountWon >= 0 ? 'color-green' : 'color-red'">{{ formattedAmountWon }}</span>
              <CoinIcon />
            </div>
          </div>
        </div>
      </div>
      <h2>Last bets</h2>
      <table class="last-bets">
        <tr>
          <th>Game</th>
          <th>Bet Amount</th>
          <th>Multiplier</th>
          <th>Date</th>
        </tr>
        <tr>
          <td>Dice</td>
          <td class="text-icon-flex">
            <span>100</span>
            <CoinIcon class="coin-icon" />
          </td>
          <td>2.5x</td>
          <td>10/10/2021 - 23:02</td>
        </tr>
        <tr>
          <td>Dice</td>
          <td class="text-icon-flex">
            <span>100</span>
            <CoinIcon class="coin-icon" />
          </td>
          <td>2.5x</td>
          <td>10/10/2021 - 23:02</td>
        </tr>
        <tr>
          <td>Dice</td>
          <td class="text-icon-flex">
            <span>100</span>
            <CoinIcon class="coin-icon" />
          </td>
          <td>2.5x</td>
          <td>10/10/2021 - 23:02</td>
        </tr>
        <tr>
          <td>Dice</td>
          <td class="text-icon-flex">
            <span>100</span>
            <CoinIcon class="coin-icon" />
          </td>
          <td>2.5x</td>
          <td>10/10/2021 - 23:02</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import RankBar from '../components/RankBar.vue';
import CoinIcon from '../components/CoinIcon.vue';

const progress = 30;
const amountWon = 19340;
const formattedAmountWon = amountWon.toLocaleString('en-US');

// The url is like /profile/:uuid_user

const router = useRouter();

const route = useRoute();
const user_uuid = route.params.user_uuid;

const fetchUser = (user_uuid) => {
  console.log(user_uuid);
}

if (user_uuid) {
  fetchUser(user_uuid);
} else {
  router.push('/');
}

</script>

<style scoped>
.wrapper {
  width: 75%;
  background-color: var(--grey-700);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
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

.stats-inner>div {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--grey-500);
  margin: 0 1rem;
}

.stats-inner>div:first-of-type,
.stats-inner>div:last-of-type {
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