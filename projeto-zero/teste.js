/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
    for(const n in nums) {     
        let s = n
        let vf;
        if(vf) return
        for(const c in nums) {
            console.log( nums[s] + ' + ' +  nums[c] );
            
            if( nums[s] + nums[c] === target ) {
                vf = `A soma de ${nums[s]}(${s}) e ${nums[c]}(${c}) é igual a ${target}`
                console.log(vf)
                return
            } else {
                continue;
            }
        }
    }
};


twoSum([3,5,3,12], 15)