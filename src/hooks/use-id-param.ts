import { useParams } from 'react-router-dom'

interface Params {
  id: string;
}

const useIDParam = () => {
  const { id } = useParams<Params>()

  return id;
}

export default useIDParam;
