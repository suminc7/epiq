


export default class Tracking {

    constructor() {

    }

    /**
     *
     * @param eventCategory text	yes	Typically the object that was interacted with (e.g. 'Video')
     * @param eventAction   text	yes	The type of interaction (e.g. 'play')
     * @param eventLabel    text	no	Useful for categorizing events (e.g. 'Fall Campaign')
     */
    static send(eventCategory, eventAction, eventLabel) {
        ga('send', 'event', eventCategory, eventAction, eventLabel);
    }



}