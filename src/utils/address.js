import {fetch} from '@/utils/fetch'
import {formatAddress} from '@/utils/utils'
const regionsKey = 'regionsList'

function getRegions () {
  return JSON.parse(localStorage.getItem(regionsKey)) || ''
}

function setRegions (regionsList) {
  localStorage.setItem(regionsKey, JSON.stringify(regionsList))
}

/**
 * 初始化省市区地址 如果local存在就返回local，如果不存在就重新请求
 * @returns {Promise}
 */
export default function () {
  return new Promise(async (resolve, reject) => {
    let regionsArray = getRegions()
    if (regionsArray.length) {
      resolve(regionsArray)
    } else {
      const url = '/mobileBaseData/listRegionsTreeLevel3.do'
      const response = await fetch(url, {})
      if (parseInt(response.code) === 1) {
        try {
          regionsArray = formatAddress(response.data.regionsArray)
          setRegions(regionsArray)
          resolve(regionsArray)
        } catch (e) {
          reject(new Error('存储地址时出错'))
        }
      } else {
        reject(new Error(response.message))
      }
    }
  })
}
