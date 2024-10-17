<template>
    <NavList></NavList>
    <div class="question-square-container">
        <div>
            <h1>问题广场</h1>
            <el-row :gutter="30" class="questions-grid">
                <el-card :span="8" v-for="question in questions" :key="question.id" class="question-items">
                    <QuestionItem style="margin-top: 2px;" :question="question" />
                </el-card>
            </el-row>
        </div>
    </div>
</template>



<script setup lang="ts">
import NavList from '@/components/NavList.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import QuestionItem from '@/components/QuestionItem.vue';
import { Question } from '@/types';

const questions = ref<Question[]>([]);

const fetchQuestions = async () => {
    try {
        const response = await axios.get('http://localhost:8080/questions/all');
        console.log('获取到的问题:', response.data.data);
        questions.value = response.data.data;
    } catch (error) {
        console.error('获取问题失败:', error);
    }
};

onMounted(() => {
    fetchQuestions();
});

</script>

<style scoped>
.question-square-container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 20px;
}


.logout-button:hover,
.ask-button:hover {
    background-color: #66b1ff;
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

.questions-grid {
    display: flex;

}

.question-items {
    display: flex;
    margin-bottom: 20px;
    width: calc(30%);
    min-width: 200px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
    border-radius: 8px;
    overflow: hidden;
    transition: transform .2s;
    /* border: 1px solid rgb(112, 89, 238); */
}

.question-items:hover {
    transform: scale(1.02);
}

@media (max-width: 768px) {
    .question-item {
        width: 100%;
    }
}
</style>