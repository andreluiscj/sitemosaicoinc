'use client'

import { Award, Users, Target, TrendingUp, CheckCircle, Sparkles, Brain, Heart, Zap, Shield, Eye, Rocket, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useRef } from 'react'

export default function SobrePage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [counters, setCounters] = useState({ projects: 0, satisfaction: 0, years: 0, companies: 0 })

  const heroRef = useRef<HTMLElement>(null)
  const missionRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)

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

    const sections = [heroRef, missionRef, valuesRef, teamRef]
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  // Counter animation
  useEffect(() => {
    if (visibleSections.has('mission')) {
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero"
        className="py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-black to-teal-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600/10 to-slate-600/10 border border-teal-600/20 rounded-full text-sm font-medium mb-8 transition-all duration-1000 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Sparkles className="h-4 w-4 mr-2 text-teal-400 animate-spin" />
              <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                Conheça Nossa História
              </span>
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Sobre a <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-slate-400 bg-clip-text text-transparent">Mosaico Inc</span>
            </h1>
            <p 
              className={`text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Somos uma consultoria empresarial especializada em transformar desafios em oportunidades. 
              Com mais de 15 anos de experiência, ajudamos empresas a alcançar resultados excepcionais.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={missionRef}
        id="mission"
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div 
              className={`transition-all duration-1000 ${
                visibleSections.has('mission') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-5xl font-bold mb-8">
                <span className="text-white">Nossa</span>{" "}
                <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                  Missão
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Transformar empresas através de consultoria estratégica personalizada, 
                combinando expertise técnica com profundo conhecimento do mercado brasileiro.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Acreditamos que cada empresa tem potencial único para crescer e inovar. 
                Nossa missão é desbloquear esse potencial através de soluções sob medida.
              </p>
              <div className="space-y-4">
                {[
                  { text: "Consultoria estratégica personalizada", icon: Brain },
                  { text: "Metodologias comprovadas no mercado", icon: Target },
                  { text: "Foco em resultados mensuráveis", icon: TrendingUp },
                  { text: "Acompanhamento contínuo dos projetos", icon: Eye }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center group cursor-pointer hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-slate-600 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div 
              className={`relative transition-all duration-1000 delay-300 ${
                visibleSections.has('mission') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="bg-gradient-to-r from-teal-600/10 to-slate-600/10 rounded-3xl p-8 border border-gray-800 hover:border-teal-600/30 transition-all duration-300 group">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { value: counters.projects, suffix: '+', label: 'Projetos', icon: Award, color: 'teal' },
                    { value: counters.satisfaction, suffix: '%', label: 'Satisfação', icon: Heart, color: 'slate' },
                    { value: counters.years, suffix: '+', label: 'Anos', icon: TrendingUp, color: 'teal' },
                    { value: counters.companies, suffix: '+', label: 'Empresas', icon: Users, color: 'slate' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group cursor-pointer hover:scale-110 transition-all duration-300">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color === 'teal' ? 'from-teal-600 to-teal-500' : 'from-slate-600 to-slate-500'} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent mb-1">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef}
        id="values"
        className="py-32 relative"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-white">Nossos</span>{" "}
              <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                Valores
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Princípios que guiam nossa atuação e relacionamento com clientes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excelência",
                desc: "Buscamos sempre a excelência em todos os projetos e entregas",
                gradient: "from-teal-600 to-teal-500"
              },
              {
                icon: Users,
                title: "Parceria",
                desc: "Construímos relacionamentos duradouros baseados na confiança",
                gradient: "from-slate-600 to-slate-500"
              },
              {
                icon: Target,
                title: "Resultados",
                desc: "Focamos em resultados concretos e mensuráveis para nossos clientes",
                gradient: "from-teal-500 to-slate-600"
              },
              {
                icon: Zap,
                title: "Inovação",
                desc: "Utilizamos as melhores práticas e tecnologias do mercado",
                gradient: "from-slate-500 to-teal-600"
              }
            ].map((value, index) => (
              <Card 
                key={index} 
                className={`bg-gray-900/30 border-gray-800 hover:border-teal-600/30 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:scale-105 hover:-translate-y-2 ${
                  visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 relative z-10 ${
                    hoveredValue === index ? 'scale-125 rotate-12' : ''
                  }`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors relative z-10">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
                    {value.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        id="team"
        className="py-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-white">Nossa</span>{" "}
              <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
                Equipe
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Profissionais experientes e especializados em diferentes áreas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "João Silva",
                role: "CEO & Fundador",
                desc: "15+ anos em consultoria estratégica",
                avatar: "👨‍💼",
                gradient: "from-teal-600 to-teal-500"
              },
              {
                name: "Maria Santos",
                role: "Diretora de Operações",
                desc: "Especialista em gestão de pessoas",
                avatar: "👩‍💼",
                gradient: "from-slate-600 to-slate-500"
              },
              {
                name: "Carlos Oliveira",
                role: "Consultor Sênior",
                desc: "Expert em transformação digital",
                avatar: "👨‍🚀",
                gradient: "from-teal-500 to-slate-600"
              }
            ].map((member, index) => (
              <Card 
                key={index} 
                className={`bg-gray-900/30 border-gray-800 hover:border-teal-600/30 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:scale-105 hover:-translate-y-2 ${
                  visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                    {member.avatar}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 text-center relative">
                  <div className={`w-12 h-12 bg-gradient-to-r ${member.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredMember === index ? 'scale-125 rotate-12' : ''
                  }`}>
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-teal-400 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{member.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-black to-teal-900/20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-white">Vamos Trabalhar</span>{" "}
            <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent">
              Juntos?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Entre em contato e descubra como podemos ajudar sua empresa
          </p>
          <Link href="/contato">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-500 hover:to-slate-500 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 group border-0 hover:scale-110"
            >
              <Rocket className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
              Fale Conosco
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
