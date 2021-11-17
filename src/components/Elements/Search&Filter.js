import _ from 'lodash';

export function filterFunction(arr, checkedColors, inputColor, inputCondition, inputSaleType, inputPrice, inputLocation) {
    var newArr = arr
    newArr = filterColor(newArr, checkedColors, inputColor)
    newArr = filterCondition(newArr, inputCondition)
    newArr = filterSaleType(newArr, inputSaleType)
    newArr = filterLocation(newArr, inputLocation)
    newArr = filterPrice(newArr, inputPrice)
    return newArr
}

function filterPrice(arr, inputPrice){
    let newArr = []
    if(inputPrice === 0){return arr}
    _.map(arr, (item) => {
        let price = item.price
        if(price <= inputPrice){
            newArr.push(item)
        }
    })
    if(newArr.length === 0){return(-1)}
    else{return(newArr)}
}

function filterLocation(arr, inputLocation){
    let newArr = []
    if(inputLocation === ''){return arr}
    else{
        _.map(arr, (item) => {
            let location = item.location.toLowerCase()
            if(location.includes(inputLocation.toLowerCase())){
                newArr.push(item)
            }
        })
    }
    if(newArr.length === 0){return(-1)}
    else{return(newArr)}

}

function filterSaleType(arr, inputSaleType){
    let newArr = []
    if(inputSaleType === -1){
        return arr}
    else{
        _.map(arr, (item) => {
            let saleType = item.saleType
            if(saleType === inputSaleType){
                newArr.push(item)
            }
        })
        if(newArr.length === 0){
            return(-1)}
        else{return(newArr)}
    }
}

function filterCondition(arr, inputCondition){
    let newArr = []
    if(inputCondition === -1){return arr}
    else{
        _.map(arr, (item) => {
            let condition = item.condition
            if(condition === inputCondition){
                newArr.push(item)
            }
        })
        if(newArr.length === 0){return(-1)}
        else{return(newArr)}
    }
}

function filterColor(arr, checkedColors, inputColor){
    let newArr = []
    if(checkedColors.length === 0 && inputColor.length === 0){return arr}
    _.map(arr, (item) => {
        let color = item.color.toLowerCase()
        for(let i = 0; i < checkedColors.length; i++){
            if(color === checkedColors[i].toLowerCase()){
                newArr.push(item)
                break;
            }
        }
        if(color === inputColor.toLowerCase() && !newArr.includes(item)){
            newArr.push(item)
        }
    })
    if(newArr.length === 0){return(-1)}
    else{return(newArr)}
}

export function queryFunction(arr, search) {
    var newArr = []
    _.map(arr, (item) => {
        let name = item.name.toLowerCase()
        let des = item.description.toLowerCase()
        let tag1 = item.tag1.toLowerCase()
        let tag2 = item.tag2.toLowerCase()
        let tag3 = item.tag3.toLowerCase()

        if(name.includes(search) || des.includes(search) || tag1.includes(search) || 
           tag2.includes(search) || tag3.includes(search))
        {
            newArr.push(item)
        }            
    })
    if(newArr.length === 0){return(-1)}
    else{return(newArr)}
}