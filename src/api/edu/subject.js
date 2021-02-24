import request from '@/utils/request'

export default {
    getSubjectTree() {
        return request({
            url: '/back/subject/index',
            method: 'get'
        })
    },
}