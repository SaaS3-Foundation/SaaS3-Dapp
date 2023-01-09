import useSWR from 'swr';

export const useLogin = (address) => useSWR(address ? {
  url: `/saas3/user/login/${address}`,
  method: 'POST',
} : null, {
  revalidateOnFocus: true,
});
