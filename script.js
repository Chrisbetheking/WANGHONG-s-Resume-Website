function getCurrentEmail() {
  const pageLang = document.documentElement.lang;

  if (pageLang === "en") {
    return "easymoneysniperchris@gmail.com";
  }

  return "chriswangjob@163.com";
}

function copyEmail() {
  const email = getCurrentEmail();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(function () {
      alert("Email copied: " + email);
    }).catch(function () {
      alert("Email: " + email);
    });
  } else {
    alert("Email: " + email);
  }
}
