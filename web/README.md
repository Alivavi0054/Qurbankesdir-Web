# Qurban Kəsdir - Bilingual Landing Page

A professional, bilingual (Azerbaijani & English) promotional landing page for the "Qurban Kəsdir" app, built with Spring Boot and vanilla JavaScript.

## 🚀 Features

- **Bilingual Content**: Full support for Azerbaijani (AZ) and English (EN)
- **Dynamic Language Toggle**: Instant language switching with smooth transitions
- **REST API**: Spring Boot backend serving bilingual content via `/api/content?lang=az|en`
- **In-Memory Database**: H2 database pre-populated with mission, purpose, and app workflow
- **Responsive Design**: Mobile-first design with teal and white color palette
- **Swagger Documentation**: Interactive API documentation at `/swagger-ui.html`
- **Zero External Dependencies**: Vanilla JavaScript (no frameworks) for fast loading

## 🏗️ Architecture

### Backend
- **Framework**: Spring Boot 3.5.14 with Spring Data JPA
- **Database**: H2 In-Memory Database
- **API Documentation**: SpringDoc OpenAPI (Swagger 3.0)
- **Content Storage**: Content entity with bilingual key-value pairs

### Frontend
- **HTML5**: Semantic markup with i18n attributes
- **CSS3**: Responsive grid layouts with CSS variables
- **Vanilla JavaScript**: ES6+ for dynamic content loading

## 📋 Project Structure

```
web/
├── src/
│   ├── main/
│   │   ├── java/com/qurbankesdirweb/web/
│   │   │   ├── entity/Content.java           # Bilingual content entity
│   │   │   ├── repository/ContentRepository.java  # JPA repository
│   │   │   ├── controller/ContentController.java  # REST API endpoints
│   │   │   └── WebApplication.java           # Spring Boot main class
│   │   └── resources/
│   │       ├── application.properties        # Spring Boot config
│   │       ├── data.sql                      # Initial bilingual data (UTF-8)
│   │       └── static/
│   │           ├── index.html                # Landing page HTML
│   │           ├── styles.css                # Responsive styling
│   │           └── app.js                    # Language toggle & API integration
│   └── test/                                 # JUnit tests
├── pom.xml                                   # Maven configuration
├── mvnw                                      # Maven Wrapper (Linux/Mac)
└── mvnw.cmd                                  # Maven Wrapper (Windows)
```

## 🛠️ Setup & Installation

### Prerequisites
- **Java 17+** (Project uses Java 21)
- **Maven 3.6+** (or use the included Maven Wrapper)
- **Git** (for version control)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Alivavi0054/Qurbankesdir-Web.git
cd Qurbankesdir-Web/web
```

### Step 2: Build the Project
Using Maven Wrapper (recommended - no Java/Maven installation needed):

**Windows:**
```cmd
mvnw.cmd clean package
```

**Linux/Mac:**
```bash
./mvnw clean package
```

Or with system Maven:
```bash
mvn clean package
```

### Step 3: Run the Application
```bash
java -jar target/web-0.0.1-SNAPSHOT.jar
```

The application will start at: **http://localhost:8080**

## 🌐 Accessing the Application

### Landing Page
- **URL**: http://localhost:8080
- **Features**:
  - Language toggle slider (AZ ↔ EN)
  - Hero section with mission statement
  - Problem-solution flow
  - How-it-works (3-step process)
  - Social impact/charity section
  - Download buttons (App Store, Google Play, WhatsApp)

### REST API
- **Base URL**: http://localhost:8080/api/content
- **Endpoints**:

#### Get all content in a language
```bash
GET /api/content?lang=en
GET /api/content?lang=az
```

**Response (JSON):**
```json
{
  "hero.title": "Qurban Kəsdir: Simple. Transparent. Secure.",
  "hero.subtitle": "Qurbani in the Digital Age",
  "mission.title": "Our Mission",
  ...
}
```

#### Get specific content by key
```bash
GET /api/content/hero.title?lang=en
GET /api/content/mission.description?lang=az
```

**Response (JSON):**
```json
{
  "hero.title": "Qurban Kəsdir: Simple. Transparent. Secure."
}
```

### Swagger UI
- **URL**: http://localhost:8080/swagger-ui.html
- Interactive API documentation with try-it-out feature
- Auto-generated from @Operation annotations

### H2 Database Console (for development)
- **URL**: http://localhost:8080/h2-console
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (leave empty)

## 📝 Bilingual Content

### Azerbaijani Character Support
All files are saved with **UTF-8 BOM encoding** to ensure proper display of special Azerbaijani characters:
- ə (schwa)
- ş (s with cedilla)
- ç (c with cedilla)
- ı (dotless i)
- ö (o with diaeresis)
- ü (u with diaeresis)

### Content Sections
1. **Hero Section**: Tagline and mission introduction
2. **Problems**: 3 core issues in Baku
3. **Mission**: Digitizing Qurban for 60,000+ participants
4. **Purpose**: Core values (Sharia, veterinary, transparency)
5. **How It Works**: 3-step app process
6. **Charity Option**: Social impact component
7. **Download CTAs**: App Store, Google Play, WhatsApp links

## 🎨 Design System

### Colors
- **Primary Teal**: `#008B8B` (Dark Teal)
- **Secondary Teal**: `#20B2AA` (Light Sea Green)
- **White**: `#ffffff`
- **Light Gray**: `#f5f5f5`
- **Dark Gray**: `#333333`

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px
- Phone: < 480px

