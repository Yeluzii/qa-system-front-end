<template>
    <nav>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
    </nav>
    <div>
        <h1>Register</h1>
        <el-form @submit.prevent="register">
            <el-form-item label="Username">
                <el-input v-model="username" value="admin"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input type="email" v-model="email" value="admin@qq.com"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="password" value="123456"></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit">Register</el-button>
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
        if (response.status === 200) {
            router.push('/login');
        }
        console.log('Logged in:', response.data);
    } catch (error) {
        console.error('Register failed:', error);
    }
};
</script>

<style scoped></style>