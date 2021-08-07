import { useQuery } from 'react-query'
import AtlasApiService from 'services/atlas-api-service'

const useServants = () => useQuery(['servants'], () => AtlasApiService.QueryServants(), {
  staleTime: 600000,
  refetchOnWindowFocus: false,
});

export default useServants;
