import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string,
  err?: any
}

const urlUsdBtc = `${process.env.URL_USD_CRYPTO}BTC&tsyms=USD&api_key=${process.env.APIKEY_USD_CRYPTO}`

const auth = `Bearer ${process.env.AUTH}`;

const headers = {
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
  },
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { authorization } = req.headers;
  if (!authorization || authorization !== auth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

      fetch(urlUsdBtc, headers)
      .then(res => res.json())
      .then((data) => {
          res.status(200).json({ ...data });
        })
      .catch((err) => {
          res.status(500).json({  message: 'Internal Server Error', err  });
      });

}

