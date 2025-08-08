'use client'

import { ArrowRight, Play, CheckCircle, Star, MapPin, Users, TrendingUp, Award, Zap, Target, BarChart3, Lightbulb, Sparkles, Globe, Shield, Eye, Brain, Rocket } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [typedText, setTypedText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [counters, setCounters] = useState({ projects: 0, satisfaction: 0, years: 0, companies: 0 })
  const [mapHovered, setMapHovered] = useState<string | null>(null)
  
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const mapRef = useRef<HTMLElement>(null)
  const socialProofRef = useRef<HTMLElement>(null)

  const words = ['estratégia', 'inovação', 'crescimento', 'transformação', 'sucesso']
  const fullText = words[currentWordIndex]

  // Typing animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      } else {
        setTypedText(prev => 
          isDeleting 
            ? prev.slice(0, -1)
            : fullText.slice(0, prev.length + 1)
        )
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, fullText])

  // Intersection Observer for animations
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

    const sections = [heroRef, featuresRef, servicesRef, mapRef, socialProofRef]
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  // Counter animation
  useEffect(() => {
    if (visibleSections.has('hero')) {
      const animateCounter = (target: number, key: keyof typeof counters) => {
        let current = 0
        const increment = target / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
        }, 20)
      }

      animateCounter(150, 'projects')
      animateCounter(98, 'satisfaction')
      animateCounter(15, 'years')
      animateCounter(50, 'companies')
    }
  }, [visibleSections])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero"
        className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-black to-teal-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-5xl mx-auto">
            <div 
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500/10 to-slate-500/10 border border-teal-500/20 rounded-full text-sm font-medium mb-8 transition-all duration-1000 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Sparkles className="h-4 w-4 mr-2 text-teal-400 animate-spin" />
              <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                Consultoria Empresarial Líder em MG
              </span>
            </div>
            
            <h1 
              className={`text-6xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1000 delay-300 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-white">Transforme seu</span>{" "}
              <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-slate-400 bg-clip-text text-transparent">
                negócio
              </span>{" "}
              <span className="text-white">com</span>{" "}
              <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            
            <p 
              className={`text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Somos especialistas em acelerar o crescimento de empresas através de 
              <span className="text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"> estratégias personalizadas</span>, 
              gestão eficiente e inovação tecnológica.
            </p>
            
            <div 
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-700 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-500 hover:to-slate-500 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 group border-0 hover:scale-105"
              >
                <Rocket className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
                Começar agora
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-gray-300 hover:text-white px-10 py-6 text-lg font-semibold rounded-2xl hover:bg-white/5 group border border-gray-700 hover:border-gray-600 hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-3 h-6 w-6 transition-transform group-hover:scale-125" />
                Ver demonstração
              </Button>
            </div>

            {/* Animated Stats */}
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-1000 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {[
                { value: counters.projects, suffix: '+', label: 'Projetos Entregues', icon: Award },
                { value: counters.satisfaction, suffix: '%', label: 'Taxa de Sucesso', icon: Target },
                { value: counters.years, suffix: '+', label: 'Anos de Experiência', icon: TrendingUp },
                { value: counters.companies, suffix: '+', label: 'Empresas Transformadas', icon: Users }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group cursor-pointer hover:scale-110 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-slate-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section 
        ref={featuresRef}
        id="features"
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="text-white">Por que escolher a</span>{" "}
              <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                Mosaico Inc?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Combinamos expertise técnica com profundo conhecimento do mercado brasileiro 
              para entregar resultados que transformam empresas.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Resultados Rápidos",
                description: "Metodologias ágeis que entregam resultados visíveis em 30-60 dias com ROI comprovado",
                features: ["Implementação rápida", "ROI em 60 dias", "Acompanhamento 24/7"],
                gradient: "from-teal-400 to-teal-500",
                hoverGradient: "from-teal-300 to-teal-400"
              },
              {
                icon: Brain,
                title: "Estratégia Personalizada",
                description: "Cada empresa é única. Criamos soluções sob medida para seus desafios específicos",
                features: ["Análise profunda", "Plano customizado", "Execução focada"],
                gradient: "from-slate-400 to-slate-500",
                hoverGradient: "from-slate-300 to-slate-400"
              },
              {
                icon: Shield,
                title: "Time Especializado",
                description: "Consultores sêniores com 15+ anos de experiência em diferentes setores",
                features: ["Expertise comprovada", "Conhecimento setorial", "Suporte dedicado"],
                gradient: "from-teal-500 to-slate-500",
                hoverGradient: "from-teal-400 to-slate-400"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className={`group bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-500 hover:bg-gray-900/70 backdrop-blur-sm cursor-pointer hover:scale-105 hover:-translate-y-2 ${
                  visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${hoveredFeature === index ? feature.hoverGradient : feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors relative z-10">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3 relative z-10">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
                        <CheckCircle className={`h-5 w-5 text-teal-400 mr-3 flex-shrink-0 transition-transform duration-300 ${hoveredFeature === index ? 'scale-125' : ''}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section 
        ref={servicesRef}
        id="services"
        className="py-32 relative"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="text-white">Nossos</span>{" "}
              <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                serviços
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Soluções completas para acelerar o crescimento da sua empresa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Consultoria Estratégica",
                description: "Planejamento estratégico e análise de mercado para crescimento sustentável",
                gradient: "from-teal-500 to-teal-600",
                hoverGradient: "from-teal-400 to-teal-500"
              },
              {
                icon: Users,
                title: "Gestão de Pessoas",
                description: "Desenvolvimento organizacional e otimização de recursos humanos",
                gradient: "from-slate-500 to-slate-600",
                hoverGradient: "from-slate-400 to-slate-500"
              },
              {
                icon: TrendingUp,
                title: "Marketing Digital",
                description: "Estratégias digitais para aumentar presença online e vendas",
                gradient: "from-teal-600 to-slate-600",
                hoverGradient: "from-teal-500 to-slate-500"
              },
              {
                icon: Lightbulb,
                title: "Inovação",
                description: "Transformação digital e implementação de tecnologias avançadas",
                gradient: "from-slate-600 to-teal-600",
                hoverGradient: "from-slate-500 to-teal-500"
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className={`group bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:bg-gray-900/50 backdrop-blur-sm cursor-pointer hover:scale-110 hover:-translate-y-4 ${
                  visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
                  
                  <div className={`w-14 h-14 bg-gradient-to-r ${hoveredService === index ? service.hoverGradient : service.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section 
        ref={mapRef}
        id="map"
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div 
              className={`transition-all duration-1000 ${
                visibleSections.has('map') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                <span className="text-white">Presença em</span>{" "}
                <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                  Minas Gerais
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Atuamos estrategicamente nas principais regiões de Minas Gerais, 
                com escritórios em Montes Claros e Belo Horizonte para atender 
                todo o estado com excelência.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  {
                    id: 'mc',
                    city: "Montes Claros",
                    region: "Norte de Minas",
                    description: "Hub principal de operações no Norte de Minas Gerais",
                    clients: "15+ clientes ativos",
                    icon: MapPin,
                    gradient: "from-teal-500 to-teal-600"
                  },
                  {
                    id: 'bh',
                    city: "Belo Horizonte",
                    region: "Região Metropolitana",
                    description: "Escritório estratégico na capital mineira",
                    clients: "8+ clientes ativos",
                    icon: Globe,
                    gradient: "from-slate-500 to-slate-600"
                  }
                ].map((location, index) => (
                  <div 
                    key={location.id} 
                    className={`group p-6 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-300 cursor-pointer hover:scale-105 ${
                      mapHovered === location.id ? 'border-teal-500/50 bg-gray-900/70' : ''
                    }`}
                    onMouseEnter={() => setMapHovered(location.id)}
                    onMouseLeave={() => setMapHovered(null)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${location.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <location.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                            {location.city}
                          </h3>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-400">{location.region}</span>
                        </div>
                        <p className="text-gray-300 mb-2 group-hover:text-gray-200 transition-colors">
                          {location.description}
                        </p>
                        <p className="text-sm font-medium bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                          {location.clients}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-500 hover:to-slate-500 text-white px-8 py-4 rounded-xl font-semibold group border-0 hover:scale-105 transition-all duration-300">
                <Eye className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Agendar reunião
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div 
              className={`relative transition-all duration-1000 delay-300 ${
                visibleSections.has('map') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group">
                <Image
                  src="/mapa-minas-gerais.webp"
                  alt="Mapa de Minas Gerais mostrando nossa área de atuação"
                  width={600}
                  height={500}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Interactive markers - removidos */}
                <div className="absolute inset-0"></div>
              </div>
              
              {/* Animated stats card */}
              <div className={`absolute -bottom-8 -right-8 bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-800 transition-all duration-500 hover:scale-110 hover:border-gray-700 ${
                visibleSections.has('map') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-slate-500 rounded-xl flex items-center justify-center animate-pulse">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">230+</div>
                    <div className="text-sm text-gray-400">Clientes Ativos</div>
                    <div className="text-xs text-gray-500">em Minas Gerais</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Social Proof */}
      <section 
        ref={socialProofRef}
        id="social-proof"
        className="py-32 relative"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('social-proof') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="text-white">Resultados que</span>{" "}
              <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                transformam
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Empresas que confiaram na Mosaico Inc e alcançaram crescimento excepcional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                quote: "A Mosaico Inc transformou completamente nossa operação. Crescemos 150% em 18 meses com metodologias que realmente funcionam.",
                author: "João Silva",
                role: "CEO, TechCorp",
                rating: 5,
                avatar: "👨‍💼"
              },
              {
                quote: "Profissionais excepcionais. O ROI do projeto superou todas as expectativas. Recomendo para qualquer empresa que quer crescer.",
                author: "Maria Santos",
                role: "Diretora, RetailMax",
                rating: 5,
                avatar: "👩‍💼"
              },
              {
                quote: "Parceria fundamental para nosso crescimento. A expertise da equipe fez toda a diferença nos nossos resultados.",
                author: "Carlos Oliveira",
                role: "Fundador, InnovaTech",
                rating: 5,
                avatar: "👨‍🚀"
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                className={`bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:scale-105 hover:-translate-y-2 ${
                  visibleSections.has('social-proof') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredTestimonial(index)}
                onMouseLeave={() => setHoveredTestimonial(null)}
              >
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 text-teal-400 fill-current transition-transform duration-300 ${
                          hoveredTestimonial === index ? 'scale-125' : ''
                        }`} 
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-300 mb-6 italic leading-relaxed relative z-10">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="border-t border-gray-800 pt-4 flex items-center space-x-3 relative z-10">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Award, value: "150+", label: "Projetos Concluídos", desc: "Projetos entregues com sucesso", color: "teal" },
              { icon: TrendingUp, value: "300%", label: "ROI Médio", desc: "Retorno sobre investimento", color: "slate" },
              { icon: Users, value: "50+", label: "Empresas Atendidas", desc: "Clientes transformados", color: "teal" },
              { icon: Target, value: "98%", label: "Taxa de Sucesso", desc: "Projetos bem-sucedidos", color: "slate" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group cursor-pointer transition-all duration-500 hover:scale-110 ${
                  visibleSections.has('social-proof') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color === 'teal' ? 'from-teal-500 to-teal-600' : 'from-slate-500 to-slate-600'} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-white mb-1 group-hover:text-teal-400 transition-colors">{stat.label}</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-black to-teal-900/20"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-white">Pronto para</span>{" "}
            <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
              transformar
            </span>{" "}
            <span className="text-white">seu negócio?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Agende uma consultoria gratuita e descubra como podemos acelerar 
            o crescimento da sua empresa com estratégias comprovadas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-500 hover:to-slate-500 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 group border-0 hover:scale-110"
            >
              <Rocket className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
              Agendar consultoria gratuita
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-white/5 px-10 py-6 text-lg font-semibold rounded-2xl hover:border-gray-600 transition-all duration-300 hover:scale-110"
            >
              Falar com especialista
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
