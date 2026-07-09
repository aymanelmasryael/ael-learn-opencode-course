# Project 5: Next.js Blog with Custom Agents & Sub-Agents

## Objective
Build a complete Next.js blog application using a custom agent with specialized sub-agents for different tasks.

## Architecture
```
                    ┌─────────────────────────┐
                    │   Orchestrator Agent     │
                    │   (Project Manager)      │
                    └────┬──────┬──────┬──────┘
                         │      │      │
              ┌──────────┤      │      ├──────────┐
              ▼                ▼                ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │  Frontend     │ │  Backend     │ │  Content     │
     │  Sub-Agent    │ │  Sub-Agent   │ │  Sub-Agent   │
     │  (UI/UX)      │ │  (API/DB)    │ │  (MD/Posts)  │
     └──────────────┘ └──────────────┘ └──────────────┘
```

## Algorithm
```
INPUT: /build-blog name:"AEL Tech Blog" theme:"dark"
PROCESS:
  1. Orchestrator plans project structure
  2. Spawns Frontend Sub-Agent → generates Next.js pages + components
  3. Spawns Backend Sub-Agent → generates API routes + DB schema
  4. Spawns Content Sub-Agent → generates sample blog posts (MDX)
  5. Orchestrator reviews all outputs, resolves conflicts
  6. Runs `npm run build` to verify compilation
OUTPUT: Complete, build-ready Next.js blog
```

## Step-by-Step

### Step 1: Define Custom Agent in opencode.json
```json
{
  "agents": {
    "orchestrator": {
      "description": "Senior full-stack architect. Plans and delegates work.",
      "instructions": ".opencode/agents/orchestrator.md"
    },
    "frontend-dev": {
      "description": "UI specialist. Builds React components with Tailwind CSS.",
      "instructions": ".opencode/agents/frontend.md"
    },
    "backend-dev": {
      "description": "API specialist. Builds Next.js API routes and database schemas.",
      "instructions": ".opencode/agents/backend.md"
    },
    "content-writer": {
      "description": "Creates MDX blog posts with frontmatter metadata.",
      "instructions": ".opencode/agents/content.md"
    }
  }
}
```

### Step 2: Orchestrator Instructions
`.opencode/agents/orchestrator.md`:
```markdown
You are a Senior Project Architect.
- Break every project into: pages, components, api-routes, content
- Delegate frontend tasks to @frontend-dev
- Delegate backend tasks to @backend-dev
- Delegate content tasks to @content-writer
- Review all generated code before finalizing
- Ensure TypeScript strict mode
- Verify build with `npm run build`
```

### Step 3: Build the Entire App
```bash
opencode run --agent orchestrator "/build-blog name:\"AEL Tech Blog\" theme:dark"
```

The orchestrator will:
1. Scaffold Next.js with create-next-app
2. Call @frontend-dev to build: layout, header, blog cards, article page, dark mode toggle
3. Call @backend-dev to build: posts API, comments API, RSS feed
4. Call @content-writer to generate: 3 sample MDX posts with frontmatter
5. Review everything and fix any TypeScript errors
6. Run production build

### Step 4: Add Features Iteratively
```bash
opencode run "Add a search bar that filters posts by title and tags"
opencode run "Add reading time estimate to each post"
opencode run "Add a newsletter signup form with API endpoint"
```

## Key Learning
- Custom agents encode ROLE-SPECIFIC expertise
- Sub-agents scale development — each focuses on their specialty
- The orchestrator pattern prevents conflicts and enforces quality
- This architecture mirrors real development teams
