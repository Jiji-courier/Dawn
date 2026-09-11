import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <header className="pt-10 text-center">
        <h1 className="mb-2 text-4xl font-bold">Dawn</h1>
        <p className="text-sm opacity-60">
          When night yields to day, the searching mind finds its first light
        </p>
      </header>

      <nav className="flex justify-center gap-6 py-5">
        <Link to="/" activeProps={{ className: 'underline' }} activeOptions={{ exact: true }}>
          Shelf
        </Link>
        <Link to="/search" activeProps={{ className: 'underline' }}>
          Search
        </Link>
      </nav>
      <Outlet />
    </React.Fragment>
  )
}
