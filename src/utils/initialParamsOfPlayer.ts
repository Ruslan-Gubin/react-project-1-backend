const ironeMine = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1671098900/Posts/ebklpqr6iw9s3hlgvrp3.png'
const woodMine = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1671102328/Posts/ck6ednix2bnlnczmb7gi.png'
const ferma = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1671104695/Posts/a9px0mcr6jtkdd5vurec.png'
const kleyIron = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1671105417/Posts/smniheogjkymwqbcgzxf.png'

const initialParamsOfPlayer = {
  population: 1,
  resourceBar: {
    wood: 300,
    clay: 300,
    iron: 300,
    wheat: 300,
  },
  capasity: {
    wood: 800,
    clay: 800,
    iron: 800,
    wheat: 800,
  },
  income: {
    wood: 5,
    clay: 5,
    iron: 5,
    wheat: 5,
  },
  mines:[
    {  resorse: "iron", level: 0,  imag: ironeMine, title:'железный рудник', piple: 0, income: 0 },
    {  resorse: "iron", level: 0,  imag: ironeMine, title:'железный рудник', piple: 0, income: 0 },
    {  resorse: "iron", level: 0,  imag: ironeMine, title:'железный рудник', piple: 0, income: 0 },
    {  resorse: "iron", level: 0,  imag: ironeMine, title:'железный рудник', piple: 0, income: 0 },
    {  resorse: "wood", level: 0,  imag: woodMine, title:'лесопилка', piple: 0, income: 0 },
    {  resorse: "wood", level: 0,  imag: woodMine, title:'лесопилка', piple: 0, income: 0 },
    {  resorse: "wood", level: 0,  imag: woodMine, title:'лесопилка', piple: 0, income: 0 },
    {  resorse: "wood", level: 0,  imag: woodMine, title:'лесопилка', piple: 0, income: 0 },
    {  resorse: "clay", level: 0,  imag: kleyIron, title:'глиняный карьер', piple: 0, income: 0 },
    {  resorse: "clay", level: 0,  imag: kleyIron, title:'глиняный карьер', piple: 0, income: 0 },
    {  resorse: "clay", level: 0,  imag: kleyIron, title:'глиняный карьер', piple: 0, income: 0 },
    {  resorse: "clay", level: 0,  imag: kleyIron, title:'глиняный карьер', piple: 0, income: 0 },
    {  resorse: "wheat", level: 0,  imag: ferma, title:'ферма',piple: 0, income: 0 },
    {  resorse: "wheat", level: 0,  imag: ferma, title:'ферма',piple: 0, income: 0 },
    {  resorse: "wheat", level: 0,  imag: ferma, title:'ферма',piple: 0, income: 0 },
    {  resorse: "wheat", level: 0,  imag: ferma, title:'ферма',piple: 0, income: 0 },
    {  resorse: "wheat", level: 0,  imag: ferma, title:'ферма',piple: 0, income: 0 },
    {  resorse: "wheat", level: 0,  imag: ferma, title:'ферма',piple: 0, income: 0 },
  ]
}

export {initialParamsOfPlayer}