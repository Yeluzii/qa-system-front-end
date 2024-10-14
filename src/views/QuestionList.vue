<template>
    <button @click="logout">退出</button>
    <button @click="ask">提问</button>
    <div>
        <h1>问题广场</h1>
        <el-row :gutter="16">
            <el-col :span="24" v-for="question in questions" :key="question.id">
                <QuestionItem :question="question" />
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import QuestionItem from '@/components/QuestionItem.vue';
import { Question } from '@/types';
import { useRouter } from 'vue-router';

const questions = ref<Question[]>([]);

const fetchQuestions = async () => {
    try {
        const response = await axios.get('http://localhost:8080/questions/all');
        console.log('Fetched questions:', response.data.data);
        questions.value = response.data.data;
    } catch (error) {
        console.error('Failed to fetch questions:', error);
    }
};

onMounted(() => {
    fetchQuestions();
});

const logout = async () => {
    try {
        await axios.post('http://localhost:8080/users/logout');
        window.location.href = '/login';
    } catch (error) {
        console.error('Failed to logout:', error);
    }
}

const router = useRouter();
const ask = () => {
    router.push("/ask");
}
</script>

<style scoped></style>