
export default {

    name: 'keyUser',
    days: 360,

    setCookie(value) {

        let date = new Date();
        date.setTime(date.getTime() + (this.days*24*60*60*1000));
        let expires = "; expires=" + date.toUTCString();

        document.cookie = this.name + "=" + (value || "")  + expires + "; path=/";
    },

    getCookie() {

        let nameEQ = this.name + "=";
        let ca = document.cookie.split(';');

        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }

        return false;
    },

    deleteCookie() {   
        document.cookie = this.name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}

