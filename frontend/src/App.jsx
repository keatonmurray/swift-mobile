import AppRoutes from "../routes/AppRoutes"
import Footer from "./components/Footer"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const AppContent = () => {

  const location = useLocation()

  const hideFooterRoutes = [
    '/',
    '/login',
    '/register',
    '/select-account-type'
  ]

  const shouldHideFooter = hideFooterRoutes.includes(
    location.pathname
  )

  return (
    <>
      <AppRoutes />

      {!shouldHideFooter && <Footer />}
    </>
  )
}

const App = () => {

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  )

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [])

  if (!isMobile) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000',
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold'
        }}
      >
        Mobile devices only.
      </div>
    )
  }

  return <AppContent />
}

export default App