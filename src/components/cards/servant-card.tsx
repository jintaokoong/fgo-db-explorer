import { BasicServant } from 'interfaces/entities/basic-servant'
import styled from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from 'contexts/theme-context'
import Colors from 'constants/colors'

interface Props {
  servant: BasicServant;
}

const Card = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 10vh;
  
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  border-radius: 5px;
  background-color: ${props => props.theme === 'dark' ? Colors.background.dark : Colors.background.light};
  margin: 10px;
  padding: 5px;
  
  cursor: pointer;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`
const Image = styled.img`
  border-radius: 5px;
`

const InfoContainer = styled.div`
  padding-left: 10px;
`
const Name = styled.div`
  font-weight: bold;
`

const ServantCard = (props: Props) => {
  const { mode } = useContext(ThemeContext);

  return <Card theme={mode}>
    <ImageContainer>
      <Image alt={props.servant.name} src={props.servant.face} />
    </ImageContainer>
    <InfoContainer>
      <Name>{props.servant.name}</Name>
    </InfoContainer>
  </Card>
}

export default ServantCard
