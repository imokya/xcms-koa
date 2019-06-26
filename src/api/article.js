import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

export function createArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function updateArticle(id, data) {
  return request({
    url: `/article/${id}`,
    method: 'patch',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete'
  })
}
