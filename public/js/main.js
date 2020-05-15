document.addEventListener('DOMContentLoaded', () => {
    var data = $("form").on("submit", (e) => {
        e.preventDeafault();
    });
    $.post("/send", data);
});