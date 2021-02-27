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
    },
    updateChapter(course) {
        return request({
            url: '/back/chapter/update',
            method: 'put',
            data: course
        })
    },
    removeChapterById(id) {
        return request({
            url: '/back/chapter/delete',
            method: 'delete',
            params: {
                id: id
            }
        })
    },
    addChapter(course) {
        return request({
            url: '/back/chapter/add',
            method: 'post',
            data: course
        })
    },
    getChapterById(id) {
        return request({
            url: '/back/chapter/detail',
            method: 'get',
            params: {
                id: id
            }
        })
    },
   
}