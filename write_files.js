const fs = require('fs');
const path = require('path');

const portfolioDir = path.join('..', 'Portfolio');

const contactHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact | Yahya Allouz</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header class="glass-header">
        <div class="container">
            <div class="logo">YA</div>
            <nav>
                <a href="index.html#projects">Projects</a>
                <a href="contact.html" class="active">Contact</a>
            </nav>
        </div>
    </header>

    <section class="contact-hero">
        <div class="glow-bg"></div>
        <div class="container">
            <h1>Get in Touch</h1>
            <p class="subtitle">I'm always open to new opportunities and collaborations.</p>
            
            <div class="contact-card-container">
                <a href="https://wa.me/212684680804" target="_blank" class="contact-option whatsapp-card">
                    <div class="icon-box">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                    <div class="info">
                        <h3>WhatsApp</h3>
                        <p>+212 684 680 804</p>
                        <span class="action">Chat Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>

                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yahyaallouz01@gmail.com" target="_blank" class="contact-option gmail-card">
                    <div class="icon-box">
                        <i class="fab fa-google"></i>
                    </div>
                    <div class="info">
                        <h3>Gmail</h3>
                        <p>yahyaallouz01@gmail.com</p>
                        <span class="action">Send Email <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <footer>
        <p class="copyright">&copy; 2026 Yahya Allouz</p>
    </footer>
</body>
</html>`;

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yahya Allouz | Portfolio</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header class="glass-header">
        <div class="container">
            <div class="logo">YA</div>
            <nav>
                <a href="#projects">Projects</a>
                <a href="contact.html">Contact</a>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>Yahya Allouz</h1>
            <p class="tagline">Building Digital Experiences</p>
            <div class="social-links">
                <a href="https://github.com/yahyaallouz" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
            </div>
        </div>
        <div class="hero-bg-glow"></div>
    </section>

    <section id="projects" class="projects-section">
        <div class="container">
            <h2>Featured Projects</h2>
            <div class="projects-grid">
                <!-- Project 1: CV Generator -->
                <div class="project-card">
                    <div class="card-image preview-cv">
                        <i class="fas fa-file-invoice"></i>
                    </div>
                    <div class="card-content">
                        <h3>CV Generator</h3>
                        <p class="tech-stack"><span>HTML</span> <span>CSS</span> <span>JS</span></p>
                        <p>A professional, glass-morphic CV builder with live preview and high-quality PDF export.</p>
                        <div class="card-links">
                            <a href="https://github.com/yahyaallouz/cv-generator" target="_blank" class="btn secondary"><i class="fab fa-github"></i> Code</a>
                            <a href="https://yahyaallouz.github.io/cv-generator/" target="_blank" class="btn primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                        </div>
                    </div>
                </div>

                <!-- Project 2: Hotel Management -->
                <div class="project-card">
                    <div class="card-image">
                        <img src="assets/hotel.png" alt="Hotel System">
                    </div>
                    <div class="card-content">
                        <h3>Hotel Management System</h3>
                        <p class="tech-stack"><span>Java</span> <span>Swing</span> <span>MySQL</span></p>
                        <p>A comprehensive desktop application for hotel booking, room management, and real-time notifications.</p>
                        <div class="card-links">
                            <a href="https://github.com/yahyaallouz/gestion-hoteliere" target="_blank" class="btn secondary"><i class="fab fa-github"></i> Code</a>
                            <span class="btn disabled"><i class="fas fa-desktop"></i> Desktop App</span>
                        </div>
                    </div>
                </div>

                <!-- Project 3: Gestion Etudiant -->
                <div class="project-card">
                    <div class="card-image preview-etd">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <div class="card-content">
                        <h3>Gestion Etudiant</h3>
                        <p class="tech-stack"><span>PHP</span> <span>React</span> <span>MySQL</span></p>
                        <p>Full-stack student management system. Backend API handling authentication and student records.</p>
                        <div class="card-links">
                            <span class="btn disabled"><i class="fas fa-server"></i> Local Project</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p class="copyright">&copy; 2026 Yahya Allouz</p>
    </footer>
</body>
</html>`;

