export const cookieCORSToken = "XSRF-TOKEN";
export const headerCORSToken = "X-XSRF-TOKEN";

export const getCookie = (cookieName) => {
    let cookie = {};
        document.cookie.split(';').forEach(function(el) {
            let [key,value] = el.split('=');
            cookie[key.trim()] = value;
        })
    return cookie[cookieName];
}
