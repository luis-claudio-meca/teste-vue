<template>
  <v-card class="mx-auto">
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-toolbar color="indigo" dark>
      <v-toolbar-title>Vuetify and OpenLayer</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card data-app>
      <v-card-title>Filtros</v-card-title>
      <v-container fluid>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-select
              v-model="values"
              :items="itemsType"
              @change="change = changeStationType(values)"
              chips
              label="Tipo de Estação"
              multiple
              solo
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="valueStation"
              :items="itemsStations"
              chips
              label="Estações"
              @change="changeStation(valueStation)"
              multiple
              solo
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <vl-map
      data-projection="EPSG:4326"
      style="height: 500px; width: 80%; margin: 30px auto"
    >
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      ></vl-view>

      <vl-layer-tile>
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>

      <vl-feature v-for="feature in selectStation" :key="feature.id">
        <vl-geom-point
          :coordinates="[+feature.longitude, +feature.latitude]"
        ></vl-geom-point>
        <vl-interaction-select
          v-on:select="modalSelect(selectedFeatures)"
          :features.sync="selectedFeatures"
        />
        <vl-style-box  :features="feature">
          <vl-style-icon
            src="./assets/marker.png"
            :anchor="[0.2, 1]"
            :scale="0.1"
          >
          </vl-style-icon>

          <vl-style-circle :radius="20">
            <vl-style-fill color="white"></vl-style-fill>
            <vl-style-stroke :color="feature.color"></vl-style-stroke>
          </vl-style-circle>
          <vl-style-text :text="feature.name"></vl-style-text>
        </vl-style-box>
      </vl-feature>
    </vl-map>
  </v-card>
</template>

<script>
import Vue from "vue";
import { VectorSource } from "vuelayers";
import { IconStyle } from "vuelayers";
import DBstation from "./components/station";
import DBstationType from "./components/stationType";
//import Modal from "./components/modal.vue";
import { SelectInteraction } from "vuelayers";

Vue.use(SelectInteraction);

Vue.use(IconStyle);
Vue.use(VectorSource);

export default {
  components: {
    //  Modal,
  },

  data() {
    return {
      zoom: 7,
      center: [-51.93, -24.77],
      rotation: 0,
      stations: DBstation,
      stationTypes: DBstationType,
      values: [],
      itemsType: [],
      valueStation: [],
      itemsStations: [],
      dialog: false,
      selectStation: [],
      selectedFeatures: [],
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      this.stationTypes.map((stationType) => {
        this.stations.map((station) => {
          if (station.station_type_id == stationType.id)
            station.color = stationType.color;
        });

        this.itemsType.push(stationType.name);
      });

      this.stations.map((station) => {
        this.itemsStations.push(station.name);
        this.selectStation.push(station);
      });
    },

    changeStationType(values) {
      this.selectStation = [];
      let types = [];
      this.itemsStations = [];

      this.stationTypes.forEach((item) =>
        values.includes(item.name) ? types.push(item) : null
      );

      this.stations.map((station) => {
        types.map((type) => {
          if (station.station_type_id == type.id) {
            this.selectStation.push(station);
            this.itemsStations.push(station.name);
          }
        });
      });
    },

    changeStation(values) {
      this.selectStation = [];
      let types = [];

      this.stations.forEach((item) =>
        values.includes(item.name) ? types.push(item) : null
      );

      types.map((type) => {
        this.selectStation.push(type);
      });
    },

    modalSelect(value) {
      console.log("foi", value);
    },
  },
};
</script>