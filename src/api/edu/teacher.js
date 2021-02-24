import request from '@/utils/request'

export default {
    getTeacherQueryPage(vo) {
        return request({
            url: '/back/teacher/query',
            method: 'get',
            params: vo

        })
    },
    removeById(id) {
        return request({
            url: '/back/teacher/delete',
            method: 'delete',
            params: {
                id: id
            }
        })
    },
    addTeacher(teacher) {
        return request({
            url: '/back/teacher/add',
            method: 'post',
            data: teacher
        })
    },
    getTeacherById(id) {
        return request({
            url: '/back/teacher/detail',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    updateById(teacher) {
        return request({
            url: '/back/teacher/update',
            method: 'put',
            data: teacher
        })
    },
    getTeachers(){
        return request({
            url: '/back/teacher/all',
            method: 'get'
        })
    }

}