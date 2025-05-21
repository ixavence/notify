# IXA Notify

**IXA Notify** is a minimalist and modern JavaScript notification system for web pages. It supports both in-page notifications and browser-native ones via the Notification API. You can also load notifications from JSON and XML files dynamically.

![preview](https://images.host.ixavence.org/notify.png)

---

## 🚀 Features

- ✅ Lightweight and dependency-free
- ✅ Multiple notifications shown in a stack (top-right corner)
- ✅ Light/Dark/Auto mode support
- ✅ In-page or system (native) notifications
- ✅ Optional image, link, and sound
- ✅ Dynamic loading from `.json` or `.xml` files

---

## 📦 File Structure

```bash
📁 ixa-notify/
├── index.html
├── styles.css
├── ixa-notify.js
├── notifs.json
└── notifs.xml
```

---

## 🛠 Installation

1. Clone or download this repository.
2. Include the files in your project:

```html
<link rel="stylesheet" href="styles.css">
<script src="ixa-notify.js"></script>
```

---

## 📖 Usage

### 🔔 Trigger a Notification

```js
IXANotify.notify({
  id: "example1",
  title: "Success!",
  desc: "This is an in-page notification.",
  image: "https://images.host.ixavence.org/logo.png",
  link: "https://example.com",
  sound: "", // optional
  duration: 4000, // in milliseconds
  type: "in-page", // or "notification"
  mode: "auto" // auto | dark | light
});
```

---

### 📄 Load from JSON

```js
IXANotify.loadFromJSON("notifs.json");
```

**Sample `notifs.json`:**

```json
[
  {
    "id": "from-json",
    "title": "From JSON",
    "desc": "Loaded using fetch from a .json file!",
    "image": "https://images.host.ixavence.org/logo.png",
    "link": "https://example.com",
    "duration": 4000,
    "type": "in-page",
    "mode": "light"
  }
]
```

---

### 📄 Load from XML

```js
IXANotify.loadFromXML("notifs.xml");
```

**Sample `notifs.xml`:**

```xml
<notifications>
  <notification id="from-xml">
    <title>From XML</title>
    <desc>Loaded using fetch from a .xml file!</desc>
    <link>https://example.com</link>
    <image>https://images.host.ixavence.org/logo.png</image>
    <sound></sound>
    <duration>4000</duration>
    <type>in-page</type>
    <mode>dark</mode>
  </notification>
</notifications>
```

---

## ✅ Requirements

- Modern browser with ES6+ support
- Notification permissions (for system mode)

---

## 📄 License

MIT © 2025 Ixavence