import * as vscode from "vscode";
import { startMcpServer } from "mcp-server-code-runner";

export async function setupMcpServer() {
    const mcpUrl = await startHttpMcpServer();
    if (mcpUrl) {
        await updateMcpUrlToVsCodeSettings(mcpUrl);
    }
}

async function startHttpMcpServer(): Promise<string | undefined> {
    const result = await startMcpServer("http", { port: 3098 });

    return result ? result.url : undefined;
}

async function updateMcpUrlToVsCodeSettings(mcpUrl: string) {
    const configuration = vscode.workspace.getConfiguration();
    const mcpServers = configuration.get<any>("mcp.servers", {});
    mcpServers["code-runner-streamable-http-mcp-server"] = {
        type: "http",
        url: mcpUrl,
    };
    await configuration.update("mcp.servers", mcpServers, vscode.ConfigurationTarget.Global);
}