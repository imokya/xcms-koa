import request from '@/utils/request'

export function searchUser() {
  return request({
    url: '/search/user',
    method: 'get'
  })
}