export type DenomMap = {
  20: number
  10: number
  1: number
}

type Denom = 20 | 10 | 1

const denomMap = { 20: 0, 10: 0, 1: 0 }

const denoms = Object.keys(denomMap)
  .reverse()
  .map(k => parseInt(k))

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

export const sum = (map: DenomMap) =>
  Object.entries(map).reduce(
    (prev, [denom, count]) => prev + parseInt(denom) * count,
    0
  )

export const count = (map: DenomMap) =>
  Object.values(map).reduce((prev, count) => prev + count, 0)

const countBillsList = (amounts: number[]) =>
  amounts.reduce(countBills, denomMap)

export const withdrawalLists = (
  amounts: number[],
  billCount: number,
  maxWithdrawal: number
): DenomMap[] => {
  const bills = countBillsList(amounts)

  const flatBills = Object.entries(bills)
    .map(([denom, count]) => new Array(count).fill(parseInt(denom)))
    .reduce<number[]>((prev, curr) => [...prev, ...curr], [])
    .sort((a, b) => (a < b ? 1 : -1))

  const list: DenomMap[] = [{ ...denomMap }]

  while (flatBills.length) {
    const nextNum = flatBills.shift()! as Denom
    if (
      count(list[0]) + 1 > billCount ||
      sum(list[0]) + nextNum > maxWithdrawal
    ) {
      list.unshift({ ...denomMap })
    }

    list[0][nextNum] += 1
  }

  return list.reverse()
}
