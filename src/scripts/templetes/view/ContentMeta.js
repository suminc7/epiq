import VideoMeta from "../default/VideoMeta";
import ListItemProxy from "../../utils/ListItemProxy";

export default class ContentMeta {


    constructor() {
    }

    list(listItem){

        const {
            title,
            userId
        } = listItem;


        const lip = new ListItemProxy(listItem);



        const videoMeta = new VideoMeta({listType: 'view'}).list(listItem);

        return `<div class="video-content cb">
                    <div class="video-title">
                        <span${lip.styleWithLock}>${lip.title}</span>
                    </div>
                    <div class="user-thumb">
                        <a href="/channel/user?userId=${userId}"${lip.styleWithProfileImage}></a>
                    </div>
                    ${videoMeta}
                    <a href="#" class="sns-btn"></a>
                </div>`;




    }


}

