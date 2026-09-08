/* =====================================================================
   MODEL: data and state. Never touches the DOM.
   Edit your content here: featured projects, skills, repos.
   ===================================================================== */

const Model = {

  githubUser: "Omicron69",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "mez.rahman777@gmail.com",

  state: {
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown first) ----
  featured: [
    {
      title: "BSL Fingerspelling: “Hands”",
      tag: "Live App", color: "limegreen", live: true,
      url: "https://bslgame.co.uk/", cta: "Play at bslgame.co.uk →",
      img: "assets/projects/bsl.png",
      desc: "A game that teaches the BSL alphabet using nothing but your webcam. Built with React, Node.js, TensorFlow.js and MediaPipe hand tracking. My final-year project, scored A+ at 87/100.",
    },
    {
      title: "Steam Review Sentiment with Transformers",
      tag: "NLP", color: "crimson",
      url: "https://github.com/Omicron69/Granular-Sentiment-Pipeline-Class-Weighted-Transformers-for-Steam-Reviews",
      cta: "View on GitHub →",
      img: "assets/projects/steam.png",
      desc: "Fine-tuned DistilBERT, BERTweet and RoBERTa to sort Steam reviews into a custom six-class sentiment taxonomy, with class weighting for the imbalance. RoBERTa won at 88.2% F1.",
    },
    {
      title: "DownloadGuard",
      tag: "Security", color: "gold",
      url: "https://github.com/Omicron69/DownloadGuard", cta: "View on GitHub →",
      img: "assets/projects/downloadguard.png",
      desc: "A Chrome extension that protects everyday users in real time, watching for malicious downloads, phishing emails, deceptive links and QR-code scams, all in one Manifest V3 extension.",
    },
    {
      title: "Medical Image Classification",
      tag: "Deep Learning", color: "royalblue",
      url: "https://github.com/Omicron69/organsmnist-cnn-classification", cta: "View on GitHub →",
      img: "assets/projects/medcnn.png",
      desc: "Classifying organs in CT scans, from a baseline dense net to five custom CNNs to fine-tuned ResNet50 and EfficientNetB0, reaching 79% test accuracy on 25,000+ OrganSMNIST images.",
    },
  ],

  // Repos already featured get hidden from the GitHub feed
  featuredRepoNames: [
    "BritishFingerSpellingAI",
    "Granular-Sentiment-Pipeline-Class-Weighted-Transformers-for-Steam-Reviews",
    "DownloadGuard",
    "organsmnist-cnn-classification",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "crime-analysis-montgomery-county", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/crime-analysis-montgomery-county",
      description: "Ten years of Montgomery County crime data, from a messy 90 MB government CSV to ten answered analytical questions, geospatial hotspot maps and a district safety ranking.",
    },
    {
      name: "asthma-worsening-prediction", language: "MATLAB", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/asthma-worsening-prediction",
      description: "Predicting worsening asthma symptoms from NHS primary-care data with SQL and MATLAB, following CRISP-DM. Compares four models on a heavily imbalanced clinical dataset.",
    },
    {
      name: "Chronic-Kideney-Disease-Analyzer", language: "PHP", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/Chronic-Kideney-Disease-Analyzer",
      description: "A healthcare tracking web app. I led the front-end and requirements analysis in a multidisciplinary team; our solution improved patient diagnostics by 25%.",
    },
    {
      name: "MSc-Washington-Crime-Analysis-with-Pandas", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/MSc-Washington-Crime-Analysis-with-Pandas",
      description: "Crime trend analysis of Washington D.C. public data. Reproducible Pandas notebooks with visual summaries written for people who don't code.",
    },
  ],

  projectImages: {},

  langColors: {
    JavaScript: "gold", TypeScript: "royalblue", Python: "steelblue",
    PHP: "slateblue", CSS: "rebeccapurple", HTML: "orangered",
    "Jupyter Notebook": "chocolate", MATLAB: "sienna", Java: "peru", C: "gray", "C++": "palevioletred",
  },

  // ---- Skills (plain grouped lists, no levels) ----
  skills: [
    { group: "AI · ML · Data Science", items: [
      "Python", "pandas", "NumPy", "TensorFlow / Keras", "PyTorch",
      "scikit-learn", "XGBoost", "CNNs & Transfer Learning",
      "NLP & Transformers", "Computer Vision", "MediaPipe",
    ]},
    { group: "Web & Full-Stack", items: [
      "JavaScript", "TypeScript", "React", "React Native", "Next.js",
      "Node.js", "REST APIs", "TensorFlow.js", "PHP", "SQL", "PostgreSQL",
      "Figma", "Adobe XD",
    ]},
    { group: "Cloud & Engineering", items: [
      "Git & GitHub", "AWS", "Azure", "GCP", "Docker", "Firebase",
      "Agile", "PRINCE2 Agile", "Tableau", "Power BI", "Bash", "PowerShell",
    ]},
    { group: "Spoken Languages", items: [
      "English", "Bengali", "Hindi", "Urdu", "Japanese (JLPT N4)", "Mandarin (basic)",
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
