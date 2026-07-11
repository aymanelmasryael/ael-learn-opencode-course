const MODULES = [
  { id:1, title:'Introduction & Installation', desc:'The algorithmic foundation — install, configure, and run your first agent.', lessons:['Core Concepts','Installation','First Agent Run','Context Window'], icon:'🚀',
    detail:[
      {h:'Algorithm: Agentic Coding Pipeline',p:'INPUT(user prompt) → LOAD(rules, instructions) → PROCESS(context + prompt) → GENERATE(code) → REVIEW → OUTPUT(files). Understand this pipeline end-to-end.'},
      {h:'Installation',p:'npm install -g @opencodeai/cli. Verify with "opencode --version". OpenCode wraps any AI model (Claude, Gemini, DeepSeek) under a unified agent interface.',code:'npm install -g @opencodeai/cli\nopencode --version'},
      {h:'First Agent Run',p:'Create a directory, run "opencode init", then "opencode run \\"create index.html with Hello World\\"". The agent reads your prompt, applies default rules, and writes output.',code:'mkdir test-project && cd test-project\nopencode init\nopencode run "Create an HTML page with Hello OpenCode in AEL blue #0074FF"'},
      {h:'Context Window',p:'The context window is the agent\'s working memory. Each conversation turn adds tokens. Free models have smaller limits (32K-128K). Manage context by: 1) Starting fresh sessions per task 2) Avoiding long unrelated discussions 3) Using rules to inject context efficiently'}
    ]},
  { id:2, title:'Agent Instructions & Control', desc:'Direct the agent with precision — instructions, parameters, and custom commands.', lessons:['Agent Instructions','Parameters','Slash Commands','Context Engineering'], icon:'🎛️',
    detail:[
      {h:'Agent Instructions',p:'Create .opencode/agent-instructions.md. These are prepended to EVERY prompt automatically. Think of them as system prompts — they shape the agent\'s persona and constraints.',code:'# .opencode/agent-instructions.md\nYou are a senior frontend developer.\n- Use semantic HTML5\n- Use CSS custom properties\n- Must support dark mode\n- Responsive mobile-first design'},
      {h:'Parameters in Prompts',p:'Pass runtime data using parameter syntax: agent-run "Build a {type} page for {product} with {theme} theme". The agent substitutes parameters at generation time.'},
      {h:'Custom Slash Commands',p:'Define reusable commands in opencode.json. Slash commands are parameterized templates that enforce consistency across generations.',code:'"slashCommands": {\n  "build-page": {\n    "description": "Generate a full page",\n    "prompt": "Create a {type} page for {product}. Include hero, features, CTA. Theme: {theme}"\n  }\n}'},
      {h:'Context Engineering',p:'Rules > Instructions > Prompt. Priority: Project rules override agent instructions, agent instructions override the prompt. Layer your constraints strategically.'}
    ]},
  { id:3, title:'Agent Skills', desc:'Build reusable, parameterized skills that encode domain expertise.', lessons:['Skill Architecture','Creating Skills','Composing Skills','Skill Libraries'], icon:'✨',
    detail:[
      {h:'What is a Skill?',p:'A skill is a named, parameterized prompt template registered in opencode.json. Skills encode REPEATABLE workflows — calculator generation, API scaffolding, chart building.'},
      {h:'Skill Definition',p:'Each skill has: description (for agent discovery), and prompt (template with {parameters}). The agent auto-discovers skills by reading their descriptions.',code:'"skills": {\n  "create-api": {\n    "description": "Scaffolds REST API endpoints for a resource",\n    "prompt": "Create REST API endpoints for {resource} with CRUD operations. Use Express.js. Include validation and error handling."\n  }\n}'},
      {h:'Skill Composition',p:'Skills can call other skills. Build complex workflows by composing atomic skills. Example: @build-dashboard calls @create-chart + @fetch-data + @render-layout.'},
      {h:'Skill Libraries',p:'Organize skills into groups: core-ui, data-vis, api-gen, content. This scales to hundreds of reusable capabilities without bloating the config file.'}
    ]},
  { id:4, title:'Project Rules', desc:'Create binding rules that the agent cannot ignore.', lessons:['Rule System','Rule Priority','Rule Templates','Multi-Project Rules'], icon:'📋',
    detail:[
      {h:'Rule System',p:'Rules live in .opencode/rules/*.md. They are INJECTED into every prompt automatically. Unlike instructions, rules are project-specific constraints.',code:'# .opencode/rules/frontend-conventions.md\n- Use React functional components only\n- All props must have TypeScript interfaces\n- Use Tailwind CSS exclusively\n- No inline styles allowed'},
      {h:'Rule Priority',p:'Order: project-wide rules (always loaded) → directory-specific rules (scoped) → task-specific rules (passed inline). All rules compound — the agent sees all of them.'},
      {h:'Iterative Refinement Cycle',p:'1) Run agent with rules → 2) Review output → 3) Refine rules → 4) Regenerate. This cycle is the core of the algorithmic workflow. Each iteration tightens the constraints.',tip:'The key insight: DON\'T fix bad output manually. Instead, add a rule that prevents that class of errors. The agent learns from rules, not from your edits.'},
      {h:'Rule Templates',p:'Create reusable rule templates: react-rules.md, api-rules.md, css-rules.md. Copy them into new projects. This enforces organizational standards across all projects.'}
    ]},
  { id:5, title:'MCP & Tool Integration', desc:'Connect the agent to real data sources via Model Context Protocol.', lessons:['MCP Architecture','Server Setup','Tool Discovery','Data Pipelines'], icon:'🔌',
    detail:[
      {h:'MCP Architecture',p:'OpenCode ↔ MCP Server ↔ Tools (Database, API, File System, Calculator). The agent discovers available tools via their descriptions and decides when to use them.'},
      {h:'Server Setup',p:'An MCP server is a simple HTTP server that registers tools. Each tool has a name, description, and input schema. The agent reads these to understand tool capabilities.',code:'const server = http.createServer((req, res) => {\n  const { tool, params } = JSON.parse(body);\n  if (tool === "db-reader") {\n    // fetch and return data\n  }\n});'},
      {h:'Tool Discovery',p:'The agent reads the "description" field of each tool to decide which one fits the current task. Write clear descriptions: "Fetches monthly user growth data from analytics DB" not "Database tool".'},
      {h:'Data Pipeline Pattern',p:'Agent → MCP:fetchData() → transform → render. This pattern lets you build live dashboards, dynamic reports, and data-driven apps without writing manual data-fetching code.'}
    ]},
  { id:6, title:'Custom Agents & Sub-Agents', desc:'Design agent teams with specialized roles that collaborate on complex projects.', lessons:['Agent Architecture','Orchestrator Pattern','Sub-Agent Delegation','Production Workflow'], icon:'🤖',
    detail:[
      {h:'Agent Architecture',p:'Define multiple agents in opencode.json, each with role-specific instructions. The orchestrator agent plans work and delegates to specialized sub-agents.',code:'"agents": {\n  "orchestrator": { "instructions": ".opencode/agents/orch.md" },\n  "frontend": { "instructions": ".opencode/agents/frontend.md" },\n  "backend": { "instructions": ".opencode/agents/backend.md" }\n}'},
      {h:'Orchestrator Pattern',p:'The orchestrator NEVER writes code. It plans, delegates, reviews, and coordinates. This prevents context pollution and keeps each agent focused on its specialty.'},
      {h:'Sub-Agent Delegation',p:'The orchestrator calls sub-agents via @mentions: @frontend "Build Navbar component". Each sub-agent receives only the relevant context, not the entire project history.'},
      {h:'Production Workflow',p:'1) Orchestrator plans file tree → 2) Spawns parallel sub-agents → 3) Reviews all outputs → 4) Runs build → 5) Fixes errors → 6) Final review. Scale this to any size project.'}
    ]}
];

