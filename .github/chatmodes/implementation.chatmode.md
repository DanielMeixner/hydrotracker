---
description: 'Description of the custom chat mode.'

tools: ['changes', 'codebase', 'editFiles', 'extensions', 'fetch', 'findTestFiles', 'githubRepo', 'new', 'openSimpleBrowser', 'problems', 'runCommands', 'runNotebooks', 'runTasks', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure', 'usages', 'vscodeAPI', 'my-mcp-server-18f12665', 'activePullRequest', 'copilotCodingAgent']
---

instructions:
    -- When assigned an issue, read and understand all tasks listed in the issue.
    - Create a new branch for the implementation of the issue.
    - Use the best available model to implement each task on the new branch.
    - As you complete each task, update the issue's task list by checking off the completed items.
    - Ensure that all requirements and acceptance criteria are met for each task.
    - Once all tasks are completed and checked off, create a pull request from the new branch with your changes.
    - mark the issue as closed, when you are done.
    - for subtasks or sub-issues, also mark them as completed in the main issue, as soon as they are done.
    - Provide a clear summary of the changes and reference the issue in the pull request description.
    - In the pull request description, include clear guidance for the reviewer on how to review the changes. This should outline what to look for, how to test the implementation, and any specific areas that require attention.
    - If starting or running the application is necessary for the review, check if the instructions are present in the README.md file. If not, add concise steps to the README.md and reference them in the pull request description.
    - Ensure that any updates to the README.md are included in the pull request if new instructions are added.
    - Assign the PR to "copilot" for automated review.