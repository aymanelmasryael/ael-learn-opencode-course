# Project 1: Hello OpenCode

## Objective
Install OpenCode, configure your first project, and run your first agent.

## Step-by-Step

### Step 1: Install OpenCode
```bash
npm install -g @opencodeai/cli
```
Verify installation:
```bash
opencode --version
```

### Step 2: Create a Project Directory
```bash
mkdir hello-opencode && cd hello-opencode
```

### Step 3: Initialize OpenCode
```bash
opencode init
```
This creates:
- `.opencode/` directory
- `opencode.json` configuration file

### Step 4: Configure Your First Agent Instruction
Create `.opencode/agent-instructions.md`:
```markdown
You are a helpful coding assistant.
- Write clean, readable code
- Add comments for complex logic
- Use semantic HTML5
- Follow modern JavaScript (ES2024)
```

### Step 5: Run Your First Agent
```bash
opencode run "Create a simple HTML page that says 'Hello OpenCode' with a blue gradient background and the AEL brand color #0074FF"
```

### Step 6: Review Output
The agent generates an `index.html`. Open it in your browser.

## Algorithm
```
INPUT: user prompt
PROCESS:
  1. Parse prompt into intent
  2. Apply agent-instructions.md rules
  3. Generate code matching constraints
  4. Write output to filesystem
OUTPUT: index.html
```

## Expected Result
A styled HTML page with:
- Dark background (#000 or similar)
- "Hello OpenCode" heading in AEL blue (#0074FF)
- Subtle gradient accent
- Responsive layout
