<template>
    <NavList></NavList>
    <div class="question-detail-container">
        <h1>问题详情</h1>
        <div v-if="question" class="question-content">
            <div style="border: 1px solid; border-radius: 5px;">
                <h2>标题：{{ question.title }}</h2>
                <h3>
                    提问者：
                    <img @click="toUps" class="avatar medium" :src="question.user.avatar" alt="头像" title="查看他/她的信息" />
                    {{ question.user.username }}
                </h3>
                <p>创建时间：{{ question.createdAt }}</p>
                <h3>正文内容：</h3>
                <p v-html="question.content"></p>
            </div>
            <el-form @submit.prevent="addAnswer" class="form-container">
                <el-form-item label="给出你的回答：" class="form-item">
                    <el-input type="textarea" v-model="newAnswer.content" rows="4" class="textarea-field"
                        required></el-input>
                </el-form-item>
                <el-button type="primary" native-type="submit" class="submit-button">提交回复</el-button>
            </el-form>
            <ul class="answers-list">
                <h3>大家的回复：</h3>
                <li v-for="answer in allAnswers" :key="answer.id" class="answer-item">
                    <h4 class="answer-user">
                        回复人：
                        <img @click="toRespondent(answer.user.id)" class="avatar medium" :src="answer.user.avatar"
                            alt="头像" title="点击查看他/她的信息" />
                        {{ answer.user.username }}
                    </h4>
                    <span class="answer-time">回复时间：{{ answer.createdAt }}</span>
                    <p v-html="answer.content" class="answer-content"></p>
                </li>
            </ul>
            <div style="text-align: center">
                <button class="pagination" @click="prevPage" :disabled="isFirstPage"
                    :class="{ disabled: isFirstPage }">上一页</button>
                <button class="pagination" @click="nextPage" :disabled="isLastPage"
                    :class="{ disabled: isLastPage }">下一页</button>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>



<script setup lang="ts">
import NavList from '@/components/NavList.vue';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Question, Answer } from '@/types';

const store = useStore();
const route = useRoute();
const router = useRouter();
const question = ref<Question | null>(null);
const allAnswers = ref<Answer[]>([]);
const newAnswer = ref({ content: '' });

const userId = computed(() => store.getters.getUserId);

const fetchQuestion = async (questionId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/questions/${questionId}`);
        question.value = response.data.data;
    } catch (error) {
        console.error('获取问题失败:', error);
    }
};

const fetchAnswers = async (questionId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/answers/questionId/${questionId}`);
        allAnswers.value = response.data.data;
    } catch (error) {
        console.error('获取问题失败:', error);
    }
};

const addAnswer = async () => {
    if (newAnswer.value.content.trim()) {
        try {
            if (!userId.value) {
                alert("请先登录！");
                router.push('/login');
                return;
            }
            const response = await axios.post('http://localhost:8080/answers/reply', {
                content: newAnswer.value.content,
                questionId: question.value?.id,
                userId: userId.value
            });
            if (response.data.code === 201) {
                alert("回答成功！");
                fetchAnswers(Number(route.params.id));
                newAnswer.value.content = ''; // 清空输入框
            }
        } catch (error) {
            console.error('Failed to add answer:', error);
        }
    }
};

const toUps = () => {
    if (!userId.value) {
        alert('请先登录！！！')
        router.push('/login');
        return;
    }
    router.push({ name: 'OthersProfiles', params: { uId: question.value?.user.id } });
};

const toRespondent = (uId: number) => {
    if (!userId.value) {
        alert('请先登录！！！')
        router.push('/login');
        return;
    }
    router.push({ name: 'OthersProfiles', params: { uId: uId } });
};

const limit = ref<number>(3);
const offset = ref<number>(0);
const total = ref<number>(0);

const fetchByPage = async (questionId: number) => {
    axios.get(`http://localhost:8080/answers/questionId/${questionId}/page?limit=${limit.value}&offset=${offset.value}`)
        .then((res) => {
            allAnswers.value = res.data.data.answers;
            total.value = res.data.data.total;
        })
        .catch((error) => {
            console.error('获取问题失败:', error);
        });
};

const nextPage = (): void => {
    if (offset.value + limit.value < total.value) {
        offset.value += limit.value;
        fetchByPage(questionId);
    }
};

const prevPage = (): void => {
    if (offset.value > 0) {
        offset.value -= limit.value;
    }
    fetchByPage(questionId);
};

const isFirstPage = computed(() => offset.value === 0);

const isLastPage = computed(() => offset.value + limit.value >= total.value);

const questionId = Number(route.params.id);
onMounted(() => {
    store.dispatch('fetchCurrentUser');
    fetchAnswers(questionId);
    fetchQuestion(questionId);
    fetchByPage(questionId);
});
</script>

<style scoped>
.pagination {
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 15px 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color .2s ease-in-out;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

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

.question-content h2 {
    word-wrap: break-word;
    /* 允许长单词或 URL 地址换行到下一行 */
    white-space: normal;
    /* 默认值，允许文本换行 */
    overflow-wrap: break-word;
    /* 和 word-wrap 相同，用于新标准 */
    color: #333;
    margin-bottom: 20px;
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

.avatar.medium {
    width: 60px;
    height: 60px;
}

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

.question-detail-container {
    border: 1px solid;
    max-width: 80vw;
    margin: 30px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
    border-radius: 8px;
}

h1,
h2,
h3 {
    color: #333;
    margin-bottom: 20px;
}

.answers-list {
    list-style-type: none;
    padding: 0;
}


.answer-item {
    border: 1px solid;
    border-radius: 5px;
    margin-bottom: 2px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    /* 使子元素垂直排列 */
}

.answer-user,
.answer-time {
    color: #606266;
    font-size: 14px;
    margin-bottom: 5px;
    /* 添加底部边距，使得用户名称和回复时间之间有间隔 */
}

.answer-content {
    color: #606266;
    font-size: 14px;
    margin-bottom: 10px;
    /* 回复内容与其他内容间留出更多空间 */
}




.form-container {
    width: 100%;
    margin-top: 20px;
}

.form-item {
    margin-bottom: 15px;
}

.textarea-field {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

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