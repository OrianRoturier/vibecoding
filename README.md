# BMAD Method Implementation

This is a basic implementation of the BMAD (Build Method with AI Development) method as described in the [BMAD documentation](https://docs.bmad-method.org/tutorials/getting-started/getting-started-bmadv6/).

## Features Implemented

- **Project Structure**: Basic BMAD project structure with `_bmad/` directory
- **Core Agents**: Analyst agent with workflow initialization
- **Workflow Management**: Phase tracking and document management
- **CLI Interface**: Command-line interface for BMAD operations

## Installation

1. Clone this repository or initialize a new project:
   ```bash
   npm init -y
   ```

2. Install dependencies:
   ```bash
   npm install js-yaml
   ```

3. Set up BMAD structure:
   ```bash
   mkdir -p _bmad/bmm/agents _bmad/bmm/workflows _bmad/core _bmad-output
   ```

## Usage

### Initialize a BMAD project
```bash
node index.js init
```

### Check workflow status
```bash
node index.js status
```

### Update workflow phase
```bash
node index.js phase Planning
node index.js phase Solutioning
node index.js phase Implementation
```

### Add documents to workflow
```bash
node index.js add-doc PRD
node index.js add-doc Architecture
```

## Project Structure

```
your-project/
├── _bmad/
│   ├── bmm/            # Method module
│   │   ├── agents/     # Agent files
│   │   ├── workflows/  # Workflow files
│   │   └── config.yaml # Module config
│   └── core/           # Core utilities
├── _bmad-output/       # Generated artifacts
├── index.js            # CLI entry point
└── package.json        # Node.js project file
```

## BMAD Phases

1. **Analysis** - Brainstorming and research (optional)
2. **Planning** - Create requirements and planning documents (required)
3. **Solutioning** - Design architecture and technical solutions (optional)
4. **Implementation** - Build the solution story by story (required)

## BMAD Tracks

- **Quick Flow** - For simple projects with clear scope
- **BMad Method** - For complex projects requiring full planning
- **Enterprise** - For large-scale projects with compliance needs

## Agents Implemented

- **Analyst** - Business analysis and research
  - Commands: `workflow-init`, `brainstorm-project`, `research`, `product-brief`, `document-project`

## Future Enhancements

- Implement additional agents (PM, Architect, SM, DEV)
- Add more workflow commands
- Enhance error handling and validation
- Add support for YAML configuration files
- Implement interactive prompts for user input

## License

This implementation is provided as-is for educational and demonstration purposes. For production use, refer to the official BMAD documentation and tools.

## References

- [BMAD Method Documentation](https://docs.bmad-method.org/)
- [BMAD v6 Getting Started](https://docs.bmad-method.org/tutorials/getting-started/getting-started-bmadv6/)