/* AayanDev Portfolio – behaviour */

/* ===== EDIT YOUR CONTACT DETAILS HERE (used by the contact form) ===== */
const CONFIG = {
  email: "aayankhalid002@gmail.com",
  whatsapp: "https://wa.me/923132663005"   // used if email is empty
};
/* ===================================================================== */

// Lucide icon paths
const ICONS = {
  arrow:"M5 12h14M12 5l7 7-7 7", mail:"M4 4h16v16H4zM22 6l-10 7L2 6",
  gh:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.4-2.6-1.3-3.5.3-1.2.3-2.4 0-3.5 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6.4 2.6 5.3 3 5.3 3c-.4 1.1-.4 2.3 0 3.5A5 5 0 0 0 4 10c0 3.5 3 5.5 6 5.5-.4.5-.7 1.2-.8 2V22M9 18c-4.5 2-5-2-7-2",
  li:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4",
  ig:"M2 2h20v20H2zM16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2M17.5 6.5h.01",
  wa:"M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2-5.6A8.4 8.4 0 1 1 21 11.5z",
  code:"M16 18l6-6-6-6M8 6l-6 6 6 6", layout:"M3 3h18v18H3zM3 9h18M9 21V9", smart:"M7 2h10v20H7zM12 18h.01",
  brush:"M9.1 11.1l3.8 3.8M18.4 2.6a2 2 0 0 1 3 3L12 15l-4-4zM7 15c-2 0-3 1.5-3 3 0 1.5-1 2-2 2 4 2 9 1 9-3a3 3 0 0 0-4-2z",
  globe:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20",
  bulb:"M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z",
  eye:"M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  book:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  db:"M3 5a9 3 0 1 0 18 0 9 3 0 1 0-18 0M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0",
  server:"M2 3h20v7H2zM2 14h20v7H2zM6 6.5h.01M6 17.5h.01", menu:"M3 6h18M3 12h18M3 18h18", x:"M18 6L6 18M6 6l12 12",
  send:"M22 2L11 13M22 2l-7 20-4-9-9-4z", user:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
  heart:"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"
};
const svg = (n, s = 20) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[n]}"/></svg>`;
document.querySelectorAll("[data-i]").forEach(el => { el.innerHTML = svg(el.dataset.i, el.dataset.s || 20); });

// Loader
window.addEventListener("load", () => setTimeout(() => { document.getElementById("loader").classList.add("hide"); document.body.classList.add("ready"); }, 1000));

// Sticky header + mobile menu
const header = document.getElementById("header"), menuBtn = document.getElementById("menuBtn");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
onScroll(); window.addEventListener("scroll", onScroll);
const setMenu = open => { header.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); menuBtn.innerHTML = svg(open ? "x" : "menu", 26); };
menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("open")));
document.querySelectorAll("#navLinks a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// Scroll reveal (different directions per element)
const dir = (sel, d) => document.querySelectorAll(sel).forEach(el => el.dataset.a = d);
dir(".about-main, .form", "left"); dir(".contact-list, .info-cards .info", "right"); dir(".skill", "zoom");
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); setTimeout(() => { e.target.style.transitionDelay = ""; }, 1600); }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 5) * 80 + "ms"; io.observe(el); });

document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: validates, then opens your email app (or WhatsApp if no email is set)
const form = document.getElementById("contactForm"), note = document.getElementById("formNote");
form.addEventListener("submit", e => {
  e.preventDefault();
  const v = Object.fromEntries(new FormData(form).entries()), err = {};
  if (v.name.trim().length < 2) err.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) err.email = "Enter a valid email address.";
  if (v.subject.trim().length < 3) err.subject = "Please add a subject.";
  if (v.message.trim().length < 10) err.message = "Message should be at least 10 characters.";
  form.querySelectorAll(".err").forEach(s => { s.textContent = err[s.dataset.for] || ""; });
  if (Object.keys(err).length) { note.hidden = true; return; }
  const body = `Name: ${v.name}\nEmail: ${v.email}\n\n${v.message}`;
  note.hidden = false;
  if (CONFIG.email) {
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = "Opening your email app with the message ready to send.";
  } else if (CONFIG.whatsapp) {
    window.open(CONFIG.whatsapp + (CONFIG.whatsapp.includes("?") ? "&" : "?") + "text=" + encodeURIComponent(v.subject + "\n" + body), "_blank", "noopener");
    note.textContent = "Opening WhatsApp with your message.";
  } else {
    note.textContent = "Email or WhatsApp is not set up yet. Add it in CONFIG at the top of js/script.js.";
  }
});

/* ================= EXTRA INTERACTIONS ================= */
const canHover = matchMedia("(hover:hover)").matches, reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

// Typing effect in hero
(() => {
  const el = document.getElementById("typed");
  const words = ["modern websites", "responsive designs", "digital experiences", "beautiful interfaces"];
  if (reduce) return;
  let w = 0, c = 0, del = false;
  const tick = () => {
    const word = words[w];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 85);
  };
  setTimeout(tick, 2200);
})();

// Scroll progress, back-to-top, active nav link
const bar = document.getElementById("progress"), toTop = document.getElementById("toTop");
const onScroll2 = () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + "%";
  toTop.classList.toggle("show", scrollY > 600);
};
onScroll2(); addEventListener("scroll", onScroll2, { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
const links = [...document.querySelectorAll("#navLinks a[href^='#']:not(.btn)")];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => spy.observe(s));

if (canHover && !reduce) {
  // Cursor glow
  const glow = document.getElementById("glow");
  addEventListener("pointermove", e => { glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; glow.classList.add("on"); });
  document.addEventListener("pointerleave", () => glow.classList.remove("on"));

  // 3D tilt + spotlight on cards
  document.querySelectorAll(".skill, .why, .card").forEach(c => c.classList.add("tilt"));
  document.querySelectorAll(".glass").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
      if (c.classList.contains("tilt")) { c.style.setProperty("--rx", (0.5 - y) * 12 + "deg"); c.style.setProperty("--ry", (x - 0.5) * 12 + "deg"); }
    });
    c.addEventListener("pointerleave", () => { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
  });

  // Magnetic buttons
  document.querySelectorAll(".btn").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--bx", (e.clientX - r.left - r.width / 2) * .2 + "px");
      b.style.setProperty("--by", (e.clientY - r.top - r.height / 2) * .3 + "px");
    });
    b.addEventListener("pointerleave", () => { b.style.setProperty("--bx", "0px"); b.style.setProperty("--by", "0px"); });
  });
}
