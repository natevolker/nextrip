import type React from 'react'
import { HeaderContainer as Header } from '@components/Header'
import { Footer } from '@components/Footer'
import styles from './layout.module.css'


export const Layout: React.FC<{ layout: string }> = ({ layout, children }) => {
  return (
    <div className={`${styles.layout} ${styles?.[layout] ?? ''}`}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
