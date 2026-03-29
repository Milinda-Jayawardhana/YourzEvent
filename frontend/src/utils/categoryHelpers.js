export const buildCategoryTreeFromProducts = (products = []) => {
  const categoryMap = new Map();

  products.forEach((product) => {
    if (!product.category) return;

    if (!categoryMap.has(product.category)) {
      categoryMap.set(product.category, new Set());
    }

    if (product.subCategory) {
      categoryMap.get(product.category).add(product.subCategory);
    }
  });

  return Array.from(categoryMap.entries())
    .map(([name, subcategories]) => ({
      _id: name,
      name,
      subcategories: Array.from(subcategories)
        .sort((left, right) => left.localeCompare(right))
        .map((subName) => ({ _id: `${name}-${subName}`, name: subName })),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
};
