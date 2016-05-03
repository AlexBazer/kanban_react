import makeFinalStore from 'alt-utils/lib/makeFinalStore';

/**
 * Load saved states from localStorage and dump it after eatch update
 * @param  {[type]} alt       [description]
 * @param  {[type]} storeName [description]
 * @return {[type]}           [description]
 */
export default function(alt, storeName) {
    const finalStore = makeFinalStore(alt);

    try {
        alt.bootstrap(localStorage.getItem(storeName));
    } catch (e) {
        console.error('Failed to bootstrap data', e);
    }

    finalStore.listen(() => {
        if(!localStorage.getItem('debug')){
            localStorage.setItem(storeName, alt.takeSnapshot());
        }
    });
}
