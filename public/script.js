function openNav() {
    if (window.innerWidth < 768) {
        document.getElementById("sidenav").style.width = "250px";
        document.getElementById("sidenav").style.height = "250px";
    } else {
        document.getElementById("sidenav").style.width = "250px";
    }
}

function closeNav() {
    if (window.innerWidth < 768) {
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("sidenav").style.height = "0";
    } else {
        document.getElementById("sidenav").style.width = "0";
    }
}

document.getElementById("startBtn").addEventListener("click", function (event) {
    event.preventDefault();

    const btn = document.getElementById("startBtn");
    btn.style.pointerEvents = "none";
    document.getElementById("generate").innerText = "Генерация...";

    const input_data = {
        "Тема занятия": document.getElementById("topic").value.trim(),
        "Модуль": document.getElementById("module").value.trim(),
        "Специальность": document.getElementById("specialty").value.trim(),
        "Курс, группа": document.getElementById("group").value.trim(),
        "Тип занятия": document.getElementById("type").value.trim(),
        "Продолжительность": document.getElementById("duration").value.trim(),
        "Виды деятельности": document.getElementById("activities").value.trim()
    };

    fetch("/generate-plan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input_data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Ответ от сервера:", data);

            if (data.status === "success" && data.preview_path) {
                const previewContainer = document.getElementById("preview-container");
                previewContainer.style.height = "100%";
                previewContainer.innerHTML = `
                    <img src="${data.preview_path}" id="previewImage" alt="Превью PDF" class="preview-img" />
                    <a href="/download-pdf">
                        <button id="downloadBtn" type="button" class="pushable">
                            <span class="front">Скачать план</span>
                        </button>
                    </a>
                `;

                const preview = document.getElementById("previewImage");
                const closeBtn = document.getElementById("close");
                const modal = document.getElementById("modal");
                const modalImg = document.getElementById("modalImage");

                preview.onclick = function () {
                    modal.style.display = "block";
                    modalImg.style.display = "block";
                    modalImg.src = this.src;
                };

                closeBtn.onclick = function () {
                    modal.style.display = "none";
                }

            } else {
                alert(data.message || "Ошибка при генерации.");
            }
        })
        .catch(error => {
            console.error("Ошибка при отправке:", error);
            alert("Ошибка при отправке формы.");
        })
        .finally(() => {
            btn.style.pointerEvents = "auto";
            document.getElementById("generate").innerText = "Сгенерировать план";
        });
})

const modal = document.getElementById("modal");

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}