## 🔄 How the Language Toggle Works

1. **User clicks language slider** in navbar
2. **JavaScript detects toggle change** → calls `loadContent(newLang)`
3. **API request** to `/api/content?lang=az|en`
4. **JSON response** with all bilingual content
5. **DOM update** - all `data-i18n` attributes replaced with localized text
6. **No page reload** - smooth instant translation

### Fallback Mechanism
If the backend API is unavailable, the app automatically loads embedded fallback content (included in app.js) to ensure the landing page always works.

## 📱 Mobile Responsive

The site is fully responsive with a mobile-first approach:
- Touch-friendly navigation
- Optimized button sizing for mobile
- Responsive grid layouts
- Works on all devices from 320px to 1920px width

## 🔐 Security Considerations

- **CORS Enabled**: API accessible from any origin (suitable for public landing page)
- **No Authentication**: Landing page is public
- **HTTPS Ready**: Can be deployed behind reverse proxy with SSL
- **Input Validation**: API validates language parameter

## 📦 Dependencies

### Production
- `spring-boot-starter-web`: REST API & static file serving
- `spring-boot-starter-data-jpa`: ORM & database access
- `h2`: In-memory database (no setup needed)
- `springdoc-openapi-starter-webmvc-ui`: Swagger 3.0 UI
- `lombok`: Annotation processing

### Development/Test
- `spring-boot-starter-test`: JUnit & integration testing

## 🚀 Deployment

### Docker (Optional)
Create a `Dockerfile` in the project root:
```dockerfile
FROM openjdk:21-slim
COPY target/web-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

Build and run:
```bash
docker build -t qurbankesdir-web .
docker run -p 8080:8080 qurbankesdir-web
```

### Production Deployment
1. **Environment Variables**:
   ```
   SERVER_PORT=8080
   SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
   ```

2. **Performance Tips**:
   - Use a production database instead of H2 (add PostgreSQL dependency)
   - Enable gzip compression in reverse proxy
   - Serve static files via CDN
   - Cache API responses with appropriate headers

3. **Scaling**:
   - Add persistent database (PostgreSQL, MySQL)
   - Deploy multiple instances behind load balancer
   - Use Redis for distributed caching

## 🧪 Testing

### Manual API Testing
```bash
# Test English content
curl http://localhost:8080/api/content?lang=en

# Test Azerbaijani content
curl http://localhost:8080/api/content?lang=az

# Test specific key
curl http://localhost:8080/api/content/hero.title?lang=az
```

### Browser Testing
1. Open http://localhost:8080 in Chrome/Firefox/Safari
2. Click language toggle in navbar
3. Verify all text updates instantly
4. Check mobile responsive design (Ctrl+Shift+M in Chrome)

## 📄 License

© 2024 Qurban Kəsdir. All rights reserved.

## 👥 Contributing

For contributions or bug reports, please open an issue on GitHub.

## 📞 Support

For technical support or questions:
- **Email**: support@qurbankesdir.az
- **WhatsApp**: +994 50 XXX XX XX
- **GitHub Issues**: [Qurbankesdir-Web/issues](https://github.com/Alivavi0054/Qurbankesdir-Web/issues)

---

**Built with ❤️ for the Azerbaijani Muslim community**
