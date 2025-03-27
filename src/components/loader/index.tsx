import loaderGif from '../../../public/loader.gif'

export function Loader () {
    return(
        <div>
            <img src={loaderGif} alt='Loading...' />
        </div>
    );
};