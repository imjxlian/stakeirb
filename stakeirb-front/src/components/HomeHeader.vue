<script setup>
import RankBar from './RankBar.vue'
import GameCard from './GameCard.vue'
</script>

<template>
  <div class="bg-primary-dark">
    <div class="wrapper">
      <div class="grid">
        <div>
          <h3 class="mt-0">Welcome swarton1, what are we playing today ?</h3>
          <RankBar class="w-75" :progress="progress" />
          <div class="flex flex-row games">
            <GameCard v-for="game in games" :key="game" :game="game" />
          </div>
        </div>
        <img
          src="../assets/images/elon-musk-image.png"
          alt="Elon Musk"
          class="image m-auto w-100"
        />
      </div>
    </div>
  </div>
</template>

<script>
const games = ['dice', 'mines', 'plinko', 'roulette']

const progress = 30
</script>

<style scoped>
.wrapper {
  padding: 3rem 2rem;
}

.grid {
  grid-template-columns: 3fr 2fr;
}

.image {
  object-fit: cover;
  border-radius: 1rem;
}

.games {
  margin-top: 2rem;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
