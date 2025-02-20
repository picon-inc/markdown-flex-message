import { Tokens } from "marked"
import { FlexConverter, KnownFlexComponent } from "../../types"

export class SpaceConverter implements FlexConverter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async convert(token: Tokens.Space): Promise<KnownFlexComponent[]> {
    return [{
      type: 'span',
      text: token.raw
    }]
  }
}
