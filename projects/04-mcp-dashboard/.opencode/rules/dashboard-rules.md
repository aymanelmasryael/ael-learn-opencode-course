# MCP Dashboard Rules

## Data Flow
- Always fetch live data via MCP tools before rendering
- Never hardcode or mock data in the dashboard HTML
- Call db-reader for user growth and revenue collections
- Use calculate tool for any derived metrics (growth rate, averages)

## Charts
- User growth: line chart with gradient fill
- Revenue: bar chart with #0074FF color
- Both charts responsive with dark theme
- Include tooltips showing exact values on hover

## Layout
- Summary cards at top: total users, total revenue, avg growth
- Charts below cards in 2-column grid
- Data source badge showing "MCP Connected"
- Last updated timestamp
