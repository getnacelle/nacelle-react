// Expected request body:
//
//  {
//    orderID: "the-order-id",
//    transactionID: "the-transaction-id",
//  }

const axios = require('axios')

module.exports = async (req, res) => {
  const { orderID, transactionID } = JSON.parse(req.body)

  const endpoint = `https://${process.env.MYSHOPIFY_DOMAIN}/admin/api/2020-04/orders/${orderID}/transactions/${transactionID}.json`

  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_PASSWORD
      }
    })

    res.status(200).json(response.data.transaction)
  } catch (error) {
    res.status(500).send(error)
  }
}
