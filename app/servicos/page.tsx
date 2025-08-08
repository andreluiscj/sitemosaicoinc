'use client'

import { BarChart3, Users, Target, Lightbulb, CheckCircle, ArrowRight, Sparkles, Zap, Brain, Shield, Eye, Rocket, TrendingUp, Award } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useRef } from 'react'

export default function ServicosPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [hoveredProcess, setHoveredProcess] = useState<number | null>(null)
  const [activeService, setActiveService] = useState(0)

  const heroRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)

  const services = [
    {
      icon: BarChart3,
      title: "Consultoria Estratégica",
      desc: "Desenvolvemos estratégias personalizadas para impulsionar o crescimento sustentável da sua empresa",
      features: [
        "Análise SWOT completa",
        "Planejamento estratégico 5 anos",
        "Definição de KPIs e métricas",
        "Análise de mercado e concorrência",
        "Roadmap de implementação"
      ],
      benefits: [
        "Crescimento de receita em 30-50%",
        "Redução de custos operacionais",
        "Melhoria na tomada de decisões",
        "Vantagem competitiva sustentável"
      ],
      gradient: "from-purple-500 to-purple-600",
      chart: "📊"
    },
    {
      icon: Users,
      title: "Gestão de Pessoas",
      desc: "Otimizamos seus recursos humanos através de processos estruturados e desenvolvimento organizacional",
      features: [
        "Recrutamento e seleção",
        "Treinamento e desenvolvimento",
        "Avaliação de desempenho 360°",
        "Planos de carreira",
        "Cultura organizacional"
      ],
      benefits: [
        "Redução de turnover em 40%",
        "Aumento da produtividade",
        "Melhoria do clima organizacional",
        "Desenvolvimento de lideranças"
      ],
      gradient: "from-blue-500 to-blue-600",
      chart: "👥"
    },
    {
      icon: Target,
      title: "Marketing Digital",
      desc: "Estratégias digitais integradas para aumentar sua presença online e gerar mais vendas",
      features: [
        "SEO e SEM",
        "Gestão de redes sociais",
        "Marketing de conteúdo",
        "E-mail marketing",
        "Analytics e relatórios"
      ],
      benefits: [
        "Aumento de 200% no tráfego",
        "Melhoria na conversão",
        "Maior engajamento online",
        "ROI comprovado"
      ],
      gradient: "from-pink-500 to-pink-600",
      chart: "🎯"
    },
    {
      icon: Lightbulb,
      title: "Transformação Digital",
      desc: "Implementamos tecnologias e processos inovadores para modernizar sua operação",
      features: [
        "Automação de processos",
        "Implementação de IA/ML",
        "Sistemas de gestão (ERP/CRM)",
        "Análise de dados",
        "Metodologias ágeis"
      ],
      benefits: [
        "Redução de 60% no tempo de processos",
        "Melhoria na qualidade",
        "Decisões baseadas em dados",
        "Competitividade digital"
      ],
      gradient: "from-cyan-500 to-cyan-600",
      chart: "💡"
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

    const sections = [heroRef, servicesRef, processRef]
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  // Auto-rotate active service
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

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
                Soluções Completas para Sua Empresa
              </span>
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Nossos <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Serviços</span>
            </h1>
            <p 
              className={`text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Oferecemos soluções completas de consultoria empresarial para transformar 
              sua empresa e acelerar o crescimento sustentável
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Services Detail Section */}
      <section 
        ref={servicesRef}
        id="services"
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
                  visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mr-6 transition-all duration-300 hover:scale-110 hover:rotate-12`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white hover:text-purple-400 transition-colors cursor-pointer">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">{service.desc}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-purple-400" />
                        O que fazemos:
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer group"
                          >
                            <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                        Resultados esperados:
                      </h3>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer group"
                          >
                            <ArrowRight className="h-4 w-4 text-blue-400 mr-3 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-105 group backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative z-10">{service.chart}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Process Section */}
      <section 
        ref={processRef}
        id="process"
        className="py-32 relative"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-white">Como</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Trabalhamos
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Metodologia estruturada para garantir resultados excepcionais
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Diagnóstico", 
                desc: "Análise completa da situação atual da empresa",
                icon: Eye,
                gradient: "from-purple-500 to-purple-600"
              },
              { 
                step: "02", 
                title: "Estratégia", 
                desc: "Desenvolvimento de plano personalizado e detalhado",
                icon: Brain,
                gradient: "from-blue-500 to-blue-600"
              },
              { 
                step: "03", 
                title: "Implementação", 
                desc: "Execução do plano com acompanhamento contínuo",
                icon: Rocket,
                gradient: "from-pink-500 to-pink-600"
              },
              { 
                step: "04", 
                title: "Resultados", 
                desc: "Monitoramento e otimização constante dos resultados",
                icon: Award,
                gradient: "from-cyan-500 to-cyan-600"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`text-center group cursor-pointer transition-all duration-500 hover:scale-110 ${
                  visibleSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProcess(index)}
                onMouseLeave={() => setHoveredProcess(null)}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-all duration-300 relative`}>
                  <item.icon className="h-10 w-10 text-white absolute" />
                  <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>
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
              <span className="text-white">Pronto para</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Começar?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Agende uma consultoria gratuita e descubra qual serviço é ideal para sua empresa
            </p>
            <Link href="/contato">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group border-0 hover:scale-110"
              >
                <Rocket className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
                Solicitar Consultoria Gratuita
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
