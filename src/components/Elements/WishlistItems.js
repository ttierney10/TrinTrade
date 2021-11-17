import _ from 'lodash';

export function getItems(arr, items, IDs){
    if(arr.length === 0){return -1}
    let newArr = []
    _.map(items, (item) => {
        for(let i = 0; i < arr.length; i++){
            let {id} = item
            if(arr[i].data === id){
                let listID = IDs[i]
                newArr.push({item, listID})
                break
            }
        }
    })
    return newArr
}