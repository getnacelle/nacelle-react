import React, { useState } from 'react';

import {
  set as setCookie,
  get as getCookie,
  remove as removeCookie
} from 'es-cookie';

import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_RENEW,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  CUSTOMER_CREATE,
  CUSTOMER_RECOVER,
  CUSTOMER_RESET,
  CUSTOMER_ACTIVATE,
  GET_CUSTOMER,
  CUSTOMER_UPDATE,
  GET_CUSTOMER_ADDRESSES,
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_UPDATE,
  CUSTOMER_ADDRESS_DELETE,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
  transformEdges
} from '../gql';

export const AccountContext = React.createContext();

const myshopifyDomain = process.env.MYSHOPIFY_DOMAIN;
const shopifyToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const serverlessEndpoint = process.env.SERVERLESS_ENDPOINT;

const secure = process.env.NODE_ENV !== 'development';
// The strict mode withholds the cookie from any kind of cross-site usage (including inbound links from external sites).
const sameSite = 'strict';

function useAsyncReducer(reducer, initState) {
  const [state, setState] = useState(initState),
    dispatchState = async (action) => setState(await reducer(state, action));
  return [state, dispatchState];
}

async function accountReducer(state, action) {
  switch (action.type) {
    case 'REGISTER': {
      const newState = await register(state, action.payload);
      state = { ...newState };
      return newState;
    }
    case 'UPDATE_CUSTOMER': {
      const newState = await updateCustomer(state, action.payload);
      state = { ...newState };
      return newState;
    }
    case 'LOGIN': {
      const newState = await login(state, action.payload);
      state = { ...newState };
      console.log('1', newState);
      return newState;
    }
    case 'TOKEN_LOGIN': {
      const newState = await tokenLogin(state, action.payload);
      state = { ...newState };
      console.log('2', newState);
      return newState;
    }
    case 'LOGOUT': {
      const newState = await logout(state);
      state = { ...newState };
      console.log('3', newState);
      return newState;
    }
    case 'FETCH_COUNTRIES': {
      const newState = await fetchCountries(state);
      state = { ...newState };
      console.log('4', newState);
      return newState;
    }
    case 'FETCH_PROVINCES': {
      const newState = await fetchProvince(state, action.payload);
      state = { ...newState };
      console.log('5', newState);
      return newState;
    }
    case 'CREATE_ADDRESS': {
      const newState = await createAddress(state, action.payload);
      state = { ...newState };
      console.log('6', newState);
      return newState;
    }
    case 'INIT_ADDRESSES': {
      const newState = await initAddresses(state);
      state = { ...newState };
      console.log('14', newState);
      return newState;
    }

    case 'FETCH_ADDRESSES': {
      const newState = await fetchAddresses(state);
      state = { ...newState };
      console.log('7', newState);
      return newState;
    }
    case 'UPDATE_ADDRESS': {
      const newState = await updateAddress(state, action.payload);
      state = { ...newState };
      console.log('8', newState);
      return newState;
    }
    case 'DELETE_ADDRESS': {
      const newState = await deleteAddress(state, action.payload);
      state = { ...newState };
      console.log('9', newState);
      return newState;
    }
    case 'UPDATE_DEFAULT_ADDRESS': {
      const newState = await updateDefaultAddress(state, action.payload);
      state = { ...newState };
      console.log('10', newState);
      return newState;
    }
    case 'USER_ERRORS': {
      const newState = { ...state, userErrors: action.payload };
      return newState;
    }
    case 'RECOVER': {
      const newState = await recover(state, action.payload);
      state = { ...newState };
      console.log('91', newState);
      return newState;
    }
    case 'RESET': {
      const newState = await reset(state, action.payload);
      state = { ...newState };
      console.log('91', newState);
      return newState;
    }
    default: {
      throw new Error();
    }
  }
}

