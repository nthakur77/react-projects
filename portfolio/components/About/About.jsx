import React from 'react';
import './About.css';

function About() {
  // const {userName} = useParams();
  return (
    <section className="about-section">
      <div className="about-container">
        
        <div className="about-header">
          <h2>About Me</h2>
          <div className="underline"></div>
        </div>

        <div className="about-content">
          <div className="about-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Workspace" 
              className="about-image"
            />
          </div>

          <div className="about-text">
            <h3>I'm Nishchal, a passionate developer based in Bhopal.</h3>
            <p>
              I am currently pursuing my undergraduate degree in Electronics and Communication Engineering at UIT-RGPV. While my academic background gives me a strong foundation in hardware and core electronics, my true passion lies in software development and problem-solving.
            </p>
            <p>
              I spend most of my time writing C++, grinding Data Structures and Algorithms on LeetCode, and building full-stack applications. I previously interned as a Web Developer at Codec Technologies, where I sharpened my practical development skills.
            </p>
            <p>
              When I'm not configuring my Linux WSL environment or debugging a custom C++ REST API, you can find me doing home workouts, fixing laptop hardware, or exploring new grooming and lifestyle trends.
            </p>
          </div>
        </div>

        <div className="skills-section">
          <h3>What I Know</h3>
          <div className="skills-grid">
            <div className="skill-card">
              <h4>Languages & Core</h4>
              <ul>
                <li>C++ & Object-Oriented Programming</li>
                <li>Data Structures & Algorithms</li>
                <li>JavaScript</li>
                <li>SQL (MySQL, SQLite)</li>
              </ul>
            </div>
            
            <div className="skill-card">
              <h4>Web Development</h4>
              <ul>
                <li>React.js</li>
                <li>HTML5 & CSS3</li>
                <li>REST APIs</li>
                <li>The Odin Project Curriculum</li>
              </ul>
            </div>

            <div className="skill-card">
              <h4>CS Fundamentals & Tools</h4>
              <ul>
                <li>Operating Systems & DBMS</li>
                <li>Git & GitHub</li>
                <li>Linux (WSL 2)</li>
                <li>VS Code Environment</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;