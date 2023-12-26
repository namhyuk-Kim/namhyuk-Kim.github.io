
const API_KEY = "test_db521b39d8749a2cb29f14394368ff9d1e2bc9ca58c746db0dbe6dfe6a631f0d98b1a8a9644bdb2788fcf34530ee70ef";
var Result_items = ""
const Result_wrap = document.getElementById("result");

const today = new Date();

const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);

const dateString = year + '-' + month  + '-' + day;

const Search = () => {
    Result_items = "";
    Result_wrap.innerHTML = "";
    const Nickname = document.getElementById("ucid__nickname").value;
    if(!Nickname){
        alert("닉네임을 입력해주세요.");
        return false;
    }

    const Get_ucid = `https://open.api.nexon.com/maplestory/v1/id?character_name=${Nickname}`
    const ucid_answer = fetch(Get_ucid, {
        headers:{
          "x-nxopen-api-key": API_KEY
        }
    })
      .then(response => response.json())
      .then(data => {
        const Get_rank = `https://open.api.nexon.com/maplestory/v1/ranking/union?date=${dateString}&ocid=${data.ocid}`
        const rank_answer = fetch(Get_rank, {
            headers:{
              "x-nxopen-api-key": API_KEY
            }
        })
          .then(response => response.json())
          .then(data => {
            data.ranking.map((index) => {
                Result_items = Result_items + `
                    <div class="result__item__wrapper uk-background-secondary uk-card uk-card-default uk-card-body" onclick="Go_maplegg('${index.character_name}')">
                        <div class="result__maplegg__icon">
                            <img src='https://cdn.dak.gg/maple/images/logo/logo-full-maplegg-white.svg' alt='maplegg_logo' />
                        </div>
                        <div class="result__nickname uk-text-muted">
                            ${index.character_name}
                        </div>
                        <div class="result__world uk-text-muted">
                            ${index.world_name}
                        </div>
                        <div class="result__unionlv uk-text-muted">
                            LV. ${index.union_level}
                        </div>
                    </div>
                `
                
            })
            Result_wrap.innerHTML = Result_items;
          })
          .catch(error => console.error(error))
          
      })
      .catch(error => console.error(error))
      
}

const Go_maplegg = (nickname) => {
    const link = `https://maple.gg/u/${nickname}`;
    window.open(link);
}