const initialAccountState = {
  loginStatus: 'loggedOut',
  customer: null,
  customerAccessToken: null,
  orders: [],
  fetchingSiteOptions: false,
  siteOptions: null,
  defaultAddress: null,
  addresses: [],
  userErrors: [],
  fetchingOrders: null,
  countries: [],
  provinces: null
};

export const AccountProvider = ({ children }) => {
  // const [accountData, dispatchAction] = useReducer(accountReducer, {
  // });

  const [accountData, accountDispatcher] = useAsyncReducer(
    accountReducer,
    initialAccountState
  );

  return (
    <AccountContext.Provider value={{ accountData, accountDispatcher }}>
      {children}
    </AccountContext.Provider>
  );
};

const apiPost = async (endpoint, payload) => {
  let body = null;
  if (payload && payload.data) {
    body = JSON.stringify(payload.data);
  }

  return await fetch(`${serverlessEndpoint}${endpoint}`, {
    method: 'POST',
    body
  }).then((res) => {
    const contentType = res.headers.get('content-type');
    if (contentType.startsWith('text/html')) {
      return res.text();
    }

    if (contentType.startsWith('application/json')) {
      return res.json();
    }
  });
};

const accountClientPost = async (postData) => {
  const url = `https://${myshopifyDomain}/api/2020-04/graphql`;
  const body = JSON.stringify(postData);

  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Shopify-Storefront-Access-Token': shopifyToken
    },
    body
  });
  return response.json();
};

const register = async (state, { firstName, lastName, email, password }) => {
  let newState = { ...state };
  try {
    const variables = {
      input: { firstName, lastName, email, password }
    };
    const query = CUSTOMER_CREATE;
    const response = await accountClientPost({ query, variables });
    const { data, errors } = response;
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors));
    }
    const { customerUserErrors } = data.customerCreate;
    newState = { ...state, userErrors: customerUserErrors };
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const login = async (state, { email, password }) => {
  let newState = { ...state };
  try {
    const variables = { input: { email, password } };
    const query = CUSTOMER_ACCESS_TOKEN_CREATE;

    newState = { ...state, loginStatus: 'loggedIn' };
    const response = await accountClientPost({ query, variables });
    const {
      customerAccessToken,
      userErrors
    } = response.data.customerAccessTokenCreate;

    if (customerAccessToken) {
      newState = updateCustomerAccessToken(newState, customerAccessToken);
      newState = await fetchCustomer(newState);
      newState = { ...newState, loginStatus: 'loggedIn' };
    } else {
      console.log(userErrors, response.data.customerAccessTokenCreate);
      newState = { ...newState, userErrors, loginStatus: 'loggedOut' };
    }
  } catch (error) {
    newState = { ...newState, loginStatus: 'loggedOut' };
    throw error;
  }
  return newState;
};

const tokenLogin = async (state, { customerAccessToken }) => {
  let newState = state;
  console.log(customerAccessToken, newState);
  if (customerAccessToken) {
    newState = updateCustomerAccessToken(newState, {
      accessToken: customerAccessToken,
      expiresAt: null
    });
    console.log('B', newState);
    newState = await fetchCustomer(newState);
    newState = { ...newState, loginStatus: 'loggedIn' };
  }
  return newState;
};

