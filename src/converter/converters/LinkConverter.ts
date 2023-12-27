import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class LinkConverter implements FlexConverter {
  convert(token: Tokens.Link): FlexComponent[] {
    const { href, text } = token
    return [{
      type: 'text',
      text,
      decoration: "underline",
      color: "#0c93e4",
      action: {
        type: "uri",
        label: text,
        uri: href,
      },
    }]
  }
}