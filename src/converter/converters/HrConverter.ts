import { FlexConverter, KnownFlexComponent } from "../../types"

export class HrConverter implements FlexConverter {
  async convert(): Promise<KnownFlexComponent[]> {
    return [{
      type: 'separator',
      margin: 'md'
    }]
  }
}
