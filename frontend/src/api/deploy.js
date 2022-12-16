import axios from '@/utils/ajax';

export function testrun(body) {
  return axios.post('saas3/dapitestrun', body);
}
