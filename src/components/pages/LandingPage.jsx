import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LandingPage.css'; // Fixed: removed 'services/' from path

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-logo">ExpenseTracker</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#testimonials">Testimonials</a>
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-register" onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Take Control of Your Financial Future</h1>
          <p className="hero-subtitle">
            The simplest way to track daily expenses, manage budgets, 
            and achieve your savings goals. Get started for free.
          </p>
          <button className="btn-primary" onClick={() => navigate('/register')}>
            Start Tracking Free →
          </button>
          <p className="hero-stats">✨ Join 10,000+ happy users</p>
        </div>
        <div className="hero-image">
          <div className="dashboard-preview">
            📊 Expense Dashboard Preview
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Why Choose ExpenseTracker?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Effortless Tracking</h3>
            <p>Log expenses in seconds, anywhere, anytime. Add transactions on the go.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Smart Budgets</h3>
            <p>Set monthly budgets and get alerts before you overspend.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Insightful Reports</h3>
            <p>See where your money goes with clear charts and summaries.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your financial data is encrypted and safe with us.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <h2>Get Started in 3 Simple Steps</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up for free in under 30 seconds</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add Expenses</h3>
            <p>Log your daily expenses with our simple form</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track & Save</h3>
            <p>View insights and start saving money</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"This app completely changed how I view my spending. Finally, a tool that's both powerful and easy to use!"</p>
            <div className="testimonial-author">— Sarah K.</div>
          </div>
          <div className="testimonial-card">
            <p>"I've saved 20% more each month since using ExpenseTracker. The budget alerts are a game-changer!"</p>
            <div className="testimonial-author">— Michael R.</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Take Control of Your Finances?</h2>
        <p>Join thousands of users who are already saving money with ExpenseTracker</p>
        <button className="btn-primary btn-large" onClick={() => navigate('/register')}>
          Get Started Now — It's Free
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ExpenseTracker</h4>
            <p>Smart expense tracking for everyone</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Testimonials</a>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 ExpenseTracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;