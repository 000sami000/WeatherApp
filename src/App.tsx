// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
 
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import { ThemeProvider } from './components/context/themeProvider'
// import WeatherDashboardPage from './pages/weatherDashboardPage'
// import CityPage from './pages/cityPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import WeatherDashboardPage from './pages/WeatherDashboardPage'
import CityPage from './pages/CityPage'

const queryClient =new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:5*60*1000, // 5min
      gcTime:10*60*1000,   //10min
      retry:false,
      refetchOnWindowFocus:false,
    },
  },
})
function App() {
  

  return (
    <QueryClientProvider client={queryClient}> 
         <BrowserRouter>
    <ThemeProvider defaultTheme="dark">

     <Layout>
    <Routes>
      <Route path="/" element={<WeatherDashboardPage/>}/>
      <Route path="/city/:cityName" element={<CityPage/>}/>
    </Routes>
     </Layout>
     <Toaster />
    </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>

  )
}

export default App
