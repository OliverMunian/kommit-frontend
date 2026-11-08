import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import ConnectionCheck from '@/components/pages/ConnectionCheck/ConnectionCheck'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectionCheck />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
