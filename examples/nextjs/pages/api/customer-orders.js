// Expected request body:
//
//  { customerID: "the-customer's-base64-encoded-id" }

const axios = require('axios')

module.exports = async (req, res) => {
  const { customerID } = JSON.parse(req.body)

  const id = Buffer.from(customerID, 'base64')
    .toString('binary')
    .split('gid://shopify/Customer/')
    .pop()

  const endpoint = `https://${process.env.MYSHOPIFY_DOMAIN}/admin/api/2020-07/customers/${id}/orders.json`

  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_PASSWORD
      }
    })

    res.status(200).json(response.data.orders)
  } catch (error) {
    res.status(500).send(error)
  }
}
