import { Servant } from '@atlasacademy/api-connector';

const QueryServants = () => {
  return fetch('https://api.atlasacademy.io/export/JP/basic_servant.json')
    .then((res) => {
      return res.json()
    })
    .then((data: Servant.ServantBasic[]) => data)
}

const QueryServant = (id: string) => {
  return fetch(`https://api.atlasacademy.io/nice/JP/servant/${id}?lore=false&lang=jp`)
    .then((res) => {
      return res.json()
  })
    .then((data: Servant.Servant) => data);
}

const AtlasApiService = {
  QueryServants: QueryServants,
  QueryServant: QueryServant,
}

export default AtlasApiService
