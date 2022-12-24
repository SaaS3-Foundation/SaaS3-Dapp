import axios from '@/utils/ajax';

export function getMarketplaceList(params) {
  return axios.get('/saas3/dapi/list', { params });
}

export function getDetail(params) {
  return axios.get('/saas3/dapi/detail', { params });
}
