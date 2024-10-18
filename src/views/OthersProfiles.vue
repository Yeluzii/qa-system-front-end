<template>
    <NavList></NavList>
    <div>
        <h2>他/她的信息</h2>
        <div v-if="user">
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
    const uId = Number(route.params.userId);
    fetchUserInfo(uId);
});



</script>

<style scoped>
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

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 保持图片比例并填充容器 */
}

.avatar.large {
    width: 100px;
    height: 100px;
}
</style>