<template>
    <NavList></NavList>
    <div class="ask-question-container">
        <h1>提问一个问题</h1>
        <el-form @submit.prevent="askQuestion" class="form-container">
            <el-form-item label="标题" class="form-item">
                <el-input v-model="title" class="input-field" required></el-input>
            </el-form-item>
            <el-form-item label="正文" class="form-item">
                <div ref="editorElem" style="text-align:left;"></div>
            </el-form-item>
            <el-button type="primary" native-type="submit" class="submit-button">提问</el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import NavList from '@/components/NavList.vue';
import { ref, computed, onMounted, nextTick } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import E from 'wangeditor';

const store = useStore();
const router = useRouter();
const editorElem = ref(null);
const editorContent = ref('');

const title = ref('');

// 使用 computed 获取 userId
const userId = computed(() => store.getters.getUserId);

// 在组件挂载时获取当前用户信息
onMounted(() => {
    store.dispatch('fetchCurrentUser');
    nextTick(() => {
        const editor = new E(editorElem.value);

        editor.config.onchange = (newHtml: string) => {
            editorContent.value = newHtml;
        };

        // 自定义上传图片
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            resultFiles.forEach(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                try {
                    const response = await axios.post('http://localhost:8080/upload/image', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    if (response.status === 200) {
                        const data = response.data;
                        if (data.url && data.alt && data.href) {
                            const fullUrl = 'http://localhost:8080' + data.url; // 拼接完整的 URL
                            insertImgFn(fullUrl, data.alt, data.href); // 将图片插入到编辑器中
                        } else {
                            console.error('上传图片失败: 后端响应中缺少必要的字段', data);
                        }
                    } else {
                        console.error('上传图片失败: 后端响应状态码不是 200', response);
                    }
                } catch (error) {
                    console.error('上传图片失败:', error);
                }
            });
        };

        // 自定义上传视频
        editor.config.customUploadVideo = function (resultFiles, insertVideoFn) {
            resultFiles.forEach(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                try {
                    const response = await axios.post('http://localhost:8080/upload/video', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    if (response.status === 200) {
                        const data = response.data;
                        if (data.url && data.alt && data.href) {
                            const fullUrl = 'http://localhost:8080' + data.url; // 拼接完整的 URL
                            insertVideoFn(fullUrl, data.alt, data.href); // 将视频插入到编辑器中
                        } else {
                            console.error('上传视频失败: 后端响应中缺少必要的字段', data);
                        }
                    } else {
                        console.error('上传视频失败: 后端响应状态码不是 200', response);
                    }
                } catch (error) {
                    console.error('上传视频失败:', error);
                }
            });
        };

        editor.create();
    });
});

const askQuestion = async () => {
    try {
        console.log("userId为：" + userId.value);
        if (!userId.value) {
            alert("请先登录！");
            router.push("/login");
            return;
        }

        const response = await axios.post('http://localhost:8080/questions/ask', { title: title.value, content: editorContent.value, userId: userId.value });
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
    max-width: 80vw;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
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