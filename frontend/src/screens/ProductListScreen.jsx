import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { Store } from '../Store';

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
        loading: false,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const ProductListScreen = () => {
  const [{ loading, error, products, pages }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const search = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {}
    };
    fetchData();
  }, []);

  return <div>ProductListScreen</div>;
};

export default ProductListScreen;
