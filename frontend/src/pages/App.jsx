
import { useState } from 'react';
import { getBackendData } from '../../client/api.js'
import { useEffect } from 'react';

export const App = () => {

  const [data, setData] = useState()

  const getData = async () => {
    try {
      const backendData = await getBackendData();
      setData(backendData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log('data:', data)
  }, [data])

  return (

    <div>
      Hola mundo
    </div>
  )
}
