import { Servant } from '@atlasacademy/api-connector';
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from 'contexts/theme-context';
import Colors from 'constants/colors';
import { useHistory } from 'react-router-dom';

interface Props {
  servant: Servant.ServantBasic;
}

const Card = styled.div`
  display: flex;
  flex-direction: row;

  height: 10vh;
  min-height: 50px;

  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme === 'dark' ? Colors.background.dark : Colors.background.light};
  margin: 10px;
  padding: 5px;

  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;
const Image = styled.img`
  border-radius: 5px;
  height: 9vh;
`;

const InfoContainer = styled.div`
  padding-left: 10px;
`;
const Name = styled.div`
  font-weight: bold;
`;

const ServantCard = (props: Props) => {
  const { mode } = useContext(ThemeContext);
  const history = useHistory();

  return (
    <Card
      theme={mode}
      onClick={() => history.push(`/servant/${props.servant.id}`)}
    >
      <ImageContainer>
        <Image alt={props.servant.name} src={props.servant.face} />
      </ImageContainer>
      <InfoContainer>
        <Name>{props.servant.name}</Name>
        <div>
          {Array(props.servant.rarity)
            .fill(0)
            .map(() => '★')}
        </div>
      </InfoContainer>
    </Card>
  );
};

export default ServantCard;
