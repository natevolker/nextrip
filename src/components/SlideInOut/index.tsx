import { useEffect, useState } from 'react'
import styles from './slide-in-out.module.css'

export const SlideInOut: React.FC = ({ children }) => {
  const [clone, setClone] = useState(children)

  useEffect(() => {
    console.log(children)
    if (children === null) {
      setTimeout(() => {
        setClone(children)
      }, 250)
    } else {
      setClone(children)
    }
  }, [children])

  return (
    <div className={children === null ? styles.out : styles.in}>
      {clone}
    </div>
  )
}