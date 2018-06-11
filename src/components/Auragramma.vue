<template>
<section class="content">

  <h3 class="text-left">Аураграмма</h3>
  <div class="row">
    <div class="col-md-12">
      <div class=box box-primary>
            <div class="box-header ">
                <!-- with-border -->
              <div class="row">
                <!-- seance left -->
                <div class="col-md-6">
                  <div class="form-group row">
                    <div class="col-md-8">
                      <select v-model="seance_1_selected" @change="changeSeance(1)">
                        <option v-for="(item,index) in seance_1_items" v-bind:value="item.value" :key="index" v-bind:selected="item.value == 0" >{{item.title}}</option>
                        <!-- <option >'02.01.2018 - 22:05'</option>
                        <option >'03.01.2018 - 21:15'</option> -->
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label><input type="checkbox" v-model="isSeanceCompare" />Режим сравнения</label>
                    </div>
                  </div>
                </div>
                <!-- seance right -->
                <div class="col-md-6">
                    <select v-show="isSeanceCompare"  v-model="seance_2_selected" @change="changeSeance(2)">
                        <option v-for="(item,index) in seance_2_items" v-bind:value="item.value" :key="index" v-bind:selected="item.value == 0" >{{item.title}}</option>
                            
                      </select>
                </div>
              </div>
            </div>
            <div class="box-body">
                  <div class="row>">
                    <!-- left aura block -->
                    <div class="col-md-6">
                      <div class="row">
                        <!-- aura draw -->
                        <div class="col-md-5">
                            <!-- <AuraInteractive  grade=0 background_img_name="aura-sectors.png" /> -->
                            <!-- <h2>Аураграмма интерактивная</h2>
                           
                            <AuraInteractive  grade=0 background_img_name="aura-full.png" /> -->
                            <div id="aura-interactive-1" ></div>
                            <AuraInteractive  grade=0 background_img_name="aura-full.png" />
                        </div>
                        <!-- chanel block -->
                          <div class="col-md-2">
                             <div class="row">
                               <div class="col-md-6">
                                 <!-- first stolbik -->
                                 <div class="text-left" > 
                                    <p v-if="index < 4" v-for="(item,index) in point_items" :key="index"> 
                                      <span v-bind:style="getSignalColor(index)">{{item.id}}=N</span>
                                    </p>                               
                                 </div>
                                  
                                 
                               </div>
                               <div class="col-md-6">
                                 <!-- second stolbik -->
                                  <div class="text-left">
                                    <p v-if="index > 4" v-for="(item,index) in point_items" :key="index">                                     
                                          <span v-bind:style="getSignalColor(index)">{{item.id}}=N</span>
                                          <!-- <span >{{item.id}}=N </span> -->                                     
                                    </p>
                                 </div>
                               </div>
                             </div>
                          </div>
                        <!-- details block -->
                          <div class="col-md-5">
                              <div class="row chanelDetails"> 
                                <div class="col">
                                  <div class="auraDetailVideo">
                                    <video src="http://express-test.ooo.ua/uploads/spine/1/EljCoY6MwspOxuHE.webm" autoplay="" loop=""></video>
                                  </div>
                                </div>
                                <div class="col">
                                  <div class="auraDetailDesc">
                                      <h3>Сектор</h3>
                                      <h3>{{active_point.id}}:{{active_point.title}}</h3>
                                      <p  v-if="active_point"  v-for="line in active_point.desc" :key="line">
                                      <span>L1:{{line}}</span>      
                                      </p>
                                  </div>
                                </div>                              
                                                                
                            </div>
                          </div>
                      </div>
                    </div>
                    <!-- right aura block -->
                    <div class="col-md-6">
                       <div id="aura-interactive-2" ></div>
                       <!-- <AuraInteractive  aura_id='2' k_width=300 k_height=364 grade=0 background_img_name="aura-full.png" /> -->
                        <AuraInteractive v-if="isSeanceCompare" grade=0 background_img_name="aura-full.png" />
                    </div>
                  </div>
                </div>
            

      </div>
    </div>
  </div>
  <!-- organ description -->
  <div class="row">
     <div class="col-md-4">
       
         <p v-if="index < 4" class="list-group-item text-left" v-for="(item,index) in point_items" :key="index"  >
            <span style="text-align:left">{{item.id}}.</span> <span>{{item.title}}</span>
         </p>
       
     </div>
     <div class="col-md-4">
        
         <p v-if="index > 4" class="list-group-item text-left" v-for="(item,index) in point_items" :key="index">
          <span>{{item.id}}.</span> <span>{{item.title}}</span>
        </p>
      
     </div>
     <div class="col-md-4"></div>
  </div>

  <div class="row">
    <div class="aura-sectors">
      <!-- <div v-for="(item,index) in point_items" :key="index">
        <img class="aura-sector" v-on:click="clickAuraSector(item.id)"  v-bind:src="getAuraSectorImg(item.grade,index)" v-bind:style="getAurasectorStyle(index)" />
      </div> -->
      <!-- <img class="aura-sector" v-bind:src="getSrc('aura-0-25.png')"> -->
      <div v-show="aura_full">
        <!-- <img src="/static/images/aura-full.png" > -->
      </div>
      <div v-show="aura_sectors">
        <!-- <img class="aura-sectors-img" src="/static/images/aura-sectors.png" > -->
        <img class="aura-sectors-img" src="/static/images/aura-full.png" >
      </div>
    </div>
  </div>
  <br>
   <div class="row">

    <center>

  </center>
   
  </div>
  <div class=row>
    <!-- <ul v-for="(item,index) in point_items" :key="index">
      <label>{{index}}.</label><li>{{item.title}}</li>
    </ul> -->
      <!-- <h2>Аураграмма интерактивная</h2>
      <div id="aura-interactive" />
      <AuraInteractive k_width=300 k_height=364 grade=0 background_img_name="aura-full.png" /> -->
       <!-- <AuraInteractive  grade=0 background_img_name="aura-full.png" /> -->
  </div>
 
