function getPageConfig() {
  const pageLang = document.documentElement.lang;

  if (pageLang === "en") {
    return {
      email: "easymoneysniperchris@gmail.com",
      copiedMessage: "Email copied: ",
      fallbackMessage: "Email: "
    };
  }

  return {
    email: "chriswangjob@163.com",
    copiedMessage: "邮箱已复制：",
    fallbackMessage: "邮箱："
  };
}

function copyEmail() {
  const config = getPageConfig();
  const email = config.email;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(function () {
      alert(config.copiedMessage + email);
    }).catch(function () {
      alert(config.fallbackMessage + email);
    });
  } else {
    alert(config.fallbackMessage + email);
  }
}
