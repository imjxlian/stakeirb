<template>
  <div class="container">
    <div class="wrapper">
      <div class="grid">
        <div>
          <h3 class="welcome-msg">Welcome {{ username }}, what are we playing today ?</h3>
          <RankBar class="rank-bar" :progress="progress" />
          <div class="games">
            <GameCard v-for="game in games" :key="game" :game="game" />
          </div>
        </div>
        <img src="../assets/images/elon-musk-image.png" alt="Elon Musk" class="home-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import GameCard from './GameCard.vue'
import RankBar from './RankBar.vue'
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();


const games = ['dice', 'mines', 'plinko', 'roulette']
const username = computed(() => store.getters.username)
const progress = computed(() => store.getters.rank_pts)
</script>

<style scoped>
.container {
  background-color: var(--color-background-dark);
  padding: var(--padding-container);
}

.wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 2rem;
}

.grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 3fr 2fr;
}

.welcome-msg {
  margin-top: 0;
}

.home-image {
  object-fit: cover;
  border-radius: 1rem;
  width: 100%;
  margin: auto;
}

.games {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.rank-bar {
  width: 75%;
}
</style>
