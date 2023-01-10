const levelUpRulesFn = (number) => {
    const initialValue = number;
    const initialStep = 50;
    return (level) => {
        return initialValue + initialStep * level + initialStep;
    };
};
const levelCheckNextUp = levelUpRulesFn(50);
export { levelCheckNextUp };
