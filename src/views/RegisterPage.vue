<template>
    <nav class="nav-container">
        <router-link to="/login">登录</router-link> |
        <router-link to="/register">注册</router-link>
    </nav>
    <div class="register-container">
        <h1>注册</h1>
        <el-form @submit.prevent="register" class="form-container">
            <el-form-item label="用户名" class="form-item">
                <el-input v-model="username" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" class="form-item">
                <el-input type="email" v-model="email" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="form-item">
                <el-input type="password" v-model="password" class="input-field"></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit" class="submit-button">注册</el-button>
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

<style scoped>
.nav-container {
    text-align: center;
    margin-bottom: 20px;
}

.nav-container a {
    color: #409eff;
    text-decoration: none;
    margin: 0 10px;
    font-weight: bold;
}

.nav-container a:hover {
    text-decoration: underline;
}

.register-container {
    max-width: 400px;
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

.input-field {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.input-field:focus {
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