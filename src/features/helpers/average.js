export const averageWeightAndHeight = (heroes) => {
  const totalHeroes = heroes.length;
  const totalWeight = heroes.reduce((a, b) => {
    const rawWeight = b.appearance.weight[1];
    const weight = rawWeight.split(" ")[0];

    return a + parseInt(weight);
  }, 0);
  const totalHeight = heroes.reduce((a, b) => {
    const rawHeight = b.appearance.height[1];
    const height = rawHeight.split(" ")[0];
    return a + parseInt(height);
  }, 0);
  const result = {
    weight: (totalWeight / totalHeroes).toFixed(1),
    height: (totalHeight / totalHeroes).toFixed(1),
  };
  return result;
};
