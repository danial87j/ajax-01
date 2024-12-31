let val;

document.getElementById("btn").addEventListener("click", function () {
  // Otp code generator
  val = Math.floor(1000 + Math.random() * 9000);
  console.log(val);
  
  // Creating the code section input
  const input = document.createElement("input");
  input.type = "number";
  input.name = "code";
  input.id = "code";
  input.className = "form-control";
  input.placeholder = "Enter The Code";
  input.style.marginTop = "10px";

  const btn = document.getElementById("btn");
  const parentDiv = document.querySelector(".form-group");

  // Insert the input before the button
  parentDiv.insertBefore(input, btn);
  
  // Removing the btn 
  btn.style.display = "none";

  // Creating the submit btn
  const submitInput = document.createElement("input");
  submitInput.type = "submit";
  submitInput.value = "Submit";
  submitInput.className = "btn btn-primary";
  submitInput.style.marginTop = "10px";

  // Adding the submit btn after inputs
  parentDiv.appendChild(submitInput);
});

document.querySelector("#form").addEventListener("submit", login);

function login(e) {
  e.preventDefault(); 
  // Selecting the inputs
  let inputValue = document.querySelector('input[name="code"]').value;
  let phoneNumber = document.querySelector('input[name="phone"]').value;

  // Check if the OTP code is correct
  if (inputValue == val) {
    // If the otp code is correct:
    Swal.fire({
      title: "Login Successful",
      text: "Welcome 😊.",
      icon: "success",
    });

    // Create Object
    let xhr = new XMLHttpRequest();
    // Open Req
    xhr.open("GET", "data.txt"); 

    // Load Req
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        let responseText = this.responseText;
        // Display the text from data.txt
        document.querySelector("#displayText").innerHTML = `<span>${phoneNumber} ${responseText}</span>`;
      } else if (xhr.status >= 400 && xhr.status < 500) {
        Swal.fire({
          title: "Oh shit..",
          text: "IDK WHAAT JUST HAPPEND 😭😭😭.",
          icon: "error",
        });
      } else if (xhr.status >= 500) {
        Swal.fire({
          title: "Server Error!",
          text: "Server Ghate 😊.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "😟!",
          text: "Yechizi Moshkel Dare Mitonam Hesesh Konam 🤔.",
          icon: "error",
        });
      }
    };

    xhr.onerror = function() {
      Swal.fire({
        title: "Network Error!",
        text: "Nettet Nabode 😓.",
        icon: "error",
      });
    };

    xhr.send(); // Send the request (BOOOOOM)
  } else {
    // If it's not correct:
    Swal.fire({
      title: "Error!",
      text: "The code you entered is incorrect.",
      icon: "error",
    });
  }
}
