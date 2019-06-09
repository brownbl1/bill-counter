export type DenomMap = {
  50: number
  20: number
  10: number
  5: number
  1: number
}

const getDenom = (amount: number) =>
  amount >= 50
    ? 50
    : amount >= 20
    ? 20
    : amount >= 10
    ? 10
    : amount >= 5
    ? 5
    : 1

const countBills = (totals: DenomMap, amount: number): DenomMap => {
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

export const countBillsList = (amounts: number[]) =>
  amounts.reduce(countBills, { 50: 0, 20: 0, 10: 0, 5: 0, 1: 0 })
