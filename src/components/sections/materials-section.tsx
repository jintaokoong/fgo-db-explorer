import ItemAmountDto from 'interfaces/dtos/item-amount-dto';
import styled from 'styled-components';
import _ from 'lodash';

interface Props {
  materials: ItemAmountDto[];
}

const MatImage = styled.img`
  margin-right: 5px;
  vertical-align: middle;
`;

const MaterialsSection = (props: Props) => {
  const { materials } = props;
  return (
    <table style={{ width: '100%' }}>
      {_.chunk<ItemAmountDto>(materials, 4).map((g, idx) => (
        <tr key={idx}>
          {g.map((m) => (
            <td key={m.item.id}>
              <MatImage
                title={m.item.name}
                alt={m.item.name}
                height={30}
                src={m.item.icon}
              />
              x {m.amount}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default MaterialsSection;
