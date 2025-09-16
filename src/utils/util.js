function throttle(func,delay){
    let inThrottle
    return function(...args){
        if(!inThrottle){
            inThrottle = true
            func.apply(this,args)
            setTimeout(() => {
                inThrottle = false
            },delay)
        }
    }
}

const Util = {
    throttle
}

export default Util