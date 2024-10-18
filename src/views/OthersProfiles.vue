<template>
    <NavList></NavList>
    <div class="user-info-container">
        <h2>他/她的信息</h2>
        <div v-if="user" class="user-details">
            <h3>
                <img class="avatar large" :src="user.avatar" alt="头像" />
                用户名：{{ user.username }}
            </h3>
            <h4>
                创建时间：{{ user.createdAt }}
            </h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavList from '@/components/NavList.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { User } from "@/types";

const user = ref<User | null>(null);

const route = useRoute();

const fetchUserInfo = async (uId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/users/${uId}`);
        user.value = response.data.data;
        console.log('他/她的详情：' + user.value?.username);
    } catch (error) {
        console.error('获取用户详情失败:', error);
    }
};

onMounted(() => {
    const uId = Number(route.params.uId);
    fetchUserInfo(uId);
});



</script>

<style scoped>
.user-info-container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
    border-radius: 8px;
    overflow: hidden;
}

h2 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

.user-details {
    text-align: center;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    display: inline-block;
    overflow: hidden;
    border: 2px solid #ffc400;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    vertical-align: middle;
    margin-right: 15px;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar.large {
    width: 100px;
    height: 100px;
}

h3,
h4 {
    color: #333;
    margin: 10px 0;
}

@media (max-width: 768px) {
    .avatar.large {
        width: 80px;
        height: 80px;
    }
}
</style>