// 封装购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if(item){
      item.count++
    }else{
      cartList.value.push(goods)
    }
  }

  // 删除购物车
  const delCart = (skuId) => {
    cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
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
    selectedPrice 
  }
},{
  persist:true
})