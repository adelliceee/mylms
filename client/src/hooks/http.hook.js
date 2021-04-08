import {useState, useCallback} from 'react'


export const useHttp = () => {
//Будем экспортировать сущности сгруппирированные в данном модуле
  // Они будут взаимодействовать с сервером

  // Сами тут определяем грузится ли страница или нет, в компонентах мы уже будем использовать этот флаг
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  //Url - оболочка для удобной работы
  //UseCalback - чтобы реакт не ушел в рекурсию
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) =>{
    setLoading(true)


    try {
      if (body){
        body = JSON.stringify(body)
        console.log(body)
        headers['Content-Type'] = 'application/json'
      }


      //Fetch чисто браузерный метод
      console.log(headers)
      const response = await fetch(url,{method,body,headers})
      //Распарсим в джейсон
      const data = await response.json()

      if (!response.ok){
        throw new Error(data.message || 'Что то пошло не так')
      }
      setLoading(false)
      return data

    }catch (e){
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null),[])

  return {loading,request,error,clearError}
}