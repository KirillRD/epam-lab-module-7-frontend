import * as cookie from './cookie.js';

const TAGS_URL = "http://127.0.0.1:8080/tags/all"

const getTags = async () => {
    const corsToken = cookie.getCookie(cookie.cookieCORSToken);

    const response = await fetch(TAGS_URL, 
        {
            headers: {
                [cookie.headerCORSToken]: corsToken,
            },
        }
    );

    return await response.json();
}

export const loadTags = async () => {
    let tagsElement1 = document.getElementById("tags");

    let tags = await getTags();
    tags.forEach(tag => {
        const tagElementOption = document.createElement('option');
        tagElementOption.value = tag.id;
        tagElementOption.innerHTML = tag.name;
        tagsElement1.appendChild(tagElementOption);
    });
}
