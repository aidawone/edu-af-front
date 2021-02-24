import request from '@/utils/request'

export default {
    saveCourse(course) {
        return request({
            url: '/back/course/add',
            method: 'post',
            data: course
        })
    }
}