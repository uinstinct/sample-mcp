import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["/Users/instinct/Desktop/sample-calc-mcp/build/index.js"],
    stderr: "pipe",
  });

  const client = new Client({
    name: "example-client",
    version: "1.0.0",
  });

  await client.connect(transport);

  transport.onerror = (error) => {
    console.log("debug caught", error);
  };

  const response = await client.callTool({
    name: "get-forecast",
    arguments: {
      latitude: 0,
      longitude: 90,
    },
  });
  console.log("debug", response);
}

main();
