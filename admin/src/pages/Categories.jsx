import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { backendUrl } from '../App';

const Categories = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [subCategoryDrafts, setSubCategoryDrafts] = useState({});
  const [editingCategoryId, setEditingCategoryId] = useState('');
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState({
    categoryId: '',
    subcategoryId: '',
    name: ''
  });

  const authConfig = useMemo(() => ({ headers: { token } }), [token]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/category/list`);

      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (event) => {
    event.preventDefault();

    if (!newCategory.trim()) {
      toast.error('Enter a category name');
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/category/add`,
        { name: newCategory },
        authConfig
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setNewCategory('');
        fetchCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveCategoryRename = async (categoryId) => {
    if (!editingCategoryName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/category/${categoryId}`,
        { name: editingCategoryName },
        authConfig
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEditingCategoryId('');
        setEditingCategoryName('');
        fetchCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/category/${categoryId}`,
        authConfig
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createSubcategory = async (categoryId) => {
    const name = subCategoryDrafts[categoryId]?.trim();
    if (!name) {
      toast.error('Enter a subcategory name');
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/category/${categoryId}/subcategories`,
        { name },
        authConfig
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setSubCategoryDrafts((prev) => ({ ...prev, [categoryId]: '' }));
        fetchCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveSubcategoryRename = async () => {
    const { categoryId, subcategoryId, name } = editingSubcategory;

    if (!name.trim()) {
      toast.error('Subcategory name cannot be empty');
      return;
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/category/${categoryId}/subcategories/${subcategoryId}`,
        { name },
        authConfig
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEditingSubcategory({ categoryId: '', subcategoryId: '', name: '' });
        fetchCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeSubcategory = async (categoryId, subcategoryId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/category/${categoryId}/subcategories/${subcategoryId}`,
        authConfig
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCategories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add Categories</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage categories and subcategories for product creation and storefront filters.
        </p>
      </div>

      <form
        onSubmit={createCategory}
        className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row"
      >
        <input
          type="text"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="New category name"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
        >
          Add Category
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-gray-500">Loading categories...</p>
      ) : categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          No categories yet. Add the first category to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => {
            const isEditingCategory = editingCategoryId === category._id;

            return (
              <div key={category._id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
                    {isEditingCategory ? (
                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(event) => setEditingCategoryName(event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black md:max-w-sm"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    )}
                    <span className="text-xs text-gray-500">
                      {category.subcategories.length} subcategor{category.subcategories.length === 1 ? 'y' : 'ies'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {isEditingCategory ? (
                      <>
                        <button
                          type="button"
                          onClick={() => saveCategoryRename(category._id)}
                          className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategoryId('');
                            setEditingCategoryName('');
                          }}
                          className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategoryId(category._id);
                          setEditingCategoryName(category.name);
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700"
                      >
                        Rename
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeCategory(category._id)}
                      className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                  <input
                    type="text"
                    value={subCategoryDrafts[category._id] || ''}
                    onChange={(event) =>
                      setSubCategoryDrafts((prev) => ({
                        ...prev,
                        [category._id]: event.target.value
                      }))
                    }
                    placeholder={`Add subcategory under ${category.name}`}
                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => createSubcategory(category._id)}
                    className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
                  >
                    Add Subcategory
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {category.subcategories.length === 0 ? (
                    <p className="text-sm text-gray-500">No subcategories yet.</p>
                  ) : (
                    category.subcategories.map((subcategory) => {
                      const isEditingSubcategory =
                        editingSubcategory.categoryId === category._id &&
                        editingSubcategory.subcategoryId === subcategory._id;

                      return (
                        <div
                          key={subcategory._id}
                          className="flex flex-col gap-2 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 md:flex-row md:items-center md:justify-between"
                        >
                          {isEditingSubcategory ? (
                            <input
                              type="text"
                              value={editingSubcategory.name}
                              onChange={(event) =>
                                setEditingSubcategory((prev) => ({
                                  ...prev,
                                  name: event.target.value
                                }))
                              }
                              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black md:max-w-sm"
                            />
                          ) : (
                            <p className="text-sm font-medium text-gray-700">{subcategory.name}</p>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {isEditingSubcategory ? (
                              <>
                                <button
                                  type="button"
                                  onClick={saveSubcategoryRename}
                                  className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEditingSubcategory({
                                      categoryId: '',
                                      subcategoryId: '',
                                      name: ''
                                    })
                                  }
                                  className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingSubcategory({
                                    categoryId: category._id,
                                    subcategoryId: subcategory._id,
                                    name: subcategory.name
                                  })
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700"
                              >
                                Rename
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removeSubcategory(category._id, subcategory._id)}
                              className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;

Categories.propTypes = {
  token: PropTypes.string.isRequired,
};
