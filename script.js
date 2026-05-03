function copyEmail() {
  const email = "chriswangjob@163.com";

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(function () {
      alert("国内邮箱已复制：" + email);
    }).catch(function () {
      alert("国内邮箱：" + email);
    });
  } else {
    alert("国内邮箱：" + email);
  }
}
