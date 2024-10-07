// 封装购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  const cartList = ref([])
  // 获取最新购物车列表
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  const addCart = async (goods) => {
    const { skuId, count } = goods
    if(isLogin.value){
      await insertCartAPI({skuId, count})
      updateNewList()
    }else{
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if(item){
        item.count++
      }else{
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {
    if(isLogin.value){
      await delCartAPI([skuId])
      updateNewList()
    }else{
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    } 
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }


  //计算属性
  const allCount = computed(() => {
    return cartList.value.reduce((sum, item) => sum + item.count, 0)
  })
  const allPrice = computed(() => {
    return cartList.value.reduce((sum, item) => sum + item.count * item.price, 0)
  })


  //单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  // 全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选款状态
    cartList.value.forEach((item) => {
      item.selected = selected
    })
  }

  // 已选择数量与已选择商品假期合计
  const selectedCount = computed(() => {
    return cartList.value.filter(item =>item.selected).reduce((sum, item) => sum + item.count, 0)
  })
  const selectedPrice = computed(() => {
    return cartList.value.filter(item =>item.selected).reduce((sum, item) => sum + item.count * item.price, 0)
  })

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
},{
  persist:true
})