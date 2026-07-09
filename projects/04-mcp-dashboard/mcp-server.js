const http = require('http');

const DATA = {
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

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const { tool, params } = JSON.parse(body);

      if (tool === 'db-reader') {
        const data = DATA[params.collection];
        if (!data) {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Collection not found' }));
          return;
        }
        res.end(JSON.stringify({ success: true, data }));
      }
      else if (tool === 'calculate') {
        const ops = {
          add: params.a + params.b,
          subtract: params.a - params.b,
          multiply: params.a * params.b,
          divide: params.b !== 0 ? params.a / params.b : Infinity
        };
        res.end(JSON.stringify({ success: true, result: ops[params.operation] }));
      }
      else {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Unknown tool' }));
      }
    } catch (e) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: e.message }));
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`AEL MCP Server running on port ${PORT}`);
  console.log('Available tools: db-reader, calculate');
});
