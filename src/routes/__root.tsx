import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <nav className="flex gap-6 px-8 py-5">
        <span className="font-semibold">Dawn</span>
        <Link to="/">Shelf</Link>
        <Link to="/search">Search</Link>
      </nav>
      <Outlet />
    </React.Fragment>
  )
}
