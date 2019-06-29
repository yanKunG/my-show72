const request = (path,data)=>{
    return new Promise(function(resolve,reject){
        const url = "https://www.zhengzhicheng.cn/api/public/v1"+path
        mpvue.request({
            url:url,
            method:"GET",
            data:data,
            success:(res)=>{
              resolve(res)
            }
          })
    })
}
export default request