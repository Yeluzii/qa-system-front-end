<template>
    <NavList></NavList>
    <div class="ask-question-container">
        <h1>提问一个问题</h1>
        <el-form @submit.prevent="askQuestion" class="form-container">
            <el-form-item label="标题" class="form-item">
                <el-input v-model="title" class="input-field" required></el-input>
            </el-form-item>
            <el-form-item label="详细概述" class="form-item">
                <el-input type="textarea" v-model="content" rows="4" class="textarea-field" required></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit" class="submit-button">提问</el-button>
        </el-form>
    </div>
</template>



<script setup lang="ts">
import NavList from '@/components/NavList.vue';
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
            router.push('/');
        } else {
            alert("提问失败！");
        }
    } catch (error) {
        console.error('提问失败:', error);
    }
};
</script>

<style scoped>
.ask-question-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
    border-radius: 8px;
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

.form-container {
    width: 100%;
}

.form-item {
    margin-bottom: 15px;
}

.input-field,
.textarea-field {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.input-field:focus,
.textarea-field:focus {
    border-color: #409eff;
}

.submit-button {
    width: 100%;
    background-color: #409eff;
    border-color: #409eff;
    border-radius: 4px;
    font-weight: bold;
    transition: all .2s ease-in-out;
}

.submit-button:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
}
</style>