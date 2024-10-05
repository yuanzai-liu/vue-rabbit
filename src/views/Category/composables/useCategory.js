// 封装分类数据业务代码
import { ref,  onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getCategoryAPI } from '@/apis/category'

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCateGory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => getCateGory())
  // onUpdated(() => getCateGory())

  //路由参数变化时，分类数据接口重新发送 
  onBeforeRouteUpdate((to) => {
    getCateGory(to.params.id)  
  })

  return {
    categoryData
  }
}