import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function find(query) {
  return request({
    url: '/user',
    method: 'get',
    params: query
  })
}

export function del(params) {
  return request({
    url: `/user/${params.id}`,
    method: 'delete'
  })
}

export function create(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: `/user/${data._id}`,
    method: 'patch',
    data
  })
}
