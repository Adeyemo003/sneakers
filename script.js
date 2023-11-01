window.onload = function(){
    if (document.querySelector(".loadcont")){
        setTimeout(function(){
            document.querySelector(".loadcont").classList.add("hideload")
        }, 1500)
    }
}

const nrItem = document.querySelector(".nritems")
const notifyEl = document.querySelector(".notify")
const cartCont = document.querySelector(".cartCont")
const navLi = document.querySelectorAll("nav li")
const navToggle = document.querySelector("#nav-toggle")
const coverCont = document.querySelector(".cover")
let count = 0
let basePrice = 125

// the inc and dcr btns func
function increase(){
    count = count + 1
    return count
}

function decrease(){
    if(count === 0)return
    count = count - 1
    return count
}

$(".incBtn").click(function(){
    $(".nritems").text(increase())
})

$(".dcrBtn").click(function(){
    $(".nritems").text(decrease())
})


// nav functions
for (let i = 0; i < navLi.length; i++) {
    if (!navLi[i].classList.contains("dropdown")) {
        navLi[i].addEventListener("click", function() {
            // Only execute this code if the screen width is below a certain threshold (e.g., 768px)
            if (window.innerWidth < 768) {
                navToggle.checked = false;
                coverCont.classList.toggle("covering");
                dropCont.classList.remove("show");
                dropDownsvg.classList.remove("rotate");
            } else if(window.innerWidth > 768){
                coverCont.classList.remove("covering");
            }
        });
    }
}

//form variables
const lastName = document.getElementById("Lastname")
const eMail = document.getElementById("email")
const fileText = document.querySelector(".filetext")
const genDer = document.querySelectorAll(".checkCont input")
const userBox = document.querySelector(".user-box #email")
const emailAlert = document.querySelector(".alert")
const submitBtn = document.querySelector(".submit-btn");

