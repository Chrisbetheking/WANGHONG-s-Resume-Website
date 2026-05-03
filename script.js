function copyEmail() {
  const email = "easymoneysniperchris@gmail.com";

  navigator.clipboard.writeText(email).then(function () {
    alert("邮箱已复制：" + email);
  }).catch(function () {
    alert("邮箱：" + email);
  });
}
