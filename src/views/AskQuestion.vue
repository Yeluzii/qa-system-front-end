<template>
    <div>
        <h1>提问一个问题</h1>
        <el-form @submit.prevent="askQuestion">
            <el-form-item label="标题">
                <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="详细概述">
                <el-input type="textarea" v-model="content" rows="4"></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit">提问</el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const title = ref('');
const content = ref('');

// 使用 computed 获取 userId
const userId = computed(() => store.getters.getUserId);

// 在组件挂载时获取当前用户信息
onMounted(() => {
    store.dispatch('fetchCurrentUser');
});

const askQuestion = async () => {
    try {
        console.log("userId为：" + userId.value);
        if (!userId.value) {
            alert("请先登录！");
            router.push("/login");
            return;
        }

        const response = await axios.post('http://localhost:8080/questions/ask', { title: title.value, content: content.value, userId: userId.value });
        console.log('问题：', response.data);
        if (response.data.code === 201) {
            alert("提问成功！");
            router.push('/questions');
        } else {
            alert("提问失败！");
        }
    } catch (error) {
        console.error('提问失败:', error);
    }
};
</script>

<style scoped></style>