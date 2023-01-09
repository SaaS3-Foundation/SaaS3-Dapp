import axios from '@/utils/ajax';

export function update(id, data) {
  return axios.put(`/saas3/user/update/${id}`, data);
}

export function addWallet(id, data) {
  return axios.post(`/saas3/user/${id}/wallet/add`, data);
}
