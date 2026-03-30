export const MAJOR_CATEGORIES = ["Flower Bouquets", "Gift Items"];

export const getCategoryOptions = (categories = []) =>
  categories.map((category) => ({
    ...category,
    subcategories: category.subcategories || [],
  }));

export const filterCategoriesByMajorCategory = (
  categories = [],
  majorCategory = MAJOR_CATEGORIES[0]
) =>
  getCategoryOptions(categories).filter(
    (category) => (category.majorCategory || MAJOR_CATEGORIES[0]) === majorCategory
  );

export const getSelectionForCategory = (
  categories = [],
  currentCategory = "",
  currentSubCategory = ""
) => {
  if (!categories.length) {
    return { category: "", subCategory: "" };
  }

  const matchedCategory =
    categories.find((item) => item.name === currentCategory) || categories[0];

  const subcategories = matchedCategory.subcategories || [];
  const matchedSubcategory =
    subcategories.find((item) => item.name === currentSubCategory) || subcategories[0];

  return {
    category: matchedCategory.name,
    subCategory: matchedSubcategory?.name || "",
  };
};
