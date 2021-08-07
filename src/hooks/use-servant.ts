import { useQuery } from 'react-query'
import AtlasApiService from 'services/atlas-api-service'

const useServant = (id: string) => useQuery(['servant', id], () => AtlasApiService.QueryServant(id), {
  staleTime: 600000,
  refetchOnWindowFocus: false,
})

export default useServant;
