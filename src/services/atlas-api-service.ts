import { BasicServant } from 'interfaces/entities/basic-servant'

const QueryServants = () => {
  return fetch('https://api.atlasacademy.io/export/JP/basic_servant.json')
    .then((res) => {
      return res.json()
    })
    .then((data: BasicServant[]) => data)
}

const AtlasApiService = {
  QueryServants: QueryServants,
}

export default AtlasApiService
