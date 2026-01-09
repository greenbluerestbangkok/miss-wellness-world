'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUp, Menu, X, Mail, Phone, MapPin, Crown, Trophy, Star, Sparkles, Gem, Award, Calendar, Users, Target, Globe, Heart, Sun, Moon, Mountain, Diamond, ChevronRight, Play, Clock, MapPin as LocationIcon } from 'lucide-react'
import Image from 'next/image'

export default function MissWellnessWorld() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'th'>('th')

  const observersRef = useRef<Map<string, IntersectionObserver>>(new Map())

  const translations = {
    th: {
      // Navigation
      about: "นิยามใหม่",
      calling: "เสียงเรียก",
      experience: "ประสบการณ์",
      qualifications: "คุณสมบัติ",
      register: "สมัคร",
      applyNow: "สมัครตอนนี้",
      
      // Hero
      title: "The Awakening Journey",
      subtitle: "ความงาม... ไม่ใช่แค่ศิลปะ แต่คือ วิทยาศาสตร์แห่งชีวิต",
      description: "Miss Wellness World 2026 ภายใต้แนวคิด The Awakening Journey มุ่งสู่การผลักดันประเทศไทยให้ก้าวขึ้นเป็น 'เมืองหลวงสุขภาพของโลก'",
      worldCapital: "World Wellness Capital",
      registerNow: "สมัครเป็นผู้เข้าประกวด",
      
      // Executive Team
      executiveTeam: "คณะผู้บริหาร",
      teamDescription: "ผู้นำวิสัยทัศน์เบื้องหลัง Miss Wellness World",
      founder: "ผู้ก่อตั้งและประธาน",
      managingDirector: "กรรมการผู้จัดการ",
      directorPR: "ผู้อำนวยการฝ่าย PR & การตลาด",
      
      // Chapter 1: Awakening Journey
      chapter1Title: "Chapter 1: The Awakening Journey",
      chapter1Subtitle: "นิยามใหม่ของความงาม",
      chapter1Desc: "ความงามที่แท้จริงคือการผสานวิทยาศาสตร์แห่งชีวิตเข้ากับศิลปะ บนพื้นฐานของหลักการสำคัญสามประการ",
      compositionality: "สมองค์ประกอบ (Compositionality)",
      compositionalityDesc: "การรวมองค์ประกอบที่สมดุลกันของร่างกาย จิตใจ และวิญญาณ",
      proportionality: "สมสัดส่วน (Proportionality)",
      proportionalityDesc: "ความสมดุลและความพอดีในทุกด้านของชีวิต",
      integrationality: "สมบูรณาการ (Integrationality)",
      integrationalityDesc: "การเชื่อมโยงความงามเข้ากับสุขภาพและความเป็นอยู่ที่ดี",
      
      // Chapter 2: World's Calling
      chapter2Title: "Chapter 2: เสียงเรียกจากโลก",
      chapter2Subtitle: "The World's Calling",
      chapter2Desc: "ในฐานะทูตสุขภาพ (Wellness Ambassador) คุณจะใช้ความงามเป็นเครื่องมือในการสร้างการเปลี่ยนแปลง",
      crownTool: "มงกุฎของคุณ คือเครื่องมือเปลี่ยนโลก",
      economic: "มิติทางเศรษฐกิจ",
      education: "มิติทางการศึกษา",
      social: "มิติทางสังคม",
      
      // Chapter 3: Ultimate Retreat
      chapter3Title: "Chapter 3: รางวัลชีวิตตั้งแต่ยังไม่มง",
      chapter3Subtitle: "The Ultimate Retreat",
      chapter3Desc: "กิจกรรม Retreat 5 วัน 4 คืน ณ อารยธรรมล้านนา จังหวัดเชียงใหม่และลำปาง",
      natureTherapy: "Nature Therapy",
      natureDesc: "จิบชาชมช้าง ศูนย์อนุรักษ์ช้างไทย",
      moonBathing: "Moon Bathing",
      moonDesc: "ธาราบำบัด...อาบแสงจันทร์ อุทยานแห่งชาติแจ้ซ้อน",
      spiritHealing: "Spirit Healing",
      spiritDesc: "โยคะรับแสงอรุณ วัดศรีหลวงแจ้ซ้อน",
      gemstoneTherapy: "Gemstone Therapy",
      gemstoneDesc: "อัญมณีบำบัด แม่เมาะ",
      
      // Chapter 4: Qualification Mirror
      chapter4Title: "Chapter 4: กระจกสะท้อนคุณสมบัติ",
      chapter4Subtitle: "The Qualification Mirror",
      chapter4Desc: "คุณสมบัติที่จำเป็นสำหรับผู้สมัครเข้าร่วมโครงการ Miss Wellness World 2026",
      req1: "เป็นหญิงไทยโดยกำเนิด และมีอายุไม่เกิน 29 ปี",
      req2: "สถานภาพโสด",
      req3: "ไม่สูบบุหรี่ และมีสุขภาพดีทั้งกายและใจ",
      req4: "มีทักษะในการใช้ Social Media เพื่อสร้างตัวตน",
      req5: "มีจิตวิญญาณของผู้รับใช้สังคม",
      
      // Chapter 5: Timeline
      chapter5Title: "Chapter 5: ถึงเวลาของคุณ",
      chapter5Subtitle: "Timeline & Call to Action",
      janFeb: "ม.ค. - ก.พ. 2026",
      onlineReg: "รับสมัครออนไลน์",
      mar: "มี.ค. 2026",
      onlineTraining: "Online Training (อบรมเตรียมความพร้อม)",
      apr: "เม.ย. 2026",
      retreat: "Retreat ล้านนา (5 วัน 4 คืน)",
      may: "พ.ค. 2026",
      final: "รอบตัดสิน (ค้นหา Miss Wellness World)",
      noFees: "หมายเหตุ: โครงการนี้ไม่มีค่าสมัคร และไม่มีค่าใช้จ่ายใดๆ ตลอดการแข่งขัน",
      
      // Hall of Fame
      hallOfFame: "หอเกียรติยศ",
      mwwt2024: "Miss Wellness World Thailand 2024",
      winner: "ผู้ชนะ",
      firstRunner: "รองชนะเลิศอันดับหนึ่ง",
      secondRunner: "รองชนะเลิศอันดับสอง",
      thirdRunner: "รองชนะเลิศอันดับสาม",
      fourthRunner: "รองชนะเลิศอันดับสี่",
      
      // Contact
      contact: "ติดต่อ",
      contactDesc: "พร้อมเริ่มต้นการเดินทางของคุณหรือไม่? ติดต่อเราวันนี้",
      yourName: "ชื่อของคุณ",
      yourEmail: "อีเมลของคุณ",
      yourPhone: "เบอร์โทรศัพท์ของคุณ",
      message: "ข้อความของคุณ",
      submit: "ส่งใบสมัคร",
      
      // Footer
      copyright: "© 2026 Miss Wellness World. All rights reserved.",
      rights: "สงวนลิขสิทธิ์"
    },
    en: {
      // Navigation
      about: "New Definition",
      calling: "The Calling",
      experience: "Experience",
      qualifications: "Qualifications",
      register: "Register",
      applyNow: "APPLY NOW",
      
      // Hero
      title: "The Awakening Journey",
      subtitle: "Beauty... not just art, but the science of life",
      description: "Miss Wellness World 2026 under The Awakening Journey concept aims to push Thailand to become the 'World Wellness Capital'",
      worldCapital: "World Wellness Capital",
      registerNow: "Register as Contestant",
      
      // Executive Team
      executiveTeam: "Executive Team",
      teamDescription: "Visionary leaders behind Miss Wellness World",
      founder: "Founder & Chairman",
      managingDirector: "Managing Director",
      directorPR: "Director of PR & Marketing",
      
      // Chapter 1: Awakening Journey
      chapter1Title: "Chapter 1: The Awakening Journey",
      chapter1Subtitle: "New Definition of Beauty",
      chapter1Desc: "True beauty is the fusion of life science with art, based on three important principles",
      compositionality: "Compositionality",
      compositionalityDesc: "The balanced composition of body, mind, and spirit",
      proportionality: "Proportionality",
      proportionalityDesc: "Balance and appropriateness in all aspects of life",
      integrationality: "Integrationality",
      integrationalityDesc: "Connecting beauty with health and well-being",
      
      // Chapter 2: World's Calling
      chapter2Title: "Chapter 2: The World's Calling",
      chapter2Subtitle: "The World's Calling",
      chapter2Desc: "As a Wellness Ambassador, you will use beauty as a tool for creating change",
      crownTool: "Your Crown is a Tool to Change the World",
      economic: "Economic Dimension",
      education: "Educational Dimension",
      social: "Social Dimension",
      
      // Chapter 3: Ultimate Retreat
      chapter3Title: "Chapter 3: The Ultimate Retreat",
      chapter3Subtitle: "The Ultimate Retreat",
      chapter3Desc: "5-day 4-night Retreat at Lanna Civilization, Chiang Mai and Lampang provinces",
      natureTherapy: "Nature Therapy",
      natureDesc: "Tea tasting with elephants, Thai Elephant Conservation Center",
      moonBathing: "Moon Bathing",
      moonDesc: "Hydrotherapy... moonlight bathing, Chae Son National Park",
      spiritHealing: "Spirit Healing",
      spiritDesc: "Sunrise yoga, Sri Lanna Chae Son Temple",
      gemstoneTherapy: "Gemstone Therapy",
      gemstoneDesc: "Gemstone therapy, Mae Mao",
      
      // Chapter 4: Qualification Mirror
      chapter4Title: "Chapter 4: The Qualification Mirror",
      chapter4Subtitle: "The Qualification Mirror",
      chapter4Desc: "Required qualifications for applicants to Miss Wellness World 2026",
      req1: "Thai female by birth, age not exceeding 29 years",
      req2: "Single status",
      req3: "Non-smoker with good physical and mental health",
      req4: "Social media skills for personal branding",
      req5: "Spirit of social service",
      
      // Chapter 5: Timeline
      chapter5Title: "Chapter 5: Your Time",
      chapter5Subtitle: "Timeline & Call to Action",
      janFeb: "Jan - Feb 2026",
      onlineReg: "Online Registration",
      mar: "Mar 2026",
      onlineTraining: "Online Training (Preparation Course)",
      apr: "Apr 2026",
      retreat: "Lanna Retreat (5 days 4 nights)",
      may: "May 2026",
      final: "Final Round (Finding Miss Wellness World)",
      noFees: "Note: This project has no registration fees and no costs throughout the competition",
      
      // Hall of Fame
      hallOfFame: "Hall of Fame",
      mwwt2024: "Miss Wellness World Thailand 2024",
      winner: "Winner",
      firstRunner: "First Runner Up",
      secondRunner: "Second Runner Up",
      thirdRunner: "Third Runner Up",
      fourthRunner: "Fourth Runner Up",
      
      // Contact
      contact: "Contact",
      contactDesc: "Ready to start your journey? Contact us today",
      yourName: "Your Name",
      yourEmail: "Your Email",
      yourPhone: "Your Phone",
      message: "Your Message",
      submit: "Submit Application",
      
      // Footer
      copyright: "© 2026 Miss Wellness World. All rights reserved.",
      rights: "All rights reserved"
    }
  }

  const t = translations[selectedLanguage]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['hero', 'team', 'chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5', 'winners', 'contact']
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    sections.forEach(sectionId => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(sectionId))
          }
        })
      }, observerOptions)

      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
        observersRef.current.set(sectionId, observer)
      }
    })

    return () => {
      observersRef.current.forEach(observer => observer.disconnect())
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  // Real Executive Team from Requirements
  const executiveTeam = [
    {
      name: "ศ.ดร.เกรียงศักดิ์ เจริญวงศ์ศักดิ์",
      title: t.founder,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Ms. Sakuna Rojanapanich", 
      title: t.managingDirector,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Ms. Pirawan Pasayamart",
      title: t.directorPR,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ]

  // Real MWWT 2024 Winners from Requirements
  const winners = [
    {
      name: "Kanokorn Rungruksa",
      title: t.winner,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=face",
      featured: true
    },
    {
      name: "Pitchayapa Onming",
      title: t.firstRunner,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      featured: false
    },
    {
      name: "Phattharachaya Narasermcheep",
      title: t.secondRunner,
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
      featured: false
    },
    {
      name: "Aitsari Rodwised",
      title: t.thirdRunner,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      featured: false
    },
    {
      name: "Nattaya Chansawang",
      title: t.fourthRunner,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
      featured: false
    }
  ]

  // Retreat Activities
  const retreatActivities = [
    {
      title: t.natureTherapy,
      description: t.natureDesc,
      image: "/elephant-therapy.png",
      icon: <Mountain className="w-6 h-6" />
    },
    {
      title: t.moonBathing,
      description: t.moonDesc,
      image: "/moon-bathing.png",
      icon: <Moon className="w-6 h-6" />
    },
    {
      title: t.spiritHealing,
      description: t.spiritDesc,
      image: "/sunrise-yoga.png",
      icon: <Sun className="w-6 h-6" />
    },
    {
      title: t.gemstoneTherapy,
      description: t.gemstoneDesc,
      image: "/gemstone-therapy.png",
      icon: <Diamond className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-wellness-green text-white green-gradient relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-wellness-gold rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-wellness-gold rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-wellness-gold/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Language Toggle */}
      <div className="fixed top-20 right-4 z-50 flex gap-2">
        <Button
          size="sm"
          variant={selectedLanguage === 'th' ? 'default' : 'outline'}
          className={`${
            selectedLanguage === 'th' 
              ? 'bg-wellness-gold text-white' 
              : 'border-wellness-gold text-wellness-gold hover:bg-wellness-gold hover:text-white'
          } rounded-full`}
          onClick={() => setSelectedLanguage('th')}
        >
          ไทย
        </Button>
        <Button
          size="sm"
          variant={selectedLanguage === 'en' ? 'default' : 'outline'}
          className={`${
            selectedLanguage === 'en' 
              ? 'bg-wellness-gold text-white' 
              : 'border-wellness-gold text-wellness-gold hover:bg-wellness-gold hover:text-white'
          } rounded-full`}
          onClick={() => setSelectedLanguage('en')}
        >
          EN
        </Button>
      </div>

      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'glassmorphism-dark shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Crown className="h-8 w-8 text-wellness-gold" />
                <Sparkles className="h-4 w-4 text-wellness-gold absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-black text-white tracking-wide">Miss Wellness World 2026</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('chapter1')}
                className="text-slate-300 hover:text-wellness-gold transition-all duration-300 font-medium text-sm"
              >
                {t.about}
              </button>
              <button 
                onClick={() => scrollToSection('chapter2')}
                className="text-slate-300 hover:text-wellness-gold transition-all duration-300 font-medium text-sm"
              >
                {t.calling}
              </button>
              <button 
                onClick={() => scrollToSection('chapter3')}
                className="text-slate-300 hover:text-wellness-gold transition-all duration-300 font-medium text-sm"
              >
                {t.experience}
              </button>
              <button 
                onClick={() => scrollToSection('chapter4')}
                className="text-slate-300 hover:text-wellness-gold transition-all duration-300 font-medium text-sm"
              >
                {t.qualifications}
              </button>
              <button 
                onClick={() => scrollToSection('chapter5')}
                className="text-slate-300 hover:text-wellness-gold transition-all duration-300 font-medium text-sm"
              >
                {t.register}
              </button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-wellness-gold to-wellness-gold-light hover:from-wellness-gold-light hover:to-wellness-gold text-white font-bold rounded-full hover-scale shadow-lg shadow-wellness-gold/30"
                onClick={() => scrollToSection('contact')}
              >
                {t.applyNow}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden glassmorphism-dark rounded-lg mt-2 p-4 border border-white/10">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => scrollToSection('chapter1')}
                  className="text-slate-300 hover:text-wellness-gold transition-colors text-left py-2"
                >
                  {t.about}
                </button>
                <button 
                  onClick={() => scrollToSection('chapter2')}
                  className="text-slate-300 hover:text-wellness-gold transition-colors text-left py-2"
                >
                  {t.calling}
                </button>
                <button 
                  onClick={() => scrollToSection('chapter3')}
                  className="text-slate-300 hover:text-wellness-gold transition-colors text-left py-2"
                >
                  {t.experience}
                </button>
                <button 
                  onClick={() => scrollToSection('chapter4')}
                  className="text-slate-300 hover:text-wellness-gold transition-colors text-left py-2"
                >
                  {t.qualifications}
                </button>
                <button 
                  onClick={() => scrollToSection('chapter5')}
                  className="text-slate-300 hover:text-wellness-gold transition-colors text-left py-2"
                >
                  {t.register}
                </button>
                <Button 
                  size="sm"
                  className="bg-wellness-gold hover:bg-wellness-gold-light text-white w-full"
                  onClick={() => scrollToSection('contact')}
                >
                  {t.applyNow}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`min-h-screen flex items-center justify-center px-4 relative z-10 ${
          visibleSections.has('hero') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-wellness-green/95 via-wellness-green/80 to-wellness-green/90"></div>
        
        <div className="absolute inset-0">
          <Image
            src="/pageant-competition.png"
            alt="Miss Wellness World Stage"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-wellness-gold/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-wellness-gold/30">
              <Globe className="h-5 w-5 text-wellness-gold" />
              <span className="text-wellness-gold font-semibold">
                {t.worldCapital}
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight">
            {t.title}
          </h1>
          
          <p className="text-2xl md:text-4xl text-wellness-gold mb-8 max-w-4xl mx-auto leading-relaxed font-bold">
            {t.subtitle}
          </p>
          
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            {t.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-wellness-gold to-wellness-gold-light hover:from-wellness-gold-light hover:to-wellness-gold text-white text-lg px-10 py-6 rounded-full hover-scale shadow-2xl shadow-wellness-gold/30 border border-wellness-gold/50"
              onClick={() => scrollToSection('chapter5')}
            >
              <Crown className="w-6 h-6 mr-3" />
              {t.registerNow}
            </Button>
            
            <div className="flex items-center space-x-6 text-slate-300">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-wellness-gold" />
                <span className="text-sm font-medium">Wellness</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gem className="h-5 w-5 text-wellness-gold" />
                <span className="text-sm font-medium">Beauty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-wellness-gold" />
                <span className="text-sm font-medium">World</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team Section */}
      <section 
        id="team" 
        className={`py-24 px-4 relative z-10 ${
          visibleSections.has('team') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px bg-wellness-gold w-16"></div>
              <Users className="h-6 w-6 text-wellness-gold" />
              <div className="h-px bg-wellness-gold w-16"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              {t.executiveTeam}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {t.teamDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {executiveTeam.map((member, index) => (
              <Card 
                key={index} 
                className="glassmorphism-dark border-white/10 hover-scale hover-glow group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-wellness-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-wellness-gold shadow-2xl shadow-wellness-gold/30">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wellness-green/50 to-transparent"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-wellness-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-300 font-medium">{member.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 1: The Awakening Journey */}
      <section 
        id="chapter1" 
        className={`py-24 px-4 relative z-10 ${
          visibleSections.has('chapter1') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px bg-wellness-gold w-16"></div>
              <Sparkles className="h-6 w-6 text-wellness-gold" />
              <div className="h-px bg-wellness-gold w-16"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              {t.chapter1Title}
            </h2>
            <h3 className="text-2xl md:text-4xl text-wellness-gold font-bold mb-6">
              {t.chapter1Subtitle}
            </h3>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              {t.chapter1Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-wellness-gold/20 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-wellness-gold" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-wellness-gold">
                  {t.compositionality}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t.compositionalityDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-wellness-gold/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-wellness-gold" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-wellness-gold">
                  {t.proportionality}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t.proportionalityDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-wellness-gold/20 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-wellness-gold" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-wellness-gold">
                  {t.integrationality}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t.integrationalityDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chapter 2: The World's Calling */}
      <section 
        id="chapter2" 
        className={`py-24 px-4 relative z-10 ${
          visibleSections.has('chapter2') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px bg-wellness-gold w-16"></div>
              <Crown className="h-6 w-6 text-wellness-gold" />
              <div className="h-px bg-wellness-gold w-16"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              {t.chapter2Title}
            </h2>
            <h3 className="text-2xl md:text-4xl text-wellness-gold font-bold mb-6">
              {t.chapter2Subtitle}
            </h3>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              {t.chapter2Desc}
            </p>
            <div className="inline-block">
              <Badge className="bg-gradient-to-r from-wellness-gold to-wellness-gold-light text-white text-lg px-8 py-4 rounded-full border-2 border-wellness-gold/30">
                <Crown className="w-5 h-5 mr-2" />
                {t.crownTool}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-wellness-gold/20 rounded-lg flex items-center justify-center mr-4">
                    <Trophy className="w-6 h-6 text-wellness-gold" />
                  </div>
                  <h4 className="text-xl font-bold text-wellness-gold">
                    {t.economic}
                  </h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  ใช้อิทธิพลของความงามในการสร้างมูลค่าทางเศรษฐกิจและส่งเสริมอุตสาหกรรม wellness
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-wellness-gold/20 rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-wellness-gold" />
                  </div>
                  <h4 className="text-xl font-bold text-wellness-gold">
                    {t.education}
                  </h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  เผยแพร่ความรู้ด้านสุขภาพและความงามผ่านการศึกษาและการเรียนรู้ตลอดชีวิต
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-wellness-gold/20 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-wellness-gold" />
                  </div>
                  <h4 className="text-xl font-bold text-wellness-gold">
                    {t.social}
                  </h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  สร้างการเปลี่ยนแปลงทางสังคมและส่งเสริมคุณภาพชีวิตให้กับผู้คนทั่วโลก
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/wellness-speaker.png"
                alt="Wellness Ambassador"
                width={1200}
                height={600}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wellness-green/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Ultimate Retreat */}
      <section 
        id="chapter3" 
        className={`py-24 px-4 relative z-10 ${
          visibleSections.has('chapter3') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px bg-wellness-gold w-16"></div>
              <Mountain className="h-6 w-6 text-wellness-gold" />
              <div className="h-px bg-wellness-gold w-16"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              {t.chapter3Title}
            </h2>
            <h3 className="text-2xl md:text-4xl text-wellness-gold font-bold mb-6">
              {t.chapter3Subtitle}
            </h3>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              {t.chapter3Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {retreatActivities.map((activity, index) => (
              <Card 
                key={index} 
                className="glassmorphism-dark border-white/10 hover-scale hover-glow overflow-hidden group"
              >
                <div className="relative h-64">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wellness-green/90 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-wellness-gold/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      {activity.icon}
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-3 text-wellness-gold group-hover:text-wellness-gold-light transition-colors">
                    {activity.title}
                  </h4>
                  <p className="text-slate-300 leading-relaxed flex items-start">
                    <LocationIcon className="w-4 h-4 text-wellness-gold mr-2 mt-1 flex-shrink-0" />
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 4: The Qualification Mirror */}
      <section 
        id="chapter4" 
        className={`py-24 px-4 relative z-10 ${
          visibleSections.has('chapter4') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px bg-wellness-gold w-16"></div>
              <Star className="h-6 w-6 text-wellness-gold" />
              <div className="h-px bg-wellness-gold w-16"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              {t.chapter4Title}
            </h2>
            <h3 className="text-2xl md:text-4xl text-wellness-gold font-bold mb-6">
              {t.chapter4Subtitle}
            </h3>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              {t.chapter4Desc}
            </p>
          </div>

          <Card className="glassmorphism-dark border-white/10 hover-glow max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="space-y-6">
                {[
                  t.req1,
                  t.req2,
                  t.req3,
                  t.req4,
                  t.req5
                ].map((req, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-8 h-8 bg-wellness-gold/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-wellness-gold/30 transition-colors">
                      <span className="text-wellness-gold font-bold">{index + 1}</span>
                    </div>
                    <p className="text-slate-200 text-lg leading-relaxed group-hover:text-white transition-colors">
                      {req}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chapter 5: Timeline & Call to Action */}
      <section 
        id="chapter5" 
        className={`py-24 px-4 relative z-10 ${
          visibleSections.has('chapter5') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px bg-wellness-gold w-16"></div>
              <Calendar className="h-6 w-6 text-wellness-gold" />
              <div className="h-px bg-wellness-gold w-16"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              {t.chapter5Title}
            </h2>
            <h3 className="text-2xl md:text-4xl text-wellness-gold font-bold mb-6">
              {t.chapter5Subtitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-black text-wellness-gold mb-2">
                  {t.janFeb}
                </div>
                <h4 className="text-xl font-bold mb-3">{t.onlineReg}</h4>
                <Users className="w-8 h-8 text-wellness-gold mx-auto" />
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-black text-wellness-gold mb-2">
                  {t.mar}
                </div>
                <h4 className="text-xl font-bold mb-3">{t.onlineTraining}</h4>
                <Award className="w-8 h-8 text-wellness-gold mx-auto" />
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-black text-wellness-gold mb-2">
                  {t.apr}
                </div>
                <h4 className="text-xl font-bold mb-3">{t.retreat}</h4>
                <Mountain className="w-8 h-8 text-wellness-gold mx-auto" />
              </CardContent>
            </Card>

            <Card className="glassmorphism-dark border-white/10 hover-scale hover-glow text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-black text-wellness-gold mb-2">
                  {t.may}
                </div>
                <h4 className="text-xl font-bold mb-3">{t.final}</h4>
                <Crown className="w-8 h-8 text-wellness-gold mx-auto" />
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="glassmorphism-dark border-wellness-gold/30 inline-block">
              <CardContent className="p-8">
                <p className="text-slate-200 text-lg leading-relaxed">
                  {t.noFees}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hall of Fame - MWWT 2024 Winners */}
      <section 
        id="winners" 
        className={`py-24 px-4 relative z-10 ${
          visibleSections.has('winners') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px bg-wellness-gold w-16"></div>
              <Trophy className="h-6 w-6 text-wellness-gold" />
              <div className="h-px bg-wellness-gold w-16"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              {t.hallOfFame}
            </h2>
            <h3 className="text-2xl md:text-4xl text-wellness-gold font-bold mb-6">
              {t.mwwt2024}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Winner */}
            {winners.filter(w => w.featured).map((winner, index) => (
              <Card 
                key={index} 
                className="lg:col-span-2 glassmorphism-dark border-white/10 hover-scale hover-glow group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-wellness-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-10 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-wellness-gold shadow-2xl shadow-wellness-gold/30 flex-shrink-0">
                      <Image 
                        src={winner.image} 
                        alt={winner.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wellness-green/50 to-transparent"></div>
                      <div className="absolute bottom-4 right-4">
                        <Image
                          src="/wellness-trophy.png"
                          alt="Trophy"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <Badge className="bg-gradient-to-r from-wellness-gold to-wellness-gold-light text-white mb-4 px-6 py-2 text-sm font-bold rounded-full border-2 border-wellness-gold/30">
                        <Trophy className="w-4 h-4 mr-2" />
                        {t.winner}
                      </Badge>
                      <h3 className="text-4xl font-black mb-3 group-hover:text-wellness-gold transition-colors">
                        {winner.name}
                      </h3>
                      <p className="text-2xl text-wellness-gold mb-6 font-semibold">{winner.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Runners Up */}
            <div className="space-y-6">
              {winners.filter(w => !w.featured).map((winner, index) => (
                <Card 
                  key={index} 
                  className="glassmorphism-dark border-white/10 hover-scale hover-glow group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-wellness-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-wellness-gold flex-shrink-0">
                        <Image 
                          src={winner.image} 
                          alt={winner.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-wellness-green/50 to-transparent"></div>
                      </div>
                      <div className="flex-1">
                        <Badge className="bg-wellness-gold/20 text-wellness-gold mb-2 text-xs font-semibold rounded-full border border-wellness-gold/30">
                          <Star className="w-3 h-3 mr-1" />
                          {index + 2}{selectedLanguage === 'th' ? ' ที่' : 'nd'} Place
                        </Badge>
                        <h4 className="font-bold text-lg group-hover:text-wellness-gold transition-colors">{winner.name}</h4>
                        <p className="text-slate-300 font-medium">{winner.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`py-24 px-4 relative z-10 ${
          visibleSections.has('contact') ? 'fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px bg-wellness-gold w-16"></div>
              <Mail className="h-6 w-6 text-wellness-gold" />
              <div className="h-px bg-wellness-gold w-16"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              {t.contact}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {t.contactDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glassmorphism-dark border-white/10 hover-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-wellness-gold/10 to-transparent"></div>
              <CardContent className="p-10 relative z-10">
                <form className="space-y-6">
                  <div>
                    <Input 
                      placeholder={t.yourName}
                      className="glassmorphism border-white/10 text-white placeholder:text-slate-400 h-14 rounded-lg text-lg"
                    />
                  </div>
                  <div>
                    <Input 
                      type="email"
                      placeholder={t.yourEmail}
                      className="glassmorphism border-white/10 text-white placeholder:text-slate-400 h-14 rounded-lg text-lg"
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder={t.yourPhone}
                      className="glassmorphism border-white/10 text-white placeholder:text-slate-400 h-14 rounded-lg text-lg"
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder={t.message}
                      rows={5}
                      className="glassmorphism border-white/10 text-white placeholder:text-slate-400 resize-none rounded-lg text-lg"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-wellness-gold to-wellness-gold-light hover:from-wellness-gold-light hover:to-wellness-gold text-white h-14 rounded-lg text-lg font-semibold hover-scale shadow-xl shadow-wellness-gold/30 border border-wellness-gold/50"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    {t.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="glassmorphism-dark border-white/10 hover-glow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-wellness-gold/10 to-transparent"></div>
                <CardContent className="p-10 relative z-10">
                  <h3 className="text-3xl font-black mb-8 text-wellness-gold bg-gradient-to-r from-wellness-gold to-wellness-gold-light bg-clip-text text-transparent">
                    {t.contact}
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-wellness-gold/20 rounded-lg group-hover:bg-wellness-gold/30 transition-colors">
                        <Mail className="w-6 h-6 text-wellness-gold" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-2 text-white">Email</p>
                        <p className="text-slate-300 text-lg">info@misswellnessworld.com</p>
                        <p className="text-slate-300 text-lg">applications@misswellnessworld.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-wellness-gold/20 rounded-lg group-hover:bg-wellness-gold/30 transition-colors">
                        <Phone className="w-6 h-6 text-wellness-gold" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-2 text-white">Phone</p>
                        <p className="text-slate-300 text-lg">+1 (555) 123-4567</p>
                        <p className="text-slate-300 text-lg">Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-wellness-gold/20 rounded-lg group-hover:bg-wellness-gold/30 transition-colors">
                        <MapPin className="w-6 h-6 text-wellness-gold" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-2 text-white">Headquarters</p>
                        <p className="text-slate-300 text-lg">
                          123 Wellness Avenue<br />
                          New York, NY 10001<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glassmorphism-dark border-t border-white/10 py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/wellness-crown.png"
                  alt="Miss Wellness World Crown"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-wide">Miss Wellness World 2026</span>
            </div>
            
            <div className="flex items-center space-x-6 text-slate-400">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-wellness-gold" />
                <span className="text-sm font-medium">Wellness</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4 text-wellness-gold" />
                <span className="text-sm font-medium">Beauty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-wellness-gold" />
                <span className="text-sm font-medium">World</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-slate-400 text-lg">
              {t.copyright} {t.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-wellness-gold to-wellness-gold-light hover:from-wellness-gold-light hover:to-wellness-gold text-white p-4 rounded-full shadow-2xl shadow-wellness-gold/30 hover-scale z-50 border border-wellness-gold/50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}