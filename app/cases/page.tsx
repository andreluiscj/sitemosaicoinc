'use client'

import { Award, TrendingUp, Users, Target, ArrowRight, ExternalLink, Sparkles, BarChart3, Eye, Rocket, CheckCircle, Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useRef } from 'react'

export default function CasesPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [hoveredCase, setHoveredCase] = useState<number | null>(null)
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null)
  const [counters, setCounters] = useState({ projects: 0, roi: 0, companies: 0, success: 0 })

  const heroRef = useRef<HTMLElement>(null)
  const casesRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)

  const cases = [
    {
      title: "Transformação Digital - Indústria Alimentícia",
      client: "Empresa do setor alimentício",
      challenge: "Modernização de processos e implementação de sistema ERP",
      solution: "Implementamos um sistema ERP integrado e automatizamos 80% dos processos manuais",
      results: [
        "Redução de 60% no tempo de processamento",
        "Aumento de 40% na produtividade",
        "ROI de 300% em 18 meses",
        "Melhoria na qualidade dos produtos"
      ],
      category: "Transformação Digital",
      duration: "12 meses",
      emoji: "🏭",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Reestruturação Organizacional - Varejo",
      client: "Rede de varejo regional",
      challenge: "Alto turnover e baixa produtividade da equipe",
      solution: "Reestruturação completa do RH com novos processos de recrutamento e desenvolvimento",
      results: [
        "Redução de 50% no turnover",
        "Aumento de 35% na satisfação dos funcionários",
        "Melhoria de 25% nas vendas",
        "Criação de plano de carreira estruturado"
      ],
      category: "Gestão de Pessoas",
      duration: "8 meses",
      emoji: "🛍️",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Estratégia de Crescimento - Tecnologia",
      client: "Startup de tecnologia",
      challenge: "Necessidade de expansão e captação de investimento",
      solution: "Desenvolvimento de plano estratégico de 5 anos e preparação para rodada de investimento",
      results: [
        "Captação de R$ 2M em investimento",
        "Crescimento de 200% na receita",
        "Expansão para 3 novos estados",
        "Aumento de 150% na base de clientes"
      ],
      category: "Consultoria Estratégica",
      duration: "6 meses",
      emoji: "💻",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      title: "Marketing Digital - Saúde",
      client: "Clínica médica especializada",
      challenge: "Baixa visibilidade online e poucos pacientes novos",
      solution: "Estratégia completa de marketing digital com foco em SEO e redes sociais",
      results: [
        "Aumento de 300% no tráfego do site",
        "Crescimento de 150% em novos pacientes",
        "ROI de 400% em campanhas pagas",
        "Melhoria na reputação online"
      ],
      category: "Marketing Digital",
      duration: "10 meses",
      emoji: "🏥",
      gradient: "from-cyan-500 to-cyan-600"
    }
  ]

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

    const sections = [heroRef, casesRef, testimonialsRef]
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
      animateCounter(300, 'roi')
      animateCounter(50, 'companies')
      animateCounter(98, 'success')
    }
  }, [visibleSections])

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
                Histórias de Transformação
              </span>
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Cases de <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Sucesso</span>
            </h1>
            <p 
              className={`text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Conheça alguns dos projetos que transformaram empresas e geraram resultados excepcionais. 
              Cada case representa uma parceria de sucesso e crescimento sustentável.
            </p>
          </div>

          {/* Animated Stats */}
          <div 
            className={`grid md:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-700 ${
              visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {[
              { icon: Award, value: counters.projects, suffix: '+', label: 'Projetos Concluídos', gradient: 'from-purple-500 to-purple-600' },
              { icon: TrendingUp, value: counters.roi, suffix: '%', label: 'ROI Médio', gradient: 'from-blue-500 to-blue-600' },
              { icon: Users, value: counters.companies, suffix: '+', label: 'Empresas Atendidas', gradient: 'from-pink-500 to-pink-600' },
              { icon: Target, value: counters.success, suffix: '%', label: 'Taxa de Sucesso', gradient: 'from-cyan-500 to-cyan-600' }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer hover:scale-110 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Cases Section */}
      <section 
        ref={casesRef}
        id="cases"
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {cases.map((caseStudy, index) => (
              <Card 
                key={index} 
                className={`bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:scale-105 group ${
                  visibleSections.has('cases') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCase(index)}
                onMouseLeave={() => setHoveredCase(null)}
              >
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`aspect-video lg:aspect-auto bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative">
                      <span>{caseStudy.emoji}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  
                  <CardContent className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="flex items-center mb-4">
                      <span className={`bg-gradient-to-r ${caseStudy.gradient} text-white text-sm font-medium px-4 py-2 rounded-full`}>
                        {caseStudy.category}
                      </span>
                      <span className="ml-3 text-gray-500 text-sm">{caseStudy.duration}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                      {caseStudy.title}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-white mb-2 flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-purple-400" />
                          Desafio:
                        </h4>
                        <p className="text-gray-300">{caseStudy.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-2 flex items-center">
                          <Rocket className="h-4 w-4 mr-2 text-blue-400" />
                          Solução:
                        </h4>
                        <p className="text-gray-300">{caseStudy.solution}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-green-400" />
                        Resultados:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {caseStudy.results.map((result, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors"
                          >
                            <ArrowRight className={`h-4 w-4 text-green-400 mr-2 flex-shrink-0 transition-transform duration-300 ${hoveredCase === index ? 'translate-x-1' : ''}`} />
                            <span className="text-sm">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="border-gray-700 text-gray-300 hover:text-white hover:bg-white/5 hover:border-gray-600 transition-all duration-300 group"
                    >
                      Ver Detalhes do Case
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Testimonials Section */}
      <section 
        ref={testimonialsRef}
        id="testimonials"
        className="py-32 relative"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-white">O que Nossos</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Clientes Dizem
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Depoimentos reais de empresas que transformaram seus negócios conosco
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "A Mosaico Inc transformou completamente nossa operação. Os resultados superaram todas as expectativas.",
                author: "João Silva",
                role: "CEO, Empresa Alimentícia",
                rating: 5,
                avatar: "👨‍💼"
              },
              {
                quote: "Profissionais extremamente competentes. O ROI do projeto foi excepcional.",
                author: "Maria Santos",
                role: "Diretora, Rede de Varejo",
                rating: 5,
                avatar: "👩‍💼"
              },
              {
                quote: "Parceria fundamental para nosso crescimento. Recomendo sem hesitação.",
                author: "Carlos Oliveira",
                role: "Fundador, Startup Tech",
                rating: 5,
                avatar: "👨‍🚀"
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                className={`bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:scale-105 hover:-translate-y-2 ${
                  visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredTestimonial(index)}
                onMouseLeave={() => setHoveredTestimonial(null)}
              >
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 text-yellow-400 fill-current transition-transform duration-300 ${
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-black to-blue-900/20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-12 border border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-white">Seu Próximo</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Case de Sucesso
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Que tal ser nossa próxima história de transformação? Agende uma consultoria gratuita.
            </p>
            <Link href="/contato">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group border-0 hover:scale-110"
              >
                <Rocket className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
                Iniciar Meu Projeto
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
