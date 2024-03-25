import useSWRInfinite from 'swr/infinite'

const base = 'http://127.0.0.1:4523/m1/2835300-0-default'

const fetchData = async (pageParam:number) => {
  const res = await fetch(`${base}/getList`, {
    method: 'POST',
    body: JSON.stringify({
      page: pageParam,
      pageSize: 10,
    }),
  })
  // 响应格式{"list":[{"name":"白儿效头便","age":"minim","id":"31"}],"totalCount":29}
  return res.json()
}

const fetchGetData = async (url:string) => {
  const res = await fetch(url, {
    method: 'GET',
  })
  // 响应格式{"list":[{"name":"白儿效头便","age":"minim","id":"31"}],"totalCount":29}
  return res.json()
}

const getKey = (pageIndex: number, previousPageData: any) => {
  // 已经到最后一页
  if (previousPageData && !previousPageData.list.length) return null
 
  // 在首页时，没有 `previousPageData`
  if (pageIndex === 0) return `${base}/getList?page=1`
 
  return `${base}/getList?page=${pageIndex}`
}


const getUrlKey = (pageIndex: number, previousPageData: any) => {
  console.log('previousPageData==>',previousPageData)
  // 已经到最后一页
  if (previousPageData && !previousPageData.list.length) return null
 
  // 在首页时，没有 `previousPageData`
  if (pageIndex === 0) return `${base}/queryList?page=1&pageSize=10`
 
  return `${base}/queryList?page=${pageIndex}&pageSize=10`
}

// post
export const usePokPostemon = () => {
  return useSWRInfinite(getKey, (url)=>{
    let page = url.split('=')[1]
    return fetchData(+page)
  },{
    revalidateFirstPage: false,
  })
}

//get
export const usePokemon = () => {
  return useSWRInfinite(getUrlKey, fetchGetData, {
    revalidateFirstPage: false,
  })
}