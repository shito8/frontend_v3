
const headers = new Headers();
const auth = `Bearer ${process.env.AUTH}`

headers.append('Authorization', auth);

export async function getUsdBTC(){

  const response = await fetch('api/bridge/usdBtc',{
      method: 'GET',
      headers: headers
  });
  const data = await response.json();
  return data;       
}

export async function getUsdADA(){

  const response = await fetch('api/bridge/usdAda',{
      method: 'GET',
      headers: headers
  });
  const data = await response.json();
  return data;       
}

export async function getUsdERG(){

  const response = await fetch('api/bridge/usdErg',{
      method: 'GET',
      headers: headers
  });
  const data = await response.json();
  return data;       
}