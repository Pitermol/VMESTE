import './main.css';
import Header from '../../components/header/Header.js';
import Footer from "../../components/footer/Footer.js";
import main_page from "../../static/main_page.png";
import ellipse from "../../static/ellipse.png";
import second_img from "../../static/second_img.png";
import gallery1 from "../../static/gallery1.png";
import gallery2 from "../../static/gallery2.jpg";
import gallery3 from "../../static/gallery3.jpg";
import gallery4 from "../../static/gallery4.jpg";
import gallery5 from "../../static/gallery5.jpg";
import gallery6 from "../../static/gallery6.jpg";
import fourth_img from "../../static/fourth_img.png";
import map1 from "../../static/map1.png";
import map2 from "../../static/map2.png";
import vk_logo from "../../static/vk_logo.png";
import tg_logo from "../../static/tg_logo.png";
import inst_logo from "../../static/inst_logo.png";
import fifth_img1 from "../../static/fifth_img1.png";
import fifth_img2 from "../../static/fifth_img2.png";
import fifth_img3 from "../../static/fifth_img3.png";
import stats_img from "../../static/stats_img.jpg";
import polter from "../../static/polter.png";
import spector from "../../static/spector.png";
import meister from "../../static/meister.png";
import vladragone from "../../static/vladragone.png";
import routes from "../../static/routes.png";
import reviews from "../../static/reviews.png";
import subs from "../../static/subs.png";
import helps from "../../static/helps.png";

