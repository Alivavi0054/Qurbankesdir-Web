# Quick Start Guide - Qurban Kəsdir Web App

## ⚡ 5-Minute Setup

### Windows Users

1. **Open Command Prompt or PowerShell**

2. **Navigate to the project:**
   ```cmd
   cd path\to\Qurbankesdir-Web\web
   ```

3. **Build the application:**
   ```cmd
   mvnw.cmd clean package
   ```

4. **Run the application:**
   ```cmd
   java -jar target/web-0.0.1-SNAPSHOT.jar
   ```

5. **Open your browser:**
   ```
   http://localhost:8080
   ```

### macOS / Linux Users

1. **Open Terminal**

2. **Navigate to the project:**
   ```bash
   cd path/to/Qurbankesdir-Web/web
   ```

3. **Build the application:**
   ```bash
   ./mvnw clean package
   ```

4. **Run the application:**
   ```bash
   java -jar target/web-0.0.1-SNAPSHOT.jar
   ```

5. **Open your browser:**
   ```
   http://localhost:8080
   ```

---

## ✅ Verify Everything Works

Once the app is running:

1. **Landing Page**: Visit http://localhost:8080
   - ✓ Should see the hero section with "Qurban Kəsdir: Sadə. Şəffaf. Güvənli."
   - ✓ Language toggle slider in top-right of navbar
   - ✓ Click toggle to see instant language switching

2. **API Test**: Visit http://localhost:8080/api/content?lang=en
   - ✓ Should see JSON with all English content
   - ✓ Change `lang=en` to `lang=az` for Azerbaijani

3. **Swagger UI**: Visit http://localhost:8080/swagger-ui.html
   - ✓ Should see interactive API documentation
   - ✓ Try "GET /api/content" endpoint

---

## 🎯 Key Features to Test

### 1. Language Toggle
- Click the **AZ/EN** toggle in the navbar
- All text should instantly update without page reload
- No "flickering" or delay

### 2. Responsive Design
- Resize your browser window to mobile size
- Elements should stack vertically
- Navigation should be mobile-friendly
- Try on actual mobile device

### 3. Azerbaijani Characters
- Check that special characters display correctly:
  - ə (schwa) - "Kəsdir"
  - ş (s with cedilla) - "Şəffaf"
  - ç (c with cedilla)
  - ı (dotless i)
  - ö (o diaeresis)
  - ü (u diaeresis)

### 4. API Integration
- Open browser DevTools (F12)
- Go to Console
- Run this test:
  ```javascript
  fetch('/api/content?lang=az')
    .then(r => r.json())
    .then(data => console.log(data))
  ```
- Should see all Azerbaijani content in console

---

## 🔧 Troubleshooting

### Build Fails with "Java not found"
**Solution**: Install Java 17+
- Download from: https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html
- Or use OpenJDK: https://jdk.java.net/

### Port 8080 Already in Use
**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```
Then access at `http://localhost:8081`

### Page shows English but "AZ" toggle is checked
**Solution**: The fallback content is embedded in `app.js`. This is normal. The API content will load after a moment.

### Azerbaijani characters show as ??? symbols
**Solution**: Ensure your browser/IDE uses UTF-8 encoding
- In Chrome DevTools, check: Right-click → Inspect → Console → looks correct?
- Verify `.gitattributes` is present in `web/` directory

### API returns 404 error
**Solution**: Make sure Spring Boot app is running
- Check console output for errors
- Try: `curl http://localhost:8080/api/content?lang=en`
- If that fails, app isn't running

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `pom.xml` | Maven dependencies & build config |
| `src/main/resources/application.properties` | Spring Boot configuration |
| `src/main/resources/data.sql` | Bilingual content (UTF-8) |
| `src/main/resources/static/index.html` | Landing page structure |
| `src/main/resources/static/styles.css` | Responsive design styling |
| `src/main/resources/static/app.js` | Language toggle & API integration |
| `src/main/java/.../Content.java` | Database entity |
| `src/main/java/.../ContentRepository.java` | Database queries |
| `src/main/java/.../ContentController.java` | REST API endpoints |

---

## 🚀 Next Steps (Deployment)

### Local Network Access
To access from other devices on your network:

1. Find your computer's IP address:
   - **Windows**: Run `ipconfig` in Command Prompt
   - **Mac/Linux**: Run `ifconfig` in Terminal

2. Access from other device:
   ```
   http://YOUR_IP:8080
   ```

### Cloud Deployment
- **Heroku**: `git push heroku main` (after setup)
- **AWS**: Package as Docker container
- **Azure**: Deploy Spring Boot app directly
- **DigitalOcean**: Upload JAR and run with systemd

### Production Checklist
- [ ] Switch from H2 to PostgreSQL/MySQL
- [ ] Enable HTTPS/SSL
- [ ] Set up CDN for static files
- [ ] Configure database backups
- [ ] Monitor application logs
- [ ] Set up CI/CD pipeline

---

## 📞 Need Help?

1. **Check Logs**: Look at console output for error messages
2. **Review README.md**: Comprehensive documentation
3. **Browser DevTools**: Check Console (F12) for JavaScript errors
4. **GitHub Issues**: Report bugs at https://github.com/Alivavi0054/Qurbankesdir-Web/issues

---

## 💡 Pro Tips

- **Hot Reload (Dev Mode)**: Add `spring-boot-devtools` to pom.xml for auto-restart on code changes
- **Database Inspection**: Visit http://localhost:8080/h2-console to view database content
- **API Testing**: Use Postman or `curl` to test API endpoints
- **Mobile Testing**: Use Chrome DevTools mobile emulation (F12 → Toggle device toolbar)

---

**Happy building! 🎉**
