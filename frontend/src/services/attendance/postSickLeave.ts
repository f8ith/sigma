import type { ValidationError } from 'src/types/error'
import { Either, fail, success } from 'src/utils/either'
import { mapValidationResponse } from 'src/utils/map-checkable-response'
import { request } from '../index'

export interface SickLeaveForm {
  proof: File
}

export type SickLeaveErrors = Partial<Record<keyof SickLeaveForm, string[]>>

export async function postLogin (form: SickLeaveForm): Promise<Either<ValidationError<SickLeaveErrors>, User>> {
  const result1 = await request.checkablePost<UserResponse>('/users/sickleave', { user: form })
  const result2 = mapValidationResponse<SickLeaveErrors, UserResponse>(result1)

  if (result2.isOk()) return success(result2.value.user)
  else return fail(result2.value)
}