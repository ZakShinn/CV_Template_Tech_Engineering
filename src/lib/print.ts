/** Mở hộp thoại in trình duyệt (A4). Tự reset zoom màn hình khi in. */
export function printResume(): void {
  const root = document.documentElement;
  root.classList.add("is-printing");

  const cleanup = () => {
    root.classList.remove("is-printing");
    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);

  // Đợi class/CSS áp dụng trước khi mở dialog in
  requestAnimationFrame(() => {
    window.print();
  });
}