const PROJECTS = [
  { id:1, title:'Hello OpenCode', desc:'Install, initialize, and run your first agent interaction. Generate a branded HTML page.', icon:'🌱', difficulty:'beginner', tags:['install','setup','first-agent'], folder:'01-hello-opencode',
    detail:[
      {h:'Goal',p:'Install OpenCode, create a project, configure agent instructions, and generate your first page.'},
      {h:'Files',items:['opencode.json — project config','.opencode/agent-instructions.md — system prompt','.opencode/rules/project-rules.md — coding standards']},
      {h:'Algorithm',p:'INPUT: user prompt → LOAD: agent-instructions.md + project-rules.md → PROCESS: model generates HTML+CSS → OUTPUT: index.html with AEL branding'},
      {h:'Commands',code:'npm install -g @opencodeai/cli\nmkdir hello-opencode && cd hello-opencode\nopencode init\nopencode run "Create a dark-themed page with Hello OpenCode in #0074FF"'}
    ]},
  { id:2, title:'Landing Page Generator', desc:'Use slash commands and rules to generate professional landing pages on demand.', icon:'🚀', difficulty:'beginner', tags:['slash-commands','rules','landing-page'], folder:'02-landing-page',
    detail:[
      {h:'Goal',p:'Define a reusable /build-landing slash command and generate a complete landing page with one prompt.'},
      {h:'Files',items:['opencode.json — with slashCommands.build-landing','.opencode/rules/landing-rules.md — design constraints','.opencode/agent-instructions.md — specialist persona']},
      {h:'Algorithm',p:'INPUT: /build-landing product:"X" tone:"Y" → MATCH: slash command template → INJECT: parameters → LOAD: landing rules → GENERATE: 5-section page → OUTPUT: HTML+CSS'},
      {h:'Commands',code:'opencode run "/build-landing product:\\"AEL Analytics\\" tone:professional"\nopencode run "Add particle animation to the hero section"'}
    ]},
  { id:3, title:'Financial Calculator Suite', desc:'Build reusable agent skills for compound interest, depreciation, ROI, and loan amortization.', icon:'📊', difficulty:'intermediate', tags:['skills','composition','finance'], folder:'03-financial-calc',
    detail:[
      {h:'Goal',p:'Create 4 financial calculator skills and compose them into a tabbed dashboard.'},
      {h:'Files',items:['opencode.json — 4 skill definitions + /build-finance-suite command','Each skill: @compound-interest, @depreciation, @roi-calculator, @loan-amortization']},
      {h:'Algorithm',p:'SKILL: @financial-calc type:"X" params:Y → MATCH: skill template → INJECT: financial parameters → GENERATE: form + JS logic + Chart.js → COMPOSE: into dashboard tabs'},
      {h:'Commands',code:'opencode run "@compound-interest principal:50000 rate:7 years:15 monthly:500"\nopencode run "/build-finance-suite"'}
    ]},
  { id:4, title:'MCP-Powered Dashboard', desc:'Connect OpenCode to live data via MCP server. Build a data-driven dashboard.', icon:'📈', difficulty:'intermediate', tags:['mcp','tools','data','server'], folder:'04-mcp-dashboard',
    detail:[
      {h:'Goal',p:'Build an MCP server with db-reader and calculator tools, then have the agent use them to build a live dashboard.'},
      {h:'Files',items:['opencode.json — mcpServers configuration','mcp-server.js — HTTP server with tool endpoints','.opencode/agent-instructions.md — MCP-aware agent persona']},
      {h:'Algorithm',p:'AGENT → DISCOVER: mcp tools → CALL: db-reader(users) + db-reader(revenue) → RECEIVE: real data → RENDER: Chart.js dashboard → OUTPUT: live HTML file'},
      {h:'Commands',code:'node mcp-server.js &\nopencode run "Build a dashboard showing user growth and revenue charts using MCP tools"'}
    ]},
  { id:5, title:'Next.js Blog with Sub-Agents', desc:'Build a production-ready blog using an orchestrator agent with 3 specialized sub-agents.', icon:'🧠', difficulty:'advanced', tags:['agents','sub-agents','nextjs','orchestrator'], folder:'05-nextjs-blog',
    detail:[
      {h:'Goal',p:'Scaffold and build a complete Next.js 14 blog by delegating work across specialized sub-agents.'},
      {h:'Files',items:['opencode.json — 4 agent definitions (orchestrator, frontend, backend, content)','.opencode/agents/orchestrator.md — planning & delegation','.opencode/agents/frontend.md — UI components','.opencode/agents/backend.md — API routes','.opencode/agents/content.md — MDX posts']},
      {h:'Algorithm',p:'ORCHESTRATOR → PLAN: file tree → DELEGATE: @frontend(components) + @backend(API) + @content(posts) → COLLECT: all outputs → REVIEW: TypeScript + build → OUTPUT: production-ready blog'},
      {h:'Commands',code:'opencode run --agent orchestrator "/build-blog name:\\"AEL Tech Blog\\" theme:dark"\nopencode run "Add search bar filtering posts by title and tags"\nopencode run "Add reading time estimate to each post"'}
    ]}
];

