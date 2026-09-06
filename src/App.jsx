import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

const projects = [
  {
    number: "01",
    type: "FRONTEND / API",
    title: "Weather App",
    description:
      "A responsive weather application built with HTML, CSS and JavaScript that fetches live weather data through an API.",
    tech: ["HTML5", "CSS3", "JavaScript", "Weather API"],
    live: "#",
    github: "#",
  },
  {
    number: "02",
    type: "REACT / AI",
    title: "AI Portfolio",
    description:
      "An interactive developer portfolio designed around Generative AI, modern frontend development and an AI-powered portfolio assistant.",
    tech: ["React", "JavaScript", "CSS", "GenAI"],
    live: "#",
    github: "#",
  },
  {
    number: "03",
    type: "FULL STACK",
    title: "Coming Soon",
    description:
      "A new full-stack project is currently in development. Details and live demo will be added soon.",
    tech: ["MERN", "Node.js", "MongoDB"],
    live: "#",
    github: "#",
  },
];

const codingProfiles = [
  {
    icon: "GH",
    name: "GitHub",
    description: "Projects, repositories and open-source work",
    link: "https://github.com/prachi3761",
  },
  {
    icon: "LC",
    name: "LeetCode",
    description: "Data structures, algorithms and problem solving",
    link: "https://leetcode.com/u/Prachi3761/",
  },
  {
    icon: "NC",
    name: "NeetCode",
    description: "DSA roadmap, coding patterns and interview preparation",
    link: "https://neetcode.io/user/AlphaWhis779",
  },
  {
    icon: "CS",
    name: "CSES",
    description:
      "Competitive programming problem set and algorithm practice",
    link: "https://cses.fi/user/399670",
  },
  {
    icon: "CC",
    name: "CodeChef",
    description: "Competitive programming and coding practice",
    link: "https://www.codechef.com/users/kiki3764",
  },
  {
    icon: "HR",
    name: "HackerRank",
    description: "Programming challenges and technical skills",
    link: "#",
  },
];

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-star">✦</span>
        PRACHI<span className="logo-dot">.DEV</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#about">About</a>
        <a href="/#skills">Skills</a>
        <Link to="/projects">Projects</Link>
        <Link to="/coding-profiles">Coding Profiles</Link>
      </div>

      <div className="nav-actions">
        <button className="icon-btn">☼</button>

        <a href="mailto:yourmail@example.com" className="contact-btn">
          Let's Talk <span>↗</span>
        </a>
      </div>
    </nav>
  );
}

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm Prachi's AI assistant. Ask me anything about her skills, projects, coding journey or portfolio.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messageText = input) => {
    const message = messageText.trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "AI request failed");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Sorry, I couldn't connect to the AI right now. Please make sure the backend server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="ai-section" id="ai">
      <div className="ai-glow"></div>

      <div className="ai-card">
        <div className="ai-header">
          <div className="ai-brand">
            <div className="ai-avatar">✦</div>

            <div>
              <h2>Ask My Portfolio</h2>

              <p>
                <span className="online"></span>
                AI Assistant · Online
              </p>
            </div>
          </div>

          <button className="more-btn">•••</button>
        </div>

        <div className="chat-area">
          {messages.map((message, index) => (
            <div key={index}>
              {message.role === "user" ? (
                <div className="user-message">{message.text}</div>
              ) : (
                <div className="bot-message-row">
                  <div className="small-avatar">✦</div>

                  <div className="bot-message response">
                    {index === 0 && (
                      <span className="message-label">AI ASSISTANT</span>
                    )}

                    <p>{message.text}</p>

                    {index === 0 && (
                      <Link to="/projects" className="view-projects">
                        View projects →
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="bot-message-row">
              <div className="small-avatar">✦</div>

              <div className="bot-message response">
                <p className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="suggestions">
          <button
            onClick={() => sendMessage("What are Prachi's strongest skills?")}
          >
            What are her strongest skills?
          </button>

          <button
            onClick={() => sendMessage("Tell me about Prachi's Weather App.")}
          >
            Tell me about her Weather App
          </button>

          <button
            onClick={() =>
              sendMessage("Is Prachi suitable for a frontend developer role?")
            }
          >
            Is she suitable for a frontend role?
          </button>
        </div>

        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask anything about Prachi..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button type="submit" disabled={loading || !input.trim()}>
            ↑
          </button>
        </form>

        <div className="powered">
          POWERED BY <strong>GENERATIVE AI</strong>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <main className="hero" id="home">
        <section className="hero-content">
          <div className="availability">
            <span className="pulse"></span>
            Available for opportunities
          </div>

          <p className="hero-intro">HELLO, I'M PRACHI</p>

          <h1>
            Building digital
            <br />
            <span className="gradient-text">experiences</span>
            <br />
            that <em>matter.</em>
          </h1>

          <p className="hero-description">
            Full Stack Developer focused on building modern, scalable and
            intelligent web applications using <strong>MERN Stack</strong> and{" "}
            <strong>Generative AI.</strong>
          </p>

          <div className="hero-buttons">
            <Link to="/projects" className="primary-btn">
              Explore My Work <span>↗</span>
            </Link>

            <a href="#ai" className="secondary-btn">
              <span className="sparkle">✦</span>
              Talk to My AI
            </a>
          </div>

          <div className="tech-wrapper">
            <span className="tech-label">CURRENTLY WORKING WITH</span>

            <div className="tech-stack">
              <span>HTML5</span>
              <span>CSS3</span>
              <span>JavaScript</span>
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
              <span>GenAI</span>
            </div>
          </div>
        </section>

        <AIChat />
      </main>

      <section className="about-section" id="about">
        <div className="section-heading">
          <span>01 / ABOUT</span>

          <h2>
            Turning ideas into
            <br />
            <strong>digital experiences.</strong>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a developer who enjoys turning ideas into useful, beautiful
              and interactive digital experiences.
            </p>

            <p>
              My focus is on modern web development, clean user interfaces and
              intelligent applications powered by Generative AI.
            </p>

            <div className="about-highlight">
              <span>✦</span>

              <p>
                Exploring the intersection of{" "}
                <strong>Web Development × AI.</strong>
              </p>
            </div>
          </div>

          <div className="about-cards">
            <div className="info-card">
              <span className="card-number">01</span>
              <h3>Creative</h3>
              <p>
                Designing interfaces that are simple, modern and memorable.
              </p>
            </div>

            <div className="info-card">
              <span className="card-number">02</span>
              <h3>Technical</h3>
              <p>
                Building scalable applications using modern technologies.
              </p>
            </div>

            <div className="info-card">
              <span className="card-number">03</span>
              <h3>AI Driven</h3>
              <p>
                Exploring Generative AI to create smarter user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="section-heading">
          <span>02 / SKILLS</span>

          <h2>
            Tools I use to
            <br />
            <strong>build things.</strong>
          </h2>
        </div>

        <div className="skills-grid">
          <div className="skill-category">
            <div className="skill-top">
              <span>01</span>
              <span>FRONTEND</span>
            </div>

            <h3>Frontend Development</h3>
            <p>Creating responsive and interactive user interfaces.</p>

            <div className="skill-tags">
              <span>HTML5</span>
              <span>CSS3</span>
              <span>JavaScript</span>
              <span>React</span>
            </div>
          </div>

          <div className="skill-category">
            <div className="skill-top">
              <span>02</span>
              <span>BACKEND</span>
            </div>

            <h3>Backend Development</h3>
            <p>Building APIs and server-side applications with JavaScript.</p>

            <div className="skill-tags">
              <span>Node.js</span>
              <span>Express.js</span>
              <span>REST API</span>
            </div>
          </div>

          <div className="skill-category">
            <div className="skill-top">
              <span>03</span>
              <span>DATABASE</span>
            </div>

            <h3>Database</h3>
            <p>Working with databases to store and manage application data.</p>

            <div className="skill-tags">
              <span>MongoDB</span>
              <span>Mongoose</span>
            </div>
          </div>

          <div className="skill-category ai-skill">
            <div className="skill-top">
              <span>04</span>
              <span>GENERATIVE AI</span>
            </div>

            <h3>Generative AI</h3>
            <p>
              Building intelligent applications using LLMs and AI-powered
              workflows.
            </p>

            <div className="skill-tags">
              <span>LLMs</span>
              <span>RAG</span>
              <span>Prompt Engineering</span>
              <span>AI APIs</span>
            </div>
          </div>
        </div>
      </section>

      <div className="home-cta">
        <span>READY TO EXPLORE?</span>

        <h2>
          See what I've <strong>built.</strong>
        </h2>

        <Link to="/projects" className="primary-btn">
          View All Projects <span>↗</span>
        </Link>
      </div>

      <div className="hero-stats">
        <div>
          <strong>01</strong>
          <span>AI Powered Portfolio</span>
        </div>

        <div>
          <strong>02</strong>
          <span>MERN Stack</span>
        </div>

        <div>
          <strong>03</strong>
          <span>Creative Development</span>
        </div>
      </div>
    </>
  );
}

function Projects() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span>03 / SELECTED WORK</span>

        <h1>
          Projects that <br />
          <strong>solve problems.</strong>
        </h1>

        <p>
          A collection of projects built while exploring modern web
          development, APIs, React and Generative AI.
        </p>
      </section>

      <section className="projects-grid">
        {projects.map((project) => (
          <article
            className={`project-card ${
              project.number === "01" ? "featured-project" : ""
            }`}
            key={project.number}
          >
            <div className="project-top">
              <span>{project.number}</span>
              <span>{project.type}</span>
            </div>

            <div className="project-visual">
              <div className="visual-window">
                <div className="window-bar">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="visual-content">
                  <div className="visual-line long"></div>
                  <div className="visual-line"></div>

                  <div className="visual-boxes">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>

              <span className="visual-number">{project.number}</span>
            </div>

            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <div className="project-tags">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="project-actions">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="project-link primary-link"
              >
                Live Demo ↗
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                GitHub ↗
              </a>

              <button className="ai-project-btn">
                ✦ Explain with AI
              </button>
            </div>
          </article>
        ))}
      </section>

      <div className="back-home">
        <Link to="/">← Back to Home</Link>
      </div>
    </main>
  );
}

function CodingProfiles() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span>04 / CODING PROFILES</span>

        <h1>
          Where I <br />
          <strong>code & learn.</strong>
        </h1>

        <p>
          Explore my coding journey, repositories, problem-solving practice
          and technical work across different platforms.
        </p>
      </section>

      <section className="profiles-grid">
        {codingProfiles.map((profile) => (
          <a
            href={profile.link}
            target="_blank"
            rel="noreferrer"
            className="profile-card"
            key={profile.name}
          >
            <div className="profile-icon">{profile.icon}</div>

            <div className="profile-content">
              <span>CODING PLATFORM</span>

              <h2>{profile.name}</h2>

              <p>{profile.description}</p>
            </div>

            <div className="profile-arrow">↗</div>
          </a>
        ))}
      </section>

      <div className="profile-note">
        <span>✦</span>

        <p>
          More profiles and achievements will be added as the coding journey
          grows.
        </p>
      </div>

      <div className="back-home">
        <Link to="/">← Back to Home</Link>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="portfolio">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/coding-profiles" element={<CodingProfiles />} />
        </Routes>

        <div className="background-number">01</div>
      </div>
    </BrowserRouter>
  );
}

export default App;