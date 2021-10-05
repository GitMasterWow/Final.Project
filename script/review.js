// reviews code
// local reviews data
const reviews = [
  {
    id: 1,
    name: "susan smith",
    job: "web developer",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text: "I requested a quote from this company and I received a whole custom build quote the very next day. The price is unmatched and so is the quality. The PC took less than a week to build and it’s been working wonders for me. If anyone is looking to get a PC, this place is definitely it.",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "HR",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text: "His rates are extrememly reasonable and will drop it if you can find a better price. He also is very professional and usually has all products on his site in stock.",
  },
  {
    id: 3,
    name: "peter jones",
    job: "web developer",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text: "Great work with the Desktop they made for me. Products and build are as described everything runs and works great! I am greatly satisfied for choosing them to create my pc.",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "web designer",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text: "Purchased a gaming PC in Jan. Pricing was competitive and final product was great and was delivered to my door. All expectations exceeded. Nice guy too. Highly recommend!",
  },
];
// select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

// set starting item
let currentItem = 0;

// load initial item
window.addEventListener("DOMContentLoaded", function () {
  const item = reviews[currentItem];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
});

// show person based on item
function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}
// show next person
nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});
// show prev person
prevBtn.addEventListener("click", function () {
  let reviewsOnPageCheck = document.body.contains(
    document.getElementById("reviews-container")
  );
  if (reviewsOnPageCheck) {
    currentItem--;
    if (currentItem < 0) {
      currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
  }
});
// show random person
randomBtn.addEventListener("click", function () {
  currentItem = Math.floor(Math.random() * reviews.length);
  showPerson(currentItem);
});
