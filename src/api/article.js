import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/articles/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/articles/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/articles/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/articles/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/articles/update',
    method: 'post',
    data
  })
}
