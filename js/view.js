/* =====================================================================
   VIEW: everything that draws to the screen. No app logic here.
   ===================================================================== */

const View = {

  els: {
    featGrid:   document.getElementById("feat-grid"),
    repoGrid:   document.getElementById("repo-grid"),
    repoStatus: document.getElementById("repo-status"),
    skillsBody: document.getElementById("skills-body"),
  },

  // Card thumbnail, removes itself if the image is missing
  cardThumb(src) {
    return `<div class="thumb"><img src="${src}" alt="" loading="lazy"
      onerror="this.closest('.thumb').remove()"></div>`;
  },

  /* ---------- Featured project cards ---------- */
  renderFeatured(list) {
    if (this.els.featGrid.childElementCount) return;
    list.forEach(f => {
      const a = document.createElement("a");
      a.className = "card";
      a.href = f.url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = `
        ${this.cardThumb(f.img)}
        <div class="card-body">
          <span class="tag" style="--lc:${f.color}">${f.tag}</span>
          <h3>${f.live ? '<span class="live-dot"></span>' : ""}${f.title}</h3>
          <p>${f.desc}</p>
          <div class="go">
            <span>${f.live ? "Live now" : "Highlight"}</span>
            <span class="cta">${f.cta}</span>
          </div>
        </div>`;
      this.els.featGrid.appendChild(a);
    });
  },

  /* ---------- GitHub repo cards ---------- */
  renderRepos(repos, statusText, model) {
    this.els.repoStatus.textContent = statusText;
    this.els.repoGrid.innerHTML = "";
    repos.forEach(r => {
      const a = document.createElement("a");
      a.className = "card";
      a.href = r.html_url; a.target = "_blank"; a.rel = "noopener";
      a.style.setProperty("--lc", model.langColors[r.language] || "crimson");
      const pretty = r.name.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const img = model.projectImages[r.name] || `assets/projects/${r.name}.png`;
      a.innerHTML = `
        ${this.cardThumb(img)}
        <div class="card-body">
          <span class="tag">${r.language || "Repo"}</span>
          <h3>${pretty}</h3>
          <p>${r.description || "No description yet, but the code speaks for itself."}</p>
          <div class="go">
            <span>★ ${r.stargazers_count || 0}</span>
            <span class="cta">View on GitHub →</span>
          </div>
        </div>`;
      this.els.repoGrid.appendChild(a);
    });
  },

  /* ---------- Skills (grouped tag lists) ---------- */
  renderSkills(groups) {
    groups.forEach(g => {
      const div = document.createElement("div");
      div.className = "skill-group";
      const pills = g.items
        .map(name => `<span class="tagpill">${name}</span>`)
        .join("");
      div.innerHTML = `<h3>${g.group}</h3><div class="skill-tags">${pills}</div>`;
      this.els.skillsBody.appendChild(div);
    });
  },
};
