

export const apiFetch = async (url, options = {}) => {
  // gọi API bình thường
  let res = await fetch(url, {
    ...options,
    //  credentials: "include", // để gửi cookie (accessToken, refreshToken)
  });
   console.log("res.status",res.status)
  // Nếu accessToken hết hạn → 401
  if (res.status === 401) {
      console.log("lấy lại accessToken")
      console.warn("AccessToken expired → try refresh...");

      // gọi refresh token endpoint lấy accessToken mới
      const dt = await fetch("/api/user/refreshAccessToken", {
          method: "GET",
          credentials: "include",
      });
      if (!dt.ok) throw new Error("Failed to get accessToken user , Unauthorized - Please login again");
      const dataRefresh = await dt.json();
      const accessTokenNew = dataRefresh.data.accessToken
      

    if (dt.ok) {
        console.log("Refresh success → retry original request");
         //lưu accessToken mới vào localStorage để kiểm tra trong layout.jsx
        localStorage.setItem("accessToken", accessTokenNew);
        // thử lại request gốc với token mới
        res = await fetch(url, {
          ...options,
          headers:{
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessTokenNew}`,
          }
        });
        if(!res.ok) throw new Error("Lỗi : call Api failed ");
    } else {
      try {
        await fetch("/api/user/logout",{
          method:"POST"
        })
      } catch (error) {
        console.error("Logout failed->Please re-load page");
      }
      console.error("Refresh failed → logout user");
      throw new Error("Unauthorized - Please login again");
    }
  }
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    // Nếu server không trả JSON (ví dụ 204 No Content) → trả null
    return null;
  }
  // parse JSON
  const data = await res.json();
  return data;
};
