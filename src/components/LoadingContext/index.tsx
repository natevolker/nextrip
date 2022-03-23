import { createContext,useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageLoader from 'next/dist/client/page-loader'
import { getRouteRegex } from 'next/dist/shared/lib/router/utils'
import { RouteRegex } from 'next/dist/shared/lib/router/utils/route-regex'

const getRoute = (url: string, pageList: string[]) => {
  let match: [string, RouteRegex, RegExpExecArray] | undefined
  for (const page of pageList) {
    const routeRegex = getRouteRegex(page)
    const result = routeRegex.re.exec(url)
    if (result) {
      match = [page, routeRegex, result]
      break;
    }
  }

  if (match) {
    const [page, regex, result] = match
    const query: Record<string, string|string[]> = {}
    for (const [key, value] of new URL(url, 'http://a.b').searchParams.entries()) {
      query[key] = page.includes(`[...${key}]`) && !Array.isArray(value)
        ? [value]
        : value
    }
    for (const key in regex.groups) {
      query[key] = page.includes(`[...${key}]`) && !Array.isArray(result[regex.groups[key].pos])
        ? result[regex.groups[key].pos]?.split('/')
        : result[regex.groups[key].pos]
    }
    return {
      pathname: page,
      asPath: url,
      query
    }
  }

  return {
    pathname: '',
    asPath: '',
    query: {}
  }
}

const Context = createContext<{
  pathname: string,
  asPath: string,
  query: Record<string, string | string[]>,
  supress: boolean
}>({} as any)

export const LoadingContext: React.FC = ({ children }) => {
  const router = useRouter()
  const [pageList, setPageList] = useState<string[]>([])
  const [supress, setSupress] = useState(false)
  const [loading, setLoading] = useState({
    pathname: router?.pathname ?? '',
    asPath: router?.asPath ?? '',
    query: (router?.query as Record<string, string | string[]>) ?? {}
  })

  useEffect(() => {
    (async () => {
      setPageList(await new PageLoader('', '').getPageList())
    })()
  }, [])

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setSupress(true)
      setTimeout(() => { setSupress(false) }, 500)
      const route = getRoute(url, pageList)
      if (route && JSON.stringify(loading) !== JSON.stringify(route)) {
        setLoading(route)
      }
    }

    router?.events.on('routeChangeStart', handleRouteChangeStart)
    return () => {
      router?.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [loading, router, pageList])

  return (
    <Context.Provider value={{ ...loading, supress }}>
      {children}
    </Context.Provider>
  )
}

export const useLoading = () => useContext(Context)