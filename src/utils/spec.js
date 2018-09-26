/**
 * Created by yangzhanpeng on 2018/1/9.
 */

function checkStore (specValueArray, specArray, specItem, index) {
  let arr = []
  let next = () => {
    specValueArray.map((lineItem, i) => {
      if (i == index) {
        arr.push(specItem.specItemId)
      } else {
        var check = () => {
          lineItem.specItemArray.map((specIt) => {

          })
        }
      }
    })
  }
}

function checkAll (specArray, specValueArray) {
  specValueArray.map((lineItem, index) => {
    lineItem.specItemArray.map((specItem) => {
      var status = checkStore(specValueArray, specArray, specItem, index)
    })
  })
}

export function calaSpec (specArray, specValueArray) {

}

function descartes(list) {
  let point = {};
  let result = [];
  let pIndex = null;
  let tempCount = 0;
  let temp = [];
  for (var index in list) {
    if (typeof list[index] == 'object') {
      point[index] = {
        'parent': pIndex,
        'count': 0
      }
      pIndex = index;
    }
  }
  if (pIndex == null) {
    return list;
  }
  while (true) {
    for (var index in list) {
      tempCount = point[index]['count'];
      temp.push(list[index][tempCount]);
    }
    result.push(temp);
    temp = [];
    while (true) {
      if (point[index]['count'] + 1 >= list[index].length) {
        point[index]['count'] = 0;
        pIndex = point[index]['parent'];
        if (pIndex == null) {
          return result;
        }
        index = pIndex;
      } else {
        point[index]['count']++;
        break;
      }
    }
  }
}