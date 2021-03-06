import { ElementPropTypes } from "@volusion/element-proptypes"

export const configSchema = {
  text: {
    label: "Text content",
    type: ElementPropTypes.string,
  },
}

export const defaultConfig = {
  productSlug: "pageVar:pageUrlText",
  text: "Element Test Test Testing",
}
