import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Bell, Menu, User } from 'lucide-react'
import Link from 'next/link'
import SearchComponent from './SearchComponent'

export function Navbar() {
    const navbar = [
        {
            name: 'Dashboard',
            href: 'dashboard',
        },
        {
            name: 'Browse',
            href: 'browse',
        },
        {
            name: 'My Lists',
            href: 'my-lists',
        },
        {
            name: 'Categories',
            href: 'categories',
        },
    ]

    return (
        <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur transition-all">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <Link href="/">
                            <h1 className="cursor-pointer font-mono text-xl font-semibold tracking-tight transition-all duration-300 ease-in-out">
                                cinema
                                <span className="text-primary inline-block transition-all duration-300">
                                    .
                                </span>
                            </h1>
                        </Link>

                        <nav className="hidden items-center gap-6 md:flex">
                            {navbar.map((item) => {
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-muted-foreground hover:text-primary text-sm font-medium text-nowrap transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <SearchComponent />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative cursor-pointer"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="bg-primary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
                        </Button>

                        <ThemeToggle />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                        >
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
