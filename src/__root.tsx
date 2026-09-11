import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () => (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#9bbce0] text-white">
        <nav className="flex gap-6 px-8 py-5">
          <Link to="/" className="font-semibold">Dawn</Link>
          <Link to="/">Shelf</Link>
          <Link to="/search">Search</Link>
        </nav>
        <Outlet />
      </div>
    ),
  });