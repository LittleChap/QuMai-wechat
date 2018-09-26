/**
 * Created by yangzhanpeng on 2017/12/13.
 */
let env = (process.env.NODE_ENV === 'production')

export function log (...args) {
  if (!env) {
    console.log(...args)
  }
}

export function goto (url) {
  this.$router.push(url)
}

export function formatPrice (str) {
  let price = 0
  if (parseFloat(str) < 0) {
    return '¥' + price.toFixed(2)
  } else {
    return '¥' + parseFloat(str).toFixed(2)
  }
}
// 格式化 只展示两位小数
export function formatPriceNum (str) {
  let price = 0
  if (parseFloat(str) < 0) {
    return price.toFixed(2)
  } else {
    return parseFloat(str).toFixed(2)
  }
}

export function hidePhoneNum (phone) {
  if (phone.length > 10) {
    let result = phone.substr(0, 3) + '****' + phone.substr(7)
    return result
  } else {
    return phone
  }
}

export function getImgUrl () {
  return `${process.env.FULL_URL}/backend/validcode.do`
}
/**
 * 验证手机号码
 *
 * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
 * 联通号码段:130、131、132、136、185、186、145
 * 电信号码段:133、153、180、189
 *
 * @param cellphone
 * @return
 */
export function checkPhoneNum (phoneNum) {
  var regex = /^1[3|4|5|7|8][0-9]\d{4,8}$/
  return regex.test(phoneNum)
}

/**
 * 格式化时间
 * */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function toMoney (num = 0, fixed = 2) {
  // 先把字符串里面除了数字跟.以外的字符去掉
  let replacenum = String(num).replace(/[^\d.]/g, '')
  // 把得到的字符串转换成带2位小数的浮点数
  let fixednum = parseFloat(replacenum).toFixed(fixed)
  // 把浮点数拆分成整数和小数2部分
  let apartnum = String(fixednum).split('.')
  // 把整数部分用toLocaleString方法自动格式化成有千位符的字符串
  let localnum = parseInt(apartnum[0]).toLocaleString()
  // 最后 把千位符的字符串 加上小数点 和小数部分 得到完整的结果
  let result = localnum + '.' + apartnum[1]
  return result
}

/**
 * 格式化省市区数据
 * @param regionsArray
 * @returns {Array}
 */
export function formatAddress (regionsArray) {
  let addressData = []
  for (let i = 0; i < regionsArray.length; i++) {
    let provinceItem = regionsArray[i]
    if (provinceItem.childrenArray.length) {
      for (let j = provinceItem.childrenArray.length - 1; j >= 0; j--) {
        let cityItem = provinceItem.childrenArray[j]
        if (cityItem.childrenArray.length) {
          for (let k = cityItem.childrenArray.length; k >= 0; k--) {
            if (cityItem.childrenArray.length) {
              cityItem.childrenArray[0].value = cityItem.childrenArray[0].value.toString()
              cityItem.childrenArray[0].parent = cityItem.childrenArray[0].parent.toString()
              delete cityItem.childrenArray[0].childrenArray
              addressData.push(cityItem.childrenArray.shift())
            }
          }
        }
        cityItem.value = cityItem.value.toString()
        cityItem.parent = cityItem.parent.toString()
        delete cityItem.childrenArray
        addressData.push(cityItem)
      }
      provinceItem.value = provinceItem.value.toString()
      provinceItem.parent = provinceItem.parent.toString()
      delete provinceItem.childrenArray
      addressData.push(provinceItem)
    }
  }
  return addressData
}

/**
 * 获取url中的参数
 * @returns {{}}
 */
export function queryString () {
  let url = location.search
  let theRequest = {}
  if (url.indexOf('?') !== -1) {
    let str = url.substr(1)
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}

/**
 * 笛卡尔积，算出所有规格组合
 * @param list
 * @returns {*}
 */
export function descartes (list) {
  let point = {}
  let result = []
  let pIndex = null
  let tempCount = 0
  let temp = []
  for (var index in list) {
    if (typeof list[index] == 'object') {
      point[index] = {
        'parent': pIndex,
        'count': 0
      }
      pIndex = index
    }
  }
  if (pIndex == null) {
    return list
  }
  while (true) {
    for (var index2 in list) {
      tempCount = point[index2]['count']
      temp.push(list[index2][tempCount])
    }
    result.push(temp)
    temp = []
    while (true) {
      if (point[index2]['count'] + 1 >= list[index2].length) {
        point[index2]['count'] = 0
        pIndex = point[index2]['parent']
        if (pIndex == null) {
          return result
        }
        index2 = pIndex
      } else {
        point[index2]['count']++
        break
      }
    }
  }
}
