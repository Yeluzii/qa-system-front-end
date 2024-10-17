<template>
    <div class="question-item">
        <h3>标题：{{ question.title }}</h3>
        <h4>
            提问者：
            <img class="avatar medium" :src="question.user.avatar" alt="头像" />
            {{ question.user.username }}
        </h4>
        <h5>提问时间：{{ question.createdAt }}</h5>
        <el-button type="primary" @click="viewQuestion">查看详情</el-button>
    </div>
</template>

<script setup lang="ts">
import { PropType, defineProps } from 'vue';
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
    width: 18em;
    height: 15em;
    border: 1px solid black;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;

    h3,
    h4 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.avatar {
    width: 50px;
    /* 默认大小 */
    height: 50px;
    /* 默认大小 */
    border-radius: 50%;
    /* 圆形 */
    background-color: #ccc;
    /* 默认背景色 */
    display: inline-block;
    overflow: hidden;
    /* 确保内容不会溢出 */
    border: 2px solid #ffc400;
    /* 白色边框 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* 轻微的阴影效果 */
    transition: transform 0.2s ease-in-out;
    /* 平滑的过渡效果 */
}

.avatar.medium {
    width: 60px;
    height: 60px;
}

/* 鼠标悬停效果 */
.avatar:hover {
    transform: scale(1.1);
    /* 放大效果 */
}

/* 图片内容 */
.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 保持图片比例并填充容器 */
}
</style>