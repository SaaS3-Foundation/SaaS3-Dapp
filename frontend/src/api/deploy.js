import axios from '@/utils/ajax';

export function testrun(body) {
  return axios.post('saas3/dapi/testrun', body);
}
