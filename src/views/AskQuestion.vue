<template>
    <div>
        <h1>Ask a Question</h1>
        <el-form @submit.prevent="askQuestion">
            <el-form-item label="Title">
                <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="Content">
                <el-input type="textarea" v-model="content" rows="4"></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit">Ask Question</el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const title = ref('');
const content = ref('');
const router = useRouter();

const askQuestion = async () => {
    try {
        const response = await axios.post('http://localhost:8080/questions/ask', { title: title.value, content: content.value, userId: 1 });
        console.log('Question asked:', response.data);
        router.push('/questions');
    } catch (error) {
        console.error('Failed to ask question:', error);
    }
};
</script>

<style scoped></style>