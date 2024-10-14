<template>
    <div class="question-item">
        <h3>标题：{{ question.title }}</h3>
        <h4>提问者：{{ question.user.username }}</h4>
        <p>问题概述：{{ question.content }}</p>
        <el-button type="primary" @click="viewQuestion">查看详情</el-button>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { Question } from '@/types';

const props = defineProps({
    question: {
        type: Object as PropType<Question>,
        required: true
    }
});

const router = useRouter();

const viewQuestion = () => {
    router.push({ name: 'QuestionDetail', params: { id: props.question.id } });
};
</script>

<style scoped>
.question-item {
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
}
</style>