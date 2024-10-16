<template>
    <nav>
        <router-link to="/login">登录</router-link> |
        <router-link to="/register">注册</router-link>
    </nav>
    <div>
        <h1>登录</h1>
        <el-form @submit.prevent="login">
            <el-form-item label="用户名">
                <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="password"></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit">登录</el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref<string>("");
const password = ref<string>('');

const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post('http://localhost:8080/users/login', { username: username.value, password: password.value });
        if (response.data.code === 200) {
            console.log('登录成功:', response.data);
            router.push('/questions');
        } else {
            alert('用户名或密码错误');
        }
    } catch (error) {
        alert('发生异常，登录失败');
        console.error('登录失败:', error);
    }
};
</script>

<style scoped></style>