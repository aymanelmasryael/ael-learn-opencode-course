# Project 2: Landing Page Generator

## Objective
Use Agent Instructions and Custom Slash Commands to generate a professional landing page.

## Algorithm
```
INPUT: /build-landing [product] [tone]
PROCESS:
  1. Load rules from .opencode/rules/
  2. Apply tone parameter (professional | playful | minimal)
  3. Generate hero section with product name
  4. Generate features grid (4 columns)
  5. Generate CTA section
  6. Apply responsive CSS
  7. Write output to index.html + style.css
OUTPUT: Landing page files
```

## Step-by-Step

### Step 1: Define Slash Command
Add to `opencode.json`:
```json
{
  "slashCommands": {
    "build-landing": {
      "description": "Build a landing page for a product",
      "prompt": "Create a complete landing page for {product} with a {tone} tone. Include: hero section with headline and subtitle, features grid, testimonials, and CTA. Use brand colors #0074FF primary, dark background."
    }
  }
}
```

### Step 2: Create Rules File
`.opencode/rules/landing-rules.md`:
```markdown
# Landing Page Rules
- Hero section: full viewport height with gradient overlay
- Features: 4-column grid, icon + title + description
- Testimonials: 3 cards in horizontal scroll
- CTA: prominent button with glow effect
- Footer: copyright with current year
- Responsive breakpoints: 768px, 480px
```

### Step 3: Run the Command
```bash
opencode run "/build-landing product:\"AEL Analytics\" tone:professional"
```

### Step 4: Review & Refine
```bash
opencode run "Make the hero section taller and add a particle animation background"
```

## Key Learning
- Slash commands enforce consistency across generations
- Parameters let you reuse one command for different contexts
- Rules act as a safety net — the agent cannot ignore them
