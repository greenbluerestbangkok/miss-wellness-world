# Miss Wellness World Website - Requirements & Features Summary

## 📋 Project Overview

| Item | Detail |
|------|--------|
| **Project Name** | Miss Wellness World |
| **Description** | เว็บไซต์อย่างเป็นทางการของ Miss Wellness World - การประกวดความงามระดับโลกที่มุ่งเน้นด้าน Wellness |
| **Framework** | Nuxt 4 (Vue 3) |
| **Styling** | Tailwind CSS |
| **Deployment** | Static Site Generation (SSG) |
| **Target URL** | https://misswellnessworld.com/ |

---

## 🎨 Design System

### Color Palette
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Wellness Green | `#0a5138` | Primary color, headings, accents |
| Wellness Gold | `#ca8a04` | Secondary color, highlights, titles |
| Wellness Light | `#f0f9ff` | Background gradients |
| Wellness Dark | `#1e293b` | Footer, dark text |
| Wellness Text | `#334155` | Body text |

### Typography
- **Primary Font**: Inter (Sans-serif)
- **System Fallback**: system-ui, sans-serif

### Visual Effects
- Backdrop blur (glassmorphism)
- Gradient backgrounds
- Text shadows
- Fade-in animations (scroll-triggered)
- Hover effects (scale, color transitions)
- Wellness pattern overlays

---

## 🏗️ Website Structure

### Page Layout
```
├── AppHeader (Fixed Navigation)
├── HeroSection
├── About Section
│   ├── Executive Team (About.vue)
│   ├── Miss Wellness World (AboutMWW.vue)
│   └── Miss Wellness World Thailand (AboutMWWT.vue)
├── Hall of Fame Section
│   ├── General Gallery (HallOfFameGeneral.vue)
│   ├── MWW Coming Soon (HallOfFameMWW.vue)
│   └── MWWT 2024 Winners (HallOfFameMWWT.vue)
├── Contact Section
├── AppFooter
└── BackToTop Button
```

---

## 🚀 Features

### 1. Navigation (AppHeader)
- **Responsive Design**: Desktop navbar + Mobile hamburger menu
- **Sticky Header**: Fixed position with scroll-triggered styling change
- **Dynamic Logo**: Logo changes based on scroll position (white → colored)
- **Submenu Dropdowns**: About Us, Hall of Fame sections
- **Active Section Highlight**: ปุ่ม navigation จะ highlight ตาม section ที่กำลังดูอยู่
- **Smooth Scrolling**: Animation เมื่อคลิก navigation links
- **Keyboard Accessibility**: รองรับ Escape key สำหรับปิด mobile menu

### 2. Hero Section
- **Full-screen Background**: Cover image with wellness gradient overlay
- **Animated Headline**: "WHO Will Be The First Miss Wellness World"
- **Responsive Typography**: ขนาดตัวอักษรปรับตาม device
- **Fade-in Animation**: Hero text แสดงแบบ animated เมื่อ load หน้า

### 3. About - Executive Team
แสดงทีมผู้บริหารของ Miss Wellness World:
- **Dr. Kriengsak Chareonwongsak** - Founder & Chairman
- **Ms. Sakuna Rojanapanich** - Managing Director
- **Ms. Pirawan Pasayamart** - Director of PR & Marketing, Event and Sponsor

Features:
- รูปภาพ circular profile
- Cards แสดงข้อมูลและตำแหน่ง
- Grid layout responsive

### 4. About Miss Wellness World (MWW)
- **Logo Display**: MWW crown logo
- **YouTube Video**: Embedded promotional video
- **Vision Statement**: ข้อความวิสัยทัศน์ขององค์กร
- **Mission Statement**: ข้อความพันธกิจ
- **Crown Section**: รายละเอียดความหมายของมงกุฎ
  - Emerald green = Nature & healing
  - Pearl = Wisdom & compassion

