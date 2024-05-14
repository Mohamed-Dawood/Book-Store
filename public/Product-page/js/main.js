// ********** Start Products **********

let container = document.getElementById("container");
// console.log(container);
let myData;
async function fetchBooks() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/getbooks/");
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }
    let { orders, count } = await res.json();
    myData = orders;

    myData.sort((a, b) => b.rating - a.rating);

    // console.log(orders);
    displayBooks(orders);

    initializeSorting();
  } catch (error) {
    console.error("Error fetching books:", error);
    container.innerHTML =
      "<p>Failed to fetch data. Please try again later.</p>";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
});

// function displayBooks(book) {
//   let m = "";
//   for (let i = 0; i < book.length; i++) {
//     m += `        <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
//     <div class="product">
//       <div class="img ">
//         <img src="${book[i].image}" alt="" />
//         ${book[i].onsale ? `<span>-10%</span>` : ""}
//         <ul>
//         <li onclick="addDataToWishlist(${i})">
//             <i class="fa-solid fa-heart"></i>
//         </li>
//         <li onclick="showBookInfo(${i})">
//             <i class="fa-solid fa-eye"></i>
//         </li>
//             <li>
//                 <i class="fas fa-retweet"></i>
//             </li>
//             <li onclick="addDataToShoppingCart(${i})">
//             <i class="fas fa-cart-plus"></i>
//         </li>
//         </ul>
//       </div>
//       <div class="info ">
//         <h2>${book[i].name}</h2>
//         <h4>${book[i].author}</h4>
//         <section>
//           <p>${book[i].rating}</p>
//           <p>${book[i].type}</p>
//           <p>$${book[i].price}</p>
//         </section>
//       </div>
//     </div>
//   </div>`;
//   }
//   container.innerHTML = m;
// }
// ********** End Products **********

// ********** Start Wish List **********
function displayBooks(book) {
  let m = "";
  let filterCategory = document.querySelector(".filter li.active").dataset.cat;

  for (let i = 0; i < book.length; i++) {
    // Check if the book type matches the selected filter category
    if (
      filterCategory === ".all" ||
      book[i].type.toLowerCase() === filterCategory.slice(1)
    ) {
      m += `        
      <div class="col-lg-3 col-md-6 col-sm-12 mb-4 ${book[
        i
      ].type.toLowerCase()}">
        <div class="product">
          <div class="img">
            <img src="${book[i].image}" alt="" />
            ${book[i].onsale ? `<span>-10%</span>` : ""}
            <ul>
              <li onclick="addDataToWishlist(${i})">
                <i class="fa-solid fa-heart"></i>
              </li>
              <li onclick="showBookInfo(${i})">
                <i class="fa-solid fa-eye"></i>
              </li>
              <li>
                <i class="fas fa-retweet"></i>
              </li>
              <li onclick="addDataToShoppingCart(${i})">
                <i class="fas fa-cart-plus"></i>
              </li>
            </ul>
          </div>
          <div class="info">
            <h3>${book[i].name}</h3>
            <h4>${book[i].author}</h4>
            <section>
            <p class="price">$${book[i].price}</p>
              <p>Rating:${book[i].rating}</p>
            </section>
          </div>
        </div>
      </div>`;
    }
  }
  container.innerHTML = m;
}
let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

function addDataToWishlist(index) {
  if (index >= 0 && index < myData.length) {
    const itemToAdd = myData[index];

    if (!wishList.includes(itemToAdd)) {
      wishList.push(itemToAdd);
      saveDataToLocalStorage(wishList);
      displayWishListItems();
    }
  }
}

function addDataToShoppingCart(index) {
  if (index >= 0 && index < myData.length) {
    const itemToAdd = myData[index];

    if (!shoppingCart.includes(itemToAdd)) {
      shoppingCart.push(itemToAdd);
      saveDataToLocalStorage(shoppingCart);
      displayShoppingCartItems();
    }
  }
}

// start wish list
let wishList_Page = document.getElementById("wishList");
let wishListIcon = document.querySelector(".wishListIcon");
let closeWishList = document.getElementById("closeWishList");
let products = document.querySelector(".products");
wishListIcon.addEventListener("click", () => {
  wishList_Page.style.right = "0";
  products.style.display = "none";
});
closeWishList.addEventListener("click", () => {
  wishList_Page.style.right = "-100%";
  products.style.display = "block";
});

function displayWishListItems() {
  let w = "";
  for (let i = 0; i < wishList.length; i++) {
    w += `<tr>
    <td>
      <img src="${wishList[i].image}" alt="" />
    </td>
    <td><h5>${wishList[i].name}</h5></td>
    <td><h4>${wishList[i].author}</h4></td>
    <td><p>Price: $${wishList[i].price}</p></td>
    <td><p>Rating: ${wishList[i].rating}</p></td>
    <td><button class="btn btn-danger" onclick="removeFromWishList(${i})">Delete</button></td>
  </tr>`;
  }
  document.querySelector(".wishListTable").innerHTML = w;
}
displayWishListItems();

function removeFromWishList(index) {
  wishList.splice(index, 1);
  displayWishListItems();
  saveDataToLocalStorage(wishList);
}

let wishListClearAll = document.getElementById("wishListClearAll");
wishListClearAll.addEventListener("click", ClearAllWishList);
function ClearAllWishList() {
  wishList = [];
  displayWishListItems();
  saveDataToLocalStorage(wishList);
}

// ********** End Wish List **********

