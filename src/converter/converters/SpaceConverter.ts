import { FlexConverter, KnownFlexComponent } from "../../types"

export class SpaceConverter implements FlexConverter {
  async convert(): Promise<KnownFlexComponent[]> {
    return []
  }
}
