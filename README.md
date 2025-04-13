# Node.js & Express.js Project

## Table of Contents
- [About](#about)
- [Key Features](#key-features)
- [Node.js Core Concepts](#nodejs-core-concepts)
  - [Event System](#event-system)
  - [Event Loop](#event-loop)
- [NPM (Node Package Manager)](#npm-node-package-manager)
  - [package.json Overview](#packagejson-overview)
- [Express.js Overview](#expressjs-overview)
  - [Application Structure](#application-structure)
  - [Request & Response Objects](#request--response-objects)
  - [Express Middleware](#express-middleware)
- [Getting Started](#getting-started)
- [License](#license)

---

## About
Node.js is a JavaScript runtime environment that executes code outside of a web browser. It uses Chrome’s V8 engine and is designed for scalable, real-time, and data-intensive applications.

---

## Key Features

### Node.js
- **Asynchronous, Event-Driven Architecture**: Non-blocking operations enable high concurrency.
- **Single-Threaded Event Loop**: Efficient handling of I/O using a single-threaded model.
- **NPM (Node Package Manager)**: Handles libraries, tools, and dependency management.

### Express.js
- Lightweight framework for building APIs and web apps.
- Simplifies routing, middleware usage, and dynamic content rendering.

---

## Node.js Core Concepts

### Event System
- **EventEmitter**: Core class for emitting and listening to events.
- **Event Listener**: Function registered to respond to emitted events.
- **Event Handler**: Callback executed when an event is detected.
- **Event Flow**: Emission → Listener detects → Handler executes.

### Event Loop
- Continuously checks the event queue to handle asynchronous callbacks.
- Enables non-blocking I/O operations.

---

## NPM (Node Package Manager)

### Purpose
- Manage project dependencies and development tools.

### Functions
- Initialize a project: `npm init`
- Install a package: `npm install <package-name>`
- Uninstall a package: `npm uninstall <package-name>`
- Global installation: `npm install -g <package-name>`

---

## package.json Overview

### Key Sections
- **name**: Project name
- **version**: Version info
- **main**: Entry point file (e.g., `index.js`)
- **scripts**: Custom command scripts (e.g., start, test)
- **dependencies**: Production packages
- **devDependencies**: Development-only packages
- **license**: Project licensing info

---

## Express.js Overview

### Application Structure
- `express()`: Initialize the app.
- `express.json()`: Middleware to parse JSON request bodies.
- `express.static()`: Serve static assets.
- `express.Router()`: Create modular route handlers.

### Application Methods
- `app.get()`, `app.post()`, etc.: Handle HTTP requests.
- `app.listen(port)`: Start server on specified port.

---

## Request & Response Objects

### Request (`req`)
- `req.body`: Access request body data.
- `req.params`: Access URL parameters.
- `req.query`: Access query string values.

### Response (`res`)
- `res.send()`: Send plain text or HTML.
- `res.json()`: Send JSON data.
- `res.status()`: Set HTTP status code.
- `res.redirect()`: Redirect to another URL.

---

## Express Middleware

### Purpose
- Functions that operate between request and response cycles.
- Common uses: Logging, authentication, error handling.

### Behavior
- Can modify request and response objects.
- Must call `next()` to pass control to the next middleware.

---

## Getting Started

