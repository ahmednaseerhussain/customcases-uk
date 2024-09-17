'use server'

import { db } from '@/db'
import {  CaseFinish, CaseMaterial, PhoneModel } from '@prisma/client'

export type SaveConfigArgs = {
  color: string
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configId: string
  caseImg: string
  text1: string
  text2: string
  
  
}

export async function saveConfig({
  color,
  caseImg,
  finish,
  material,
  model,
  configId,
  text1,
  text2,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model, caseImg, text2, text1},
  })
}
