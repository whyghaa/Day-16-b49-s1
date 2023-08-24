function submitData() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("input-phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("massage").value;
  
    if (name == "") {
      return alert("Nama harus diisi!");
    } else if (email == "") {
      return alert("Email harus diisi!");
    } else if (phone == "") {
      return alert("Phone harus diisi!");
    } else if (subject == "") {
      return alert("Subject harus dipilih!");
    } else if (message == "") {
      return alert("Message harus diisi!");
    }
  
    confirm("Is the data you entered correct?");
  
    let emailReceiver = "rangganurwahyu22@gmail.com";
  
    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo, nama saya ${name}, ${message}, silakan kontak saya pada nomor ${phone}`;
    a.click();
  
    let data = { name, email, phone, subject, message };
  
    console.log(data);
  }
  