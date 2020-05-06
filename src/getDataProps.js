export const getDataProps = (utils, props) => {
  const { productSlug } = props
  const { client, isRendering } = utils
  if (isRendering || productSlug !== "pageVar:pageUrlText") {
    return client.products.getBySlug(productSlug).catch(() => {})
  } else {
    return client.products
      .search({ query: "", pageSize: 1 })
      .then((data) => data.items[0])
  }
}
