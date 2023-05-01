import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string,
  err?: any
}

const urlUsdBtc = `${process.env.URL_USD_CRYPTO}BTC&tsyms=USD&api_key=${process.env.APIKEY_USD_CRYPTO}`

const auth = `Bearer ${process.env.AUTH}`;



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { authorization } = req.headers;
  if (!authorization || authorization !== auth) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else{
    const controller = new AbortController();
    const { signal } = controller;
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 8000);
    fetch(urlUsdBtc, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': auth
      },
      
    }).then(res => {
      clearTimeout(timeoutId);
      if(res.ok){
        return res.json();
      }else{
        throw new Error('API response was not ok');
      }
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error('Fetch Error: ', err);
      res.status(500).json({  message: 'Internal Server Error', err  });
    
    });

  }
}
  





