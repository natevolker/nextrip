import React, { useContext, createContext, useState } from 'react'
import styles from './header.module.css'
import layout from '@components/Layout/layout.module.css'
import { MetroTransitLogo } from '../Icons/MetroTransitLogo';

const Context = createContext([
  <></> as React.ReactNode,
  (children: React.ReactNode) => undefined as void
] as const);

export const HeaderContext: React.FC = ({ children }) => {
  const [content, setContent] = useState(<></> as React.ReactNode)
  return (
    <Context.Provider value={[content, setContent]}>
      {children}
    </Context.Provider>
  )
}

export const HeaderContainer: React.FC = () => {
  const [content] = useContext(Context)
  return (
    <header className={styles.header}>
      <div className={`${layout.branding} ${styles.branding}`}>
        <a href="https://www.metrotransit.org">
          <h1 className='visually-hidden'>Metro Transit</h1>
          <MetroTransitLogo className={styles.logo} />
        </a>
      </div>
      <div className={`${layout.header} ${styles.content}`}>{content}</div>
    </header>
  )
}

export const Header: React.FC = ({ children }) => {
  const [,setContent] = useContext(Context)
  setContent(children)
  return null
}