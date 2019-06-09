export type DenomMap = {
  50: number
  20: number
  10: number
  1: number
}

type Denom = 50 | 20 | 10 | 1

const denomMap = { 50: 0, 20: 0, 10: 0, 1: 0 }

const denoms = Object.keys(denomMap)
  .reverse()
  .map(k => parseInt(k))

console.log('denoms', denoms)

const getDenom = (amount: number): Denom =>
  denoms.find(d => amount >= d) as Denom

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
  amounts.reduce(countBills, denomMap)
