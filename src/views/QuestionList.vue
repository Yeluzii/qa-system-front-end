<template>
    <NavList></NavList>
    <div class="question-square-container">
        <div>
            <h1>问题广场</h1>
            <el-row :gutter="30" class="questions-grid">
                <el-col :span="8" v-for="question in questions" :key="question.id" class="question-col">
                    <el-card class="question-items">
                        <QuestionItem style="margin-top: 2px;" :question="question" />
                    </el-card>
                </el-col>
            </el-row>
            <div style="text-align: center">
                <button class="pagination" @click="prevPage" :disabled="isFirstPage"
                    :class="{ disabled: isFirstPage }">上一页</button>
                <button class="pagination" @click="nextPage" :disabled="isLastPage"
                    :class="{ disabled: isLastPage }">下一页</button>
            </div>
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

// const fetchQuestions = async () => {
//     try {
//         const response = await axios.get('http://localhost:8080/questions/all');
//         questions.value = response.data.data;
//         console.log('获取到的问题:', response.data.data);
//     } catch (error) {
//         console.error('获取问题失败:', error);
//     }
// };

const limit = ref<number>(6)
const offset = ref<number>(0)
const total = ref<number>(0)
const fetchByPage = (): void => {
    axios.get(`http://localhost:8080/questions/page?limit=${limit.value}&offset=${offset.value}`)
        .then((res) => {
            questions.value = res.data.data.questions;
            total.value = res.data.data.total;
        })
        .catch((error) => {
            console.error('获取问题失败:', error);
        })
}

const nextPage = (): void => {
    if (offset.value + limit.value >= questions.value.length) {
        offset.value += limit.value;
        fetchByPage();
    }
}

const prevPage = (): void => {
    if (offset.value > 0) {
        offset.value -= limit.value;
    }
    fetchByPage();
}

const isFirstPage = computed(() => offset.value === 0);

const isLastPage = computed(() => offset.value + limit.value >= total.value);

onMounted(() => {
    // fetchQuestions();
    fetchByPage();
})
</script>

<style scoped>
.pagination {
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 15px 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color .2s ease-in-out;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover {
        scale: 1.1;
    }

    &:active {
        background-color: #3a8ee6;
        /* 按下时更深的背景色 */
        transform: translateY(2px);
        /* 向下移动一点，模拟按下效果 */
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        /* 添加阴影，增加立体感 */
    }
}

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

@media (max-width: 768px) {
    .question-col {
        width: 100%;
    }
}
</style>