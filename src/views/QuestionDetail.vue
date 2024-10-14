<template>
    <div>
        <h1>问题详情</h1>
        <div v-if="question">
            <h2>标题：{{ question.title }}</h2>
            <p>内容：{{ question.content }}</p>
            <h3>回复</h3>
            <ul>
                <li v-for="answer in answers" :key="answer.id">
                    <p>
                        <span>回复人：{{ answer.user.username }}</span>
                        <span>回复内容：{{ answer.content }}</span>
                    </p>
                    <span>时间：{{ answer.createdAt }}</span>
                </li>
            </ul>
            <el-form @submit.prevent="addAnswer">
                <el-form-item label="给出你的回答：">
                    <el-input type="textarea" v-model="newAnswer.content" rows="4"></el-input>
                </el-form-item>
                <el-button type="primary" native-type="submit">提交回复</el-button>
            </el-form>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Question, Answer } from '@/types';

const route = useRoute();
const router = useRouter();
const question = ref<Question | null>(null);
const answers = ref<Answer[]>([]);
const newAnswer = ref({ content: '' });


const fetchQuestion = async (questionId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/questions/${questionId}`);
        question.value = response.data.data;
    } catch (error) {
        console.error('Failed to fetch question:', error);
    }
};

const fetchAnswers = async (questionId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/answers/questionId/${questionId}`);
        answers.value = response.data.data;
    } catch (error) {
        console.error('Failed to fetch answers:', error);
    }
};

const addAnswer = async () => {
    if (newAnswer.value.content.trim()) {
        try {
            const response = await axios.post('http://localhost:8080/answers/reply', {
                content: newAnswer.value.content,
                questionId: question.value?.id,
                userId: 5 // Replace with actual user ID
            });
            // answers.value.push(response.data);
            // newAnswer.value.content = '';
            router.go(0)
        } catch (error) {
            console.error('Failed to add answer:', error);
        }
    }
};

onMounted(() => {
    const questionId = Number(route.params.id);
    fetchQuestion(questionId);
    fetchAnswers(questionId);
});
</script>

<style scoped></style>