import { EntityLevelUpMaterialProgression } from '@atlasacademy/api-connector/dist/Schema/Entity';
import { useMemo } from 'react';
import ArrayUtils from 'utils/array-utils';

const cleanInput = (input: string) => {
  const parsed = input.length === 0 ? 1 : parseInt(input);
  return parsed >= 10 ? 9 : parsed;
};

const getItems = (
  current: number,
  material: EntityLevelUpMaterialProgression
) => {
  const preprocessedItems = Array(10 - current)
    .fill(0)
    .map((_, idx) => material[current + idx]);
  const items = preprocessedItems.flatMap((i) => i.items);
  return ArrayUtils.SumMaterials(items);
};

interface Inputs {
  first: string;
  second: string;
  third: string;
}

const useRequiredMaterials = (
  inputs: Inputs,
  mats: EntityLevelUpMaterialProgression | undefined
) => {
  return useMemo(() => {
    if (!mats) {
      return [];
    }
    const { first: ifirst, second: isecond, third: ithird } = inputs;
    const f = cleanInput(ifirst);
    const first = getItems(f, mats);
    const s = cleanInput(isecond);
    const second = getItems(s, mats);
    const t = cleanInput(ithird);
    const third = getItems(t, mats);
    return ArrayUtils.SumMaterials([...first, ...second, ...third]);
  }, [inputs, mats]);
};

export default useRequiredMaterials;
