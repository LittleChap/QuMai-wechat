/**
 * Created by yangzhanpeng on 2017/12/9.
 */
import {fetch} from '@/utils/fetch'

export function login (data) {
  return fetch({
    url: '/mobileSellerShop/login.do',
    method: 'post',
    params: data
  })
}
