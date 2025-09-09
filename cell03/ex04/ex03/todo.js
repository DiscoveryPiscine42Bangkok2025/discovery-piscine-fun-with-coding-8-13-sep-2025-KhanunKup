$(document).ready(function () {
    // โหลดจาก cookie
    let saved = getCookie("todos");
    if (saved) {
        let todos = JSON.parse(saved);
        todos.forEach(text => addTodo(text, false));
    }

    // ปุ่ม New List
    $("#newBtn").on("click", function () {
        let text = prompt("Enter new TO DO:");
        if (text && text.trim() !== "") {
            addTodo(text.trim(), true);
        }
    });
});

function addTodo(text, save) {
    let $ft_list = $("#ft_list");

    // สร้าง div ใหม่
    let $div = $("<div></div>")
        .addClass("todo")
        .text(text)
        .on("click", function () {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

    // แทรกไว้ด้านบนสุด
    $ft_list.prepend($div);

    if (save) saveTodos();
}

function saveTodos() {
    let todos = [];
    $("#ft_list").children().each(function () {
        todos.push($(this).text());
    });
    setCookie("todos", JSON.stringify(todos), 7);
}

function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cname = name + "=";
    let decoded = decodeURIComponent(document.cookie);
    let ca = decoded.split(";");
    for (let c of ca) {
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}
