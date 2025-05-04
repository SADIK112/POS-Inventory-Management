export const getNumberVariantId = (id) => {
    if (typeof id === 'string') {
      const variantIdSplitArr = id.split('/');
      const variantId = variantIdSplitArr[variantIdSplitArr.length - 1];
      return +variantId;
    }
    return +id;
  };