<template>
    <nav>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
    </nav>
    <div>
        <h1>Login</h1>
        <el-form @submit.prevent="login">
            <el-form-item label="Username">
                <el-input v-model="username" value="admin"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="password" value="123456"></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit">Login</el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');

const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post('http://localhost:8080/users/login', { username: username.value, password: password.value });
        if (response.status === 200) {
            router.push('/questions');
        }
        console.log('Logged in:', response.data);
    } catch (error) {
        console.error('Login failed:', error);
    }
};
</script>

<style scoped></style>