const TIMELINE = [
  'Install & Initialize OpenCode',
  'Agent Instructions & First Prompt',
  'Custom Slash Commands & Parameters',
  'Agent Skills — Reusable Workflows',
  'Project Rules — Binding Constraints',
  'MCP — Live Data Integration',
  'Custom Agents & Orchestrator Pattern',
  'Production-Ready App with Sub-Agents'
];

function renderModules() {
  const grid = document.getElementById('modulesGrid');
  grid.innerHTML = MODULES.map(m => `
    <div class="module-card fade-up" data-id="${m.id}">
      <div class="module-num">Module ${String(m.id).padStart(2,'0')}</div>
      <h3>${m.icon} ${m.title}</h3>
      <p>${m.desc}</p>
      <div class="module-lessons">${m.lessons.map(l => `<span>${l}</span>`).join('')}</div>
    </div>
  `).join('');
  grid.querySelectorAll('.module-card').forEach(c => c.addEventListener('click', () => openLesson(+c.dataset.id)));
}

function openLesson(id) {
  const mod = MODULES.find(m => m.id === id);
  if (!mod) return;
  document.querySelectorAll('.module-card').forEach(c => c.classList.remove('active'));
  document.querySelector(`.module-card[data-id="${id}"]`).classList.add('active');
  const el = document.getElementById('lessonDetail');
  el.className = 'lesson-detail open';
  el.innerHTML = `<div class="lesson-content fade-up"><h4>${mod.icon} ${mod.title}</h4>${
    mod.detail.map(s => `<div class="sec"><h5>${s.h}</h5><p>${s.p.replace(/\n/g,'<br>')}</p>${
      s.code ? `<pre><code>${esc(s.code)}</code></pre>` : ''
    }${s.tip ? `<div class="tip"><strong>💡 Tip:</strong> ${s.tip}</div>` : ''}</div>`
    ).join('')}</div>`;
  el.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map(p => `
    <div class="project-card fade-up" data-id="${p.id}">
      <span class="picon">${p.icon}</span>
      <span class="pdifficulty ${p.difficulty === 'advanced' ? 'hard' : p.difficulty === 'intermediate' ? 'medium' : ''}">${p.difficulty}</span>
      <div class="pnum">Project ${String(p.id).padStart(2,'0')}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="ptags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>
  `).join('');
  grid.querySelectorAll('.project-card').forEach(c => c.addEventListener('click', () => openProject(+c.dataset.id)));
}

function openProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  document.querySelectorAll('.project-card').forEach(c => c.classList.remove('active'));
  document.querySelector(`.project-card[data-id="${id}"]`).classList.add('active');
  const el = document.getElementById('projectDetail');
  el.className = 'project-detail open';
  el.innerHTML = `<div class="project-content fade-up"><h4>${p.icon} ${p.title}</h4><p style="color:var(--text-muted);font-size:12px;font-family:var(--font-mono);margin-bottom:16px">📂 projects/${p.folder}/</p>${
    p.detail.map(s => `<div class="sec"><h5>${s.h}</h5>${
      s.items ? `<ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul>` : ''
    }<p>${s.p ? s.p.replace(/\n/g,'<br>') : ''}</p>${
      s.code ? `<pre><code>${esc(s.code)}</code></pre>` : ''
    }</div>`
    ).join('')}</div>`;
  el.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function renderTimeline() {
  document.getElementById('timeline').innerHTML = `
    <h3 style="font-size:22px;font-weight:bold;margin-bottom:20px;text-align:center;color:var(--text-primary);font-family:var(--font-mono)">🗺️ Learning Roadmap</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px">
      ${TIMELINE.map((t,i) => `
        <div class="glass" style="padding:12px 16px;border-radius:var(--radius-md);display:flex;align-items:center;gap:10px">
          <span style="width:26px;height:26px;border-radius:50%;background:rgba(0,116,255,.12);border:1px solid var(--border-color);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:11px;color:var(--primary);flex-shrink:0">${i+1}</span>
          <span style="font-size:12px;color:var(--text-secondary)">${t}</span>
        </div>
      `).join('')}
    </div>`;
}

