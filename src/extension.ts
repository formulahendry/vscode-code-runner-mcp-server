import * as vscode from 'vscode';
import { setupMcpServer } from './mcpServer';

export async function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "code-runner-mcp-server" is now active!');

	const disposable = vscode.commands.registerCommand('code-runner-mcp-server.helloWorld', async () => {
		vscode.window.showInformationMessage('Hello World from Code Runner MCP Server!');
	});

	context.subscriptions.push(disposable);

	try {
		await setupMcpServer();
	} catch (error) {
		console.error('Error setting up Code Runner MCP server: ', error);
	}
}

export function deactivate() { }
