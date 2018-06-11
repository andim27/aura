<template>
<section class="content">
<center>
  <button v-on:click="getSignals()">getSignals</button>
  <center>
  
  </center>
  <v-stage  ref="stage" :config="configKonva">
    <v-layer  v-if="isBackGroundAura"  ref='aura_layer'>
     <v-image :config="calcConfigBackGround()"></v-image>     
         
    </v-layer>
   
     <v-layer   :ref="'aura_layer_sector_'+index"  v-for="index in aura_points_cnt" :key="index" >
       <v-image  :ref="'sector-'+index"  :config="calcConfigAuraSector(0,index)" ></v-image>
     </v-layer>
      <v-layer v-if="isMathSectors" v-for="index in aura_points_cnt" :key="index">
       <v-wedge   :config="calcConfigWedge(0,index)" @click="auraWegeSectorClick(index)"></v-wedge>
     </v-layer>
     <v-layer v-if="(isLabelPoints) && (aura_label_points.length>0)" v-for="(point,index) in aura_label_points" :key="point">
       <v-text :ref="'text-'+index" @click="auraSectorClick(point.title)" :config="{
          x: point.x,
          y: point.y,
          fontFamily: 'Calibri',
          fontSize: 24,
          text: ''+point.title,
          fill: 'black'
          }"         
        />
        
     </v-layer>

  </v-stage>

</center>
</section>
</template>

<script>
import Vue from "vue";
import VueKonva from "vue-konva";
Vue.use(VueKonva);

