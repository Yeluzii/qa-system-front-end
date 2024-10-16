<template>
    <nav>
        <router-link to="/login">登录</router-link> |
        <router-link to="/register">注册</router-link>
    </nav>
    <div>
        <h1>注册</h1>
        <el-form @submit.prevent="register">
            <el-form-item label="用户名">
                <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input type="email" v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="password"></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit">注册</el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const email = ref('');

const router = useRouter();

const register = async () => {
    try {
        const response = await axios.post('http://localhost:8080/users/register', { username: username.value, password: password.value, email: email.value });
        if (response.data.code === 201) {
            console.log('注册成功:', response.data);
            alert('注册成功');
            router.push('/login');
        }
    } catch (error) {
        alert('注册失败');
        console.error('注册失败：', error);
    }
};
</script>

<style scoped></style>