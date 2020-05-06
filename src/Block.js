import React from "react"
import { css, StyleSheet } from "aphrodite/no-important"
import { getStyles } from "./getStyles"
import { defaultConfig } from "./configs"

const Block = (props) => {
  const product = props.data
  if (!product.id) {
    return <h1>Product Landing Block</h1>
  }
  const addToCart = () => {
    const productVariant = {
      productId: product.id,
      quantity: 1,
      variantId: product.productVariants[0].id,
      itemPrice: product.productVariants[0].price,
    }
    props.pubSub.publish(props.events.cart.addToCart, productVariant)
  }
  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <button onClick={addToCart}>Add to Cart</button>
    </React.Fragment>
  )
}

Block.defaultProps = defaultConfig

export default Block