export default {
  name: "AuraInteractive",
  props: {
    grade: 0,
    background_img_name: ""
  },
  beforeMount() {
    this.aura_label_points = this.calcLabelPoints();
  },
  mounted() {
    //const vm = this;
   
    this.stage = this.$refs.stage.getStage();
    this.fillSectorsImg(); //--grade=0

  },
  data() {
    return {
      aura_points_cnt: 47,
      aura_angl_dev: 7.66,
      aura_points: [],
      aura_label_points: [], //[{x:1,y:1,title:"1"},{x:2,y:2,title:"47"}]
      stage: {},
      radius: 200,
      center_x: 300,
      center_y: 300,
      aura_back_width: 600,
      aura_back_heigth: 762,
      backImg: {},
      sectorsImg: [], // config_sector_img,config_sector_img,...
      isBackGroundAura: true,
      isMathSectors: false,
      isLabelPoints: true,
      configKonva: {
        //container: 'aura-interactive',   // id of container <div>
        width: 600,
        height: 784
      },
      configBackGround: {},
 
    };
  },
  computed: {
    configAuraLines: function() {
      return {};
    }
  },
  methods: {
    iStr(i) {
      let i_str = i;
      if (i <= 9) {i_str = "0" + i;} else {i_str = "" + i;}
      return i_str;
    },
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomGrade() {
      let rnd = Math.random().toFixed(2);
      if (rnd < 0.5) {
        return "0";
      }
      if (rnd >= 0.5 && rnd <= 0.7) {
        return "50";
      }
      if (rnd > 0.7) {
        return "70";
      }
    },
    calcLabelPoints() {
      //console.log(this.aura_back_width,this.aura_back_height)
      let Rw=parseInt(this.aura_back_width/2);
      let Rh=parseInt(this.aura_back_heigth/2);
      let k=0.90;//--koef squize
      //let dAngle=this.aura_angl_dev;
      let xCenter=Rw*0.95;
      let yCenter=Rh;
      //let step=0;
      let k_alfa_left=23.7;
      let k_alfa_right=24;
      let label_points = [

      
      ];
      
      // for (var i = 0 * Math.PI; i < 2 * Math.PI; i += dAngle ) {
      //var sign=1;
      for (let i = 24; i < 48; i++) {           
                let alfa=(i*Math.PI/k_alfa_left)
                let xPos = parseInt( (xCenter+Rw *k* Math.sin(alfa))) ;
                let yPos = parseInt( (yCenter-Rh * Math.cos(alfa))) ;
                label_points.push({x:xPos,y:yPos,title:''+i})
      }
      for (let i = 1; i < 24; i++) {           
                let alfa=(i*Math.PI/k_alfa_right)
                let xPos = parseInt( (xCenter+Rw * k* Math.sin(alfa))) ;
                let yPos = parseInt( (yCenter-Rh * Math.cos(alfa))) ;
                label_points.push({x:xPos,y:yPos,title:''+i})
      }
     
      return label_points;
    },
    calcConfigLabel(index) {
      //console.log("this.aura_label_points[index].x=" + this.aura_label_points[index].x,        " this.aura_label_points[index].y=" + this.aura_label_points[index].y);
      return {
        x: this.aura_label_points[index].x,
        y: this.aura_label_points[index].y,
        opacity: 0.75
      };
    },
    calcConfigLabelText(index) {
      return {
        text: "label-" + index,
        fontFamily: "Calibri",
        fontSize: 18,
        padding: 5,
        fill: "black"
      };
    },
    calcConfigBackGround() {
      this.backImg = new Image();
      this.backImg.src = "/static/images/" + this.$props.background_img_name;
      console.log("BACK GR="+this.backImg.src);
      return {
        x: 0,
        y: 0,
        image: this.backImg,
        width: this.aura_back_width,
        height: this.aura_back_heigth
      };
    },
    calcConfigAuraSector(grade, index) {
      grade = this.getRandomGrade();
      this.sectorsImg[index] = new Image();
      this.sectorsImg[index].src =
        "/static/images/aura-" + grade + "-" + this.iStr(index) + ".png";
      return {
        x: 0,
        y: 0,
        image: this.sectorsImg[index],
        width: this.aura_back_width,
        height: this.aura_back_heigth
        //rotation:90,
      };
    },
    calcConfigWedge(grade, index) {
      let radius = this.aura_back_width / 2.5;
      if (
        [40, 42, 43, 44, 45, 46, 46, 48, 1, 2, 3, 45, 6, 7, 8].includes(index)
      ) {
        radius = radius * Math.PI / 2;
      }
      return {
        x: this.aura_back_width / 2,
        y: this.aura_back_heigth / 2,
        radius: radius,
        angle: this.aura_angl_dev,
        fill: "", //(index==0)?'red':'blue',
        stroke: "#FAFAFA", // '#F2F2F2',//'black'
        strokeWidth: 0,
        rotation: -90 + index * this.aura_angl_dev
      };
    },
    fillSectorsImg() {
      this.sectorsImg = [];
      for (let i = 1; i <= this.aura_points_cnt; i++) {
        let img = new Image(this.aura_back_width, this.aura_back_heigth);
        img.src =
          "/static/images/aura-" +
          this.$props.grade +
          "-" +
          this.iStr(i) +
          ".png";
        let config_sector_img = {
          image: img,
          x: 0,
          y: 0,
          width: this.aura_back_width,
          heigth: this.aura_back_heigth
        };
        this.sectorsImg.push(config_sector_img);
      }
      //console.log("fillSectorsImg cnt=" + this.aura_points_cnt);
    },
    showBackground() {
      if (this.$props.background_img_name != "") {
        console.log("showBackGround");
      }
    },
    auraSectorClick(index) {
      //alert(index);
      this.$parent.$emit("auraSectorClicked", { id: parseInt(index) });
    },
    auraWegeSectorClick(index) {
      console.info("Math sector " + index);
      this.$parent.$emit("auraSectorClicked", { id: parseInt(index) });
    },
    auraSectorMouseMove(vueComponent) {
      var mousePos = this.$refs.stage.getStage().getPointerPosition();
      var x = mousePos.x - 190;
      var y = mousePos.y - 40;
      console.log("vueComponent=" + vueComponent + " x: " + x + ", y: " + y);
    },
    getSignals() {
      //this.stage.draw();
      this.$forceUpdate();
      //console.log("VueKonva.Text=", VueKonva.Text);
    },
    setFill() {

    }
  }
};
</script>
<style>
</style>