import axios from '@/utils/ajax';

export function testrun(data) {
  return axios.post('/saas3/dapi/testrun', data);
}

export function submitV2(id, data) {
  return axios.post(`/saas3/dapi/submit/v2/${id}`, data);
}
