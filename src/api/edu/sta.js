import request from '@/utils/request'

export default {
    addStatisticsInfo(day) {
        return request({
            url: '/sta/statistics/day',
            method: 'get',
            params: {
                day: day
            }
        })
    },
    getCharts(searchObj) {
        return request({
            url: '/sta/statistics/chart',
            method: 'get',
            params: {
                type: searchObj.type,
                begin: searchObj.begin,
                end: searchObj.end
            }
        })
    }
}