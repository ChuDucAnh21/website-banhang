export function validateForm(data,status) {
  const errors = {};
  
  if(status === "register"){
        // Phone
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!data.phone) errors.phone = "Vui lòng nhập số điện thoại";
      else if (!phoneRegex.test(data.phone)) errors.phone = "Số điện thoại phải gồm 10-11 chữ số";
     // Confirm password
      if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Mật khẩu nhập lại không khớp";
      }
        // Name
      const nameRegex = /^[A-Za-zÀ-ỹ\s]{2,}$/; // cho phép tiếng Việt có dấu
      if (!data.name) errors.name = "Vui lòng nhập họ và tên";
      else if (!nameRegex.test(data.name)) errors.name = "Tên không hợp lệ";
      if (!data.confirmPassword) errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
  }
  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) errors.email = "Vui lòng nhập email";
  else if (!emailRegex.test(data.email)) errors.email = "Email không hợp lệ";

 

  // Password
//   const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!data.password) errors.password = "Vui lòng nhập mật khẩu";
 
//   else if (!passRegex.test(password)) {
//     errors.password =
//       "Mật khẩu phải ≥ 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt";
//   }

 

  return errors;
}