//link to other pages
document.addEventListener('DOMContentLoaded', function() {
    // Check for elements unique to the first HTML page
    const avatarEl = document.getElementById("avatar"); // Assuming you have some selector for avatarEl
    
    if (avatarEl) { // If avatarEl exists, we're probably on the first page
        avatarEl.addEventListener("change", function(e) {
            const readFile = new FileReader()
            readFile.onload = function(){
                localStorage.setItem('avatarValue', `${readFile.result}`);
            }
            readFile.readAsDataURL(avatarEl.files[0])
            fileText.textContent = "Your avi is set!"
        });
    }

    // Check for elements unique to the second HTML page
    const aviImg = document.querySelectorAll(".board-avi"); // Adjust the selector as per your HTML structure
    if(aviImg){
        aviImg.forEach((n)=> {
            if (n) { // If aviCont exists, we're probably on the second page
                let avatarValue = localStorage.getItem('avatarValue');
                if (avatarValue) {
                    n.setAttribute("src", `${avatarValue}`);
                }
                // Do other things specific to the second page...
            }
        })
    }

    //login check
    const checkLogin = document.querySelector(".go-login")
    //cart function
    $(".addcartBtn").click(function(){
        nrItem.textContent = nrItem.textContent
        if (aviImg) {
            console.log("aviImg exists");
            console.log("aviImg[0].src.length:", aviImg[0].getAttribute("src"));
        
            if (aviImg[0].getAttribute("src") === "") {
                console.log("please setup");
                if (checkLogin) {
                    checkLogin.innerHTML = 'Sorry, please <a href="index.html">Setup</a> your account.';
                    // the return keyword disable other functions of the button
                    return
                }
            } else {
                console.log("no set up");
            }
        }

        if(nrItem.textContent > 20){
            notifyEl.textContent = "20+"
        }else {
            notifyEl.textContent = nrItem.textContent
        }

        if(nrItem.textContent <= 0){
            $(".cart-details").html(
                `<h4>Your cart is empty. 🙁</h4>`
            )
        }else{
            $(".cart-details").html(
            
                `<section>
                    <div>
                        <figure>
                            <img src="images/image-product-1-thumbnail.jpg" alt="">
                        </figure>
                        <div>
                            <span>Fall Limited Edition Sneaker</span>
                            <p><span>$125 x</span> <span>${nrItem.textContent}</span> <strong id="bold">$${nrItem.textContent * basePrice}.00</strong></p>
                        </div>
                        <svg class="delbtn" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>
                            <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
                    </div>
                    <button class="checkoutbtn">
                        <span>Checkout</span>
                    </button>
                </section>
                `
            )
            let wasDelBtnClicked = false;
            let wasCheckoutBtnClicked = false;

            const checkoutBtn = document.querySelector(".checkoutbtn");
            const cartSection = document.querySelector(".cart-details section")
            const delBtn = document.querySelector(".delbtn");
            if (delBtn) {
                delBtn.addEventListener("click", function(){
                    if (wasCheckoutBtnClicked && wasDelBtnClicked) {
                        setTimeout(function() {
                            alert("You have deleted items in your cart. Please add items, before next checkout.");
                        }, 2900);
                    }else{
                        setTimeout(function() {
                            alert("You have deleted items in your cart. Please add items, before next checkout.");
                        }, 2900);
                    }
                    wasDelBtnClicked = true
                    cartSection.classList.add("close-up");
                    count = 0
                    nrItem.textContent = count
                    notifyEl.textContent = nrItem.textContent
                    setTimeout(function(){
                        $(".cart-details").html(
                            `<h4>Your cart is empty. 🙁</h4>`
                        )
                    }, 600)

                    setTimeout(function(){
                        $(".cartCont").removeClass("display").fadeOut(100);
                    },1600)
                });
            }

            checkoutBtn.addEventListener("click", function(){
                $(".checkoutbtn").html(
                    `
                        <svg class="check-load" viewBox="25 25 50 50">
                            <circle id="check-load-circle" r="20" cy="50" cx="50"></circle>
                        </svg>
                    `
                )
                if (wasCheckoutBtnClicked) {
                    if(wasDelBtnClicked){
                        setTimeout(function(){
                            alert("You have deleted items in your cart. Please add items, before next checkout.");
                        }, 3500)
                    }
                } else if(!wasDelBtnClicked){
                    setTimeout(function(){
                        alert("You've completed your purchase. You can add more items to cart for your next purchase.")
                    }, 3500)
                }
                wasCheckoutBtnClicked = true
                setTimeout(function(){
                    $(".checkoutbtn").html( `Thank you!`)
                    let bellTone = new Audio("sounxs/mixkit-correct-answer-tone-2870.wav")
                    bellTone.play()
                }, 2500)
                count = 0
                nrItem.textContent = count
                notifyEl.textContent = nrItem.textContent
                checkoutBtn.setAttribute("disabled","true")
                setTimeout(function(){
                    $(".cartCont").removeClass("display").fadeOut(1000);
                },3000)
                
                setTimeout(function(){
                    $(".cart-details").html(
                        `<h4>Your cart is empty. 🙁</h4>`
                    )
                },3000)


            })
        }
    })

    //extraction for info
    const firstName = document.getElementById("firstname")
    if(firstName){
        firstName.addEventListener("input", function() {
            let firstNamevalue = localStorage.setItem("firstName",`${firstName.value}`)
            console.log(firstName.value)
            console.log(firstNamevalue)
        });
    }

    const firstName2 = document.querySelector(".firstname");
    if (firstName2) { 
        let firstNamevalue = localStorage.getItem('firstName');
        
        if (firstNamevalue) {
            firstName2.textContent = firstNamevalue
            console.log(firstName2)
        }
    }

    const lastName = document.getElementById("Lastname")
    if(lastName){
        lastName.addEventListener("input", function() {
            let lastNamevalue = localStorage.setItem("lastName",`${lastName.value}`)
            console.log(lastName.value)
            console.log(lastNamevalue)
        });
    }

    const lastName2 = document.querySelector(".lastname");
    if (lastName2) { 
        let lastNamevalue = localStorage.getItem('lastName');
        
        if (lastNamevalue) {
            lastName2.textContent = lastNamevalue
            console.log(lastName2)
        }
    }

    const emailEl = document.getElementById("email")
    if(emailEl){
        emailEl.addEventListener("input", function() {
            let emailElvalue = localStorage.setItem("emailEl",`${emailEl.value}`)
            console.log(emailEl.value)
            console.log(emailElvalue)
            if(!eMail.value.includes("@gmail.com")){
                emailAlert.textContent = 'Please include "@gmail.com".';
            }else{
                emailAlert.textContent = '';
            }
        });
    }

    const emailEl2 = document.querySelector(".email");
    if (emailEl2) { 
        let emailElvalue = localStorage.getItem('emailEl');
        
        if (emailElvalue) {
            emailEl2.textContent = emailElvalue
            console.log(emailEl2)
        }
    }

    genDer.forEach(n => {
        n.addEventListener("input", function() {
            console.log(n.value);
            let genDervalue = localStorage.setItem("gender",`${n.value}`)
        });
    });

    const genDer2 = document.querySelector(".gender")
    if (genDer2) { 
        let genDer2value = localStorage.getItem('gender');
        
        if (genDer2value) {
            genDer2.textContent = genDer2value
            console.log(genDer2)
        }
    }

    //submitbtn
    if(submitBtn){
        submitBtn.addEventListener("click", function(){
            if(!eMail.value.includes("@gmail.com")){
                emailAlert.textContent = 'Please include "@gmail.com".';
                submitBtn.disable = true
            }else{
                emailAlert.textContent = '';
                submitBtn.disable = false 
            }
        })
    }

    let thumbnailImg = document.querySelectorAll(".thumbnail-cont figure img")
    let thumbnailCont = document.querySelectorAll(".thumbnail-cont figure")
    let bigImage = document.querySelectorAll(".bigImage img")
    let lightEl = document.querySelector("#lightEl")
    if(thumbnailCont && thumbnailImg){
        // Add event listener to log the src attribute of each image when clicked
        for (let p = 0; p < thumbnailCont.length; p++) {
            thumbnailCont[p].addEventListener("click", function() {
                bigImage.forEach((n) =>{
                    n.setAttribute("src",`${thumbnailImg[p].getAttribute("src").slice(0,22)}.jpg`)
                })
                console.log(thumbnailImg[p].getAttribute("src"));
            });
        }

        if (thumbnailImg && thumbnailImg.length > 0) {
            thumbnailImg[0].classList.add("active-img");
        }
        
        if (thumbnailCont && thumbnailCont.length > 0) {
            thumbnailCont[0].classList.add("active-thumbnail");
        }
        // thumbnailImg[0].classList.add("active-img");
        // thumbnailCont[0].classList.add("active-thumbnail");

        // Add event listener to each container
        for (let i = 0; i < thumbnailCont.length; i++) {
            thumbnailCont[i].addEventListener("click", function() {
                
                // Remove 'active-img' class from all images
                for (let p = 0; p < thumbnailImg.length; p++) {
                    thumbnailImg[p].classList.remove("active-img");
                }
                
                // Remove 'active-thumbnail' class from all containers
                for (let j = 0; j < thumbnailCont.length; j++) {
                    thumbnailCont[j].classList.remove("active-thumbnail");
                }
                
                // Add 'active-img' class to the associated image
                thumbnailImg[i].classList.add("active-img");
                
                // Add 'active-thumbnail' class to the clicked container
                this.classList.add("active-thumbnail");
            });
        }


        //slideshow
        let imgArray = [
            "images/image-product-1.jpg",
            "images/image-product-2.jpg",
            "images/image-product-3.jpg",
            "images/image-product-4.jpg"
        ]

        function updateThumbnail(){
            // Remove active class from all thumbnails and images
            for (let i = 0; i < thumbnailCont.length; i++) {
                thumbnailCont[i].classList.remove("active-thumbnail");
                thumbnailImg[i].classList.remove("active-img");
            }

            // Add active class to the current thumbnail and image based on the count
            thumbnailCont[count].classList.add("active-thumbnail");
            thumbnailImg[count].classList.add("active-img");
        }

        const previousBtn = document.querySelectorAll(".previous")
        const nextBtn = document.querySelectorAll(".next")
        bigImage.forEach((n) =>{
            n.setAttribute("src",`${imgArray[0]}`)
        })

        nextBtn.forEach((n) => {
            n.addEventListener("click", function() {
                count++;
                if (count >= imgArray.length) {
                    count = 0;
                }
                
                bigImage.forEach((img) => {
                    img.setAttribute("src", `${imgArray[count]}`);
                    img.classList.add("fade-in");
                    
                    // Remove the class after the animation completes
                    setTimeout(() => {
                        img.classList.remove("fade-in");
                    }, 500); // matches the animation duration
                });

                updateThumbnail();
            });
        });


        previousBtn.forEach((n) => {
            n.addEventListener("click", function() {
                count--;
                if (count < 0) {
                    count = imgArray.length - 1;  
                    // Set to the last index of imgArray
                }

                bigImage.forEach((img) => {
                    img.setAttribute("src", `${imgArray[count]}`);
                    img.classList.add("fade-in");

                    // Remove the class after the animation completes
                    setTimeout(() => {
                        img.classList.remove("fade-in");
                    }, 500);  // matches the animation duration
                });

                updateThumbnail();
            });
        });
    }

    if(lightEl){
        //lightbox
        lightEl.addEventListener("click", function(){
            coverCont2.classList.remove("hidecover2")
            lightCont.classList.remove("hidelightcont")
            lightBox.classList.remove("hidelightbox")
            coverCont2.classList.add("showcover2")
            lightCont.classList.add("showlightcont")
            lightBox.classList.add("showlightbox")
        })
    }

    const $cart = document.querySelector(".cart")
    if($cart){
        //avatar func on mousehover
        $cart.addEventListener("click",function(){
            cartCont.classList.toggle("display")
        })
    }

    const coverCont2 = document.querySelector(".cover2")
    const lightCont = document.querySelector(".light-content")
    const lightBox = document.querySelector(".lightbox")
    const closeBtn = document.querySelector(".closebtn")

    if(coverCont2 && lightCont && lightBox && closeBtn){
        //light-content elements
        const lightContents = document.querySelectorAll('.light-content');
        lightContents.forEach(lightContent => {
            const bigImageElement = lightContent.querySelector('.bigImage img');
            const thumbnailImgs = lightContent.querySelectorAll('.thumbnail-cont img');
            const nextBtn = lightContent.querySelector('.control.next');
            const previousBtn = lightContent.querySelector('.control.previous');

            let count = 0;

            nextBtn.addEventListener('click', function() {
                count++;
                if (count > thumbnailImgs.length - 1) {
                    count = 0;
                }
                bigImageElement.setAttribute('src', thumbnailImgs[count].getAttribute('src').replace('-thumbnail', ''));
                updateActiveThumbnail(count, thumbnailImgs);
            });

            previousBtn.addEventListener('click', function() {
                count--;
                if (count < 0) {
                    count = thumbnailImgs.length - 1;
                }
                bigImageElement.setAttribute('src', thumbnailImgs[count].getAttribute('src').replace('-thumbnail', ''));
                updateActiveThumbnail(count, thumbnailImgs);
            });
        });

        function updateActiveThumbnail(currentIndex, thumbnailImgs) {
            // Remove active class from all thumbnails
            thumbnailImgs.forEach(img => {
                img.parentElement.classList.remove('active-thumbnail');
            });

            // Add active class to the current thumbnail
            thumbnailImgs[currentIndex].parentElement.classList.add('active-thumbnail');
        }

        closeBtn.addEventListener("click", function(){
            coverCont2.classList.remove("showcover2")
            lightCont.classList.remove("showlightcont")
            lightBox.classList.remove("showlightbox")
            coverCont2.classList.add("hidecover2")
            lightCont.classList.add("hidelightcont")
            lightBox.classList.add("hidelightbox")
        })
        
    }

    const dropCont = document.querySelector(".drop-cont")
    const dropDownsvg = document.querySelector(".dropdown svg")
    if(dropCont && dropDownsvg){
        //dropdown
        dropDownsvg.addEventListener("click",function(){
            dropCont.classList.toggle("show")
            dropDownsvg.classList.toggle("rotate")
        })

        //hamburger function
        navToggle.addEventListener("click", function(){
            coverCont.classList.toggle("covering")
            dropCont.classList.remove("show")
            dropDownsvg.classList.remove("rotate")
        })
    }else{
        navToggle.addEventListener("click", function(){
            coverCont.classList.toggle("covering")
        })
    }

    const trackScroll= document.querySelector(".track-scroll");
    const circle = document.querySelector("circle")
    if(trackScroll && circle){
        window.addEventListener("scroll", () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
        
            const scrollPercentage = scrollPosition / totalHeight;
        
            const offsetValue = -128 * scrollPercentage;
            trackScroll.textContent = Math.floor(scrollPercentage * 100)+"%"
            circle.style.strokeDashoffset = `${offsetValue}px`;
        });
    }

    //purchase object
    function purchaseObject(Edition,Price,Time) {
        this.edition = Edition
        this.price = Price
        this.date = Time
    }
    
    let theEdition = "Fall Limited Edition Sneakers"
    let thePrice = "$"+125
    let theTime = (new Date()).toLocaleTimeString()

    let purchaseHistory1 = new purchaseObject(theEdition,thePrice,theTime)
    console.log(purchaseHistory1.edition)

    // Store purchase history data in local storage
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory1));

    // Retrieve purchase history data from local storage  && priceEl && dateEl
    if (localStorage.getItem('purchaseHistory')) {
        JSON.parse(localStorage.getItem('purchaseHistory'));
        
        let editionEl = document.querySelector(".edition");
        let priceEl = document.querySelector(".price");
        let dateEl = document.querySelector(".date-purchased");

        if (document.querySelector(".edition")) {
            editionEl.textContent = JSON.parse(localStorage.getItem('purchaseHistory')).edition;
            priceEl.textContent = JSON.parse(localStorage.getItem('purchaseHistory')).price;
            dateEl.textContent = JSON.parse(localStorage.getItem('purchaseHistory')).date;
        }
    }
});