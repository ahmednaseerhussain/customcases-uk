'use server'

import { db } from '@/db'
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel, CaseDesign } from '@prisma/client'

export type SaveConfigArgs = {
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configId: string
  caseImg: CaseDesign
  
}

export async function saveConfig({
  color,
  caseImg,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model, caseImg, },
  })
}
