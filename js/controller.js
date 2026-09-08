/* =====================================================================
   CONTROLLER: wires the page together: lazy section loads on scroll,
   contact form, mobile nav, footer year.
   ===================================================================== */

const Controller = {

  init() {
    this.setYear();
    this.bindMobileNav();
    this.bindContactForm();
    this.observeSections();
  },

  setYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  },

  /* ---------- Lazy-load work + skills when they scroll into view ---------- */
  observeSections() {
    const work = document.getElementById("work");
    const skills = document.getElementById("skills");

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target === work) this.loadProjects();
        if (entry.target === skills) this.loadSkills();
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "200px" });

    if (work) io.observe(work);
    if (skills) io.observe(skills);
  },

  async loadProjects() {
    View.renderFeatured(Model.featured);
    if (Model.state.reposLoaded) return;
    const { repos, live } = await Model.fetchRepos();
    const status = live
      ? `${repos.length} repositories · live from GitHub`
      : "Showing pinned work · GitHub API unavailable right now";
    View.renderRepos(repos, status, Model);
    Model.state.reposLoaded = true;
  },

  loadSkills() {
    if (!Model.state.skillsBuilt) {
      View.renderSkills(Model.skills);
      Model.state.skillsBuilt = true;
    }
  },

  /* ---------- Mobile nav toggle ---------- */
  bindMobileNav() {
    const bar = document.getElementById("topbar");
    const btn = document.getElementById("nav-toggle");
    if (!bar || !btn) return;
    btn.addEventListener("click", () => {
      const open = bar.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    bar.querySelectorAll("#nav a").forEach(a =>
      a.addEventListener("click", () => {
        bar.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }));
  },

  /* ---------- Contact form (formsubmit.co relay, mailto fallback) ---------- */
  bindContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const btn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (data._honey) return;                       // honeypot caught a bot
      if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
        status.textContent = "Fill in all three fields first.";
        return;
      }
      btn.disabled = true;
      status.textContent = "Sending…";
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${Model.contactEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _subject: `Portfolio message from ${data.name}`,
          }),
        });
        if (!res.ok) throw new Error(res.status);
        status.textContent = "Sent. I'll get back to you soon.";
        form.reset();
      } catch {
        status.textContent = "Couldn't reach the relay, opening your email app instead...";
        const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\nReply to: ${data.email}`);
        location.href = `mailto:${Model.contactEmail}?subject=${subject}&body=${body}`;
      } finally {
        btn.disabled = false;
      }
    });
  },
};

Controller.init();
