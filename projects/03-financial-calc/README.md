# Project 3: Financial Calculator Suite

## Objective
Create reusable Agent Skills for building financial calculators, then compose them into a full suite.

## Algorithm
```
INPUT: @financial-calc type:"compound-interest" principal:10000 rate:0.08 years:10
PROCESS:
  1. Match type to skill definition
  2. Inject parameters into skill prompt template
  3. Load calculator rules for UI/UX
  4. Generate HTML form + JS logic
  5. Validate inputs (positive numbers, sane ranges)
  6. Compute formula and render chart
OUTPUT: Interactive calculator with real-time results
```

## Step-by-Step

### Step 1: Define Skills in opencode.json
```json
{
  "skills": {
    "compound-interest": {
      "description": "Builds a compound interest calculator",
      "prompt": "Create a compound interest calculator. Include: principal input, annual rate slider (1-20%), years slider (1-30), monthly contribution. Show: final balance, total interest, yearly breakdown table, growth chart using Canvas. Use AEL brand colors #0074FF and dark theme."
    },
    "depreciation": {
      "description": "Builds an asset depreciation calculator",
      "prompt": "Create a straight-line depreciation calculator. Include: asset cost, salvage value, useful life. Show: annual depreciation, book value table, asset value decline chart."
    },
    "roi-calculator": {
      "description": "Builds an ROI calculator",
      "prompt": "Create an ROI calculator. Include: initial investment, final value, holding period. Show: ROI%, annualized ROI, and comparison chart vs benchmark."
    }
  }
}
```

### Step 2: Run the Skill
```bash
opencode run "@compound-interest principal:50000 rate:7 years:15 monthly:500"
```

### Step 3: Compose All Into a Suite
```bash
opencode run "Combine the compound-interest, depreciation, and ROI calculators into a single dashboard page with tab navigation. Each calculator in its own tab. Dark theme with #0074FF accent."
```

### Step 4: Add Results Persistence
```bash
opencode run "Add localStorage to save the last calculation results for each calculator type"
```

## Key Learning
- Skills parameterize prompts — one skill = infinite variations
- Skills compose together for larger applications
- Agent Skills encode domain expertise (finance formulas)