function esc(t){const d=document.createElement('div');d.textContent=t;return d.innerHTML}

const pgEditor = document.getElementById('codeEditor');
const pgOutput = document.getElementById('playgroundOutput');
const pgDefaults = {
  opencode: '# OpenCode CLI\n# Try these commands:\ncreate-project nextjs-blog\nadd-rule "Use TypeScript"\nagent-run "Add about page"',
  rules: '# Project Rules (.opencode/rules/)\nrule: use-typescript\n  Use TypeScript strict mode\n  No "any" type\n\nrule: react-standards\n  Use functional components\n  Every prop needs an interface',
  mcp: '# MCP Config (opencode.json)\n{\n  "mcpServers": {\n    "my-db": {\n      "command": "node",\n      "args": ["mcp-server.js"]\n    },\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]\n    }\n  }\n}'
};
let pgTab = 'opencode';
pgEditor.value = pgDefaults.opencode;
const pgResponses = {
  'create-project': '✅ Project created!\n📁 nextjs-blog/\n├── pages/\n├── components/\n└── package.json',
  'add-rule': '✅ Rule added to .opencode/rules/',
  'agent-run': '🤖 Agent running...\n✅ Task complete!',
  'use strict': '⚠️ Warning: TypeScript strict mode enabled',
  'mcp': '🔌 MCP Server connected!\n📡 Tools: db-reader, file-search, calculator'
};
document.getElementById('runBtn').addEventListener('click', () => {
  const c = pgEditor.value.toLowerCase();
  let matched = false;
  for (const [k, v] of Object.entries(pgResponses)) {
    if (c.includes(k)) {
      pgOutput.innerHTML = `<span style="color:var(--success)">${v.replace(/\n/g, '<br>')}</span>`;
      matched = true;
      break;
    }
  }
  if (!matched) pgOutput.innerHTML = '<span style="color:var(--gold)">🤖 Agent processing...<br>✅ Task complete!</span>';
});
document.getElementById('clearBtn').addEventListener('click', () => {
  pgEditor.value = '';
  pgOutput.innerHTML = '<span class="output-placeholder">▶ Run a command to see the result...</span>';
});
document.getElementById('resetBtn').addEventListener('click', () => {
  pgEditor.value = pgDefaults[pgTab];
  pgOutput.innerHTML = '<span class="output-placeholder">▶ Run a command to see the result...</span>';
});
document.querySelectorAll('.playground-tab').forEach(b => {
  b.addEventListener('click', () => {
    pgDefaults[pgTab] = pgEditor.value;
    document.querySelectorAll('.playground-tab').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    pgTab = b.dataset.pt;
    pgEditor.value = pgDefaults[pgTab];
    pgOutput.innerHTML = '<span class="output-placeholder">▶ Run a command to see the result...</span>';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(l=>{l.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(l.getAttribute('href'));if(t&&t.classList.contains('section')){document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));t.classList.add('active');document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));if(l.classList.contains('nav-link'))l.classList.add('active');document.getElementById('navLinks').classList.remove('open');t.scrollIntoView({behavior:'smooth'})}})});
document.getElementById('navToggle').addEventListener('click',()=>document.getElementById('navLinks').classList.toggle('open'));
document.addEventListener('mousemove',e=>{const cg=document.getElementById('cursorGlow');cg.style.opacity='1';cg.style.left=e.clientX+'px';cg.style.top=e.clientY+'px'});
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50));

renderModules(); renderProjects(); renderTimeline();