</section>
  
</template>

<script>
// import Vue from "vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import AuraInteractive from "../components/AuraInteractive.vue";
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "Auragramma",
  props: {
    msg: String
  },
  components: {
    AuraInteractive
  },
  beforeCreate() {},
  beforeMount() {
    this.point_items = this.getPointItems();
  },
  mounted() {},
  created() {
    this.$on("auraSectorClicked", function(data) {
      this.active_point_id = data.id;
      this.active_point = this.getActivePointItem(this.active_point_id);
      console.log(
        "ON this.active_point=" + data.id,
        JSON.stringify(this.active_point)
      );
      //alert('data.id='+data.id+' desc='+JSON.stringify(this.active_point.desc))
    });
  },
  data() {
    return {
      aura_full: true,
      aura_sectors: false,
      point_items: [],
      active_point_id: 1,
      active_point: {},
      signalColors: [
        "blue",
        "aqua",
        "purple",
        "turquoise",
        "green",
        "yellow",
        "orange",
        "red"
      ], //--clRed, clWebOrange, clWebGold, clGreen, clWebDodgerBlue, clBlue: 100 ->0
      seance_1_items: [
        { id: 0, title: "Выберите сеанс тестирования", value: 0 },
        { id: 1, title: "02.02.2018 - 10:00", value: 100 },
        { id: 2, title: "03.02.2018 - 11:00", value: 80 },
        { id: 3, title: "04.02.2018 - 12:00", value: 70 },
        { id: 4, title: "05.02.2018 - 13:00", value: 10 }
      ],
      seance_2_items: [
        { id: 0, title: "Выберите сеанс тестирования", value: 0 },
        { id: 1, title: "02.02.2018 - 10:00", value: 100 },
        { id: 2, title: "03.02.2018 - 11:00", value: 80 },
        { id: 3, title: "04.02.2018 - 12:00", value: 70 },
        { id: 4, title: "05.02.2018 - 13:00", value: 10 }
      ],
      seance_1_selected: 0,
      seance_2_selected: 0,
      isSeanceCompare: false
    };
  },
  methods: {
    getPointItems() {
      let items = [
        {
          id: 1,
          signal: 0,
          title: "Левое полушарие головного мозга, и его сосуды",
          desc: [
            "Головные боли",
            "Головокружение",
            "Нарушение функций органов чувств"
          ],
          color_index: 1,
          grade: 0,
          video_url: ""
        },
        {
          id: 2,
          signal: 0,
          title: "Ствол головного мозга, мозжечок левое полушарие",
          desc: [
            "Нарушение координации движения",
            "Нарушение регуляции внутренних органов",
            "Нарушение функций эндокринных органов",
            "Гипертензия"
          ],
          color_index: 2,
          grade: 0,
          video_url: ""
        },
        {
          id: 3,
          signal: 0,
          title: "Орган зрения и слуха слева",
          desc: [
            "Снижение зрения, воспаление слизистой глаза",
            "головные боли в области лба, слезотечение",
            "снижение слуха, шум в ушах",
            "повышенная чувствительность к звукам, нарушение координаций движений"
          ],
          color_index: 2,
          grade: 0,
          video_url: ""
        },
        {
          id: 4,
          signal: 0,
          title: "Слизистая носа и придаточных пазух слева",
          desc: [
            "Воспаление слизистой носа",
            "Заложенность носа и изменение голоса, слезотечение",
            "Боли в области придаточных пазух, острого или ноющего характера"
          ],
          color_index: 4,
          grade: 0,
          video_url: ""
        },
        {
          id: 6,
          signal: 0,
          title: "Миндалины и лимфоэпителиальное кольцо слева",
          desc: [
            "Боль в горле",
            "Першение в горле",
            "Частые простудные заболевания"
          ],
          color_index: 5,
          grade: 0,
          video_url: ""
        },
        {
          id: 7,
          signal: 0,
          title: "Лимфоотток от органов головы и шеи",
          desc: [
            "Увеличение лимфатических узлов",
            "Сопровождает любой воспалительный процесс",
            "Характеризует степень интоксикации организма"
          ],
          color_index: 5,
          grade: 0,
          video_url: ""
        },
        {
          id: 8,
          signal: 0,
          title: "Пищевод",
          desc: [
            "Трудности при глотании прохождении твердой либо жидкой пищи",
            "Изжога",
            "Боли за грудиной"
          ],
          color_index: 1,
          grade: 0,
          video_url: ""
        },
        {
          id: 9,
          signal: 0,
          title: "Грудной лимфатический проток",
          desc: [
            "Увеличение лимфатических узлов органов средостения",
            "Сопровождает любой воспалительный процесс в грудной клетке",
            "Характеризует степень интоксикации организма"
          ],
          color_index: 2,
          grade: 0,
          video_url: ""
        },
        {
          id: 10,
          signal: 0,
          title: "Щитовидная железа слева",
          desc: [
            "Снижение либо повышение продукции тиреоидных гормонов",
            "Общая слабость, усталость, потливость отечность",
            "Хронические запоры",
            "Снижение давления и частоты сердечных сокращений или…",
            "повышенная возбудимость",
            "нервозность",
            "исхудание",
            "повышение артериального давления и частоты сердечного сокращения, экзофтальм"
          ],
          color_index: 1,
          grade: 0,
          video_url: ""
        }
      ];
      return items;
    },
    changeSeance(index) {
      if (index == 1) {
        console.info(this.seance_1_selected);
      }
      if (index == 2) {
        console.info(this.seance_2_selected);
      }
    },
    getSignalColor(index) {
      let ind = this.point_items[index].color_index;
      let color_name = this.signalColors[ind];
      return {
        color: color_name //'red'//Vue.getRandom(0,7)
      };
    },
    clickAuraSector(id) {
      alert("aura sector " + id);
      this.active_point_id = id;
    },
    getSrc(name) {
      //var images = require.context('../../assets/images/', false, /\.png$/);
      //return images('./' + name + ".png")
      //return require('../../assets/images/' + name + '.png')
      return name;
    },
    getActivePointItem(id) {
      let elm = false;
      this.point_items.forEach(element => {
        //console.log("getActivePoint element.id="+element.id+" ID="+id)
        if (element.id == id) {
          //this.active_point_item = element;
          console.info("FOUNDED!");
          elm = element;
          return element;
        }
      });
      return elm;
    },
    getAuraSectorImg(grade, index) {
      let index_str = index < 9 ? "0" + index : "" + index;
      return "/static/images/aura-" + grade + "-" + index_str + ".png";
    },
    getAurasectorStyle(index) {
      let z_level = 100 + index;
      return { "z-index": z_level };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import "~bootstrap/dist/css/bootstrap.css"; */
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.aura-sectors {
  position: absolute;
  top: 0px;
  left: 0px;
}
.aura-sectors-img {
  position: absolute;
  top: -10px;
  left: 2px;
}
.aura-sector {
  position: absolute;
  top: 0px;
  left: 0px;
}
.auraDetailVideo {
  border: 1px solid #a6becc;
  margin: 5px;
  line-height: 0px;
}
.auraDetailDesc {
  border: 1px solid #a6becc;
  padding: 5px;
}
.chanelDetails {
  /* border: solid 2px; */
  border-color: darkgrey;
  width: 100%;
  padding: 5px;
  text-align: center;
}
.content {
  min-height: 250px;
  padding: 15px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}
.box.box-primary {
  border-top-color: #3c8dbc;
}
.box {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  border-top: 3px solid #d2d6de;
  border-top-color: rgb(210, 214, 222);
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.box-header {
  color: #444;
  display: block;
  padding: 10px;
  position: relative;
}
.box-header.with-border {
  border-bottom: 1px solid #f4f4f4;
}
.box-body {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 10px;
}
</style>
