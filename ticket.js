document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded!"); 
        // Confirm script is loaded

    const form = document.getElementById("ticket-form");
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const uploadedImage = document.getElementById("uploaded-image");
    const messageAction = document.getElementById("message-action");
    const fileAction = document.getElementById("file-action");
    const removeImage = document.getElementById("remove-image");
    const changeImage = document.getElementById("change-image");
    const uploadHint = document.getElementById("upload-hint");
    const textInputs = document.querySelectorAll(".required");

    const formData = {
        image: '',
        name: '',
        email: '',
        githubUsername: ''
    };

    // Validate text inputs
    function validateTextInput() {
        let isValid = true;

        textInputs.forEach(input => {
            const hint = input.nextElementSibling;

            if (input.value.trim() === "") {

                input.classList.add("error");
                hint.classList.add("error");
                isValid = false;
            } 
            
            else {

                input.classList.remove("error");
                hint.classList.remove("error");
            }
        });

        return isValid;
    }

    // Validate file input
    function validateFile(input, hint) {
        const file = input.files[0];
        let isValid = true;

        if (!file) {

            hint.classList.add("error");
            hint.innerHTML = `<img src="./assets/images/icon-info.svg" alt="icon-info">Please upload an image`;
            isValid = false;
        } 
        
        else {

            const validTypes = ["image/jpeg", "image/png", "image/jpg"];
            const maxSize = 500 * 1024; // 500 KB

            if (!validTypes.includes(file.type)) {

                hint.classList.add("error");
                hint.innerHTML = `<img src="./assets/images/icon-info.svg" alt="icon-info">Upload a JPG or PNG photo`;
                input.value = ''; // Reset file input
                isValid = false;
            } 
            
            else if (file.size > maxSize) {

                hint.classList.add("error");
                hint.innerHTML = `<img src="./assets/images/icon-info.svg" alt="icon-info">Please upload a photo under 500 KB`;
                input.value = ''; // Reset file input
                isValid = false;
            } 
            
            else {

                hint.classList.remove("error");
                hint.innerHTML = `<img src="./assets/images/icon-info.svg" alt="icon-info">File uploaded successfully!`;
                displayUploadedImage(file);
            }
        }

        return isValid;
    }

    // Display uploaded image
    function displayUploadedImage(file) {

        const reader = new FileReader();

        reader.onload = function (event) {
            uploadedImage.src = event.target.result; // Set image source
            fileAction.classList.add("show");
            messageAction.classList.add("hide");
        };

        reader.readAsDataURL(file);
    }

    // Reset upload inputs
    function resetUpload() {

        const defaultUploadIcon = "./assets/images/icon-upload.svg";
        fileInput.value = ''; // Reset file input value
        uploadedImage.src = defaultUploadIcon; // Reset image source
        messageAction.classList.remove("hide");
        fileAction.classList.remove("show");
        uploadHint.classList.remove("error");
        uploadHint.innerHTML = `<img src="./assets/images/icon-info.svg" alt="icon-info">Upload your photo (JPG or PNG, max size: 500KB).`;
    }

    // Store and display form data
    function storeAndDisplayFormData() {
        formData.image = uploadedImage.src;
        formData.name = document.getElementById("full-name").value.trim();
        formData.email = document.getElementById("email").value.trim();
        formData.githubUsername = document.getElementById("github").value.trim();

        document.getElementById("header-name").textContent = formData.name;
        document.getElementById("display-name").textContent = formData.name;
        document.getElementById("display-email").textContent = formData.email;
        document.getElementById("display-github").textContent = formData.githubUsername;
        document.getElementById("display-image").src = formData.image;
    }

    // Event: Click on drop area
    dropArea.addEventListener("click", function () {
        fileInput.click();
    });

    // Event: Dragover on drop area
    dropArea.addEventListener("dragover", function(event) {
        event.preventDefault();
        return
    });

    // Event: Drop on drop area
    dropArea.addEventListener("drop", function(event) {
        event.preventDefault();

        const files = event.dataTransfer.files;

        if (files.length > 0) {
            /*const dataTransfer = new DataTransfer();
            dataTransfer.items.add(files[0]); // Add the dropped file to DataTransfer*/
            fileInput.files = files;
            validateFile(fileInput, uploadHint);
        }
    });

    // Event: Change file input
    fileInput.addEventListener("change", function () {
        validateFile(fileInput, uploadHint);
    });

    // Event: Remove image
    removeImage.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        resetUpload();
    });

    // Event: Change image
    changeImage.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        fileInput.click();
    });

    // Event: Form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const isTextValid = validateTextInput();
        const isFileValid = validateFile(fileInput, uploadHint);

        if (isTextValid && isFileValid) {

            storeAndDisplayFormData();
            document.getElementById("form-content").classList.add("hide");
            document.getElementById("display-data").classList.add("show");
        }
    });
});