// ********** Start Shopping Cart **********
let shoppingCartPage = document.querySelector(".shoppingCartPage");
let shoppingCartIcon = document.querySelector(".shoppingCartIcon");
let closeShoppingCart = document.querySelector(".closeShoppingCart");
shoppingCartIcon.addEventListener("click", () => {
  shoppingCartPage.style.top = "0";
  products.style.display = "none";
});
closeShoppingCart.addEventListener("click", () => {
  shoppingCartPage.style.top = "-100%";
  products.style.display = "block";
});

function displayShoppingCartItems() {
  let s = "";
  for (let i = 0; i < shoppingCart.length; i++) {
    s += `<tr>
    <td>
      <img src="${shoppingCart[i].image}" alt="" />
    </td>
    <td><h5>${shoppingCart[i].title}</h5></td>
    <td><h4>${shoppingCart[i].author}</h4></td>
    <td><p>Price: $34</p></td>
    <td><p>rating:4</p></td>
    <td><button class="btn btn-danger" onclick="removeFromShoppingCart(${i})">Delete</button></td>
  </tr>`;
  }
  document.querySelector(".shoppingCartTable").innerHTML = s;
}
displayShoppingCartItems();

function removeFromShoppingCart(index) {
  shoppingCart.splice(index, 1);
  displayShoppingCartItems();
  saveDataToLocalStorage(shoppingCart);
}

let shoppingCartClearAll = document.getElementById("shoppingCartClearAll");
shoppingCartClearAll.addEventListener("click", ClearShoppingCart);
function ClearShoppingCart() {
  shoppingCart = [];
  displayShoppingCartItems();
  saveDataToLocalStorage(shoppingCart);
}

function saveDataToLocalStorage(data) {
  localStorage.setItem(
    data === wishList ? "wishList" : "shoppingCart",
    JSON.stringify(data)
  );
}
// ********** End Shopping Cart **********

// ********** Start Show Book Info **********

function showBookInfo(index) {
  if (index >= 0 && index < myData.length) {
    const book = myData[index];
    Swal.fire({
      title: `${book.name}`,
      text: `${book.author}`,
      imageUrl: `${book.image}`,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: `${book.name}`,
      html: `
        <div>
          <p>${book.author}</p>
          <p>Price: $${book.price}</p>
          <p>type: ${book.type}</p>
          <p>Rating: ${book.rating}</p>
          <p>Number of Sales: ${book.sales}</p>
        </div>`,
    });
  }
}
// ********** End Show Book Info **********

// ********** Start Filter  **********
document.querySelectorAll(".filter li").forEach((item) => {
  item.addEventListener("click", function () {
    // Remove the active class from all filter list items
    document.querySelectorAll(".filter li").forEach((li) => {
      li.classList.remove("active");
    });
    // Add the active class to the clicked filter list item
    this.classList.add("active");

    // Call the displayBooks function with the updated filter category
    displayBooks(myData);
  });
});
// ********** End Filter  **********
// ********** Start Sorting  **********
// Function to sort books based on the selected sorting option
function sortBooks() {
  let sortingOption = document.getElementById("sortOption").value;
  if (sortingOption === "sort by rating") {
    // Sort by rating (descending order)
    myData.sort((a, b) => b.rating - a.rating);
  } else if (sortingOption === "sort by price low to high") {
    // Sort by price (ascending order)
    myData.sort((a, b) => a.price - b.price);
  } else if (sortingOption === "sort by price high to low") {
    // Sort by price (descending order)
    myData.sort((a, b) => b.price - a.price);
  }

  // Call the displayBooks function with the sorted myData array
  displayBooks(myData);
}

// Function to initialize sorting by rating when the page loads
function initializeSorting() {
  // Set the default sorting option to "sort by rating"
  document.getElementById("sortOption").value = "sort by rating";

  // Sort the books by rating initially
  sortBooks();
}

// Simulate a change event on the select element to trigger sorting by rating by default
window.addEventListener("DOMContentLoaded", initializeSorting);

// Event listener for sorting option change
document.getElementById("sortOption").addEventListener("change", sortBooks);
// ********** End Sorting **********

// ********** End Sorting **********
// Get the search input element
let searchInput = document.querySelector('input[type="search"]');

// Add event listener for input event
searchInput.addEventListener("input", function () {
  let searchTerm = this.value.trim().toLowerCase(); // Get the search term and convert it to lowercase

  // Filter the books based on the search term
  let filteredBooks = myData.filter((book) =>
    book.name.toLowerCase().includes(searchTerm)
  );

  // Display the filtered books
  displayBooks(filteredBooks);
});
// ********** End Sorting **********

// start scrollTo

let scrollTop = document.getElementById("scrollTop");
window.onscroll = function () {
  if (scrollY >= 400) {
    scrollTop.style.display = `block`;
  } else {
    scrollTop.style.display = `none`;
  }
};

scrollTop.onclick = function () {
  scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
// end scrollTo

// start payment
let payment = document.getElementById("payment");
payment.addEventListener("click", () => {
  Swal.fire({
    title: "Check Out",
    // text: "You won't be able to revert this!",
    // icon: "warning",
    html: `
    <input type="text" id="input1" class="swal2-input" placeholder="Name on Card">
    <input type="text" id="input2" class="swal2-input" placeholder="Card number">
    <div class="payInfo"><input type="text" id="input3" class="swal2-input" placeholder="MM/YY"><input type="text" id="input4" class="swal2-input" placeholder="CVC"></div>
  `,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Pay",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Complete!",
        text: "Book will arrive in 3 days.",
        icon: "success",
      });
    }
  });
});
// end payment
