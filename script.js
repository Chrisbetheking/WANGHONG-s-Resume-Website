function copyEmail() {
  const email = "easymoneysniperchris@gmail.com";

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(function () {
      alert("邮箱已复制：" + email);
    }).catch(function () {
      alert("邮箱：" + email);
    });
  } else {
    alert("邮箱：" + email);
  }
}
