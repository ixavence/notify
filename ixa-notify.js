const IXANotify = (() => {
    const containerId = "ixa-notify-container";

    function ensureContainer() {
        if (!document.getElementById(containerId)) {
            const container = document.createElement("div");
            container.id = containerId;
            document.body.appendChild(container);
        }
    }

    function notify(options) {
        let {
            id,
            title,
            desc,
            link,
            image,
            sound,
            duration,
            type = "in-page",
            mode = "auto"
        } = options;

        if (!id || !title || !desc || !duration) {
            console.error("Missing required fields");
            return;
        }

        if (type === "notification" && "Notification" in window) {
            if (Notification.permission === "granted") {
                const n = new Notification(title, {
                    body: desc,
                    icon: image || ""
                });
                if (sound) playSound(sound);
                if (link) n.onclick = () => window.open(link, "_blank");
            } else {
                Notification.requestPermission().then(perm => {
                    if (perm === "granted") notify(options);
                });
            }
            return;
        }

        ensureContainer();
        const container = document.getElementById(containerId);

        // Remove existing with same ID
        const existing = document.getElementById(id);
        if (existing) existing.remove();

        const el = document.createElement("div");
        el.className = "ixa-notify";
        el.id = id;

        if (mode === "dark") el.classList.add("dark");
        else if (mode === "light") el.classList.add("light");

        if (sound) playSound(sound);

        if (image) {
            const img = document.createElement("img");
            img.src = image;
            el.appendChild(img);
        }

        const content = document.createElement("div");
        content.className = "ixa-content";

        const h4 = document.createElement("h4");
        h4.textContent = title;
        content.appendChild(h4);

        const p = document.createElement("p");
        p.textContent = desc;
        content.appendChild(p);

        if (link) {
            const a = document.createElement("a");
            a.href = link;
            a.target = "_blank";
            a.textContent = "Open";
            content.appendChild(a);
        }

        el.appendChild(content);
        container.appendChild(el);

        setTimeout(() => {
            el.style.opacity = "0";
            el.style.transform = "translateX(30px)";
            setTimeout(() => el.remove(), 300);
        }, duration);
    }

    function playSound(url) {
        const audio = new Audio(url);
        audio.play().catch(() => { });
    }

    async function loadFromJSON(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            data.forEach(d => notify(d));
        } catch (err) {
            console.error("JSON load error", err);
        }
    }

    async function loadFromXML(url) {
        try {
            const res = await fetch(url);
            const xml = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(xml, "application/xml");

            const items = [...doc.querySelectorAll("notification")];
            items.forEach(item => {
                notify({
                    id: item.getAttribute("id"),
                    title: item.querySelector("title")?.textContent,
                    desc: item.querySelector("desc")?.textContent,
                    link: item.querySelector("link")?.textContent,
                    image: item.querySelector("image")?.textContent,
                    sound: item.querySelector("sound")?.textContent,
                    duration: parseInt(item.querySelector("duration")?.textContent || "4000"),
                    type: item.querySelector("type")?.textContent || "in-page",
                    mode: item.querySelector("mode")?.textContent || "auto"
                });
            });
        } catch (err) {
            console.error("XML load error", err);
        }
    }

    return {
        notify,
        loadFromJSON,
        loadFromXML
    };
})();
