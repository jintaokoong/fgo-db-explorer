import { PropsWithChildren } from 'react'

interface Props {
  condition?: boolean
}

const Visible = (props: PropsWithChildren<Props>) => {
  return <>
    {
      props.condition ? props.children : null
    }
  </>;
}

export default Visible;
