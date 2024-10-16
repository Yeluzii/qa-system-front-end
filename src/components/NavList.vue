<template>
    <button @click="router.back()" class="back-button">返回</button>
    <button @click="ask" class="ask-button">提问</button>
    <button @click="router.push('/questions')" class="ask-button">问题广场</button>
    <button @click="logout" class="logout-button">退出登录</button>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';

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

<style scoped>
.logout-button,
.ask-button,
.back-button {
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color .2s ease-in-out;

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
</style>