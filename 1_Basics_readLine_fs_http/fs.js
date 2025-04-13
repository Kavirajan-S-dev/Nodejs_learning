const fs = require("fs");

// ---------- Synchronous ----------
try {
    const file = fs.readFileSync("my.txt", "utf-8");
    console.log("Sync Read:\n", file);

    fs.writeFileSync("my.txt", file + "\nnew txt", "utf-8");
    console.log("Sync Write: File updated with 'new txt'");
} catch (err) {
    console.error("Sync Error:", err);
}

// ---------- Asynchronous ----------
fs.readFile("my.txt", "utf-8", (err, data) => {
    if (err) {
        return console.error("Async Read Error:", err);
    }

    console.log("Async Read:\n", data);

    const updatedData = data + "\nDemo";

    fs.writeFile("my.txt", updatedData, "utf-8", (err) => {
        if (err) {
            return console.error("Async Write Error:", err);
        }
        console.log("Async Write: File updated with 'Demo'");
    });
});
