const form = document.getElementById("studentForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const courseInput = document.getElementById("course");

const table = document.getElementById("studentTable");

let editRow = null;

// Form Submit

form.addEventListener("submit", function(e){

    e.preventDefault();

    clearErrors();

    if(validateForm()){

        if(editRow){

            updateStudent();

        }else{

            addStudent();

        }

        form.reset();

        editRow = null;

    }

});

// Validation

function validateForm(){

    let valid = true;

    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const course = courseInput.value.trim();

    // Name Validation
    if(name === ""){
        document.getElementById("nameError").innerText = "Full Name is required";
        valid = false;
    }

    // Email Validation
    if(email === ""){
        document.getElementById("emailError").innerText = "Email is required";
        valid = false;
    }
    else if(!email.includes("@")){
        document.getElementById("emailError").innerText = "Email must contain '@'";
        valid = false;
    }
    else{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
            document.getElementById("emailError").innerText = "Please enter a valid email address";
            valid = false;
        }
    }

    // Phone Validation
    if(phone === ""){
        document.getElementById("phoneError").innerText = "Phone Number is required";
        valid = false;
    }
    else if(!/^\d+$/.test(phone)){
        document.getElementById("phoneError").innerText = "Phone Number must contain only digits";
        valid = false;
    }
    else if(phone.length < 11){
        document.getElementById("phoneError").innerText = "Phone Number must be exactly 11 digits";
        valid = false;
    }
    else if(phone.length > 11){
        document.getElementById("phoneError").innerText = "Phone Number must be exactly 11 digits";
        valid = false;
    }

    // Course Validation
    if(course === ""){
        document.getElementById("courseError").innerText = "Course Name is required";
        valid = false;
    }

    return valid;
}
// Clear Errors

function clearErrors(){

    document.getElementById("nameError").innerText="";
    document.getElementById("emailError").innerText="";
    document.getElementById("phoneError").innerText="";
    document.getElementById("courseError").innerText="";

}

// Add Student

function addStudent(){

    const row=document.createElement("tr");

    row.innerHTML=`

    <td>${nameInput.value}</td>
    <td>${emailInput.value}</td>
    <td>${phoneInput.value}</td>
    <td>${courseInput.value}</td>

    <td>

        <button class="btn btn-warning btn-sm me-2 editBtn">

        Edit

        </button>

        <button class="btn btn-danger btn-sm deleteBtn">

        Delete

        </button>

    </td>

    `;

    table.appendChild(row);

}

// Delete & Edit Events

table.addEventListener("click",function(e){

    if(e.target.classList.contains("deleteBtn")){

        e.target.closest("tr").remove();

    }

    if(e.target.classList.contains("editBtn")){

        editRow=e.target.closest("tr");

        nameInput.value=editRow.cells[0].innerText;
        emailInput.value=editRow.cells[1].innerText;
        phoneInput.value=editRow.cells[2].innerText;
        courseInput.value=editRow.cells[3].innerText;

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    }

});

// Update Student

function updateStudent(){

    editRow.cells[0].innerText=nameInput.value;
    editRow.cells[1].innerText=emailInput.value;
    editRow.cells[2].innerText=phoneInput.value;
    editRow.cells[3].innerText=courseInput.value;

}