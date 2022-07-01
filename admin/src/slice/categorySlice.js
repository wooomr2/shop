import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";


const initialState = {
  categories: [],
  linearCategories: [],
  isLoading: false,
  error: null,
};


const createLinearCategory = (categories, linearCategories = []) => {
  for (let category of categories) {
    linearCategories.push(category);
    if (category.children.length > 0)
      createLinearCategory(category.children, linearCategories);
  }
  return linearCategories;
};

const buildNewCategories = (categories, category, parentId) => {
  let myCategories = [];

  if (!parentId) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        viewType: category.viewType,
        categoryImg: category.categoryImg,
        children: [],
      },
    ];
  }

  for (let cat of categories) {
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        viewType: category.viewType,
        categoryImg: category.categoryImg,
        children: [],
      };
      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(cat.children, category, parentId)
          : [],
      });
    }
  }

  return myCategories;
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/categories");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/categories", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateCategories = createAsyncThunk(
  "category/updateCategories",
  async (form, thunkAPI) => {
    try {
      const res = await axios.patch("/categories", form);
      if (res.status === 201) thunkAPI.dispatch(getCategories());
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteCategories = createAsyncThunk(
  "category/deleteCategories",
  async (ids, thunkAPI) => {
    try {
      const res = await axios.put("/categories", ids);
      if (res.status === 201) thunkAPI.dispatch(getCategories());
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.linearCategories = createLinearCategory(action.payload);
      state.isLoading = false;
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [addCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      const { parentId } = action.payload;
      state.categories = buildNewCategories(
        state.categories,
        action.payload,
        parentId
      );
      state.linearCategories = [...state.linearCategories, action.payload];
      state.isLoading = false;
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [updateCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    [deleteCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

// export const {} = categorySlice.actions;

export default categorySlice.reducer;
