const levelUpRulesFn = (number: number): ((level: number) => number) => {
  const initialValue = number;
  const initialStep = 50;

  return (level): number => {
    return  initialValue + initialStep * level + initialStep 
  };
};

const levelCheckNextUp = levelUpRulesFn(50);

export { levelCheckNextUp };
