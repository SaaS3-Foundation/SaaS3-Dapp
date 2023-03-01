import useSWR from 'swr';

export const useLogin = (address, data) => useSWR(address ? {
  url: `/saas3/user/login/${address}`,
  method: 'POST',
  data,
} : null, {
  // revalidateOnFocus: true,
});
