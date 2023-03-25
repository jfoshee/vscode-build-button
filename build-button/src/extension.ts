import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerTextEditorCommand('extension.build', async (editor: vscode.TextEditor) => {
    const tasks = await vscode.tasks.fetchTasks();
    const buildTask = tasks.find(task => task.name === 'build');
    if (buildTask) {
      vscode.tasks.executeTask(buildTask);
    }
  });
  context.subscriptions.push(disposable);

  const buildButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
  buildButton.text = "$(gear) Build";
  buildButton.command = 'extension.build';
  buildButton.tooltip = 'Build the project';
  buildButton.show();

  const editorTitleButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -1);
  editorTitleButton.text = "$(gear)";
  editorTitleButton.command = 'extension.build';
  editorTitleButton.tooltip = 'Build the project';
  editorTitleButton.show();
}

export function deactivate() {}
