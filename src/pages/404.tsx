import layout from '@components/Layout/layout.module.css'

export const Page = () => (
  <div className={layout['full-width']}>
    <style jsx>{`
      .error, .error > div { display: flex; align-items: center; justify-content: center; height: 100%; }
      .error > div { display: grid; gap: 1rem; grid-auto-flow: column; }
    `}</style>
    <div className="error">
      <div>
        <h2>404</h2>
        <p>This page could not be found.</p>
      </div>
    </div>
  </div>
)

export default Page
