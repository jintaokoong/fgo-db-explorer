import ItemAmountDto from 'interfaces/dtos/item-amount-dto';

const SumMaterials = (arr: ItemAmountDto[]): ItemAmountDto[] => {
  return arr.reduce<ItemAmountDto[]>((n, a) => {
    const idx = n.findIndex((i) => i.item.id === a.item.id);
    if (idx < 0) {
      return [...n, a];
    }

    const e = n[idx];
    const ni = {
      amount: e.amount + a.amount,
      item: a.item,
    };

    return [...n.filter((_, inner) => inner !== idx), ni];
  }, []);
};

const ArrayUtils = {
  SumMaterials: SumMaterials,
};

export default ArrayUtils;
