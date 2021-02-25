import request from '@/utils/request'

export default {
    saveCourse(course) {
        return request({
            url: '/back/course/add',
            method: 'post',
            data: course
        })
    },
    getCourseInfo(id) {
        return request({
            url: '/back/course/detail',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    updateById(vo) {
        return request({
            url: '/back/course/update',
            method: 'post',
            data: vo
        })
    },
    getCourseInfoById(id) {
        return request({
            url: '/back/course/info',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    publishCourseById(id) {
        return request({
            url: '/back/course/publish',
            method: 'put',
            params: {
                id: id
            }
        })
    },
    removeCourseById(id) {
        return request({
            url: '/back/course/delete',
            method: 'delete',
            params: {
                id: id
            }
        })
    },
    listCourseByPage(course) {
        return request({
            url: '/back/course/index',
            method: 'get',
            params: course
        })
    }
}