### 5. About Miss Wellness World Thailand (MWWT)
- **Logo Display**: MWWT logo
- **Tagline**: "Beauty with Wellness"
- **Health Quotient (HQ)**: แนวคิดเรื่อง HQ
- **YouTube Video**: Tournament promotional video
- **Purpose & Mission Cards**: แสดงจุดประสงค์และพันธกิจ

### 6. Hall of Fame - General
- **Title Section**: "HALL OF FAME" with decorative styling
- **Photo Gallery**: 3-column grid with hover effects
- **Quote Display**: Inspirational quote

### 7. Hall of Fame - MWW (Coming Soon)
- **Coming Soon State**: Animated loading indicators
- **Schedule Image**: กำหนดการประกวด
- **QR Code Registration**: QR code สำหรับสมัครประกวด MWW 2025

### 8. Hall of Fame - MWWT 2024
แสดงผู้ชนะการประกวด Miss Wellness World Thailand 2024:
- **Winner**: Kanokorn Rungruksa
- **1st Runner Up**: Pitchayapa Onming
- **2nd Runner Up**: Phattharachaya Narasermcheep
- **3rd Runner Up**: Aitsari Rodwised
- **4th Runner Up**: (Additional)

Features:
- Large winner photo with special styling
- Runner-up grid layout
- Hover effects on cards

### 9. Contact Section
- **Contact Form** with validation:
  - First Name (min 2 chars)
  - Last Name (min 2 chars)
  - Email (valid email format)
  - Subject (min 3 chars)
  - Message (min 10 chars)
- **Google Apps Script Integration**: ส่งข้อมูลไปยัง Google Sheets
- **Success/Error Messages**: แสดง feedback หลังส่งฟอร์ม
- **Loading State**: แสดง spinner ขณะส่งข้อมูล
- **Fallback Simulation**: จำลองการส่งเมื่อ API ไม่พร้อมใช้งาน

### 10. Footer (AppFooter)
- **Brand Section**: Logo และคำอธิบายองค์กร
- **Quick Links**: Home, About Us, Hall of Fame, Contact
- **Legal Links**: Privacy Policy, Terms of Service, Contact Us
- **Copyright**: แสดงปีปัจจุบันอัตโนมัติ

### 11. Back to Top Button
- **Scroll-triggered Visibility**: แสดงเมื่อ scroll ลงมากกว่า 500px
- **Smooth Animation**: Fade in/out และ slide animation
- **Hover Effect**: Scale animation

---

## ⚙️ Technical Features

### Composables

#### 1. useFadeInAnimation
- **Intersection Observer**: ตรวจจับ elements ที่เข้ามาใน viewport
- **CSS Classes Supported**:
  - `.fade-in`
  - `.fade-in-up`
  - `.fade-in-left`
  - `.fade-in-right`
  - `.fade-in-scale`
- **Smooth Transitions**: 0.6s ease-out

#### 2. useScrollNavigation
- **Active Section Detection**: ตรวจจับ section ที่กำลังดูอยู่
- **Smooth Scroll**: Scroll ไปยัง section ที่เลือก
- **Header Offset**: คำนวณ offset ของ fixed header

### CSS Animations
- `fadeIn` - Basic fade in
- `heroFadeInSmooth` - Hero section entrance (3s)
- `sparkle` - Crown sparkle effect
- Hover scale/translate effects

### SEO & Meta Tags
- **Title Template**: `%s - Miss Wellness World`
- **Open Graph Tags**: Facebook sharing
- **Twitter Cards**: Twitter sharing
- **Keywords**: wellness, pageant, miss wellness world, women empowerment

---

## 📱 Responsive Design

### Breakpoints (Tailwind Default)
| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px | Single column, hamburger menu |
| sm | 640px+ | Small adjustments |
| md | 768px+ | 2-column grids |
| lg | 1024px+ | Desktop navigation, 3-column grids |
| xl | 1280px+ | Maximum content width |

### Mobile Optimizations
- Hamburger menu with slide-in animation
- Touch-friendly button sizes
- Reduced animation duration
- Stacked layouts

---

## 🔧 Build Configuration

