import React from "react"
import { css, StyleSheet } from "aphrodite/no-important"
import { getStyles } from "./getStyles"
import { defaultConfig } from "./configs"

const Block = (props) => {
  const classes = StyleSheet.create(getStyles(props))

  const product = props.data
  if (!product.id) {
    return (
      <div>
        <h1 className={css(classes.example)}>{props.text}</h1>
        <h1>Product Landing Block</h1>
      </div>
    )
  }
  return (
    <div>
      <h1 className={css(classes.example)}>{props.text}</h1>
      <h1>{product.name}</h1>
    </div>
  )
}

Block.defaultProps = defaultConfig

export default Block
