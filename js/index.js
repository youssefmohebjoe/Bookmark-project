
var bMName = document.getElementById("bMName");
var bMUrl = document.getElementById("bMUrl");
var exampleModal = document.getElementById("exampleModal");

var arrItems = [];
if (localStorage.getItem("items") != null) {
    arrItems = JSON.parse(localStorage.getItem("items"));
    displayItems()
}
function createItems() {
    var inputs = {
        text: bMName.value,
        url: bMUrl.value,
    };
    if (bMName.classList.contains("is-valid") && bMUrl.classList.contains("is-valid")) {


        arrItems.push(inputs);
        localStorage.setItem("items", JSON.stringify(arrItems))

        clearForm()
        displayItems()
    }
    else {
        exampleModal.classList.remove("d-none")
    }
    bMName.classList.remove("is-valid");
    bMUrl.classList.remove("is-valid");
}
function clearForm() {
    bMName.value = null;
    bMUrl.value = null;
}
function displayItems() {
    var cartona = ``;
    for (var i = 0; i < arrItems.length; i++) {
        cartona += `
        <tr>
  <td>${i + 1}</td>
  <td><p> <i class="me-2 fa-brands fa-${arrItems[i].text.toLowerCase()}"></i>${arrItems[i].text}</p></td>
  <td> <a href="${arrItems[i].url}" target="_blank"><button class=" btn a-visit px-3 text-white"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
  <td><button onclick="deleteItems(${i})" class=" btn btn-danger px-3 text-white"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
  </tr>`
    }
    document.getElementById("content").innerHTML = cartona
}
function deleteItems(deletedIndex) {
    arrItems.splice(deletedIndex, 1);
    localStorage.setItem("items", JSON.stringify(arrItems));
    displayItems();
}

function validateItems(element) {
    console.log(element.nextElementSibling);
    var rejex = {
        bMName: /^[a-zA-Z0-9\s]{3,}$/,
        bMUrl: /^((http|https):\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/,
    }
    if (rejex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block","d-none");

    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none","d-block");
    }

}
