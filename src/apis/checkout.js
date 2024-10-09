import request from '@/utils/http'
/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () => {
  return request({
    url:'/member/order/pre'
  })
}