const renewCustomerAccessToken = async (state, payload) => {
  let newState = { ...state };
  try {
    const variables = { customerAccessToken: payload };
    const query = CUSTOMER_ACCESS_TOKEN_RENEW;
    const response = await accountClientPost({ query, variables });
    const {
      customerAccessToken,
      userErrors
    } = response.data.customerAccessTokenRenew;
    if (customerAccessToken && customerAccessToken.accessToken) {
      // dispatch('updateCustomerAccessToken', customerAccessToken);
      // dispatch('fetchCustomer');
    } else {
      // access token does not exist
      // dispatch('removeCustomerAccessToken');
    }
    // commit('setErrors', userErrors);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const logout = async (state) => {
  let newState = { ...state };
  const accessToken =
    (newState.customerAccessToken &&
      newState.customerAccessToken.accessToken) ||
    getCookie('customerAccessToken');
  const variables = { customerAccessToken: accessToken };
  const query = CUSTOMER_ACCESS_TOKEN_DELETE;
  const response = await accountClientPost({ query, variables });
  const {
    deletedAccessToken,
    userErrors
  } = response.data.customerAccessTokenDelete;
  if (deletedAccessToken) {
    newState = removeCustomerAccessToken(newState);
    newState = { ...newState, loginStatus: 'loggedOut' };
  }
  if (userErrors) {
    newState = { ...newState, userErrors };
  }
  return newState;
};

const updateCustomerAccessToken = (state, customerAccessToken) => {
  const { accessToken, expiresAt } = customerAccessToken;
  const expires = new Date(expiresAt);
  expires.setHours(expires.getHours());
  setCookie('customerAccessToken', accessToken, { expires, secure, sameSite });
  return { ...state, customerAccessToken };
};

const removeCustomerAccessToken = (state) => {
  removeCookie('customerAccessToken');
  removeCookie('ncl');
  return { ...state, customerAccessToken: null, customer: null };
};

const fetchCustomer = async (state) => {
  let newState = { ...state };
  try {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken
    };
    const query = GET_CUSTOMER;
    const response = await accountClientPost({ query, variables });
    const { customer, userErrors } = response.data;

    if (customer) {
      newState = { ...newState, customer };
    }
    if (userErrors) {
      newState = { ...newState, userErrors };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const fetchCountries = async (state) => {
  let newState = state;
  if (!newState.countries.length) {
    try {
      const countryResponse = await apiPost('/countries');

      if (countryResponse) {
        newState = { ...newState, countries: countryResponse };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return newState;
};

const fetchProvince = async (state, payload) => {
  let newState = state;
  try {
    const provinceResponse = await apiPost('/provinces', {
      data: { countryShortName: payload }
    });
    if (provinceResponse) {
      newState = { ...newState, provinces: provinceResponse };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

//! HERE

const initAddresses = async (state) => {
  let newState = state;
  if (!newState.customerAccessToken) {
    const customerAccessToken = getCookie('customerAccessToken');
    newState = await tokenLogin(newState, { customerAccessToken });
  }
  if (!newState.countries.length) {
    newState = await fetchCountries(newState);
  }
  newState = await fetchAddresses(newState);
  return newState;
};

const fetchAddresses = async (state) => {
  let newState = state;
  try {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken
    };
    const query = GET_CUSTOMER_ADDRESSES;
    const response = await accountClientPost({ query, variables });
    const { customer, userErrors } = response.data;
    if (customer) {
      newState = {
        ...newState,
        addresses: transformEdges(customer.addresses)
      };
      newState = {
        ...newState,
        defaultAddress: customer.defaultAddress
      };
      // commit('setAddresses', transformEdges(customer.addresses))
      // commit('setDefaultAddress', customer.defaultAddress)
    }
    if (userErrors) {
      newState = { ...newState, userErrors };
    }
    // commit('setErrors', userErrors)
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const createAddress = async (state, payload) => {
  let newState = state;
  try {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      address: payload
    };
    const query = CUSTOMER_ADDRESS_CREATE;
    const response = await accountClientPost({ query, variables });
    const { data, errors } = response;
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors));
    }
    const { customerAddress, customerUserErrors } = data.customerAddressCreate;
    if (customerAddress) {
      // commit('addAddress', customerAddress);
      newState = {
        ...newState,
        addresses: [...newState.addresses, customerAddress]
      };
    }
    if (customerUserErrors) {
      newState = { ...newState, userErrors: customerUserErrors };
    }

    // commit('setErrors', customerUserErrors);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const updateAddress = async (state, { address, id }) => {
  let newState = state;
  try {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      address,
      id
    };
    console.log('VARIABLE', variables);
    const query = CUSTOMER_ADDRESS_UPDATE;
    const response = await accountClientPost({ query, variables });
    const { data, errors } = response;
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors));
    }
    const { customerAddress, customerUserErrors } = data.customerAddressUpdate;
    if (customerAddress) {
      // commit('setAddress', customerAddress);
      newState = {
        ...newState,
        addresses: [...newState.addresses, customerAddress]
      };
    }
    if (customerUserErrors) {
      newState = { ...newState, userErrors: customerUserErrors };
    }

    // commit('setErrors', customerUserErrors);
    newState = await fetchAddresses(newState);
    //! await dispatch('fetchAddresses');
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const deleteAddress = async (state, { id }) => {
  let newState = state;
  try {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      id
    };
    const query = CUSTOMER_ADDRESS_DELETE;
    const response = await accountClientPost({ query, variables });
    const { data, errors } = response;
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors));
    }
    const {
      deletedCustomerAddressId,
      customerUserErrors
    } = data.customerAddressDelete;
    if (deletedCustomerAddressId) {
      // commit('removeAddress', deletedCustomerAddressId);
      newState = {
        ...newState,
        addresses: newState.addresses.filter(
          (stateAddress) => stateAddress.id !== id
        )
      };
    }
    if (customerUserErrors) {
      newState = { ...newState, userErrors: customerUserErrors };
    }
    // commit('setErrors', customerUserErrors);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const updateDefaultAddress = async (state, { id }) => {
  let newState = state;
  try {
    const variables = {
      customerAccessToken: newState.customerAccessToken.accessToken,
      addressId: id
    };
    const query = CUSTOMER_DEFAULT_ADDRESS_UPDATE;
    const response = await accountClientPost({ query, variables });
    const { data, errors } = response;
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors));
    }
    const { userErrors } = data.customerDefaultAddressUpdate;
    // commit('setErrors', userErrors);
    if (userErrors) {
      newState = { ...newState, userErrors };
    }

    //! await dispatch('fetchAddresses');
    newState = await fetchAddresses(newState);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const recover = async (state, { email }) => {
  let newState = state;
  try {
    const variables = { email };
    const query = CUSTOMER_RECOVER;
    const response = await accountClientPost({ query, variables });
    const { data, errors } = response;
    if (errors && errors.length) {
      newState = { ...newState, userErrors: errors };
      throw new Error(JSON.stringify(errors));
    }
    const { customerUserErrors } = data.customerRecover;
    if (customerUserErrors) {
      newState = { ...newState, userErrors: customerUserErrors };
    }
    // commit('setErrors', customerUserErrors)
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const reset = async (state, { password, resetToken, customerId }) => {
  let newState = state;
  try {
    const id = Buffer.from(`gid://shopify/Customer/${customerId}`).toString(
      'base64'
    );
    const variables = { id, input: { password, resetToken } };
    const query = CUSTOMER_RESET;
    const response = await accountClientPost({ query, variables });
    const { data, errors } = response;
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors));
    }
    const { customerUserErrors } = data.customerReset;
    if (customerUserErrors) {
      newState = { ...newState, userErrors: customerUserErrors };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};

const updateCustomer = async (state, payload) => {
  let newState = { ...state };
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      acceptsMarketing
    } = payload.customer;

    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      customer: { firstName, lastName, email, password, acceptsMarketing }
    };
    const query = CUSTOMER_UPDATE;
    const response = await accountClientPost({ query, variables });
    const { data, errors } = response;
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors));
    }
    const {
      customer,
      customerAccessToken,
      customerUserErrors
    } = data.customerUpdate;

    if (customer) {
      newState = { ...newState, customer };
    }

    if (customerAccessToken) {
      newState = updateCustomerAccessToken(newState, customerAccessToken);
      newState = await fetchCustomer(newState);
    }
    if (customerUserErrors) {
      newState = { ...newState, userErrors: customerUserErrors };
    }

    // commit('setErrors', customerUserErrors)
  } catch (error) {
    console.error(error);
    throw error;
  }
  return newState;
};
