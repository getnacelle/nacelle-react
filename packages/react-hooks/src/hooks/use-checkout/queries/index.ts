export const GET_CHECKOUT_QUERY = `
  query getCheckout($id: ID!, $url: String!) {
    getCheckout(id: $id, url: $url) {
      id
      url
      completed
      source
    }
  }
`;

export const PROCESS_CHECKOUT_QUERY = `
  mutation sendCheckout($input: CheckoutInput) {
    processCheckout(input: $input) {
      id
      completed
      url
      source
    }
  }
`;
