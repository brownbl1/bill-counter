// @ts-check

const getDenom = amount =>
  amount >= 20 ? 20 : amount >= 10 ? 10 : amount >= 5 ? 5 : 1

const countBills = (totals, amount) => {
  if (!amount) return totals

  const denom = getDenom(amount)
  return countBills(
    {
      ...totals,
      [denom]: totals[denom] + Math.floor(amount / denom),
    },
    amount % denom
  )
}

const countBillsList = amounts =>
  amounts.reduce(countBills, { 20: 0, 10: 0, 5: 0, 1: 0 })

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

console.log(countBillsList(budgets))
