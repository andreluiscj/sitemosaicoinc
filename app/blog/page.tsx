'use client'

import { Calendar, User, ArrowRight, Search, Sparkles, Eye, BookOpen, TrendingUp, Filter, Clock, Tag } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useRef } from 'react'

export default function BlogPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  const heroRef = useRef<HTMLElement>(null)
  const featuredRef = useRef<HTMLElement>(null)
  const postsRef = useRef<HTMLElement>(null)

  const posts = [
    {
      title: "5 Estratégias para Acelerar o Crescimento da Sua Empresa em 2024",
      excerpt: "Descubra as principais tendências e estratégias que estão transformando o mercado empresarial brasileiro.",
      author: "João Silva",
      date: "15 de Janeiro, 2024",
      category: "Estratégia",
      readTime: "5 min",
      emoji: "📈",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Como a Transformação Digital Pode Revolucionar Seu Negócio",
      excerpt: "Entenda como implementar tecnologias inovadoras para otimizar processos e aumentar a competitividade.",
      author: "Maria Santos",
      date: "10 de Janeiro, 2024",
      category: "Tecnologia",
      readTime: "7 min",
      emoji: "💻",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Gestão de Pessoas: Construindo Equipes de Alta Performance",
      excerpt: "Estratégias práticas para desenvolver talentos e criar uma cultura organizacional forte.",
      author: "Carlos Oliveira",
      date: "5 de Janeiro, 2024",
      category: "RH",
      readTime: "6 min",
      emoji: "👥",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      title: "Marketing Digital para PMEs: Guia Completo 2024",
      excerpt: "Tudo que você precisa saber para criar uma presença digital forte e gerar mais vendas.",
      author: "Ana Costa",
      date: "28 de Dezembro, 2023",
      category: "Marketing",
      readTime: "8 min",
      emoji: "🎯",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Indicadores de Performance: Como Medir o Sucesso do Seu Negócio",
      excerpt: "Aprenda a definir e acompanhar os KPIs mais importantes para sua empresa.",
      author: "Roberto Lima",
      date: "20 de Dezembro, 2023",
      category: "Gestão",
      readTime: "4 min",
      emoji: "📊",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Inovação Empresarial: Como Manter Sua Empresa Competitiva",
      excerpt: "Descubra como criar uma cultura de inovação e se adaptar às mudanças do mercado.",
      author: "Fernanda Rocha",
      date: "15 de Dezembro, 2023",
      category: "Inovação",
      readTime: "6 min",
      emoji: "💡",
      gradient: "from-yellow-500 to-orange-500"
    }
  ]

  const categories = ["Todos", "Estratégia", "Tecnologia", "RH", "Marketing", "Gestão", "Inovação"]

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

    const sections = [heroRef, featuredRef, postsRef]
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
                Insights e Conhecimento Empresarial
              </span>
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Blog <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Mosaico Inc</span>
            </h1>
            <p 
              className={`text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Insights, tendências e estratégias para transformar seu negócio. 
              Conteúdo especializado criado por nossos consultores.
            </p>
          </div>

          {/* Interactive Search and Filter */}
          <div 
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
              visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600 backdrop-blur-sm"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                      activeCategory === category 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0' 
                        : 'border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400'
                    }`}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section 
        ref={featuredRef}
        id="featured"
        className="py-16 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`mb-8 transition-all duration-1000 ${
              visibleSections.has('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-purple-400" />
              <span className="text-white">Artigo em</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ml-2">
                Destaque
              </span>
            </h2>
          </div>
          
          <Card 
            className={`bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:scale-105 group ${
              visibleSections.has('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">{posts[0].emoji}</span>
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className={`bg-gradient-to-r ${posts[0].gradient} text-white text-sm font-medium px-4 py-2 rounded-full`}>
                    {posts[0].category}
                  </span>
                  <span className="ml-3 text-gray-500 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {posts[0].readTime} de leitura
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {posts[0].title}
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">{posts[0].excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{posts[0].author}</span>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{posts[0].date}</span>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white group border-0 hover:scale-105 transition-all duration-300">
                    <Eye className="mr-2 h-4 w-4" />
                    Ler Artigo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Interactive Blog Posts Grid */}
      <section 
        ref={postsRef}
        id="posts"
        className="py-16 relative"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`mb-8 transition-all duration-1000 ${
              visibleSections.has('posts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 flex items-center">
              <TrendingUp className="h-8 w-8 mr-3 text-blue-400" />
              <span className="text-white">Últimos</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ml-2">
                Artigos
              </span>
            </h2>
            <p className="text-gray-400">
              Encontrados {filteredPosts.length - 1} artigos
              {activeCategory !== 'Todos' && ` em ${activeCategory}`}
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <Card 
                key={index} 
                className={`bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm cursor-pointer hover:scale-105 hover:-translate-y-2 group ${
                  visibleSections.has('posts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredPost(index)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">{post.emoji}</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className={`bg-gradient-to-r ${post.gradient} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                      <Tag className="h-3 w-3 inline mr-1" />
                      {post.category}
                    </span>
                    <span className="ml-2 text-gray-500 text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    
                    <ArrowRight className={`h-4 w-4 text-purple-400 transition-transform duration-300 ${
                      hoveredPost === index ? 'translate-x-1 scale-125' : ''
                    }`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div 
            className={`text-center mt-12 transition-all duration-1000 delay-500 ${
              visibleSections.has('posts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Carregar Mais Artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-black to-blue-900/20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-12 border border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-white">Receba Nossos</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Insights
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Assine nossa newsletter e receba conteúdo exclusivo sobre gestão empresarial
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600 backdrop-blur-sm"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border-0">
                <ArrowRight className="mr-2 h-5 w-5" />
                Assinar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
