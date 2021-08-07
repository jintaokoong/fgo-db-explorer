import useServant from 'hooks/use-servant'
import Loader from 'components/shared/loader'
import Header from 'components/header'
import { OffsetBody } from 'components/shared/offset-body'
import useIDParam from 'hooks/use-id-param'

export const ServantDetailsPage = () => {
  const id = useIDParam();
  const { data, isLoading } = useServant(id);

  return <div>
    <Header title={data?.name ?? ''} allowReturn />
    <Loader active={isLoading} />
    <OffsetBody hasHeader>
    </OffsetBody>
  </div>
}
