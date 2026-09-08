# Meraj Rahman - Portfolio

A dark comic-book style resume site. Built as a single scrollable page so it
reads fast for employers, with a live GitHub project feed and a contact form.

**Live site:** https://mezdev.xyz

## Structure (plain HTML/CSS/JS, no build step)

- `index.html` - the whole page: Hero, Work, Skills, About, Contact
- `css/style.css` - all styling
- `js/model.js` - content lives here (featured projects, skills, contact email)
- `js/view.js` - renders the cards and skill lists to the page
- `js/controller.js` - loads sections on scroll, handles the contact form and mobile menu
- `assets/` - profile photo, CV, and optional project thumbnails
- `CNAME` - custom domain config for GitHub Pages (mezdev.xyz)

## Editing content

Open `js/model.js`:

- **Featured projects:** the `featured` list
- **Skills:** the `skills` list (grouped tags)
- **GitHub feed:** pulls live from the `githubUser` account; `fallbackRepos` shows if GitHub is unreachable
- **Contact email:** the `contactEmail` value

The "fun version" button links to the Persona 5 style portfolio. Set its link
in `index.html` by replacing `P5_PORTFOLIO_URL` on the `p5-btn` line with the
real URL.

## Assets

- `assets/me.jpg` - hero photo
- `assets/cv/Meraj_Rahman_CV_2026.pdf` - CV, linked from the nav, hero, and About
- Project thumbnails are optional: add `assets/projects/<RepoName>.png` and the
  matching card picks it up. Missing images are skipped automatically.

## Hosting on GitHub Pages

1. Push these files to a repo.
2. In the repo, go to Settings then Pages.
3. Set the source to the `main` branch, root folder, and save.
4. The `CNAME` file keeps the custom domain (mezdev.xyz) pointed at the site.

Any static host works too (Netlify, Cloudflare Pages) since there is no build step.
