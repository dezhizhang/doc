/*
 * :file description: 
 * :name: /dumi/docs/backend/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-01-21 08:53:35
 * :last editor: 张德志
 * :date last edited: 2024-01-21 08:54:51
 */


var findKthPositive = function(arr, k) {
    let nums = [];
    for(let i=1;i < arr.length + k + 1;i++) {
        console.log(i)
        if(!arr.includes(i)) {
            nums.push(i)
        }
    }
    return nums[k - 1]
};


console.log(findKthPositive([1,2,3,4],2))