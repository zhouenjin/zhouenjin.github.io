const THEME_STORAGE_KEY = "site-theme";

function applyTheme(theme) {
  const toggle = document.getElementById("theme-toggle");

  document.body.setAttribute("data-theme", theme);

  if (!toggle) {
    return;
  }

  toggle.textContent = theme === "dark" ? "Light" : "Dark";
  toggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );
}

function getCurrentTheme() {
  return document.body.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function setTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initTheme() {
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) {
    return;
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const initialTheme = storedTheme === "light" ? "light" : "dark";
  applyTheme(initialTheme);

  toggle.addEventListener("click", () => {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  items.forEach((item) => observer.observe(item));
}

function setYear() {
  document.querySelectorAll("#current-year").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function getPaletteCopy() {
  const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
  const shortcut = navigator.platform.toUpperCase().includes("MAC") ? "Cmd K" : "Ctrl K";

  return {
    isChinese,
    shortcut,
    buttonLabel: isChinese ? "搜索" : "Search",
    buttonAriaLabel: isChinese ? "打开快速搜索" : "Open quick search",
    title: isChinese ? "快速跳转" : "Quick Search",
    placeholder: isChinese
      ? "搜索页面、文章、链接或命令..."
      : "Search pages, posts, links, or commands...",
    hint: isChinese
      ? "方向键切换结果，回车打开，Esc 关闭"
      : "Use arrow keys to move, Enter to open, and Esc to close",
    empty: isChinese ? "没有找到匹配结果。" : "No matching results found.",
    kindPage: isChinese ? "页面" : "Page",
    kindSection: isChinese ? "分区" : "Section",
    kindPost: isChinese ? "文章" : "Post",
    kindExternal: isChinese ? "外链" : "External",
    kindAction: isChinese ? "操作" : "Action",
  };
}

function buildPaletteCommands(copy) {
  const themeCommand =
    getCurrentTheme() === "dark"
      ? {
          label: copy.isChinese ? "切换到浅色主题" : "Switch to light theme",
          description: copy.isChinese ? "把站点切换成浅色模式" : "Use the light color theme",
          kind: copy.kindAction,
          action: "theme-light",
          keywords: ["theme", "light", "appearance", "mode", "浅色", "白色"],
        }
      : {
          label: copy.isChinese ? "切换到深色主题" : "Switch to dark theme",
          description: copy.isChinese ? "把站点切换成深色模式" : "Use the dark color theme",
          kind: copy.kindAction,
          action: "theme-dark",
          keywords: ["theme", "dark", "appearance", "mode", "深色", "黑色"],
        };

  return [
    {
      label: copy.isChinese ? "主页" : "Home",
      description: copy.isChinese ? "返回个人主页首页" : "Return to the homepage",
      kind: copy.kindPage,
      href: "/",
      keywords: ["home", "index", "about me", "主页"],
    },
    {
      label: copy.isChinese ? "关于我" : "About",
      description: copy.isChinese ? "主页里的个人介绍部分" : "Read the introduction section on the homepage",
      kind: copy.kindSection,
      href: "/#about",
      keywords: ["about", "bio", "introduction", "简介", "介绍"],
    },
    {
      label: copy.isChinese ? "项目" : "Selected Projects",
      description: copy.isChinese ? "查看主要项目与仓库" : "See featured repositories and technical work",
      kind: copy.kindSection,
      href: "/#projects",
      keywords: ["projects", "repos", "work", "项目", "仓库"],
    },
    {
      label: copy.isChinese ? "论文" : "Selected Publication",
      description: copy.isChinese ? "查看强化学习与遗传算法相关论文" : "Open the selected publication section",
      kind: copy.kindSection,
      href: "/#publications",
      keywords: ["publication", "paper", "research", "论文", "文章"],
    },
    {
      label: copy.isChinese ? "博客文章" : "Latest Posts",
      description: copy.isChinese ? "查看最近两篇博客文章" : "Jump to the latest posts on the homepage",
      kind: copy.kindSection,
      href: "/#posts",
      keywords: ["posts", "latest", "blog section", "博客", "文章"],
    },
    {
      label: copy.isChinese ? "联系方式" : "Contact",
      description: copy.isChinese ? "查看邮箱和社交链接" : "Open contact links and social profiles",
      kind: copy.kindSection,
      href: "/#contact",
      keywords: ["contact", "email", "reach out", "联系", "合作"],
    },
    {
      label: "Q&A",
      description: copy.isChinese ? "关于研究兴趣与合作的简短问答" : "Short answers about research interests and collaboration",
      kind: copy.kindPage,
      href: "/qa/",
      keywords: ["qa", "questions", "answers", "faq", "问答"],
    },
    {
      label: "Blog",
      description: copy.isChinese ? "浏览全部公开博客文章" : "Browse all public-facing essays and notes",
      kind: copy.kindPage,
      href: "/blog/",
      keywords: ["blog", "posts", "essays", "博客"],
    },
    {
      label: "Why PPO Replaced TRPO in Practice",
      description: copy.isChinese ? "英文博客：PPO 为什么替代 TRPO" : "English post on why PPO replaced TRPO",
      kind: copy.kindPost,
      href: "/blog/2026/why-ppo-replaced-trpo/",
      keywords: ["ppo", "trpo", "english", "rl", "reinforcement learning"],
    },
    {
      label: "PPO 为什么在实践中取代了 TRPO",
      description: copy.isChinese ? "中文博客：PPO 与 TRPO 的工程关系" : "Chinese post on the practical shift from TRPO to PPO",
      kind: copy.kindPost,
      href: "/blog/2026/ppo-weishenme-qudai-trpo/",
      keywords: ["ppo", "trpo", "中文", "强化学习", "rl"],
    },
    {
      label: "GitHub",
      description: copy.isChinese ? "打开 GitHub 主页" : "Open the GitHub profile",
      kind: copy.kindExternal,
      href: "https://github.com/zhouenjin",
      external: true,
      keywords: ["github", "repos", "code"],
    },
    {
      label: copy.isChinese ? "小红书" : "Xiaohongshu",
      description: copy.isChinese ? "打开小红书主页" : "Open the Xiaohongshu profile",
      kind: copy.kindExternal,
      href: "https://www.xiaohongshu.com/user/profile/6824bcd9000000000a03ce61",
      external: true,
      keywords: ["xiaohongshu", "rednote", "social", "小红书"],
    },
    {
      label: "Bilibili",
      description: copy.isChinese ? "打开 B 站主页" : "Open the Bilibili profile",
      kind: copy.kindExternal,
      href: "https://space.bilibili.com/695627950",
      external: true,
      keywords: ["bilibili", "b站", "video", "social"],
    },
    {
      label: copy.isChinese ? "邮箱" : "Email",
      description: copy.isChinese ? "发送邮件到 ginzej@stu.xjtu.edu.cn" : "Write to ginzej@stu.xjtu.edu.cn",
      kind: copy.kindExternal,
      href: "mailto:ginzej@stu.xjtu.edu.cn",
      keywords: ["email", "mail", "contact", "邮箱"],
    },
    {
      label: copy.isChinese ? "强化学习论文" : "Publication on Adaptive GA via DRL",
      description: copy.isChinese ? "打开已收录的论文页面" : "Open the selected publication on arXiv",
      kind: copy.kindExternal,
      href: "https://arxiv.org/abs/2603.20702",
      external: true,
      keywords: ["paper", "publication", "arxiv", "drl", "ga", "tsp"],
    },
    themeCommand,
  ];
}

function scoreCommand(command, query) {
  if (!query) {
    return 1;
  }

  const label = command.label.toLowerCase();
  const description = (command.description || "").toLowerCase();
  const keywords = (command.keywords || []).map((item) => item.toLowerCase());
  const haystack = [label, description, ...keywords].join(" ");
  const tokens = query.split(/\s+/).filter(Boolean);

  if (label.startsWith(query)) {
    return 100;
  }

  if (label.includes(query)) {
    return 80;
  }

  if (keywords.some((item) => item.startsWith(query))) {
    return 60;
  }

  if (haystack.includes(query)) {
    return 40;
  }

  if (tokens.length > 0 && tokens.every((token) => haystack.includes(token))) {
    return 20;
  }

  return 0;
}

function initCommandPalette() {
  const navActions = document.querySelector(".nav-actions");
  const themeToggle = document.getElementById("theme-toggle");

  if (!navActions || !themeToggle) {
    return;
  }

  const copy = getPaletteCopy();
  const commandToggle = document.createElement("button");
  commandToggle.className = "command-toggle";
  commandToggle.id = "command-toggle";
  commandToggle.type = "button";
  commandToggle.setAttribute("aria-label", copy.buttonAriaLabel);
  commandToggle.innerHTML = `
    <span class="command-toggle-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="6"></circle>
        <path d="m20 20-4.2-4.2"></path>
      </svg>
    </span>
    <span class="command-toggle-label">${copy.buttonLabel}</span>
    <span class="command-shortcut" aria-hidden="true">${copy.shortcut}</span>
  `;
  navActions.insertBefore(commandToggle, themeToggle);

  const palette = document.createElement("div");
  palette.className = "command-palette";
  palette.id = "command-palette";
  palette.hidden = true;
  palette.innerHTML = `
    <div class="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title">
      <h2 class="sr-only" id="command-title">${copy.title}</h2>
      <div class="command-head">
        <div class="command-search-row">
          <span class="command-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="6"></circle>
              <path d="m20 20-4.2-4.2"></path>
            </svg>
          </span>
          <input
            class="command-input"
            id="command-input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="${copy.placeholder}"
          />
          <button class="command-close" id="command-close" type="button" aria-label="Close search">
            Esc
          </button>
        </div>
        <p class="command-hint">${copy.hint}</p>
      </div>
      <div class="command-results-wrap">
        <div class="command-results" id="command-results" role="listbox"></div>
        <p class="command-empty" id="command-empty" hidden>${copy.empty}</p>
      </div>
    </div>
  `;
  document.body.appendChild(palette);

  const input = document.getElementById("command-input");
  const closeButton = document.getElementById("command-close");
  const resultsRoot = document.getElementById("command-results");
  const emptyState = document.getElementById("command-empty");

  let activeIndex = 0;
  let filteredCommands = [];
  let lastFocused = null;

  const isOpen = () => !palette.hidden;

  const renderResults = (query = "") => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      filteredCommands = buildPaletteCommands(copy).slice(0, 8);
    } else {
      filteredCommands = buildPaletteCommands(copy)
        .map((command) => ({
          command,
          score: scoreCommand(command, normalizedQuery),
        }))
        .filter((item) => item.score > 0)
        .sort(
          (left, right) =>
            right.score - left.score || left.command.label.localeCompare(right.command.label),
        )
        .slice(0, 8)
        .map((item) => item.command);
    }

    if (filteredCommands.length === 0) {
      activeIndex = -1;
      resultsRoot.innerHTML = "";
      emptyState.hidden = false;
      input.removeAttribute("aria-activedescendant");
      return;
    }

    emptyState.hidden = true;

    if (activeIndex < 0 || activeIndex >= filteredCommands.length) {
      activeIndex = 0;
    }

    resultsRoot.innerHTML = filteredCommands
      .map(
        (command, index) => `
          <button
            class="command-result${index === activeIndex ? " is-active" : ""}"
            id="command-result-${index}"
            type="button"
            role="option"
            aria-selected="${index === activeIndex}"
            data-index="${index}"
          >
            <span class="command-result-top">
              <span class="command-result-label">${command.label}</span>
              <span class="command-result-kind">${command.kind}</span>
            </span>
            <span class="command-result-desc">${command.description}</span>
          </button>
        `,
      )
      .join("");

    input.setAttribute("aria-activedescendant", `command-result-${activeIndex}`);
  };

  const closePalette = () => {
    if (!isOpen()) {
      return;
    }

    palette.hidden = true;
    document.body.classList.remove("palette-open");

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  };

  const runCommand = (command) => {
    if (!command) {
      return;
    }

    if (command.action === "theme-light") {
      setTheme("light");
      closePalette();
      return;
    }

    if (command.action === "theme-dark") {
      setTheme("dark");
      closePalette();
      return;
    }

    closePalette();

    if (command.external) {
      window.open(command.href, "_blank", "noopener");
      return;
    }

    window.location.assign(command.href);
  };

  const openPalette = () => {
    if (isOpen()) {
      return;
    }

    lastFocused = document.activeElement;
    palette.hidden = false;
    document.body.classList.add("palette-open");
    input.value = "";
    activeIndex = 0;
    renderResults();
    window.requestAnimationFrame(() => input.focus());
  };

  commandToggle.addEventListener("click", openPalette);
  closeButton.addEventListener("click", closePalette);

  palette.addEventListener("click", (event) => {
    if (event.target === palette) {
      closePalette();
    }
  });

  input.addEventListener("input", () => {
    activeIndex = 0;
    renderResults(input.value);
  });

  resultsRoot.addEventListener("click", (event) => {
    const button = event.target.closest(".command-result");

    if (!button) {
      return;
    }

    runCommand(filteredCommands[Number(button.dataset.index)]);
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();

      if (isOpen()) {
        closePalette();
      } else {
        openPalette();
      }

      return;
    }

    if (!isOpen()) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (filteredCommands.length === 0) {
        return;
      }

      activeIndex = (activeIndex + 1) % filteredCommands.length;
      renderResults(input.value);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (filteredCommands.length === 0) {
        return;
      }

      activeIndex = (activeIndex - 1 + filteredCommands.length) % filteredCommands.length;
      renderResults(input.value);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (activeIndex >= 0) {
        runCommand(filteredCommands[activeIndex]);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTheme();
  initCommandPalette();
  initReveal();
  setYear();
});
