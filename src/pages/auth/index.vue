<template>
    <div>
        <button open-type='getUserInfo' @getuserinfo='handleInfo'>授权登录</button>
    </div>
</template>

<script>
import request from '../../utils/request'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        handleInfo(e){
            let detail = e.mp.detail
            console.log(detail)
            mpvue.login({
                success(res){
                    let param = {
                        code: res.code,
                        encryptedData: detail.encryptedData,
                        iv: detail.iv,
                        rawData: detail.rawData,
                        signature: detail.signature
                    }
                    request('users/wxlogin', 'post', param).then(i=>{
                        console.log(i)
                    })
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
</style>
