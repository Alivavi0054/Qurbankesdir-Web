# 🏗️ Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     QURBAN KƏSDIR LANDING PAGE                   │
│                    Bilingual Web Application                      │
└─────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                           BROWSER / CLIENT                              │
├────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                     index.html                                    │   │
│  │  ┌──────────────────────────────────────────────────────────┐   │   │
│  │  │ Navigation Bar (Language Toggle: AZ ↔ EN)               │   │   │
│  │  │ ┌────────────────────────────────────────────────────┐   │   │   │
│  │  │ │ Hero Section                                       │   │   │   │
│  │  │ │ "Qurban Kəsdir: Sadə. Şəffaf. Güvənli."          │   │   │   │
│  │  │ └────────────────────────────────────────────────────┘   │   │   │
│  │  │ ┌────────────────────────────────────────────────────┐   │   │   │
│  │  │ │ Problems Section (3-card grid)                     │   │   │   │
│  │  │ │ • Finding Reliable Butchers                        │   │   │   │
│  │  │ │ • Price Uncertainty                               │   │   │   │
│  │  │ │ • No Transparency/Proof                            │   │   │   │
│  │  │ └────────────────────────────────────────────────────┘   │   │   │
│  │  │ ┌────────────────────────────────────────────────────┐   │   │   │
│  │  │ │ Mission Section                                    │   │   │   │
│  │  │ │ 60,000+ annual participants                        │   │   │   │
│  │  │ └────────────────────────────────────────────────────┘   │   │   │
│  │  │ ┌────────────────────────────────────────────────────┐   │   │   │
│  │  │ │ Purpose Section (6 values)                         │   │   │   │
│  │  │ │ ✓ Sharia Compliance                                │   │   │   │
│  │  │ │ ✓ Veterinary Oversight                             │   │   │   │
│  │  │ │ ✓ Complete Transparency                            │   │   │   │
│  │  │ │ + 3 more values                                    │   │   │   │
│  │  │ └────────────────────────────────────────────────────┘   │   │   │
│  │  │ ┌────────────────────────────────────────────────────┐   │   │   │
│  │  │ │ How It Works (3-step process)                      │   │   │   │
│  │  │ │ 1. Select Animal  →  2. Choose Delivery  →  3. Pay │   │   │   │
│  │  │ └────────────────────────────────────────────────────┘   │   │   │
│  │  │ ┌────────────────────────────────────────────────────┐   │   │   │
│  │  │ │ Charity Section (Social Impact)                    │   │   │   │
│  │  │ │ Donate to orphanages & nursing homes              │   │   │   │
│  │  │ │ Receive 2 videos: slaughter + delivery            │   │   │   │
│  │  │ └────────────────────────────────────────────────────┘   │   │   │
│  │  │ ┌────────────────────────────────────────────────────┐   │   │   │
│  │  │ │ Download CTA Section                               │   │   │   │
│  │  │ │ [App Store] [Google Play] [WhatsApp]              │   │   │   │
│  │  │ └────────────────────────────────────────────────────┘   │   │   │
│  │  └──────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                        styles.css                                 │   │
│  │ • Teal (#008B8B) & White color scheme                           │   │
│  │ • Responsive Grid & Flexbox layouts                             │   │
│  │ • Mobile-first design (480px, 768px, 1200px)                   │   │
│  │ • Smooth transitions & animations                               │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                        app.js                                     │   │
│  │ 1. Page Load: Load content in English (default)                 │   │
│  │ 2. User Toggles Language: Detect change event                   │   │
│  │ 3. Fetch API: GET /api/content?lang=az or lang=en             │   │
│  │ 4. Update DOM: Replace all data-i18n text                      │   │
│  │ 5. Instant Display: No page reload!                            │   │
│  │ 6. Fallback: Use embedded content if API unavailable           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │ HTTP Requests
                                    │ GET /api/content?lang=az|en
                                    │ GET /api/content/{key}?lang=az|en
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      SPRING BOOT BACKEND                                │
│                        (Java 21, Port 8080)                             │
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  ContentController (@RestController)                             │   │
│  │  ┌────────────────────────────────────────────────────────────┐   │   │
│  │  │ GET /api/content?lang=az|en                              │   │   │
│  │  │ → Returns: {                                             │   │   │
│  │  │     "hero.title": "Qurban Kəsdir: ...",                │   │   │
│  │  │     "hero.subtitle": "Rəqəm dövründə...",              │   │   │
│  │  │     "mission.description": "Qurban Kəsdir digit...",   │   │   │
│  │  │     ... (50+ key-value pairs)                           │   │   │
│  │  │   }                                                      │   │   │
│  │  └────────────────────────────────────────────────────────┘   │   │
│  │                                                                  │   │
│  │  ┌────────────────────────────────────────────────────────────┐   │   │
│  │  │ GET /api/content/{key}?lang=az|en                       │   │   │
│  │  │ → Returns: { "key": "localized value" }                 │   │   │
│  │  └────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              ▲                                           │
│                              │                                           │
│                      Service Layer (Logic)                             │
│                              │                                           │
│                              ▼                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  ContentRepository (Spring Data JPA)                             │   │
│  │  ┌────────────────────────────────────────────────────────────┐   │   │
│  │  │ Extends: JpaRepository<Content, Long>                     │   │   │
│  │  │ Methods:                                                   │   │   │
│  │  │ • findAll() → List of all Content entities               │   │   │
│  │  │ • findByKey(String key) → Single Content entity          │   │   │
│  │  └────────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              ▲                                           │
│                              │                                           │
│                      Database Layer (Persistence)                      │
│                              │                                           │
│                              ▼                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  H2 In-Memory Database (jdbc:h2:mem:testdb)                     │   │
│  │  ┌────────────────────────────────────────────────────────────┐   │   │
│  │  │ TABLE: content                                             │   │   │
│  │  │ ┌──────┬──────────────────┬────────────────┬────────────┐   │   │
│  │  │ │ ID   │ KEY              │ VALUE_AZ       │ VALUE_EN   │   │   │
│  │  │ ├──────┼──────────────────┼────────────────┼────────────┤   │   │
│  │  │ │ 1    │ hero.title       │ Qurban Kəsdir: │ Qurban     │   │   │
│  │  │ │      │                  │ Sadə. Şəffaf.  │ Kəsdir:    │   │   │
│  │  │ │      │                  │ Güvənli.       │ Simple...  │   │   │
│  │  │ ├──────┼──────────────────┼────────────────┼────────────┤   │   │
│  │  │ │ 2    │ hero.subtitle    │ Rəqəm dövründə │ Qurbani in │   │   │
│  │  │ │      │                  │ Qurban təqdimi │ the...     │   │   │
│  │  │ ├──────┼──────────────────┼────────────────┼────────────┤   │   │
│  │  │ │ ...  │ ...              │ ...            │ ...        │   │   │
│  │  │ ├──────┼──────────────────┼────────────────┼────────────┤   │   │
│  │  │ │ 50+  │ footer.company   │ © 2024 Qurban  │ © 2024     │   │   │
│  │  │ │      │                  │ Kəsdir...      │ Qurban...  │   │   │
│  │  │ └──────┴──────────────────┴────────────────┴────────────┘   │   │
│  │  └────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Initialized by: src/main/resources/data.sql                      │   │
│  │  On startup: JPA creates table from Content entity               │   │
│  │             Then loads data.sql into H2                           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
USER INTERACTION:
┌──────────────┐
│ User Opens  │
│ localhost:80│
│     00      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│ Browser Downloads:           │
│ • index.html (9.9 KB)       │
│ • styles.css (11.7 KB)      │
│ • app.js (11.2 KB)          │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ app.js runs:                 │
│ const lang = 'en'            │
│ loadContent('en')            │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Fetch:                       │
│ GET /api/content?lang=en    │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Spring Boot Processes:       │
│ 1. ContentController         │
│ 2. ContentRepository.find   │
│    All()                    │
│ 3. Format response to JSON  │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Response (JSON):             │
│ {                            │
│  "hero.title": "Qurban...",  │
│  "hero.subtitle": "...",     │
│  ...                         │
│ }                            │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Browser Receives JSON:       │
│ updatePageContent() runs:    │
│ • Find all [data-i18n]      │
│   elements                  │
│ • Update .textContent with  │
│   localized value           │
│ • Page displays in English  │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ User Clicks Language Toggle: │
│ AZ ↔ EN                      │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ JavaScript Detects:          │
│ toggleCheckbox.changed =     │
│ true → lang = 'az'          │
│ loadContent('az')            │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Fetch:                       │
│ GET /api/content?lang=az    │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Response (JSON):             │
│ {                            │
│  "hero.title":               │
│  "Qurban Kəsdir: Sadə...",  │
│  "hero.subtitle":            │
│  "Rəqəm dövründə...",       │
│  ...                         │
│ }                            │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Browser Updates:             │
│ All text changes to          │
│ Azerbaijani INSTANTLY        │
│ No page reload!              │
└──────────────────────────────┘
```

---

## Component Interaction Diagram

```
FRONTEND                          BACKEND
┌──────────────────────────────┐  ┌──────────────────────────────┐
│      HTML Elements           │  │    ContentController         │
│  data-i18n="hero.title"      │  │  ──────────────────────────  │
│  <h2 data-i18n="..."         │  │  GET /api/content?lang=X    │
│  <p data-i18n="..."          │  │  GET /api/content/{key}...  │
│  ...                         │  │  POST /api/content (future)  │
└──────────────────────────────┘  └──────────────────────────────┘
          │                                 ▲
          │                                 │
          │ JavaScript Fetches              │ Returns JSON
          │ /api/content?lang=en            │
          └────────────────────────────────▶│
                                            │
                                            ▼
                                   ┌──────────────────────────────┐
                                   │  ContentRepository           │
                                   │  ──────────────────────────  │
                                   │  findAll()                   │
                                   │  findByKey(String key)       │
                                   └──────────────────────────────┘
                                            ▲
                                            │
                                            │ Query
                                            │
                                            ▼
                                   ┌──────────────────────────────┐
                                   │   H2 Database                │
                                   │   ──────────────────────────  │
                                   │   SELECT * FROM content      │
                                   │   WHERE lang = ?             │
                                   │   (or other queries)         │
                                   └──────────────────────────────┘
```

---

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                     QURBAN KƏSDIR TECH STACK                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  FRONTEND (Client-Side)                                          │
│  ├── HTML5 (Semantic markup)                                     │
│  ├── CSS3 (Grid, Flexbox, CSS Variables)                         │
│  ├── JavaScript ES6+ (Dynamic content loading)                   │
│  └── Responsive Design (Mobile-first approach)                   │
│                                                                   │
│  BACKEND (Server-Side)                                           │
│  ├── Spring Boot 3.5.14 (Web framework)                          │
│  ├── Spring Data JPA (ORM & database access)                     │
│  ├── H2 Database (In-memory database)                            │
│  ├── SpringDoc OpenAPI 2.0.2 (Swagger UI)                        │
│  └── Lombok (Annotation processing)                              │
│                                                                   │
│  BUILD & DEPLOYMENT                                              │
│  ├── Maven 3.6+ (Build tool)                                     │
│  ├── Java 21 (Runtime)                                           │
│  ├── Git (Version control)                                       │
│  └── GitHub Actions (CI/CD, optional)                            │
│                                                                   │
│  LOCALIZATION                                                    │
│  ├── UTF-8 Encoding (Special character support)                  │
│  ├── Bilingual Content (Azerbaijani & English)                   │
│  └── Dynamic Content Loading (API-driven)                        │
│                                                                   │
│  TESTING & DOCUMENTATION                                         │
│  ├── Swagger UI (API documentation)                              │
│  ├── H2 Console (Database inspection)                            │
│  └── Comprehensive markdown guides                               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture (Production Example)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION ENVIRONMENT                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           EDGE / CDN (CloudFlare, AWS CF)              │    │
│  │  Caches static files (HTML, CSS, JS)                   │    │
│  └────────────────────┬────────────────────────────────────┘    │
│                       │                                           │
│                       ▼                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │        LOAD BALANCER (NGINX, HAProxy)                  │    │
│  │  • SSL/TLS termination                                 │    │
│  │  • Route traffic to multiple app instances             │    │
│  │  • Gzip compression                                    │    │
│  └────────────────────┬────────────────────────────────────┘    │
│                       │                                           │
│           ┌───────────┼───────────┐                              │
│           ▼           ▼           ▼                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │   Spring     │ │   Spring     │ │   Spring     │              │
│  │   Boot App   │ │   Boot App   │ │   Boot App   │              │
│  │ Instance 1   │ │ Instance 2   │ │ Instance N   │              │
│  │ (Port 8080)  │ │ (Port 8080)  │ │ (Port 8080)  │              │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘              │
│         │                 │                 │                    │
│         └─────────────────┼─────────────────┘                    │
│                           ▼                                       │
│           ┌───────────────────────────────┐                      │
│           │   PostgreSQL Database Cluster │                      │
│           │   (Master-Slave Replication)  │                      │
│           │   with automated backups      │                      │
│           └───────────────────────────────┘                      │
│                           │                                       │
│                           ▼                                       │
│           ┌───────────────────────────────┐                      │
│           │   Redis Cache Layer           │                      │
│           │   (Content caching)           │                      │
│           └───────────────────────────────┘                      │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ MONITORING & LOGGING                                    │    │
│  │ • Prometheus (metrics)                                  │    │
│  │ • ELK Stack (logs)                                      │    │
│  │ • Datadog (APM)                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

**Architecture is scalable, secure, and follows Spring Boot best practices.**
