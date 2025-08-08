'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Cases', href: '/cases' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contato' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-slate-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-xl">
                Mosaico Inc
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? 'text-teal-400 bg-teal-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Entrar
            </Button>
            <Button className="bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-500 hover:to-slate-500 text-white rounded-lg px-6 border-0">
              Começar agora
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'text-teal-400 bg-teal-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-gray-300">
                Entrar
              </Button>
              <Button className="w-full bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-500 hover:to-slate-500 text-white border-0">
                Começar agora
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
