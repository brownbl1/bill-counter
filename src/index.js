// @ts-check

const getDenom = amount => {
  if (amount >= 20) return 20
  if (amount >= 10) return 10
  if (amount >= 5) return 5
  return 1
}

const getDenoms = () => ({ 20: 0, 10: 0, 5: 0, 1: 0 })

const countBills = amount => {
  const bills = getDenoms()

  while (amount) {
    const denom = getDenom(amount)
    bills[denom] = Math.floor(amount / denom)
    amount %= denom
  }

  return bills
}

const sumPairs = (prev, curr) =>
  Object.keys(prev).reduce((obj, key) => {
    obj[key] = prev[key] + curr[key]
    return obj
  }, getDenoms())

const countBillList = amounts => {
  return amounts.map(countBills).reduce(sumPairs, getDenoms())
}

const budgets = [
  500, // food and dining
  100, // misc expenses
  100, // gift
  85, // kids
  75, // clothing
  30, // personal care
  30, // breakfast out
  25, // dates
  20, // ben
  20, // jas
  12, // hair
]

console.log(countBillList(budgets))
