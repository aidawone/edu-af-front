import request from '@/utils/request'

export default {
    getVideoById(id) {
        return request({
            url: '/back/video/detail',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    updateVideoById(video) {
        return request({
            url: '/back/video/update',
            method: 'put',
            data: video
        })
    },
    saveVideoById(video) {
        return request({
            url: '/back/video/add',
            method: 'post',
            data: video
        })
    },
    removeVideoById(id) {
        return request({
            url: '/back/video/delete',
            method: 'delete',
            params: {
                id: id
            }
        })
    },
    deleteVodByIds(ids){
        return request({
            url: '/vod/video/delete',
            method: 'delete',
            params: {
                id: ids
            }
        })
    }
}