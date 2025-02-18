import { Tokens } from "marked"
import { FlexConverter, KnownFlexComponent } from "../../types"

export class TextWrapConverter implements FlexConverter {
  constructor(private readonly converter: FlexConverter) {}

  async convert(token: Tokens.Text): Promise<KnownFlexComponent[]> {
    const components = await this.converter.convert(token)
    return components.map(component => {
      if (component.type === "text") {
        return {
          ...component,
          wrap: true
        }
      }
      return component
    })
  }
}
