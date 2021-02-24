import request from '@/utils/request'

export default {
    getChapterVideos(course) {
        return request({
            url: '/back/chapter/index',
            method: 'get',
            params: {
                id: course
            }
        })
    }
}