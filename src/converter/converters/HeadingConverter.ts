import { Tokens } from "marked"
import { FlexConverter, KnownFlexComponent } from "../../types"
import { decodeText } from "../../lib/decodeText"

function getInnerText(token: Tokens.Generic): string {
  return token.tokens
    ? token.tokens
      .map((t: any) => {
        if (t.tokens != null) {
          return getInnerText(t)
        }
        return t.text ?? ""
      })
      .join("")
    : token.text
}

export class HeadingConverter implements FlexConverter {
  async convert(
    token: Tokens.Heading | Tokens.Generic
  ): Promise<KnownFlexComponent[]> {
    const text = getInnerText(token)
    let size = "md"
    let paddingBottom = "sm"
    if (token.depth === 1) {
      size = "xl"
      paddingBottom = "lg"
    }
    else if (token.depth === 2) {
      size = "lg"
      paddingBottom = "md"
    }
    const component: KnownFlexComponent = {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: decodeText(text),
          weight: "bold",
          size
        }
      ],
      paddingBottom
    }
    return [component]
  }
}
