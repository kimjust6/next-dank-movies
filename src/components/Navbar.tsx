import { Search, Bell, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Navbar() {
    return (
        <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
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

                        <h1 className="font-mono text-xl font-semibold tracking-tight">
                            cinema<span className="text-primary">.</span>
                        </h1>

                        <nav className="hidden items-center gap-6 md:flex">
                            <a
                                href="#"
                                className="text-foreground hover:text-primary text-sm font-medium transition-colors"
                            >
                                Dashboard
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                            >
                                Browse
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                            >
                                My Lists
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                            >
                                Categories
                            </a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Search movies..."
                                className="bg-secondary/50 border-border/50 w-64 pl-9"
                            />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="bg-primary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
                        </Button>

                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
