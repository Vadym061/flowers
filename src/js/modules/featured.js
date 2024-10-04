export function scriptsSectionFeatured(){
    const loadMoreBtn = document.getElementById('more-button');
    const addToCart = document.querySelectorAll('.add-to-cart-btn');
    const loader = document.querySelector('#loader');
    const additionalProductsList = document.querySelector('.featured__list');
    const selected = document.getElementById('sort-options');

    let loadCount = 0;

    selected.addEventListener('change', function () {
        const sortOption = this.value;
        
        const productLists = document.querySelectorAll('.featured__list');
        
        let allProducts = [];
        productLists.forEach(list => {
            allProducts = allProducts.concat(Array.from(list.children));
        });

        const getPrice = (product) => parseFloat(product.querySelector('.featured__card--price').textContent.replace('$', ''));

        const getDate = (product) => new Date(product.dataset.date || Date.now());

        let sortedProducts;
        if (sortOption === 'cheaper-first') {
            sortedProducts = allProducts.sort((a, b) => getPrice(a) - getPrice(b));
        } else if (sortOption === 'expensive-first') {
            sortedProducts = allProducts.sort((a, b) => getPrice(b) - getPrice(a));
        } else if (sortOption === 'newest-first') {
            sortedProducts = allProducts.sort((a, b) => getDate(b) - getDate(a));
        } else if (sortOption === 'oldest-first') {
            sortedProducts = allProducts.sort((a, b) => getDate(a) - getDate(b)); 
        }

        // Очищаємо всі списки
        productLists.forEach(list => list.innerHTML = '');

        sortedProducts.forEach((product, index) => {
            if (index < 5) {
                productLists[0].appendChild(product); 
            } else {
                productLists[1].appendChild(product); 
            }
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        loader.style.display = 'block';
        loadMoreBtn.style.display = 'none';
    
        setTimeout(() => {
            loader.style.display = 'none';
    
            additionalProductsList.insertAdjacentHTML("beforeend", `
                <li class="featured__item" data-date="2024-04-15">
                    <article class="featured__card">
                        <figure class="featured__image">
                            <img src="../../img/annie-spratt-1.png" width="217" height="217" alt="Kaktus Plants" />
                        </figure>
                        <h4 class="featured__card--title">Kaktus Plants</h4>
                        <p class="featured__card--price">$7.25</p>
                        <div class="featured__hover-box">
                            <button class="add-to-cart-btn">Add to cart</button>
                        </div>
                    </article>
                </li>
                <li class="featured__item" data-date="2024-05-24">
                    <article class="featured__card">
                        <figure class="featured__image">
                            <img src="../../img/stephanie-harvey-1.png" width="217" height="217" alt="Kaktus Plants" />
                        </figure>
                        <h4 class="featured__card--title">Kaktus Plants</h4>
                        <p class="featured__card--price">$10.78</p>
                        <div class="featured__hover-box">
                            <button class="add-to-cart-btn">Add to cart</button>
                        </div>
                    </article>
                </li>
                <li class="featured__item" data-date="2024-06-28">
                    <article class="featured__card">
                        <figure class="featured__image">
                            <img src="../../img/galina-n-1.png" width="217" height="217" alt="Kaktus Plants" />
                        </figure>
                        <h4 class="featured__card--title">Kaktus Plants</h4>
                        <p class="featured__card--price">$9.99</p>
                        <div class="featured__hover-box">
                            <button class="add-to-cart-btn">Add to cart</button>
                        </div>
                    </article>
                </li>
                <li class="featured__item" data-date="2024-08-22">
                    <article class="featured__card">
                        <figure class="featured__image">
                            <img src="../../img/stephanie-harvey-2.png" width="217" height="217" alt="Kaktus Plants" />
                        </figure>
                        <h4 class="featured__card--title">Kaktus Plants</h4>
                        <p class="featured__card--price">$13.75</p>
                        <div class="featured__hover-box">
                            <button class="add-to-cart-btn">Add to cart</button>
                        </div>
                    </article>
                </li>
                <li class="featured__item" data-date="2024-09-12">
                    <article class="featured__card">
                        <figure class="featured__image">
                            <img src="../../img/stephanie-harvey-3.png" width="217" height="217" alt="Kaktus Plants" />
                        </figure>
                        <h4 class="featured__card--title">Kaktus Plants</h4>
                        <p class="featured__card--price">$11.05</p>
                        <div class="featured__hover-box">
                            <button class="add-to-cart-btn">Add to cart</button>
                        </div>
                    </article>
                </li>
            `);
    
    
            loadMoreBtn.style.display = 'block';
        }, 3500);
    });

    addToCart.forEach(button => {
        button.addEventListener('click', function () {
            if (!this.classList.contains('added')) {
                this.classList.add('added');
                this.textContent = 'Remove from cart';
            } else {
                this.classList.remove('added');
                this.textContent = 'Add to card';
            }
        });
    });
}