function MainNotLoggedIn(props) {
  return (
    <div>
      <Header isMain={true} />
      <section id="tab-1">
        <div className='first'>
            <div className='connection'>
              <h>
                Оставайся на связи с
              </h>
              <h>
                путешественниками
              </h>
              <h className='share'>
                Поделись своим опытом, открой для себя новые направления и свяжись с глобальным сообществом путешественников!
              </h>
              <button>Зарегистрироваться</button>
            </div>
            <img src={main_page} width="620px" height="680px" />
        </div>
      </section>
      <div className='second'>
        <div style={{display: "flex"}}>
          <div className='explore'>
            <h style={{marginTop: "90px", marginLeft: "70px", fontSize: "50px", fontWeight: 700, color: "#2F310D"}}>
              Исследуй и открывай
            </h>
            <span style={{display: "flex", marginLeft: "35px", marginTop: "10px"}}>
                <img src={ellipse} width="27px" height="27px" style={{marginTop: "6.5px"}}></img>
                <div className='div_enum'>
                  <h className='second_big_text'>
                    Фото из поездок
                  </h>
                  <h style={{marginTop: "10px"}} className='second_small_text'>
                    Загружай и демонстрируй свои лучшие моменты 
                  </h>
                  <h className='second_small_text'>
                  путешествия с помощью захватывающих фотографий.
                  </h>
                </div>
            </span>
            <span style={{display: "flex", marginLeft: "35px", marginTop: "-50px"}}>
                <img src={ellipse} width="27px" height="27px" style={{marginTop: "6.5px"}}></img>
                <div className='div_enum'>
                  <h className='second_big_text'>
                    Детальные обзоры
                  </h>
                  <h className='second_small_text' style={{marginTop: "10px"}}>
                    Поделись своими идеями и опытом о разных местах и странах,
                  </h>
                  <h className='second_small_text'>
                    чтобы помочь попутчикам принимать правильные решения.
                  </h>
                </div>
            </span>
            <span style={{display: "flex", marginLeft: "35px", marginTop: "-50px"}}>
                <img src={ellipse} width="27px" height="27px" style={{marginTop: "6.5px"}}></img>
                <div className='div_enum'>
                  <h className='second_big_text'>
                    Интерактивные маршруты 
                  </h>
                  <h className='second_small_text' style={{marginTop: "10px"}}>
                    Прокладывай свои маршруты путешествий и делись ими с другими, 
                  </h>
                  <h className='second_small_text'>
                    чтобы вдохновлять и направлять других на приключения.
                  </h>
                </div>
            </span>
          </div>
          <img src={second_img} width="350px" height="600px" style={{marginTop: "5%", marginLeft: "100px"}}></img>
        </div>
      </div>
      <div className='map'>
        <img src={map1} width="100%" height="80px"></img>
      </div>
      <div className='third'>
        <h2 style={{paddingTop: "50px", marginTop: "0px", textAlign: "center"}}>
          Откройте для себя удивительные путешествия
        </h2>
        <h style={{width: "100%", display: "block", textAlign: "center"}}>
          Вдохновляйся невероятными путешествиями, которыми делится наше коммьюнити
        </h>
        <hr width="20%" style={{marginTop: "40px"}}></hr>
        <span className='gallery'>
          <img src={gallery1}></img>
          <img src={gallery2}></img>
          <img src={gallery3}></img>
        </span>
        <span className='gallery' style={{marginTop: "-4px"}}>
          <img src={gallery4}></img>
          <img src={gallery5}></img>
          <img src={gallery6}></img>
        </span>
      </div>
      <div className='fourth'>
        <div className='fourth_content1'>
          <img src={fourth_img} width="450px" style={{marginTop: "73px", paddingLeft: "45px"}}></img>
          <div className='fourth_content2'>
            <div className='fourth_text'>
              <h1>
                Оставайся На Связи
              </h1>
              <h>
                С помощью нашей  функции чата вы можете оставаться на связи со своими
              </h>
              <h>
                друзьями по путешествию и делиться своими последними приключениями 
              </h>
              <h>             
                в режиме реального времени!
              </h>
            </div>
            <div className='fourth_list'>
            <span style={{display: "flex", marginLeft: "35px", marginTop: "50px", width: "650px"}}>
                <img src={ellipse} width="27px" height="27px" style={{marginTop: "6.5px"}}></img>
                <div className='div_enum'>
                  <h className='fourth_big_text'>
                    Функция чата 
                  </h>
                  <h className='fourth_small_text' style={{marginTop: "10px"}}>
                    Оставайтесь на связи с попутчиками, обменивайтесь советами
                  </h>
                  <h className='fourth_small_text'>
                    и планируйте групповые поездки.
                  </h>
                </div>
            </span>
            <span style={{display: "flex", marginLeft: "35px", marginTop: "30px", width: "650px"}}>
                <img src={ellipse} width="27px" height="27px" style={{marginTop: "6.5px"}}></img>
                <div className='div_enum'>
                  <h className='fourth_big_text'>
                    Следите за любимым блогерами
                  </h>
                  <h className='fourth_small_text' style={{marginTop: "10px"}}>
                    Подпишитесь на страницы ваших любимых путешественников,
                  </h>
                  <h className='fourth_small_text'>
                    чтобы быть в курсе их последних туристических новостей.
                  </h>
                </div>
            </span>
            <span style={{display: "flex", marginLeft: "35px", marginTop: "30px", width: "650px"}}>
                <img src={ellipse} width="27px" height="27px" style={{marginTop: "7px"}}></img>
                <div className='div_enum'>
                  <h className='fourth_big_text '>
                    Глобальное коммьюнити
                  </h>
                  <h className='fourth_small_text' style={{marginTop: "10px"}}>
                    Общайтесь с разнообразным сообществом путешественников
                  </h>
                  <h className='fourth_small_text'>
                    из  разных городов, стран и с разным опытом.
                  </h>
                </div>
            </span>
            </div>
          </div>
        </div>
      </div>
      <div className='map'>
        <img src={map2} width="100%" height="80px"></img>
      </div>
      <section id="tab-2">
        <div className='popular_users'>
          <h style={{position: "absolute", fontSize: "30px", fontFamily: "Monospace", fontWeight: "800", left: "550px", marginTop: "35px", color: "#000"}}>
            Наиболее популярные пользователи
          </h>
          <div className='list1'>
            <div style={{display: "grid", textAlign: "center"}}>
              <h style={{fontFamily: "ballet, sans-serif", fontSize: "25px", fontWeight: "1000", color: "#4DA789"}}>Season leader</h>
              <img src={polter} className='top_img1'></img>
            </div>
            <img src={meister} className='top_img'></img>
            <img src={vladragone} className='top_img'></img>
            <img src={spector} className='top_img'></img>
          </div>
          <div className='list2'>
            <div className='list2_item1'>
              <h className="nickname">Polter</h>
              <div className='info'>
                <div className='info_row'>
                  <div className='info_cell'>
                    <img src={routes} width="25px" height="25px"></img>
                    <h>
                      34 маршрута добавлено
                    </h>
                  </div>
                  <div className='info_cell'>
                    <img src={reviews} width="25px" height="25px"></img>
                    <h>
                      12 резенций написано
                    </h>
                  </div>
                </div>
                <div className='info_row'>
                  <div className='info_cell'>
                    <img src={subs} width="25px" height="25px"></img>
                    <h>
                      51333 подписчика
                    </h>
                  </div>
                  <div className='info_cell'>
                    <img src={helps} width="25px" height="25px"></img>
                    <h>
                      45 помощи оказано
                    </h>
                  </div>
                </div>
              </div>
            </div>
            <div className='list2_item'>
              <h className="nickname">Meister</h>
              <div className='info'>
                <div className='info_row'>
                  <div className='info_cell'>
                    <img src={routes} width="25px" height="25px"></img>
                    <h>
                      30
                    </h>
                  </div>
                  <div className='info_cell'>
                    <img src={reviews} width="25px" height="25px"></img>
                    <h>
                      13
                    </h>
                  </div>
                </div>
                <div className='info_row'>
                  <div className='info_cell'>
                    <img src={subs} width="25px" height="25px"></img>
                    <h>
                      43335
                    </h>
                  </div>
                  <div className='info_cell'>
                    <img src={helps} width="25px" height="25px"></img>
                    <h>
                      49
                    </h>
                  </div>
                </div>
              </div>
            </div>
            <div className='list2_item'>
              <h className="nickname">Vladragone</h>
              <div className='info'>
                <div className='info_row'>
                  <div className='info_cell'>
                    <img src={routes} width="25px" height="25px"></img>
                    <h>
                      17
                    </h>
                  </div>
                  <div className='info_cell'>
                    <img src={reviews} width="25px" height="25px"></img>
                    <h>
                      6
                    </h>
                  </div>
                </div>
                <div className='info_row'>
                  <div className='info_cell'>
                    <img src={subs} width="25px" height="25px"></img>
                    <h>
                      45469
                    </h>
                  </div>
                  <div className='info_cell'>
                    <img src={helps} width="25px" height="25px"></img>
                    <h>
                      37
                    </h>
                  </div>
                </div>
              </div>
            </div>
            <div className='list2_item'>
              <h className="nickname">Spect0r</h>
              <div className='info'>
                <div className='info_row'>
                  <div className='info_cell'>
                    <img src={routes} width="25px" height="25px"></img>
                    <h>
                      20
                    </h>
                  </div>
                  <div className='info_cell'>
                    <img src={reviews} width="25px" height="25px"></img>
                    <h>
                      2
                    </h>
                  </div>
                </div>
                <div className='info_row'>
                  <div className='info_cell'>
                    <img src={subs} width="25px" height="25px"></img>
                    <h>
                      27857
                    </h>
                  </div>
                  <div className='info_cell'>
                    <img src={helps} width="25px" height="25px"></img>
                    <h>
                      34
                    </h>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="tab-3">
        <div className='fifth'>
          <div className='about_us'>
            <img src={stats_img} width="501px" height="350px" style={{marginTop: "80px"}}></img>
            <table>
              <tr>
                <td>
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <h style={{fontWeight: "500", fontSize: "40px", marginLeft: "18px"}}>
                      {'>'}1
                    </h>
                    <div style={{border: "3px solid #E0E786", width: "95px"}}>
                      <h style={{position: "relative", marginLeft: "6px", fontWeight: "400", fontSize: "32px"}}>
                        ГОДА
                      </h>
                    </div>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099"}}>
                      Успешной
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099"}}>
                      командной
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099"}}>
                      работы
                    </h>
                  </div>
                </td>
                <td style={{paddingLeft: "60px"}}>
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <h style={{fontWeight: "500", fontSize: "40px", marginLeft: "100px"}}>
                      2
                    </h>
                    <div style={{border: "3px solid #E0E786", width: "220px"}}>
                      <h style={{position: "relative", marginLeft: "6px", fontWeight: "400", fontSize: "32px"}}>
                        СОТРУДНИКА
                      </h>
                    </div>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "5px"}}>
                      Работают
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "5px"}}>
                      в нашей
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "5px"}}>
                      команде
                    </h>
                  </div>
                </td>
                <td style={{paddingLeft: "60px"}}>
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <h style={{fontWeight: "500", fontSize: "40px", marginLeft: "0px"}}>
                      {'~'}10000
                    </h>
                    <div style={{border: "3px solid #E0E786", width: "130px"}}>
                      <h style={{position: "relative", marginLeft: "6px", fontWeight: "400", fontSize: "32px"}}>
                        ЛЮДЕЙ
                      </h>
                    </div>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "10px"}}>
                      В нашей
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "10px"}}>
                      социальной
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "10px"}}>
                      сети
                    </h>
                  </div>
                </td>
              </tr>
              <tr style={{top: "20px"}}>
                <td>
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <h style={{fontWeight: "500", fontSize: "40px", marginLeft: "18px"}}>
                      1.5
                    </h>
                    <div style={{border: "3px solid #E0E786", width: "95px"}}>
                      <h style={{position: "relative", marginLeft: "6px", fontWeight: "400", fontSize: "32px"}}>
                        ГОДА
                      </h>
                    </div>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099"}}>
                      Учебы в
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099"}}>
                      лучшем
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099"}}>
                      техническом
                    </h>
                  </div>
                </td>
                <td style={{paddingLeft: "60px"}}>
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <h style={{fontWeight: "500", fontSize: "40px", marginLeft: "100px"}}>
                      500
                    </h>
                    <div style={{border: "3px solid #E0E786", width: "245px"}}>
                      <h style={{position: "relative", marginLeft: "6px", fontWeight: "400", fontSize: "32px"}}>
                        НАПРАВЛЕНИЙ
                      </h>
                    </div>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "5px"}}>
                      Открыто
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "5px"}}>
                      с нашей
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "5px"}}>
                      соц. сетью
                    </h>
                  </div>
                </td>
                <td style={{paddingLeft: "60px"}}>
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <h style={{fontWeight: "500", fontSize: "40px", marginLeft: "50px"}}>
                      32
                    </h>
                    <div style={{border: "3px solid #E0E786", width: "140px"}}>
                      <h style={{position: "relative", marginLeft: "6px", fontWeight: "400", fontSize: "32px"}}>
                        СТРАНЫ
                      </h>
                    </div>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "10px"}}>
                      Знают,
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "10px"}}>
                      что мы
                    </h>
                    <h style={{fontWeight: "400", fontSize: "18px", color: "#00000099", marginLeft: "10px"}}>
                      VMeste
                    </h>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div className='fifth_text1'>
            <h>
              Присоединяйтесь к тысячам довольных путешественников, которые подключились к сети
            </h>
            <h>
              и поделились своими историями на Vmeste
            </h>
          </div>
          <div className='connections'>
            <img src={vk_logo} width="35px" height="35px"></img>
            <h style={{marginLeft: "5px"}}>vk.com/vmeste</h>
            <img style={{marginLeft: "60px"}} src={tg_logo} width="35px" height="35px"></img>
            <h style={{marginLeft: "5px"}}>t.me/vmeste</h>
            <img style={{marginLeft: "50px"}} src={inst_logo} width="62.3px" height="35px"></img>
            <h style={{marginLeft: "5px"}}>@vmeste</h>
          </div>
          <div className='fifth_text1'>
            <h2>
              Дай волю своей жажде странствий!
            </h2>
            <h>
              Подпитывайте свою страсть к путешествиям и исследуйте мир так, как никогда раньше
            </h>
            <div style={{display: "inline-flex", marginTop: "50px", width: "1200px"}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src={fifth_img1} width="55px"></img>
                <h style={{width: "400px", fontWeight: "700", fontFamily: "Roboto", fontSize: "20px"}}>
                  Открывайте для себя новые направления
                </h>
                <h style={{width: "400px", fontSize: "20px", fontFamily: "Roboto", fontWeight: "400", marginTop: "16px"}}>
                  Вдохновляйтесь опытом путешествий и рекомендациями, которыми делятся коллеги по приключениям
                </h>
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src={fifth_img2} width="55px"></img>
                <h style={{width: "400px", fontWeight: "700", fontFamily: "Roboto", fontSize: "20px"}}>
                  Общайся с путешественниками
                </h>
                <h style={{width: "400px", fontSize: "20px", fontFamily: "Roboto", fontWeight: "400", marginTop: "16px"}}>
                  Устанавливайте значимые связи с путешественниками-единомышленниками и расширяйте свою сеть
                </h>
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src={fifth_img3} width="55px"></img>
                <h style={{width: "400px", fontWeight: "700", fontFamily: "Roboto", fontSize: "20px"}}>
                  Делись своими приключениями
                </h>
                <h style={{width: "400px", fontSize: "20px", fontFamily: "Roboto", fontWeight: "400", marginTop: "16px"}}>
                  Загружайте фотографии, пишите отзывы и документируйте свои истории путешествий, чтобы вдохновлять и помогать другим
                </h>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer style={{background: "linear-gradient(#D4DA5F, #888B5000)", height: "380px"}}></Footer>
    </div>
  );
}

export default MainNotLoggedIn;