const styleCss = \`:root {
    --bg-dark: #0f172a;
    --text-light: #f8fafc;
    --text-muted: #94a3b8;
    --primary: #3b82f6;
    --accent: #8b5cf6;
    --glass: rgba(255, 255, 255, 0.05);
    --border: rgba(255, 255, 255, 0.1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background-color: var(--bg-dark);
    color: var(--text-light);
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
}

/* Header */
.glass-header {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 20px 0;
    backdrop-filter: blur(10px);
    background: rgba(15, 23, 42, 0.8);
    border-bottom: 1px solid var(--border);
    z-index: 100;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.glass-header .container { display: flex; justify-content: space-between; align-items: center; }

.logo { font-weight: 800; font-size: 1.5rem; background: linear-gradient(to right, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
nav a { color: var(--text-muted); text-decoration: none; margin-left: 20px; transition: 0.3s; }
nav a:hover, nav a.active { color: var(--text-light); }

/* Hero */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
}

.hero h1 { font-size: 4rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -2px; }
.tagline { font-size: 1.5rem; color: var(--text-muted); margin-bottom: 30px; }

.social-links a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--glass);
    padding: 10px 20px;
    border-radius: 50px;
    color: var(--text-light);
    text-decoration: none;
    margin: 0 10px;
    border: 1px solid var(--border);
    transition: 0.3s;
}

.social-links a:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-3px); }

/* Projects */
.projects-section { padding: 100px 0; }
.projects-section h2 { font-size: 2.5rem; margin-bottom: 50px; text-align: center; }

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.project-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
}

.project-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); border-color: var(--primary); }

.card-image {
    height: 200px;
    background: #1e293b;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.card-image img { width: 100%; height: 100%; object-fit: cover; }
.card-image i { font-size: 4rem; color: var(--text-muted); opacity: 0.5; }

.preview-cv { background: linear-gradient(135deg, #1e293b, #3b82f6); }
.preview-etd { background: linear-gradient(135deg, #1e293b, #8b5cf6); }

.card-content { 
    padding: 25px; 
    flex: 1;
    display: flex; 
    flex-direction: column; 
}

.card-content h3 { font-size: 1.5rem; margin-bottom: 10px; }
.tech-stack { margin-bottom: 15px; }
.tech-stack span {
    font-size: 0.8rem;
    background: rgba(59, 130, 246, 0.2);
    color: var(--primary);
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 5px;
}

.card-links { 
    margin-top: auto; 
    display: flex; 
    gap: 10px; 
    align-items: center;
}

.btn {
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    transition: 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

.btn.primary { background: var(--primary); color: white; }
.btn.primary:hover { background: var(--accent); }

.btn.secondary { 
    background: transparent; 
    border: 1px solid rgba(255, 255, 255, 0.6); 
    color: var(--text-light); 
}
.btn.secondary:hover { 
    border-color: var(--text-light); 
    background: rgba(255, 255, 255, 0.05);
}

.btn.disabled { color: var(--text-muted); cursor: default; }

/* Contact Page Styles */
.contact-hero {
    height: 90vh; /* Almost full height */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.contact-hero .container { text-align: center; z-index: 10; width: 100%; }
.contact-hero h1 { font-size: 3.5rem; margin-bottom: 15px; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.contact-hero .subtitle { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 50px; }

.contact-card-container {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
}

.contact-option {
    background: var(--glass);
    border: 1px solid var(--border);
    padding: 30px;
    border-radius: 20px;
    width: 300px;
    text-decoration: none;
    color: var(--text-light);
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.contact-option:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
}

.contact-option .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    transition: 0.3s;
}

.whatsapp-card:hover .icon-box { background: #25D366; color: white; box-shadow: 0 0 20px rgba(37, 211, 102, 0.4); }
.whatsapp-card .icon-box { background: rgba(37, 211, 102, 0.1); color: #25D366; border: 1px solid rgba(37, 211, 102, 0.2); }

.gmail-card:hover .icon-box { background: #EA4335; color: white; box-shadow: 0 0 20px rgba(234, 67, 53, 0.4); }
.gmail-card .icon-box { background: rgba(234, 67, 53, 0.1); color: #EA4335; border: 1px solid rgba(234, 67, 53, 0.2); }

.contact-option h3 { font-size: 1.4rem; margin-bottom: 5px; }
.contact-option p { color: var(--text-muted); margin-bottom: 20px; font-size: 0.9rem; }

.contact-option .action {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 5px;
    opacity: 0.8;
    transition: 0.3s;
}

.contact-option:hover .action { opacity: 1; gap: 8px; }

/* Background Glow */
.glow-bg {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    pointer-events: none;
}

/* Footer */
footer { text-align: center; padding: 50px 0; border-top: 1px solid var(--border); color: var(--text-muted); }
\`;

console.log('Writing files to:', portfolioDir);

try {
    if (!fs.existsSync(portfolioDir)){
        fs.mkdirSync(portfolioDir, { recursive: true });
    }
    fs.writeFileSync(path.join(portfolioDir, 'contact.html'), contactHtml);
    fs.writeFileSync(path.join(portfolioDir, 'index.html'), indexHtml);
    fs.writeFileSync(path.join(portfolioDir, 'style.css'), styleCss);
    console.log('Files written successfully!');
} catch (err) {
    console.error('Error writing files:', err);
}
