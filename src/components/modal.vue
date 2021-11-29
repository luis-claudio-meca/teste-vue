<template >
    <div class="text-center">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Dados da Estação
        </v-card-title>

        <v-list-item two-line>
          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>Identificador</v-list-item-title>
                  <v-list-item-subtitle>{{ Data.id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>Nome</v-list-item-title>
                  <v-list-item-subtitle>{{ Data.name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>Latitude</v-list-item-title>
                  <v-list-item-subtitle>{{
                    Data.latitude
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>Longitude</v-list-item-title>
                  <v-list-item-subtitle>{{
                    Data.longitude
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-list-item-content>
                  <v-list-item-title>Elevação (m2)</v-list-item-title>
                  <v-list-item-subtitle>{{
                    Data.elevation_meters
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="4">
                <v-list-item-content>
                  <v-list-item-title>Inicio de Operação</v-list-item-title>
                  <v-list-item-subtitle>{{
                    Data.operation_start_date
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="4">
                <v-list-item-content>
                  <v-list-item-title>Fim de Operação</v-list-item-title>
                  <v-list-item-subtitle>{{
                    Data.operation_end_date
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>Tipo de Estação</v-list-item-title>
                  <v-list-item-subtitle>{{
                    Data.stationname
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>Cor</v-list-item-title>
                  <v-list-item-subtitle>{{ Data.color }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-col>
        </v-list-item>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('onClose')"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
import DBstationType from "./stationType";

export default {
  props: {
    selectedData: Array,
  },
  data() {
    return {
      dialog: true,
      Data: [],
      stationTypes: DBstationType,
    };
  },
  
  mounted() {
    this.Data = this.selectedData[0];


    this.stationTypes.map((stationType) => {
      if (this.Data.station_type_id == stationType.id)
        this.Data.color = stationType.color;
      this.Data.stationname = stationType.name;
    });
  },
};
</script>