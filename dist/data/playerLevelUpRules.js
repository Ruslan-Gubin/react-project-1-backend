const levelUpRulesFn = (number) => {
    const result = [];
    const initialRequered = 100;
    for (let i = 1; i < number; i++) {
        result.push({ level: i, requiredExperience: initialRequered + 50 });
    }
    return result;
};
console.log(levelUpRulesFn(5));
const playerLevelUpRules = [
    { level: 1, requiredExperience: 100 },
    { level: 2, requiredExperience: 150 },
];
export {};
