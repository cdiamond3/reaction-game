<script setup lang="ts">
import { computed } from 'vue';
import { VCard, VCardTitle, VBtn } from 'vuetify/components';
import { ref, watch } from 'vue';

const name = ref('');
const stats = ref({});

const selectedColor = ref('red'); // Add a ref to store the selected color
const isRed = ref(false)
const isStarted = ref(false)
const reactionTime = ref(0)
const isDisabled = ref(false);

let timer: number;

const scores = ref<number[]>([]);

interface User {
  id: number;
  name: string;
  stats: object;
}

const changeColor = () => {
  setTimeout(() => {
    isRed.value = true;
  }, Math.random() * (8000 - 5000) + 5000);
}

const startGame = () => {
  isStarted.value = true
  changeColor()
}


const startTimer = () => {
  timer = setInterval(() => {
    reactionTime.value += 1
  }, 1)
}

const stopTimer = () => {
  if(isDisabled.value === false) {
    clearInterval(timer)
    scores.value.push(reactionTime.value)
    isDisabled.value = true
  }
}

watch(isRed, (newValue) => {
  if(newValue && isRed.value === true) {
    startTimer()
  }
})

const handleReset = () => {
    isRed.value = false
    reactionTime.value = 0
    isDisabled.value = false
    clearInterval(timer)
    changeColor()
}

const averageTime = computed(() => {
  if (scores.value.length === 0) return 0;
  const total = scores.value.reduce((accu, score) => accu + score, 0);
  return Math.floor(total / scores.value.length);
});

</script>


<template>
  <div>
    <v-select
      v-model="selectedColor"
      :items="['red', 'blue', 'yellow']"
      label="Select Reaction Color"
    > CUSTAMIZE </v-select>
    <v-card @click="isRed  ? stopTimer() : startGame()" :class="isRed ? selectedColor : 'green'">
      <div v-if="!isStarted">
        <v-card-text class="promptText">
        CLICK TO START GAME
        </v-card-text> 
      </div>
      <v-card-text v-else class="inGameText">
        {{ isRed ?  reactionTime + 'MS' : `Wait For ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`}}
      </v-card-text> 
    </v-card>
        {{ reactionTime }}  MS
   <div v-if="scores.length > 0">
     <div v-for="score, index in scores" :key="index" class="scoresDisplay">
       <span class="scoreLabel">
         {{`Score ${1 + index}:`}} 
       </span>
       <div> {{ score }}  MS </div>
      </div>
    </div>
    <div class="containerLabel">
      <v-btn @click="handleReset" class="resetButton"> RESET </v-btn>
      <div v-if="scores.length >= 3" class="averageTimeLabel">
        Your Average Time Is:
        {{ averageTime + 'MS'}}
      </div>
      <div v-else class="averageTimeDisclaimer">
        MUST PLAY 3 TIMES FOR AVERAGE TIME
      </div>
    </div>
  </div>
   
</template>

<style scoped>

.green {
  background-color: green !important;
  transition: none;
  text-align: center;
  height:  400px;
}
.red {
  background-color: red !important;
  transition: none;
  text-align: center;
  height:  400px;
}
.blue {
  background-color: rgb(55, 0, 255) !important;
  transition: none;
  text-align: center;
  height:  400px;
}
.yellow {
  background-color: rgb(248, 223, 79) !important;
  transition: none;
  text-align: center;
  height:  400px;
}
.scoresDisplay{
  display: flex;
  justify-content: center;
  flex-direction: row;
  color: aqua;
}

.scoreLabel {
  margin-right: 10px; /* Adjust the value as needed */
}

.averageTimeLabel {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  font-size: 32px;
  color: rgb(0, 255, 34);
}
.averageTimeDisclaimer {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  font-size: 32px;
  color: red;
}

.promptText {
  text-align: center;
  position: relative;
  font-size: 50px;
  top: 150px;
  color: white;
}
.inGameText {
  text-align: center;
  position: relative;
  font-size: 50px;
  top: 100px;
  color: white;
}

.containerLabel {
  display: flex;
  flex-direction: column;
}

.resetButton {
  color: black;
  font-size: 100%;
}
</style>