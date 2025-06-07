# Start Small

A modern web application for learning and exploring computer science algorithms.

## Project Structure

```
/
├── components/          # Reusable HTML components
│   ├── header.html     # Navigation header
│   ├── modal.html      # Modal dialog component
│   └── option-card.html # Card component for options
├── styles/             # CSS styles
│   ├── base/          # Base styles and variables
│   ├── components/    # Component-specific styles
│   └── utilities/     # Utility classes
├── scripts/           # JavaScript files
│   ├── components/    # Component logic
│   └── utils/         # Utility functions
├── templates/         # Page templates
└── assets/           # Static assets (images, etc.)
```

## Features

- Modern, responsive design
- Component-based architecture
- Reusable UI components
- Interactive algorithm visualizations
- Clean and maintainable code structure

## Setup

1. Clone the repository
2. Open any HTML file in your browser to view the application
3. No build process required - it's a static website

## Development

### Adding New Pages

1. Create a new HTML file in the root directory
2. Use the base template from `templates/base.html`
3. Add your content within the content block

### Adding New Components

1. Create component HTML in `components/`
2. Add component styles in `styles/components/`
3. Add component logic in `scripts/components/`

### Styling Guidelines

- Use CSS variables for colors and spacing
- Follow BEM naming convention for component classes
- Use utility classes for common styles
- Keep component styles modular and scoped

### JavaScript Guidelines

- Use ES6+ features
- Follow modular pattern
- Document code with JSDoc comments
- Keep components self-contained

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 