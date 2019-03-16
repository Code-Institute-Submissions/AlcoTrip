var loader;

function myFunction() {
  loader = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("page_loader").style.display = "block";
}