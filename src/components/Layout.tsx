import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Menu, Github, Twitter, Download } from 'lucide-react'; 

interface LayoutProps {
  children: React.ReactNode;
  categories: string[];
}

export const Layout: React.FC<LayoutProps> = ({ children, categories }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-14 items-center px-4 md:px-6 w-full">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                Agent Skills Hub
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
               {/* Add top-level links if needed */}
            </nav>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            type="button"
            aria-controls="radix-:R16u6la:"
            aria-expanded="false"
            data-state="closed"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
             <div className="w-full flex-1 md:w-auto md:flex-none">
             </div>
             <nav className="flex items-center gap-1">
              <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.npmjs.com/package/agent-skills-hub"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                >
                  <Download className="h-5 w-5" />
                  <span className="sr-only">NPM</span>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://x.com/abhinavdharma_x"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                >
                  <Twitter className="h-4 w-4 fill-current" />
                  <span className="sr-only">X (Twitter)</span>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/legendaryabhi/agent-skills-hub"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                
             </nav>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full px-4 md:px-6 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 pt-6 pb-8">
        {/* Sidebar */}
        <aside className={cn(
          "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block",
          sidebarOpen ? "block" : "hidden"
        )}>
          <div className="py-6 pl-8 pr-6 lg:py-8">
            <h4 className="mb-4 text-sm font-semibold tracking-tight">
              Categories
            </h4>
            <div className="flex flex-col space-y-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  cn(
                    "block px-2 py-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
                    isActive && "text-primary font-bold bg-accent/50 rounded-md"
                  )
                }
              >
                All Skills
              </NavLink>
              {categories.map((category) => (
                <NavLink
                  key={category}
                  to={`/category/${category}`}
                  className={({ isActive }) =>
                    cn(
                      "block px-2 py-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors capitalize",
                      isActive && "text-primary font-bold bg-accent/50 rounded-md"
                    )
                  }
                >
                  {category.replace(/-/g, ' ')}
                </NavLink>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:py-8">
          <div className="w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
