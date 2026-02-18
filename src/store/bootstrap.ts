import { db } from '../store/db'
import { plans } from '../data/plans'

export const bootstrapOfflineData = async () => {
  const count = await db.plans.count()
  if (!count) {
    await db.plans.bulkPut(plans)
    return
  }

  await db.transaction('rw', db.plans, async () => {
    await db.plans.clear()
    await db.plans.bulkPut(plans)
  })
}
