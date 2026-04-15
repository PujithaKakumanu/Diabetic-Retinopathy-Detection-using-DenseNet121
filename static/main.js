// ========================================================
// Get Elements (Matching Current HTML)
// ========================================================

document.addEventListener("DOMContentLoaded", function () {

    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("imageInput");
    const preview = document.getElementById("preview");
    const resultCard = document.getElementById("resultCard");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const clearBtn = document.getElementById("clearBtn");

    // ===============================
    // Drag and Drop
    // ===============================

    dropZone.addEventListener("click", function () {
        fileInput.click();
    });

    dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZone.classList.remove("dragover");

        const file = e.dataTransfer.files[0];
        if (file) {
            fileInput.files = e.dataTransfer.files;
            previewFile(file);
        }
    });

    // ===============================
    // File Selection
    // ===============================

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            previewFile(file);
        }
    });

    // ===============================
    // Analyze Button
    // ===============================

    analyzeBtn.addEventListener("click", function () {

        const file = fileInput.files[0];

        if (!file) {
            alert("Please upload an image first.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            predictImage(reader.result);
        };

        reader.readAsDataURL(file);
    });
    
    clearBtn.addEventListener("click", function(){

    fileInput.value = "";

    preview.src = "";
    preview.style.display = "none";

    resultCard.style.display = "none";

});

    // ===============================
    // Preview Function
    // ===============================

    function previewFile(file) {

        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
            resultCard.style.display = "none";
        };

        reader.readAsDataURL(file);
    }

});

// ========================================================
// Backend Prediction (UNCHANGED LOGIC)
// ========================================================

function predictImage(image) {

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Server error");
        }
        return response.json();
    })
    .then(data => {
        displayResult(data);
    })
    .catch(error => {
        alert("Oops! Something went wrong.");
        console.error(error);
    });
}

// ========================================================
// Display Result
// ========================================================

function displayResult(data) {

    const resultCard = document.getElementById("resultCard");

    const stage = data.result;
    const probability = data.probability;

    // Stage descriptions
    const stageDescriptions = {
        "No DR": {
            description: "No signs of diabetic retinopathy detected. Continue regular eye examinations and maintain good diabetes control.",
            color: "result-success"
        },
        "Mild": {
            description: "Early signs of diabetic retinopathy detected. Schedule a follow-up eye exam with an ophthalmologist for further evaluation.",
            color: "result-warning"
        },
        "Moderate": {
            description: "Moderate diabetic retinopathy detected. Urgent medical consultation is recommended for treatment evaluation.",
            color: "result-warning"
        },
        "Severe": {
            description: "Severe diabetic retinopathy detected. Immediate medical consultation with an eye specialist is strongly recommended.",
            color: "result-danger"
        },
        "Proliferative DR": {
            description: "Proliferative diabetic retinopathy detected. This is a critical condition requiring immediate professional medical intervention.",
            color: "result-danger"
        }
    };

    const stageInfo = stageDescriptions[stage] || {
        description: "Invalid or non-retina image detected.",
        color: "result-danger"
    };

    resultCard.className = "result-card " + stageInfo.color;

    resultCard.innerHTML = `
        <h3>Predicted Stage: ${stage}</h3>
        <p><strong>Confidence:</strong> ${probability}</p>
        <p style="margin-top:15px;">${stageInfo.description}</p>
        <hr style="margin:20px 0;">
        <p style="font-size:14px; opacity:0.8;">
            Analysis complete. Please consult with a qualified ophthalmologist for confirmation and treatment planning.
        </p>
    `;

    resultCard.style.display = "block";
}

