import axios from '@/utils/ajax';

export function login(address, data) {
  return axios.post(`/saas3/user/login/${address}`, data);
}

export function update(id, data) {
  return axios.put(`/saas3/user/update/${id}`, data);
}

export function detail(address, params) {
  return axios.get(`/saas3/user/detail/${address}`, { params });
}

export function addWallet(id, data) {
  return axios.post(`/saas3/user/${id}/wallet/add`, data);
}
