import React, { useState } from "react"
import { css, StyleSheet } from "aphrodite/no-important"
import { getStyles } from "./getStyles"
import { defaultConfig } from "./configs"

const Block = (props) => {
  const product = props.data
  if (!product.id) {
    return <h1>Product Landing Block</h1>
  }
  const [selectedOptions, setSelectedOptions] = useState(
    getInitialSelectedOptions()
  )
  const [selectedVariant, setSelectedVariant] = useState(
    getVariantFromOptions()
  )
  React.useEffect(() => {
    setSelectedVariant(getVariantFromOptions())
  }, [selectedOptions])
  function getInitialSelectedOptions() {
    return product.variantOptions.map((optionCategory) => {
      return optionCategory.options[0]
    })
  }
  function getVariantFromOptions() {
    if (selectedOptions.length === 0) {
      return product.productVariants[0]
    }
    return product.productVariants.find((variant) => {
      return !variant.variants.some((value, index) => {
        return selectedOptions[index] !== value
      })
    })
  }
  function addItem() {
    const productVariant = {
      productId: product.id,
      quantity: 1,
      variantId: selectedVariant.id,
      itemPrice: selectedVariant.price,
    }
    props.pubSub.publish(props.events.cart.addToCart, productVariant)
  }
  function onOptionSelected(value, index) {
    const updatedSelection = [...selectedOptions]
    updatedSelection[index] = value
    setSelectedOptions(updatedSelection)
  }
  return (
    <>
      <h1>{product.name}</h1>
      <p>
        {selectedVariant ? (
          <span>${selectedVariant.price}</span>
        ) : (
          <span>Option not availble.</span>
        )}
      </p>
      <button onClick={addItem}>Add to Cart</button>
      {product.variantOptions.map((optionCategory, index) => (
        <React.Fragment key={`optionCategory${index}`}>
          <label> {optionCategory.name} </label>
          <select onChange={(e) => onOptionSelected(e.target.value, index)}>
            {optionCategory.options.map((option, optionIndex) => (
              <option key={`option${optionIndex}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        </React.Fragment>
      ))}
    </>
  )
}

Block.defaultProps = defaultConfig

export default Block
