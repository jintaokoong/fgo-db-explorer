import { Servant } from '@atlasacademy/api-connector';

const QueryServants = () => {
  return fetch('https://api.atlasacademy.io/export/JP/basic_servant.json')
    .then((res) => {
      return res.json()
    })
    .then((data: Servant.ServantBasic[]) => data)
}

const AtlasApiService = {
  QueryServants: QueryServants,
}

export default AtlasApiService
