# Project 4: MCP-Powered Dashboard

## Objective
Connect OpenCode to external tools via MCP (Model Context Protocol). Build a live dashboard that reads from a simulated database and external API.

## Algorithm
```
INPUT: /build-dashboard datasource:"local-json" metrics:["users","revenue","growth"]
PROCESS:
  1. MCP Server receives tool request from OpenCode
  2. Server routes to appropriate tool (db-reader, api-fetcher)
  3. Tool returns structured data
  4. Agent renders dashboard HTML with chart.js
  5. MCP Server sends rendered file path back to agent
OUTPUT: Live dashboard connected to external data
```

## Step-by-Step

### Step 1: Create MCP Server
`mcp-server.js`:
```javascript
const express = require('express');
const app = express();
app.use(express.json());

// Tool 1: Database Reader
app.post('/tools/db-reader', (req, res) => {
  const { collection } = req.body;
  const data = {
    users: [
      { month: 'Jan', count: 1200 },
      { month: 'Feb', count: 1450 },
      { month: 'Mar', count: 1820 },
      { month: 'Apr', count: 2100 },
      { month: 'May', count: 2560 },
      { month: 'Jun', count: 3100 }
    ],
    revenue: [
      { month: 'Jan', amount: 45000 },
      { month: 'Feb', amount: 52000 },
      { month: 'Mar', amount: 61000 },
      { month: 'Apr', amount: 74000 },
      { month: 'May', amount: 88000 },
      { month: 'Jun', amount: 102000 }
    ]
  };
  res.json({ success: true, data: data[collection] || [] });
});

// Tool 2: Calculator
app.post('/tools/calculate', (req, res) => {
  const { operation, a, b } = req.body;
  const ops = { add: a+b, subtract: a-b, multiply: a*b, divide: a/b };
  res.json({ success: true, result: ops[operation] });
});

app.listen(3001, () => console.log('MCP Server running on port 3001'));
```

### Step 2: Register MCP Tools in opencode.json
```json
{
  "mcpServers": {
    "ael-mcp": {
      "command": "node",
      "args": ["mcp-server.js"],
      "tools": {
        "db-reader": {
          "description": "Read data from local database",
          "inputSchema": {
            "type": "object",
            "properties": {
              "collection": { "type": "string", "enum": ["users", "revenue"] }
            }
          }
        },
        "calculate": {
          "description": "Perform arithmetic operations",
          "inputSchema": {
            "type": "object",
            "properties": {
              "operation": { "type": "string", "enum": ["add", "subtract", "multiply", "divide"] },
              "a": { "type": "number" },
              "b": { "type": "number" }
            }
          }
        }
      }
    }
  }
}
```

### Step 3: Run Agent with MCP
```bash
opencode run "Build a dashboard that shows user growth and revenue from the db-reader tool. Use charts. Dark theme with #0074FF."
```

The agent will:
1. Call `db-reader` tool with `collection: "users"`
2. Call `db-reader` tool with `collection: "revenue"`
3. Use the returned data to build charts
4. Generate a complete HTML dashboard

### Step 4: Verify MCP Communication
Check OpenCode logs to see tool calls:
```
[MCP] Calling tool: db-reader (collection: users)
[MCP] Response: { success: true, data: [...] }
[MCP] Calling tool: db-reader (collection: revenue)
[MCP] Response: { success: true, data: [...] }
```

## Key Learning
- MCP lets agents fetch REAL data, not mock it
- Tools are discoverable — agent knows what each tool does via its description
- MCP works with any language (Node.js, Python, Go)
- The agent decides WHEN to use each tool based on context
