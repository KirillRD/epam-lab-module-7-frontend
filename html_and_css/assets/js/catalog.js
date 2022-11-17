import * as cookie from './cookie.js';

const itemsEl = document.querySelector('.catalog');
const loaderEl = document.querySelector('.loader');

const GIFT_CERTIFICATE_URL = `http://127.0.0.1:8080/gift-certificates?`;
let url = GIFT_CERTIFICATE_URL;

// get the items from API
const getItems = async (page, size) => {
    const corsToken = cookie.getCookie(cookie.cookieCORSToken);
    
    const PAGE_URL = `page=${page}&size=${size}`;

    if (url != GIFT_CERTIFICATE_URL) {
        url += "&";
    }

    const API_URL = url + PAGE_URL;

    const response = await fetch(API_URL, 
        {
            headers: {
                [cookie.headerCORSToken]: corsToken,
            },
        }
    );

    // handle 404
    if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
}

const descriptionLength = 150;

// show the items
const showItems = (items) => {
    items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('catalog-item');

        itemEl.innerHTML = `
            <div class="catalog-item-up">
                <a class="catalog-item-name" href="">${item.name}</a>
                <strong>${item.duration}</strong>
            </div>
            <img class="catalog-item-image" src="../html_and_css/assets/images/gift-certificate-removebg-preview.png">
            <ul class="catalog-item-tags">
                <li>${item.tags[0].name}</li>
                ${item.tags.length > 1 ? `<li>${item.tags[1].name}</li>` : ""}
                ${item.tags.length > 2 ? `<li>${item.tags[2].name}</li>` : ""}
            </ul>
            <span>${item.description.slice(0, descriptionLength) + (item.description.length >= descriptionLength ? "..." : "")}</span>
            <div class="catalog-item-down">
                <strong class="catalog-item-price">${item.price}$</strong>
                <button class="button">Add to basket</button>
            </div>
        `;

        itemsEl.appendChild(itemEl);
    });
};

const hideLoader = () => {
    loaderEl.classList.remove('show');
};

const showLoader = () => {
    loaderEl.classList.add('show');
};

const hasMoreItems = (page, size, total) => {
    const startIndex = (page - 1) * size + 1;
    return total === 0 || startIndex < total;
};

// load items
const loadItems = async (page, size) => {
    // show the loader
    showLoader();

    // 0.5 second later
    setTimeout(async () => {
        try {
            const response = await getItems(page, size);
            showItems(response);

        } catch (error) {
            console.log(error.message);
        } finally {
            hideLoader();
        }
    }, 500);

};

// control variables
let currentPage = 1;
const size = 12;
let total = 0;


window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 
        // &&
        // hasMoreItems(currentPage, size, total)
        ) {
        currentPage++;
        loadItems(currentPage, size);
    }
}, {
    passive: true
});



const nodeListsAreEqual = (list1, list2) => {
    if (!Array.isArray(list1) || list1.length != list2.length) {
        return false;
    }
    return Array.from(list1).every((node, index) => node === list2[index]);
}

const deleteCatalogItems = () => {
    const catalogItems = document.querySelectorAll(".catalog-item");
    catalogItems.forEach(catalogItem => {
        catalogItem.remove();
    });
}

const SEARCH = "search=";
const TAG = "tag=";
const SORT = "sort=";
const AND = "&";

let search = document.getElementById("search");
let tags = document.getElementById("tags");
let sort = document.getElementById("sort");

let savedTags;

const searchBuilder = () => {
    let urlBuilder = GIFT_CERTIFICATE_URL;

    if (search.value) {
        urlBuilder = urlBuilder + SEARCH + search.value;
    }

    let divTags = document.querySelector("#btn-group-tags");
    let activeTags = divTags.querySelectorAll('.active');

    if (!nodeListsAreEqual(savedTags, activeTags)) {
        savedTags = activeTags;

        savedTags.forEach(tag => {
            urlBuilder = urlBuilder + 
            (urlBuilder.length > GIFT_CERTIFICATE_URL.length ? AND : "") + 
            TAG + tag.dataset.text;
        })
    }

    let divSort = document.querySelector("#btn-group-sort");
    let activeSort = divSort.querySelectorAll('.active')[0].dataset.value;

    urlBuilder = urlBuilder + 
    (urlBuilder.length > GIFT_CERTIFICATE_URL.length ? AND : "") +
    SORT + activeSort;

    url = urlBuilder;

    deleteCatalogItems();

    currentPage = 1;
    loadItems(currentPage, size);
}

search.addEventListener('keyup', searchBuilder);
tags.addEventListener('change', searchBuilder);
sort.addEventListener('change', searchBuilder);

// initialize
loadItems(currentPage, size);
