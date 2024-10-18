<template>
    <div class="action-buttons">
        <button @click="router.back()" class="back-button">返回</button>
        <button @click="ask" class="ask-button">提问</button>
        <button @click="router.push('/questions')" class="ask-button">问题广场</button>
        <button @click="logout" class="logout-button" v-if="userId">退出登录</button>
        <button @click="logout" class="login-button" v-else>登录</button>
        <img class="avatar medium" @click="toMyProfiles" :src="avatar" alt="头像" />
    </div>
    <!-- <div class="avatar-container">
            <div class="avatar medium" @click="printAvatar">
                <img :src="avatar" alt="头像" />
            </div>
        </div> -->

    <!-- <div class="avatar small">
        <img :src="avatar" alt="头像" />
    </div> -->

    <!-- <div class="avatar large">
        <img :src="avatar" alt="头像" />
    </div> -->
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

// 使用 computed 获取 userId
const userId = computed(() => store.getters.getUserId);
const avatar = computed(() => store.getters.getAvatar);

// 在组件挂载时获取当前用户信息
onMounted(() => {
    store.dispatch('fetchCurrentUser');
});

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

const toMyProfiles = () => {
    console.log(userId.value);
    if (userId.value) {
        router.push('/mine');
    } else {
        alert('请先登录')
        router.push('/login');
    }
}

</script>

<style scoped>
.logout-button,
.login-button,
.ask-button,
.back-button {
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 15px 5px;
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

/* .action-buttons {
    flex: 1;
} */

/* .avatar-container {
    flex: 2;
} */

.action-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    /* 项目间的间距 */
}

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

/* .avatar.small {
    width: 30px;
    height: 30px;
} */

.avatar.medium {
    width: 60px;
    height: 60px;
}

/* .avatar.large {
    width: 80px;
    height: 80px;
} */

/* 鼠标悬停效果 */
.avatar:hover {
    transform: scale(1.1);
    /* 放大效果 */
}

/* 图片内容 */
.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 保持图片比例并填充容器 */
}
</style>