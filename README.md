# DockPilot

![DockPilot Logo](/public/dockpilot-logo.png)


Simple, intuitive Docker management for developers and teams. Access, control, and monitor your containerized applications through an elegant web interface.

## Simple Docker Management

DockPilot is a web-based Docker management platform that simplifies container workflows with an intuitive interface. Easily manage containers, images, and system resources without using complex command-line interfaces.

## Features

- **Container Management**: Start, stop, restart, and delete containers with a single click.
- **Image Management**: Browse, pull, and manage Docker images efficiently.
- **Resource Monitoring**: Monitor CPU, memory, and disk usage in real-time.
- **Interactive Terminal**: Access container terminals directly from your browser.
- **Quick Actions**: Execute common Docker operations with one click.
- **Container Lab**: Experiment with pre-configured templates in a safe environment.

## Getting Started

### Prerequisites

- Docker Engine installed and running
- Node.js (v14+)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/dock-pilot.git
cd dock-pilot
```

2. Install dependencies
```bash
npm install
```

3. Start the application
```bash
npm start
```

4. Access the application at `http://localhost:3000`

## Container Lab

The Container Lab feature allows you to quickly deploy containers from predefined templates for:

- MySQL
- PostgreSQL
- Nginx
- WordPress
- Redis
- MongoDB
- And more...

## Project Structure

```
dock-pilot/
├── views/              # HTML templates
├── utils/              # Utility scripts
├── nginx/              # Nginx configuration and HTML files
├── server.js           # Main server file
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

## Technologies Used

- Node.js
- Express
- Docker API
- Tailwind CSS
- Font Awesome

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Docker API documentation
- Tailwind CSS team
- Font Awesome team