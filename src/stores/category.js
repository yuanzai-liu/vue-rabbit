import { ref } from "vue"
import { defineStore } from "pinia"
import { getCategoryAPI } from '@/apis/layout'

  // 导航列表的数据管理
  //state导航列表数据
export const useCategoryStore = defineStore("category", () => {
  //action获取导航数据的方法
  const categoryList = ref([])
  const getCategory = async () => {
  const res = await getCategoryAPI()
  // console.log(res)
  categoryList.value = res.result
  }
  return {
    categoryList,
    getCategory
  }
})