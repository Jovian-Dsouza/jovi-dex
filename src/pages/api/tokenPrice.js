const Moralis = require("moralis").default;
Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { query } = req;
    console.log(query);
    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressOne,
    });
    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressTwo,
    });

    const usdPrices = {
      tokenOne: responseOne.raw.usdPrice,
      tokenTwo: responseTwo.raw.usdPrice,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };
    return res.status(200).json({ usdPrices });
  }
}
