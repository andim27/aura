<template>
<section class="content">
  <h2>AAA</h2>
<center>
  <button v-on:click="getSignals()">getSignals</button>
  
  <v-stage  ref="stage" :config="configKonva">
    <v-layer  v-if="isBackGroundAura"  ref='aura_layer'>
     <v-image :config="calcConfigBackGround()"></v-image>     
         <!-- <v-line :config="getConfigAura(Konva.context)"></v-line> -->
      <!-- <v-shape ref="aura_2" :config="configAura_2"></v-shape> -->
       <!-- <v-line ref="aura_2" :config="configAura_2"></v-line> -->
       <!-- <v-shape :config="getConfigAura(Konva.context)"></v-shape> -->           
    </v-layer>
   
     <v-layer :ref="'aura_layer_sector_'+index"  v-for="index in aura_points_cnt" :key="index" >
       <v-image  :ref="'sector-'+index"  :config="calcConfigAuraSector(0,index)" ></v-image>
       <!-- <v-image  :ref="'sector-'+index"  :config="calcConfigAuraSector(0,index)" @click="auraSectorClick(index)" ></v-image> -->
     </v-layer>
      <v-layer v-if="isMathSectors" v-for="index in aura_points_cnt" :key="index">
       <v-wedge   :config="calcConfigWedge(0,index)" @click="auraWegeSectorClick(index)"></v-wedge>
     </v-layer>
        <!-- <v-layer ref='aura_layer_sector_1'>
       <v-image  ref="sector-1"  :config="calcConfigAuraSector(0,1)" @click="auraSectorClick(1)" @mousemove="auraSectorMouseMove()"></v-image>
     </v-layer> -->
     
    <!-- <v-layer>    
       <v-wedge :config="configW_2" @click="auraWegeSectorClick(1)"></v-wedge>
     </v-layer> -->
  </v-stage>

</center>
</section>
</template>

<script>
import Vue from 'vue'
import VueKonva from 'vue-konva'
Vue.use(VueKonva)

export default {
  name:"AuraInteractive",
  props: {
    grade: 0,
    background_img_name:''
  },
  mounted() {
     //const vm = this;
     this.stage=this.$refs.stage.getStage();
     this.fillSectorsImg();//--grade=0
    //  this.aura_points=this.calcAuraPoints() 
    //  this.configAura_2=this.getConfigAura(this.VueKonva.context)    
  },
  data() {
    
    return {
      aura_points_cnt:47,
      aura_angl_dev:7.66,     
      aura_points:[],
      stage:{},
      radius: 200,
      center_x:300,
      center_y:300,
      aura_back_width:600,
      aura_back_heigth:762,
      backImg: {},
      sectorsImg:[],// config_sector_img,config_sector_img,...
      isBackGroundAura:true,
      isMathSectors:true,
      configKonva: {
        //container: 'aura-interactive',   // id of container <div>
        width: 600,
        height: 764
      },
      configBackGround: {

      },
      configCircle_1: {
        x: 200,
        y: 200,
        radius: 120,
        fill: "#6600ff",
        stroke: "black",
        strokeWidth: 2
      }, 
      configW_2: {
        x: 300,
        y: 381,
        radius: 240,
        angle: 12,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 0,
        rotation: 12 
      }
    };
  },
  computed: {
    configAuraLines:function() {
      return {

      }
    }
  },
  methods: {
    iStr(i) {
      let i_str=i;
      if (i <= 9) {
          i_str='0'+i;
      } else {
          i_str=''+i
      }
      return i_str;
    },
    getRandom(min,max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomGrade() {
      let rnd=Math.random().toFixed(2)
      if (rnd < 0.5) {return '0'}
      if ((rnd >= 0.5)&&(rnd <= 0.7)) {return '50'}
      if (rnd > 0.7) {return '70'}
    },
    calcConfigBackGround() {
      this.backImg=new Image()
      this.backImg.src="/static/images/"+this.$props.background_img_name;
      console.log(this.backImg.src);
      return {
        x: 0,
        y: 0,
        image: this.backImg,
        width: this.aura_back_width,
        height:this.aura_back_heigth,
      }
    },
    calcConfigAuraSector(grade,index) {
      grade =this.getRandomGrade();
      this.sectorsImg[index]=new Image()
      this.sectorsImg[index].src="/static/images/aura-"+grade+'-'+this.iStr(index)+'.png';
      return {
        x: 0,
        y: 0,
        image: this.sectorsImg[index],
        width: this.aura_back_width,
        height:this.aura_back_heigth,
        //rotation:90,
      }
    },
    calcConfigWedge(grade,index) {
      return {
        x: this.aura_back_width / 2,
        y: this.aura_back_heigth / 2,
        radius: this.aura_back_width / 2.5,
        angle: this.aura_angl_dev,
        fill: "",//(index==0)?'red':'blue',
        stroke: 'black',
        strokeWidth: 0,
        rotation: -90+(index * this.aura_angl_dev)  
      }
    },
    fillSectorsImg(){
      this.sectorsImg=[];
      for (let i=1;i<=this.aura_points_cnt;i++) {
        let img=new Image(this.aura_back_width,this.aura_back_heigth);       
        img.src="/static/images/aura-"+this.$props.grade+'-'+this.iStr(i)+".png";
        let config_sector_img={
                                image:img,
                                x:0,
                                y:0,
                                width:this.aura_back_width,
                                heigth:this.aura_back_heigth
                              }
        this.sectorsImg.push(config_sector_img);
      }
      console.log("fillSectorsImg cnt="+this.aura_points_cnt)
    },
    showBackground() {
      if (this.$props.background_img_name !='') {
          console.log('showBackGround');
      }
    },
    auraSectorClick(index) {
      alert(index)
    },
    auraWegeSectorClick(index) {
      console.info('Math sector '+index)
      this.$parent.$emit('auraSectorClicked',{id:index});
    },
    auraSectorMouseMove(vueComponent) {
      var mousePos = this.$refs.stage.getStage().getPointerPosition();
      var x = mousePos.x - 190;
      var y = mousePos.y - 40;
      console.log('vueComponent='+vueComponent+' x: ' + x + ', y: ' + y);
    },
    getSignals() {
      //this.stage.draw();
      this.$forceUpdate();
    },
    setFill() {
      // let attr={        
      //           fillRadialGradientStartPoint: 0,               
      //           fillRadialGradientEndPoint: 0,
      //           fillRadialGradientEndRadius: 70,
      //           fillRadialGradientColorStops: [0.2, 'red', 0.5, 'yellow', 1, 'blue']
      //       };
      console.log(VueKonva);
      //console.log("this.VueKonva=",this.$refs)
      // this.VueKonva.$refs['aura_2'].filters([this.VueKonva.Filters.Blur]);
      // this.$refs.aura_2.$options.fillRadialGradientStartPoint=0;//(attr);
      // this.$refs.aura_2.$options.fillRadialGradientEndPoint=0;//(attr);
      // this.$refs.aura_2.$options.fillRadialGradientStartRadius=0;//(attr);
      // this.$refs.aura_2.$options.fillRadialGradientEndRadius=70;//(attr);
      // this.$refs.aura_2.$options.fillRadialGradientColorStops=[0.1, 'red', 0.5, 'yellow', 1, 'blue'];//(attr);
      // this.$refs.aura_layer.getStage().draw();
    },
    

  }
};

</script>
<style>

</style>