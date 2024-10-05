<script setup>
import { onMounted } from 'vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
// 触发获取导航列表的action
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
onMounted(() => { categoryStore.getCategory() })
</script>

<template>
  <div>首页
    <!-- 二级路由出口 -->
     <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- <RouterView :key="$route.fullPath"/> -->
    <RouterView />
    <LayoutFooter />
  </div>
  
</template>  