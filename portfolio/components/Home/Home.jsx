import React from 'react';
import './Home.css';
import ProfileImage from '../Header/Nishu.jpeg'

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Hi, I'm Nishchal Thakur</h1>
          <h2 className="tagline">Software Developer & Engineering Student</h2>
          
          <p className="bio">
            I'm an Electronics and Communication Engineering undergraduate at UIT-RGPV, Bhopal. 
            I specialize in C++, Data Structures and Algorithms, and full-stack web development. 
            Whether it's optimizing LeetCode solutions, building REST APIs, or designing digital circuit simulators, 
            I love turning complex problems into clean, efficient code.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">View Projects</button>
            <button className="btn-secondary">Contact Me</button>
          </div>

          <div className="tech-stack">
            <span>C++</span>
            <span>Data Structures & Algorithms</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>SQL</span>
          </div>
        </div>

        <div className="hero-image-container">
          <img 
            src={ProfileImage} 
            alt="Profile Pic" 
            className="hero-image"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;