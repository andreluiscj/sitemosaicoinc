'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle, User, Building, MessageSquare, Zap, Eye, Rocket } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  })
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [hoveredContact, setHoveredContact] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = [heroRef, contactRef]
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero"
        className="py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full text-sm font-medium mb-8 transition-all duration-1000 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Vamos Conversar Sobre Seu Projeto
              </span>
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Entre em <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Contato</span>
            </h1>
            <p 
              className={`text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Estamos prontos para ajudar sua empresa a crescer. 
              Entre em contato conosco e agende uma consultoria gratuita.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        id="contact"
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Interactive Contact Form */}
            <div 
              className={`transition-all duration-1000 ${
                visibleSections.has('contact') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-4xl font-bold mb-8">
                <span className="text-white">Solicite uma</span>{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Consultoria
                </span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                      <User className="h-4 w-4 inline mr-2" />
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600 backdrop-blur-sm"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                      <Mail className="h-4 w-4 inline mr-2" />
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600 backdrop-blur-sm"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                      <Building className="h-4 w-4 inline mr-2" />
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600 backdrop-blur-sm"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600 backdrop-blur-sm"
                      placeholder="(38) 99999-9999"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                    <Zap className="h-4 w-4 inline mr-2" />
                    Serviço de Interesse
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white hover:border-gray-600 backdrop-blur-sm"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="estrategia">Consultoria Estratégica</option>
                    <option value="pessoas">Gestão de Pessoas</option>
                    <option value="marketing">Marketing Digital</option>
                    <option value="inovacao">Transformação Digital</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none text-white placeholder-gray-400 hover:border-gray-600 backdrop-blur-sm"
                    placeholder="Conte-nos sobre seu projeto ou desafio..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group border-0 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      Enviar Mensagem
                      <Rocket className="ml-3 h-5 w-5 transition-transform group-hover:rotate-12" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Interactive Contact Info */}
            <div 
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                visibleSections.has('contact') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div>
                <h2 className="text-4xl font-bold mb-8">
                  <span className="text-white">Informações de</span>{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Contato
                  </span>
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Endereço",
                      content: ["Rua das Empresas, 123", "Centro - Montes Claros, MG", "CEP: 39400-000"],
                      gradient: "from-purple-500 to-purple-600"
                    },
                    {
                      icon: Phone,
                      title: "Telefone",
                      content: ["(38) 99999-9999", "(38) 3221-1234"],
                      gradient: "from-blue-500 to-blue-600"
                    },
                    {
                      icon: Mail,
                      title: "E-mail",
                      content: ["contato@mosaicoinc.com", "comercial@mosaicoinc.com"],
                      gradient: "from-pink-500 to-pink-600"
                    },
                    {
                      icon: Clock,
                      title: "Horário de Atendimento",
                      content: ["Segunda a Sexta: 8h às 18h", "Sábado: 8h às 12h"],
                      gradient: "from-cyan-500 to-cyan-600"
                    }
                  ].map((contact, index) => (
                    <Card 
                      key={index} 
                      className="bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:scale-105 group"
                      onMouseEnter={() => setHoveredContact(index)}
                      onMouseLeave={() => setHoveredContact(null)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${contact.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                            <contact.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                              {contact.title}
                            </h3>
                            <div className="space-y-1">
                              {contact.content.map((line, idx) => (
                                <p key={idx} className="text-gray-300 group-hover:text-gray-200 transition-colors">
                                  {line}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-purple-400" />
                  Nossa Localização
                </h3>
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl h-64 flex items-center justify-center border border-gray-800 hover:border-gray-700 transition-all duration-300 group cursor-pointer backdrop-blur-sm">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Mapa interativo em breve</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
