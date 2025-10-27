const openPdf = document.getElementById("openPdf");
const viewer = document.getElementById("pdf-viewer");
const backBtn = document.getElementById("backBtn");
const pdfFrame = document.getElementById("pdfFrame");

if (openPdf && viewer && pdfFrame && backBtn) {
  openPdf.addEventListener("click", () => {
    pdfFrame.src = "./rules-and-structure.pdf";
    viewer.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  backBtn.addEventListener("click", () => {
    viewer.style.display = "none";
    pdfFrame.src = "";
    document.body.style.overflow = "";
  });
}
