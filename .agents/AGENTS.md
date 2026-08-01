# Project Specific Rules

- **Pre-Update Check**: Check for uncommitted changes (using `git status` / `git diff`) only ONCE per session. If there are changes, report them and explain what they do.
- **History Logging**: For each and every prompt sent (in this session and all future sessions), log the user's query and the agent's response in a history file. The history file's name should be based on the current date (e.g., `history_YYYY-MM-DD.md` or similar).
- **Run Commands Directly**: When told to run a command or start a server, execute it directly yourself rather than asking the user to run it. If additional permissions, specific setups, or clarifications are needed to run it, ask the user first.
- **Standardized Response Format**: For tasks, issues, and implementation plans, follow the template stored in `RESPONSE_TEMPLATE.md`. Keep responses small, easy to understand, short, straightforward, and avoid adding extra details or paragraphs. Do NOT use the template for simple questions, one-line responses, or general chatter.
- **Prompt & Context Verification**:
  - Carefully parse the user's prompt to identify the exact requested action and expected behavior. Do not assume or perform actions not explicitly requested.
  - Base responses on concrete codebase evidence (files, code context, actual search/read results). Do not make assumptions or guess if facts/evidence are missing.
- **Continuous Rule Updates**:
  - For every prompt, evaluate if there is a required or beneficial behavior constraint or rule to note. If so, immediately propose adding it to this instruction file.
  - When the user says "keep in mind" or "remember this", locate all active instruction files (such as `AGENTS.md`) and immediately update them with the requested instructions.
- **No Unrequested Git Push**: Do NOT run `git push` or push changes to remote repositories until explicitly requested by the user.
- **Response Format Rules**:
  - Always write implementation plans and task specs using the template defined in `RESPONSE_TEMPLATE.md`.
