export default class PhotoApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&page=${this.page}&per_page=12&q=${this.searchQuery}&key=21301375-7d22153b76338a293f3dc129f`;
 
    return fetch(url)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            this.incrementPage();

            return data.hits;
        }
        );
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }    
};