import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'dc2f59109a2a471da0d50cfda2023a96',
        });
    }
}

export default AppLoader;
