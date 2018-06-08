<template>
<section class="content">
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
    <h2>Аурограмма интерактивная</h2>
    <div id="aura-interactive" />
    <center>
      <div class="row chanelDetails">
        
        <h2>Сектор</h2>
        <h3>{{active_point.id}}:{{active_point.title}}</h3>
        <p  v-if="active_point"  v-for="line in active_point.desc" :key="line">
          <span>L1:{{line}}</span>      
        </p>
        
    </div>
  </center>
    <!-- <AuraInteractive  grade=0 background_img_name="aura-sectors.png" /> -->
    <AuraInteractive  grade=0 background_img_name="aura-sectors.png" />
  </div>
  <div class=row>
    <!-- <ul v-for="(item,index) in point_items" :key="index">
      <label>{{index}}.</label><li>{{item.title}}</li>
    </ul> -->
  </div>
 
</section>
  
</template>

<script>

import AuraInteractive from '../components/AuraInteractive.vue'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "Auragramma",
  props: {
    msg: String
  },
  components: {
    AuraInteractive
  },
  mounted() {
    this.point_items = this.getPointItems();
  },
  created() {
    this.$on('auraSectorClicked',function(data){        
        this.active_point_id=data.id;
        this.active_point=this.getActivePointItem(this.active_point_id);
        console.log("ON this.active_point=",JSON.stringify(this.active_point))
        //alert('data.id='+data.id+' desc='+JSON.stringify(this.active_point.desc))
    })
  },
  data() {
    return {
      aura_full: true,
      aura_sectors: false,
      point_items: [],
      active_point_id: 1,
      active_point:{}
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
          grade: 0,
          video_url: ""
        }
      ];
      return items;
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
      let elm=false;
      this.point_items.forEach(element => {
        //console.log("getActivePoint element.id="+element.id+" ID="+id)
        if (element.id == id) {
          //this.active_point_item = element;
          console.info("FOUNDED!");
          elm=element;          
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
.chanelDetails {
  border: solid 2px;
  border-color: darkgrey;
  width:25%;
  float: right;
}
</style>
