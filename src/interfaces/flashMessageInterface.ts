import { type StatusEnums } from '../enums/statusEnums'

export interface FlashMessage {
  status: StatusEnums
  message: string
}
