const packagesUrl = import.meta.url.replace(/(.+)\/.+/, "$1");

const appendSrouce = (src, type = "script") => {
  return new Promise((res) => {
    let ele;
    switch (type) {
      case "script": {
        const script = (ele = document.createElement("script"));
        script.src = src;
        break;
      }
      case "module": {
        const script = (ele = document.createElement("script"));
        script.type = "module";
        script.src = src;
        break;
      }
      case "link": {
        const link = (ele = document.createElement("link"));
        link.rel = "stylesheet";
        link.href = src;
        break;
      }
    }

    ele.onload = () => {
      res();
    };

    document.head.append(ele);
  });
};

appendSrouce("/statics/css/public.css", "link");

if (localStorage.__isDark === "1") {
  document.body.parentNode.classList.add("dark");
}

Promise.all([
  fetch(configUrl).then((e) => e.json()),
  appendSrouce(
    "https://cdn.jsdelivr.net/gh/kirakiray/ofa.js@4.3.43/dist/ofa.min.js"
  ),
])
  .then(([data]) => {
    window.navsData = data;
  })
  .then(() => {
    // 初始化逻辑
    lm.config({
      alias: {
        "@pui-web": packagesUrl,
      },
    });

    return Promise.all([
      appendSrouce(
        "https://cdn.jsdelivr.net/gh/kirakiray/ofa.js@4.3.43/libs/scsr/dist/scsr.min.js"
      ),
      appendSrouce("http://127.0.0.1:5547/init.js", "module"),
    ]);
  });
appendSrouce(
  "https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js"
);
appendSrouce("http://127.0.0.1:5547/packages/css/public.css", "link");
