# Web Hook Echo UI Dashboard 

A modern, lightweight, and user-friendly dashboard for receiving, visualizing, and managing webhook events. This project provides a real-time interface to inspect incoming webhooks, configure custom responses, and view event logs.

![Webhook Dashboard Screenshot](/documentation/preview.png)

---

## 🚀 Features

- **Real-Time Webhook Monitoring**: View incoming webhooks in real-time with method-specific styling.
- **Customizable Responses**: Configure custom headers, response bodies, and cookies for testing.
- **Tab Navigation**: Easy-to-use tabs for dashboard, configuration, and logs.
- **Light/Dark Theme Toggle**: Switch between light and dark themes for your preferred UI experience.
- **Dynamic UI**: Automatically updates as new webhook requests are received.

---

## 🛠️ Technology Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js (Socket.io for real-time updates)
- **Styling**: Responsive design with light/dark mode support
- **Icons**: Font Awesome

---

## 📦 Installation

1. Clone this repository:

```bash
git clone https://github.com/zanoshky/weky.git

cd weky
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

## 📖 Usage

1. Start the server as described in the installation steps.

1. Send a webhook to the server endpoint (e.g., via Postman or a third-party service).

1. Monitor and analyze the incoming requests on the Dashboard tab.

1. Configure custom responses in the Configuration tab.

1. (Coming soon) View logs in the Logs tab.

## 🌟 Key Components

1. Dashboard
   - Displays incoming webhook requests in a visually appealing card-based UI.
   - Includes request details such as method, headers, and body.

1. Configuration
   - Customize response settings like headers, body, and cookies for testing webhooks.

1. Logs
   - Placeholder for storing and viewing historical webhook
