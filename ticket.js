const form = $("form");

const dropArea = $("#drop-area");
const fileInput = $("#file-input");
//const uploadedImage = $(".uploaded-image");
const messageAction = $("#message-action");
const fileAction = $(".file-action");
const removeImage = $("#remove-image");
const changeImage = $("#change-image");
const uploadHint = $("#upload-hint");

const textInput = $(".required");

const formData = {
    image: '',
    name: '',
    email: '',
    githubUsername: ''
}

dropArea.addEventListener("click", function() {
    fileInput.click();
})

dropArea.addEventListener("dragover", function(event) {
    event.preventDefault();
    return;
})