### Nuxt Config Highlights
```typescript
{
  ssr: false,                    // Client-side rendering
  nitro: { preset: 'static' },   // Static site generation
  srcDir: 'app/',                // Nuxt 4 app structure
}
```

### Asset Optimization
- **Gzip Compression**: Enabled
- **Brotli Compression**: Enabled
- **Minification**: Enabled

---

## 📦 Dependencies

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| nuxt | ^4.0.1 | Framework |
| vue | ^3.5.18 | Frontend library |
| vue-router | ^4.5.1 | Routing |
| @nuxtjs/tailwindcss | ^6.14.0 | CSS framework |
| @nuxt/image | 1.10.0 | Image optimization |
| @nuxt/eslint | 1.7.1 | Code linting |

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.8.3 | Type checking |
| eslint | ^9.32.0 | Linting |
| @nuxt/devtools | ^2.6.2 | Dev tools |

---

## 📁 File Structure

```
nuxt4-demo3/
├── app/
│   ├── app.vue                    # Root component
│   ├── pages/
│   │   └── index.vue              # Home page
│   ├── components/
│   │   ├── AppHeader.vue          # Navigation
│   │   ├── AppFooter.vue          # Footer
│   │   ├── HeroSection.vue        # Hero banner
│   │   ├── About.vue              # Executive team
│   │   ├── AboutMWW.vue           # About MWW
│   │   ├── AboutMWWT.vue          # About MWWT
│   │   ├── HallOfFameGeneral.vue  # Hall of Fame intro
│   │   ├── HallOfFameMWW.vue      # MWW Coming Soon
│   │   ├── HallOfFameMWWT.vue     # MWWT 2024 Winners
│   │   ├── ContactSection.vue     # Contact form
│   │   └── BackToTop.vue          # Scroll to top
│   ├── composables/
│   │   ├── useFadeInAnimation.ts  # Scroll animations
│   │   └── useScrollNavigation.ts # Navigation helpers
│   └── assets/css/
│       └── main.css               # Global styles
├── public/assets/images/          # Static images
├── nuxt.config.ts                 # Nuxt configuration
├── tailwind.config.js             # Tailwind configuration
└── package.json                   # Dependencies
```

---

## 🎯 Key User Journeys

### 1. First-time Visitor
1. เข้าหน้าแรก → เห็น Hero section พร้อม animation
2. Scroll ลง → เห็นข้อมูล Executive Team
3. ดูวิดีโอ Miss Wellness World
4. ดู Hall of Fame และผู้ชนะปี 2024
5. สมัครประกวดผ่าน QR Code
6. ติดต่อผ่าน Contact Form

### 2. Contestant Registration
1. Scroll ไปที่ Hall of Fame MWW
2. สแกน QR Code
3. กรอกใบสมัครผ่าน Google Form

### 3. Contact/Inquiry
1. คลิก Contact ในเมนู
2. กรอกฟอร์มติดต่อ
3. ส่งข้อมูล → รอ confirmation message

---

## 🔒 Security Considerations

- **CORS**: ใช้ mode: 'cors' สำหรับ API calls
- **Form Validation**: Client-side validation ก่อนส่ง
- **Fallback Handling**: มี fallback เมื่อ API ไม่พร้อม
- **Privacy-focused Video Embedding**: ใช้ youtube-nocookie.com

---

## 🚧 Future Enhancements (Suggestions)

1. **Multi-language Support**: ภาษาไทย/English toggle
2. **Gallery Page**: หน้าแกลเลอรีภาพเพิ่มเติม
3. **News/Blog Section**: ข่าวสารและบทความ
4. **Registration System**: ระบบสมัครประกวดออนไลน์
5. **Sponsor Section**: แสดงรายชื่อผู้สนับสนุน
6. **Event Calendar**: ปฏิทินกิจกรรม
7. **Past Winners Archive**: ประวัติผู้ชนะทุกปี
8. **Social Media Integration**: Feed จาก social media

---

*Document generated: January 8, 2026*
*Version: 1.0.0*
