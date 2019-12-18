<template>
  <div class="chat">
    <div>
      <center>
        <h2>Welcom chat room</h2>
      </center>
    </div>
    <v-row>
      <v-col cols="3">
        <v-list color="yellow">
          <v-subheader>PROJECT</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, index) in projectList"
              :key="index"
              @click="openChatRoom(item, 'project')"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-subheader>PROCEDURAL TASK</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, index) in proceduralList"
              :key="index"
              @click="openChatRoom(item, 'procedural')"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-subheader>RECURRENT TASK</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, index) in recurrentList"
              :key="index"
              @click="openChatRoom(item, 'recurrent')"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-subheader>DEPARTMENT</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, index) in recurrentList"
              :key="index"
              @click="openChatRoom(item, 'recurrent')"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="9" class="room-detail">
        <v-card class="room-header">{{ room.name }}</v-card>

        <v-row class="room-body">
          <v-col cols="8">
            <div class="message"></div>
            <div class="message-menu">
              <v-bottom-navigation color="deep-purple accent-4">
                <v-avatar color="#fab" size="40" :style="{marginTop: '2%'}">
                  <span class="white--text headline">{{ getName() }}</span>
                </v-avatar>

                <v-text-field v-model="message" color="purple darken-2" shaped outlined>
                  <template slot="append">
                    <v-btn color="blue" icon max-width="30px" min-width="30px">
                      <v-icon color="blue">mdi-send</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-bottom-navigation>
            </div>
          </v-col>

          <v-col cols="4">
            <ProjectInfo :room="room" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectInfo from "../components/ProjectInfo";

export default {
  components: {
    ProjectInfo
  },

  data() {
    return {
      room: {},
      message: ""
    };
  },

  computed: {
    ...mapState("room", ["roomList"]),
    ...mapState("login", ["user"]),
    ...mapState("project", ["projectList"]),
    ...mapState("proceduralTask", ["proceduralList"]),
    ...mapState("recurrentTask", ["recurrentList"])
  },

  async asyncData({ store }) {
    try {
      const userId = localStorage.getItem("userId");
      await Promise.all([
        // store.dispatch("room/getAllRoom", userId),
        store.dispatch("project/getProjectListByUserId", userId),
        store.dispatch("proceduralTask/getProceduralListByUserId", userId),
        store.dispatch("recurrentTask/getRecurrentListByUserId", userId)
      ]);
    } catch (err) {
      console.log("chat-asyncData", err);
    }
  },

  async created() {
    const userId = localStorage.getItem("userId");
    console.log("ser", userId);

    if (!this.projectList.length) {
      await this.getProjectListByUserId(userId);
    }
    if (!this.proceduralList.length) {
      await this.getProceduralListByUserId(userId);
    }
    if (!this.recurrentList.length) {
      await this.getRecurrentListByUserId(userId);
    }
  },

  methods: {
    ...mapActions("room", ["getAllRoom"]),
    ...mapActions("project", [
      "getProjectListByUserId",
      "getTaskListByProjectId"
    ]),
    ...mapActions("proceduralTask", ["getProceduralListByUserId"]),
    ...mapActions("recurrentTask", ["getRecurrentListByUserId"]),
    ...mapActions("member", ["getProjectMember"]),
    getName() {
      if (process.browser) {
        const userName = localStorage.getItem("name");
        console.log("ser", userName);
        return userName;
      }
    },

    openChatRoom(room, type) {
      if (type === "project") {
        this.getProjectRoom(room);
      } else if (type === "procedural") {
        this.getProceduralRoom(room);
      } else if (type === "recurrent") {
        this.getRecurrentRoom(room);
      }
    },

    async getProjectRoom(room) {
      this.room = room;
      console.log("room", room);
      await Promise.all([
        this.getProjectMember(room.id),
        this.getTaskListByProjectId(room.id)
      ]);
    },

    getProceduralRoom(room) {},

    getRecurrentRoom(room) {}
  }
};
</script>

<style lang="scss" scope>
html {
  height: 100%;
  body {
    height: 100%;
  }
}
#__nuxt {
  height: 100%;
}

#__layout {
  height: 100%;
}

.chat-client {
  height: 100%;
}

.chat {
  height: 100%;
  div {
    h2 {
      height: 5%;
    }
  }
  .row {
    height: 95%;
    .col {
      padding: 0;
      height: 100%;
      border: solid 0.5px rgba(0, 0, 0, 0.12);
    }
  }

  .room-detail {
    padding: 0;
    .room-header {
      height: 10%;
    }

    .room-body {
      margin: 0;
      height: 90%;
      .message {
        height: 90%;
        border: solid 0.5px rgba(0, 0, 0, 0.12);
      }

      .message-menu {
        height: 10%;
        border: solid 0.5px rgba(0, 0, 0, 0.12);

        .v-text-field {
          border-radius: 50px;
          margin-left: 0.5em;
          fieldset {
            height: 80%;
            margin: 1.5% 0;
          }
        }
      }
    }
  }
}
</style>>