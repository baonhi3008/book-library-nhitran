const axios = require('axios')
async function callExternalAPI(url) {
    return axios.get(url).then(response => response.data)
}

function groupBy (input,key) {
    return input.reduce((acc,currentValue)=>{
        let groupKey = currentValue[key]
        // console.log(groupKey)
        if(!acc[groupKey]){
            acc[groupKey] = []
        }
        acc[groupKey].push(currentValue)
        return acc
    },
    {})
}
// console.log(groupBy(data))


module.exports = {callExternalAPI,groupBy};
