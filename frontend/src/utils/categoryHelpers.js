export const buildCategoryTreeFromProducts = (products = []) => {
  const categoryMap = new Map();

  products.forEach((product) => {
    if (!product.category) return;
    const majorCategory = product.majorCategory || "Flower Bouquets";
    const categoryKey = `${majorCategory}::${product.category}`;

    if (!categoryMap.has(categoryKey)) {
      categoryMap.set(categoryKey, {
        majorCategory,
        name: product.category,
        subcategories: new Set(),
      });
    }

    if (product.subCategory) {
      categoryMap.get(categoryKey).subcategories.add(product.subCategory);
    }
  });

  return Array.from(categoryMap.values())
    .map(({ majorCategory, name, subcategories }) => ({
      _id: `${majorCategory}-${name}`,
      majorCategory,
      name,
      subcategories: Array.from(subcategories)
        .sort((left, right) => left.localeCompare(right))
        .map((subName) => ({ _id: `${majorCategory}-${name}-${subName}`, name: subName })),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
};
