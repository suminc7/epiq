

export default class RankArea {


    constructor() {
    }

    list(listItem, count){

        const {
            beforeRank,
            currentRank
        } = listItem;

        const rankNum = count+1;
        let medal = '';
        if(rankNum === 1){
            medal = 'gold';
        }else if(rankNum === 2){
            medal = 'silver';
        }else if(rankNum === 3){
            medal = 'bronze';
        }

        const pointRank = currentRank - beforeRank;
        let point = '';
        let pointNum;
        if(pointRank == 0){
            point = 'no';
            pointNum = '';
        }else if(pointRank > 0){
            point = 'up';
            pointNum = pointRank;
        }else if(pointRank < 0){
            point = 'down';
            pointNum = pointRank;
        }else if(beforeRank > 100){
            point = 'new';
            pointNum = pointRank;
        }




        const el = `<div class="rank-area ${medal}">${rankNum}</div>
                    <div class="point-area">
                        <span class="point ${point}">${pointNum}</span>
                    </div>`;
        return el;
    }


}

