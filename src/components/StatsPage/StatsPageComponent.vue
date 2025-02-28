<template>
    <div class="stats-page">
        <h1>Stats Page</h1>
        <div v-for="(stat, index) in myStats" :key="index">
            <div> DATE: {{ stat.date }}</div>
            <ul>
                <li v-for="(time, j) in stat.times" :key="j">{{ time + 'MS' }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

interface Stat {
    date: string;
    times: number[];
}

const ourUser = ref('')
const myStats = ref<Stat[]>([])

ourUser.value = localStorage.getItem('username') ?? ''


const getStats = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/users/${ourUser.value}/stats`);
        console.log(response.data)
        myStats.value = response.data;

    } catch (error) {
        console.error('Error fetching stats:', error);
    }
};

getStats()
</script>

<style scoped>
</style>