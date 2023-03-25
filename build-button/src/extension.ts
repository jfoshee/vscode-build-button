import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerTextEditorCommand('extension.build', async (editor: vscode.TextEditor) => {
		const tasks = await vscode.tasks.fetchTasks();
		const buildTask = tasks.find(task => task.group === vscode.TaskGroup.Build);
		if (buildTask) {
			vscode.tasks.executeTask(buildTask);
		}
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }
