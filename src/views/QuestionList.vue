<template>
    <NavList></NavList>
    <div class="question-square-container">
        <div>
            <h1>问题广场</h1>
            <el-row :gutter="30" class="questions-grid">
                <el-col :span="8" v-for="question in paginatedQuestions" :key="question.id" class="question-col">
                    <el-card class="question-items">
                        <QuestionItem style="margin-top: 2px;" :question="question" />
                    </el-card>
                </el-col>
            </el-row>
            <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize"
                layout="total, prev, pager, next" :total="questions.length" class="pagination"></el-pagination>
        </div>
    </div>
</template>



<script setup lang="ts">
import NavList from '@/components/NavList.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import QuestionItem from '@/components/QuestionItem.vue';
import { Question } from '@/types';

const questions = ref<Question[]>([]);
const currentPage = ref(1);
const pageSize = ref(6);

const fetchQuestions = async () => {
    try {
        const response = await axios.get('http://localhost:8080/questions/all');
        questions.value = response.data.data;
        console.log('获取到的问题:', response.data.data);
    } catch (error) {
        console.error('获取问题失败:', error);
    }
};

const paginatedQuestions = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return questions.value.slice(start, end);
});

const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
};

onMounted(() => {
    fetchQuestions();
});
</script>

<style scoped>
.question-square-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
}

h1 {
    color: #333;
    text-align: center;
    margin: 10px;
}

.questions-grid {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
}

.question-col {
    margin-bottom: 20px;
    width: calc(33.333% - 10px);
    min-width: 200px;
}

.question-items {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
    border-radius: 8px;
    overflow: hidden;
    transition: transform .2s;
}

.question-items:hover {
    transform: scale(1.02);
}

.pagination {
    text-align: center;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .question-col {
        width: 100%;
    }
}
</style>