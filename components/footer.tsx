import Link from 'next/link'
import { MapPin, Phone, Mail, Linkedin, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-slate-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-xl">Mosaico Inc</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Transformamos empresas através de consultoria estratégica personalizada. 
              Especialistas em crescimento sustentável e inovação empresarial.
            </p>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center hover:text-white transition-colors">
                <MapPin className="h-4 w-4 mr-3" />
                Montes Claros - MG, Brasil
              </p>
              <p className="flex items-center hover:text-white transition-colors">
                <Phone className="h-4 w-4 mr-3" />
                (38) 99999-9999
              </p>
              <p className="flex items-center hover:text-white transition-colors">
                <Mail className="h-4 w-4 mr-3" />
                contato@mosaicoinc.com
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/servicos" className="hover:text-white transition-colors">Consultoria Estratégica</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Gestão de Pessoas</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Marketing Digital</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Transformação Digital</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link href="/cases" className="hover:text-white transition-colors">Cases de Sucesso</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Mosaico Inc. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
