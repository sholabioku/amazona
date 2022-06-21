import React from 'react';
import { useReducer } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const SearchScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search); // /search?category=Shirts

  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || 'newest';
  const page = searchParams.get('page') || '1';

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, { loading: true, error: '' });

  return <div>SearchScreen</div>;
};

export default SearchScreen;
