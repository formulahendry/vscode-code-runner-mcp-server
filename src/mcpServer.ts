import * as vscode from "vscode";
// const { startMcpServer } = await import('mcp-server-code-runner');
import { startMcpServer } from "mcp-server-code-runner";
import getPort from 'get-port';

export async function setupMcpServer() {
    const mcpUrl = await startHttpMcpServer();
    await updateMcpUrlToVsCodeSettings(mcpUrl!);
}

async function startHttpMcpServer(): Promise<string | undefined> {
    const port = await getPort({ port: 3090 });
    const result = await startMcpServer("http", { port });

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